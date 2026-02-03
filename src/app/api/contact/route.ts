import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const contactTo = process.env.CONTACT_TO;
const contactFrom = process.env.CONTACT_FROM || "Shvitz <onboarding@resend.dev>";

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
  const company = String(payload?.company || "").trim();
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
    await resend.emails.send({
      from: contactFrom,
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

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: "Unable to send your request right now." },
      { status: 500 }
    );
  }
}
