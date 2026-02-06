import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const contactTo = process.env.CONTACT_TO;
const fallbackFrom = "Shvitz <onboarding@resend.dev>";
const contactFrom = process.env.CONTACT_FROM || fallbackFrom;
const fromAddress =
  process.env.NODE_ENV === "production" ? contactFrom : fallbackFrom;

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_TREATMENT_LENGTH = 60;
const MAX_NOTES_LENGTH = 2000;
const MAX_COMPANY_LENGTH = 120;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

const getClientIp = (request: Request) => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
};

const isRateLimited = (key: string) => {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (bucket.count >= RATE_LIMIT_MAX) {
    return true;
  }
  bucket.count += 1;
  return false;
};
const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export async function handleContactPost(request: Request): Promise<Response> {
  if (!resendApiKey || !contactTo) {
    console.error("Email service not configured:", {
      hasResendKey: !!resendApiKey,
      hasContactTo: !!contactTo,
      contactToValue: contactTo,
    });
    return Response.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const clientKey = getClientIp(request);
  if (isRateLimited(clientKey)) {
    return Response.json(
      { error: "Too many requests. Please try again soon." },
      { status: 429 }
    );
  }

  const payload = await request.json().catch(() => null);
  const name = String(payload?.name || "").trim();
  const email = String(payload?.email || "").trim();
  const treatment = String(payload?.treatment || "").trim();
  const notes = String(payload?.notes || "").trim();
  const company = String(
    payload?.company_field || payload?.company || ""
  ).trim();
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeTreatment = escapeHtml(treatment || "Not specified");
  const safeNotes = escapeHtml(notes || "Not provided");

  if (!name || !email || !isValidEmail(email)) {
    return Response.json(
      { error: "Please provide a valid name and email." },
      { status: 400 }
    );
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    treatment.length > MAX_TREATMENT_LENGTH ||
    notes.length > MAX_NOTES_LENGTH ||
    company.length > MAX_COMPANY_LENGTH
  ) {
    return Response.json(
      { error: "Please shorten one or more fields and try again." },
      { status: 400 }
    );
  }

  if (company) {
    return Response.json({ ok: true });
  }

  // Must await so the email is sent before the handler exits (Render/Vercel kill the process after response)
  const resend = new Resend(resendApiKey);
  const toAddress = contactTo.trim();
  if (!toAddress) {
    return Response.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  try {
    console.log("Attempting to send email:", {
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      name,
    });

    const result = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: "New Shvitz availability request",
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Preferred treatment: ${treatment || "Not specified"}`,
        `Notes: ${notes || "Not provided"}`,
      ].join("\n"),
      html: `
        <h2>New availability request</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Preferred treatment:</strong> ${safeTreatment}</p>
        <p><strong>Notes:</strong> ${safeNotes}</p>
      `,
    });

    const resultError = (result as { error?: { message?: string } })?.error;
    if (resultError) {
      console.error("Resend send failed:", resultError.message ?? result);
      return Response.json(
        { error: `Unable to send your request: ${resultError.message || "Unknown error"}` },
        { status: 500 }
      );
    }

    console.log("Email sent successfully to:", toAddress);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Resend send failed with exception:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return Response.json(
      { error: `Unable to send your request: ${errorMessage}` },
      { status: 500 }
    );
  }
}
