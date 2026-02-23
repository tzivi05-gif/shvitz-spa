import type { ContactDetail } from "@/components/ContactForm";
import { contactLocation, contactPhone } from "./contact";

export const contactDetails: ContactDetail[] = [
  {
    label: "Location",
    value: contactLocation,
    href: "https://maps.google.com/?q=10%20Sands%20Point%20Rd%20Monsey%20NY",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
        <circle cx="12" cy="10" r="2.6" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: contactPhone,
    href: `tel:${contactPhone.replace(/[^0-9+]/g, "")}`,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4.5 5.5a2 2 0 0 1 2-2h2l1.5 4-2 1.2a12.5 12.5 0 0 0 6.8 6.8l1.2-2 4 1.5v2a2 2 0 0 1-2 2A15.5 15.5 0 0 1 4.5 5.5Z" />
      </svg>
    ),
  },
  {
    label: "Visits",
    value: "Individuals or groups",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M16 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z" />
        <path d="M8 12a2.6 2.6 0 1 0-2.6-2.6A2.6 2.6 0 0 0 8 12Z" />
        <path d="M20 19a4 4 0 0 0-8 0" />
        <path d="M12 19a5.2 5.2 0 0 0-9.4 0" />
      </svg>
    ),
  },
];
