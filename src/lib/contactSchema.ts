import { z } from "zod";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_TREATMENT_LENGTH = 60;
const MAX_NOTES_LENGTH = 2000;
const MAX_COMPANY_LENGTH = 120;

const emailRegex = /\S+@\S+\.\S+/;

export const contactSchema = z.object({
  name: z
    .string()
    .transform((s) => s.trim())
    .pipe(z.string().min(1, "Name is required").max(MAX_NAME_LENGTH)),
  email: z
    .string()
    .transform((s) => s.trim())
    .pipe(
      z
        .string()
        .min(1, "Email is required")
        .max(MAX_EMAIL_LENGTH)
        .refine((v) => emailRegex.test(v), "Invalid email format")
    ),
  treatment: z
    .string()
    .transform((s) => s.trim())
    .pipe(z.string().max(MAX_TREATMENT_LENGTH))
    .optional()
    .default(""),
  notes: z
    .string()
    .transform((s) => s.trim())
    .pipe(z.string().max(MAX_NOTES_LENGTH))
    .optional()
    .default(""),
  company_field: z
    .string()
    .transform((s) => s.trim())
    .pipe(z.string().max(MAX_COMPANY_LENGTH))
    .optional()
    .default(""),
});

export type ContactPayload = z.infer<typeof contactSchema>;

/** Parse raw JSON/FormData-like object for API. Accepts optional company_field or company. */
export function parseContactPayload(raw: unknown) {
  const obj =
    raw && typeof raw === "object" && !Array.isArray(raw)
      ? {
          name: String((raw as Record<string, unknown>).name ?? ""),
          email: String((raw as Record<string, unknown>).email ?? ""),
          treatment: String((raw as Record<string, unknown>).treatment ?? ""),
          notes: String((raw as Record<string, unknown>).notes ?? ""),
          company_field: String(
            (raw as Record<string, unknown>).company_field ?? (raw as Record<string, unknown>).company ?? ""
          ),
        }
      : {};
  return contactSchema.safeParse(obj);
}

/** Client-side validation: returns user-facing error message or null if valid. */
export function validateContactForm(values: {
  name: string;
  email: string;
  treatment?: string;
  notes?: string;
  company_field?: string;
}): string | null {
  const result = contactSchema.safeParse({
    name: values.name.trim(),
    email: values.email.trim(),
    treatment: values.treatment?.trim() ?? "",
    notes: values.notes?.trim() ?? "",
    company_field: values.company_field?.trim() ?? "",
  });
  if (result.success) return null;
  return "Please enter your name and a valid email address.";
}
