import type { FormEvent, ReactNode } from "react";

export type ContactDetail = {
  label: string;
  value: string;
  href?: string;
  icon: ReactNode;
};

type ContactFormProps = {
  contactDetails: ContactDetail[];
  contactPhone: string;
  contactEmail: string;
  formStatus: "idle" | "sending" | "success" | "error";
  formMessage: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function ContactForm({
  contactDetails,
  contactPhone,
  contactEmail,
  formStatus,
  formMessage,
  onSubmit,
}: ContactFormProps) {
  return (
    <section id="contact" className="section-block">
      <div className="section-shell mx-auto w-full max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="section-label">
              Contact
            </p>
            <p className="section-body mt-3 text-base">
              Have questions or want to book a group? We’d love to hear
              from you.
            </p>
            <div className="surface-card mt-6 rounded-3xl border border-accent-soft p-6">
              <div className="grid gap-6 md:grid-cols-3">
                {contactDetails.map((stat) => (
                  <div key={stat.label} className="grid gap-2">
                    <div className="flex min-h-[1.2rem] items-center gap-2 text-[0.58rem] uppercase tracking-[0.24em] text-accent">
                      <span className="rounded-full border border-accent-soft bg-accent-soft p-1 text-accent">
                        {stat.icon}
                      </span>
                      {stat.label}
                    </div>
                    {stat.href ? (
                      <a
                        className="text-lg font-medium leading-snug text-slate-900 hover-text-accent"
                        href={stat.href}
                        target={stat.href.startsWith("http") ? "_blank" : undefined}
                        rel={stat.href.startsWith("http") ? "noreferrer" : undefined}
                      >
                        {stat.value}
                      </a>
                    ) : (
                      <p className="text-lg font-medium leading-snug text-slate-900">
                        {stat.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="surface-card mt-6 rounded-3xl border border-accent-soft p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-[0.58rem] uppercase tracking-[0.24em] text-accent">
                    Hours
                  </p>
                  <p className="mt-3 text-sm text-slate-900">
                    Sun–Thu: 8am–10pm
                  </p>
                  <p className="mt-1 text-sm text-slate-900">Fri: 8am–2pm</p>
                  <p className="mt-1 text-sm text-slate-900">Sat: Closed</p>
                </div>
                <div>
                  <p className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-[0.58rem] uppercase tracking-[0.24em] text-accent">
                    Parking
                  </p>
                  <p className="mt-3 text-sm text-slate-900">
                    On-site and street parking available.
                  </p>
                </div>
              </div>
            </div>
            <div className="surface-card mt-6 rounded-3xl border border-accent-soft p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-600">
                  The Shvitz experience
                </p>
                <span className="rounded-full bg-accent-soft px-3 py-1 text-[0.6rem] uppercase tracking-[0.22em] text-accent">
                  Welcome
                </span>
              </div>
              <div className="mt-4 grid gap-3">
                {[
                  { time: "Shvitz sauna", status: "Deep heat" },
                  { time: "Cold plunge", status: "Full reset" },
                  { time: "Steam room", status: "Cleanse" },
                  { time: "Calm spaces", status: "Unwind" },
                ].map((slot) => (
                  <div
                    key={slot.time}
                    className="flex items-center justify-between rounded-2xl border border-accent-soft bg-white/90 px-4 py-3"
                  >
                    <span className="text-sm text-slate-900">
                      {slot.time}
                    </span>
                    <span className="text-xs text-slate-500">
                      {slot.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <form
            className="surface-card rounded-3xl border border-accent-soft p-7"
            aria-label="Request availability form"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSubmit(e);
            }}
          >
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="company-field">Company</label>
              <input
                id="company-field"
                name="company_field"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="space-y-4">
              <div>
                <label
                  className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="field-base mt-2 w-full rounded-2xl border border-accent-soft bg-[#FFFBF7] px-4 py-3 text-sm text-[#2B211C] outline-none focus:border-accent"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label
                  className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="field-base mt-2 w-full rounded-2xl border border-accent-soft bg-[#FFFBF7] px-4 py-3 text-sm text-[#2B211C] outline-none focus:border-accent"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label
                  className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500"
                  htmlFor="treatment"
                >
                  Preferred treatment
                </label>
                <select
                  id="treatment"
                  name="treatment"
                  required
                  autoComplete="off"
                  defaultValue=""
                  className="field-base select-field mt-2 w-full rounded-2xl border border-accent-soft bg-[#FFFBF7] px-4 py-3 text-sm text-[#2B211C] outline-none focus:border-accent"
                >
                  <option value="" disabled />
                  <option>Day pass</option>
                  <option>Group booking</option>
                  <option>Membership</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div>
                <label
                  className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500"
                  htmlFor="message"
                >
                  Notes
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  autoComplete="off"
                  className="field-base mt-2 w-full rounded-2xl border border-accent-soft bg-[#FFFBF7] px-4 py-3 text-sm text-[#2B211C] outline-none focus:border-accent"
                  placeholder="Share any preferences or focus areas."
                />
              </div>
            </div>
            <button
              className="button-primary mt-6 w-full text-sm"
              type="submit"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending"
                ? "Sending..."
                : formStatus === "success"
                ? "Request sent"
                : "Request availability"}
            </button>
            {formMessage && (
              <p
                className={`mt-4 text-xs ${
                  formStatus === "error"
                    ? "text-red-600 font-medium"
                    : formStatus === "success"
                    ? "text-green-600 font-medium"
                    : "text-slate-500"
                }`}
                role="status"
                aria-live="polite"
              >
                {formMessage}
              </p>
            )}
            <p className="mt-4 text-xs text-slate-500">
              Prefer to call? Dial {contactPhone}. Email {contactEmail}.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
