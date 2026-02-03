import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const contactTo = process.env.CONTACT_TO;
const fallbackFrom = "Shvitz <onboarding@resend.dev>";
const contactFrom = process.env.CONTACT_FROM || fallbackFrom;
const fromAddress =
  process.env.NODE_ENV === "production" ? contactFrom : fallbackFrom;

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);
const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export async function POST(request: Request) {
  if (!resendApiKey || !contactTo) {
    return Response.json(
      { error: "Email service is not configured." },
      { status: 500 }
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

  if (company) {
    return Response.json({ ok: true });
  }

  const resend = new Resend(resendApiKey);

  try {
    const result = await resend.emails.send({
      from: fromAddress,
      to: contactTo,
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
      if (process.env.NODE_ENV !== "production") {
        console.info("Resend send result:", result);
      }
      throw new Error(resultError.message || "Resend rejected the request.");
    }

    if (process.env.NODE_ENV !== "production") {
      console.info("Resend send result:", result);
    }

    const resultId =
      (result as { id?: string })?.id ??
      (result as { data?: { id?: string } })?.data?.id;

    return Response.json({
      ok: true,
      ...(process.env.NODE_ENV !== "production" && resultId
        ? { id: resultId }
        : {}),
    });
  } catch (error) {
    console.error("Resend send failed:", error);
    return Response.json(
      { error: "Unable to send your request right now." },
      { status: 500 }
    );
  }
}
