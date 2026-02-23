import { useCallback, useEffect, useState, type FormEvent } from "react";
import { validateContactForm } from "@/lib/contactSchema";

export type ContactFormStatus = "idle" | "sending" | "success" | "error";

export type ContactFormState = {
  status: ContactFormStatus;
  message: string;
};

const INITIAL_STATE: ContactFormState = { status: "idle", message: "" };

type UseContactFormOptions = {
  contactPhone: string;
  contactEmail: string;
};

export function useContactForm({ contactPhone, contactEmail }: UseContactFormOptions) {
  const [formState, setFormState] = useState<ContactFormState>(INITIAL_STATE);

  const closeBookingSuccessPopup = useCallback(() => {
    setFormState({ status: "idle", message: "" });
  }, []);

  const closeBookingErrorPopup = useCallback(() => {
    setFormState({ status: "idle", message: "" });
  }, []);

  useEffect(() => {
    if (formState.status !== "success" && formState.status !== "error") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeBookingSuccessPopup();
        closeBookingErrorPopup();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [formState.status, closeBookingSuccessPopup, closeBookingErrorPopup]);

  const handleContactSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const form = event.currentTarget;
      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const treatment = String(formData.get("treatment") || "").trim();
      const notes = String(formData.get("message") || "").trim();
      const company = String(formData.get("company_field") || "").trim();

      const validationError = validateContactForm({
        name,
        email,
        treatment,
        notes,
        company_field: company,
      });
      if (validationError) {
        setFormState({ status: "error", message: validationError });
        return;
      }

      console.log("Form submitted:", { name, email, treatment, notes: notes.substring(0, 20) });

      setFormState({ status: "sending", message: "" });

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, treatment, notes, company_field: company }),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          const errorMessage =
            (typeof data?.error === "string" ? data.error : null) ||
            `Server error (${response.status}). Please try again.`;
          console.error("Contact form error:", errorMessage, data);
          throw new Error(errorMessage);
        }

        setFormState({ status: "success", message: "Thanks! We will reach out shortly." });
        form.reset();
      } catch (error) {
        console.error("Contact form submission failed:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        setFormState({
          status: "error",
          message: `Error: ${errorMessage}. Please call ${contactPhone} or email ${contactEmail}.`,
        });
      }
    },
    [contactPhone, contactEmail]
  );

  return {
    formState,
    handleContactSubmit,
    closeBookingSuccessPopup,
    closeBookingErrorPopup,
  };
}
