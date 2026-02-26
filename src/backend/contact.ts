import { parseContactPayload } from "@/lib/contactSchema";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const contactTo = process.env.CONTACT_TO;
const fallbackFrom = "Shvitz <onboarding@resend.dev>";
const contactFrom = process.env.CONTACT_FROM?.trim() || fallbackFrom;
const fromAddress = contactFrom;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function jsonSuccess() {
  return Response.json({ success: true });
}

function jsonError(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

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

/** Map Zod validation failure to existing user-facing API messages. */
function validationErrorMessage(
  parseResult: { success: false; error: { issues: Array<{ path: Array<unknown> }> } }
): string {
  const first = parseResult.error.issues[0];
  const pathKey = first?.path?.[0];
  const path = typeof pathKey === "string" ? pathKey : undefined;
  if (path === "name" || path === "email") {
    return "Please provide a valid name and email.";
  }
  return "Please shorten one or more fields and try again.";
}

export async function handleContactPost(request: Request): Promise<Response> {
  if (!resendApiKey || !contactTo) {
    console.error("Email service not configured:", {
      hasResendKey: !!resendApiKey,
      hasContactTo: !!contactTo,
      contactToValue: contactTo,
    });
    return jsonError("Email service is not configured.", 500);
  }

  const clientKey = getClientIp(request);
  if (isRateLimited(clientKey)) {
    return jsonError("Too many requests. Please try again soon.", 429);
  }

  const raw = await request.json().catch(() => null);
  const parsed = parseContactPayload(raw);

  if (!parsed.success) {
    return jsonError(validationErrorMessage(parsed), 400);
  }

  const { name, email, treatment, notes, company_field: company } = parsed.data;
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeTreatment = escapeHtml(treatment || "Not specified");
  const safeNotes = escapeHtml(notes || "Not provided");

  if (company) {
    return jsonSuccess();
  }

  const resend = new Resend(resendApiKey);
  const toAddress = contactTo.trim();
  if (!toAddress) {
    return jsonError("Email service is not configured.", 500);
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
      return jsonError(
        `Unable to send your request: ${resultError.message || "Unknown error"}`,
        500
      );
    }

    console.log("Email sent successfully to:", toAddress);
    return jsonSuccess();
  } catch (error) {
    console.error("Resend send failed with exception:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return jsonError(`Unable to send your request: ${errorMessage}`, 500);
  }
}
