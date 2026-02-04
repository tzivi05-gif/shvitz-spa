"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import ContactForm, { type ContactDetail } from "../components/ContactForm";
import Gallery, { type GalleryItem } from "../components/Gallery";
import Hero from "../components/Hero";
import Pricing, { type Tier } from "../components/Pricing";

// -------------------- Data --------------------
const services = [
  { title: "Dry Sauna", description: "Feel tension melt away in our classic dry sauna, designed for detox, circulation, and deep relaxation." },
  { title: "Steam Room", description: "Let aromatic steam cleanse your body and open your breath." },
  { title: "Cold Plunge", description: "Reset your system with invigorating cold immersion therapy." },
  { title: "Jacuzzi", description: "Soak in warmth and let stress dissolve." },
  { title: "Lounge", description: "Unwind in a refined, comfortable space between sessions." },
  { title: "Private Rooms", description: "Discreet, peaceful spaces for individual or small group experiences." },
];

const gallery: GalleryItem[] = [
  { src: "/images/shvitz-calm-1.jpg", alt: "Hydrotherapy tub with warm light." },
  { src: "/images/shvitz-calm-2.jpg", alt: "Relaxation lounge with soft lighting." },
  { src: "/images/shvitz-calm-3.jpg", alt: "Stone-lined spa entry with cool glow." },
  { src: "/images/shvitz-calm-4.jpg", alt: "Quiet recovery room with massage chairs." },
];

const extraGallery: GalleryItem[] = [
  { src: "/images/shvitz-07.jpg", alt: "Fresh towel stacks by the changing area.", modalClass: "scale-[1.04]" },
  { src: "/images/shvitz-08.jpg", alt: "Refreshment bar with coffee and snacks.", modalClass: "scale-[1.04]" },
  { src: "/images/shvitz-09.jpg", alt: "Sauna heater with warm cedar seating.", modalClass: "scale-[1.04]" },
  { src: "/images/shvitz-10.jpg", alt: "Cold plunge entry with marble walls.", modalClass: "scale-[1.04]" },
];

const tiers: Tier[] = [
  { name: "Drop-in sessions", detail: "Single visits designed to fit your schedule.", items: ["Flexible access", "Ideal for first-time visits", "Easy to book"] },
  { name: "Multi-visit packages", detail: "Save when you visit more often.", items: ["Bundle options", "Perfect for regular recovery", "Shareable"] },
  { name: "Monthly memberships", detail: "Consistent wellness and member perks.", items: ["Best value", "Priority availability", "Built-in ritual"] },
];

const contactEmail = "hello@theshvitz.com";
const contactPhone = "845-594-9120";
const contactLocation = "10 Sands Point Rd, Monsey, NY";

const contactDetails: ContactDetail[] = [
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

// -------------------- Component --------------------
export default function Home() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [showGiveaway, setShowGiveaway] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const isModalOpen = showGiveaway;

  // -------------------- Gallery / Giveaway Modals --------------------
  useEffect(() => {
    if (selectedImage) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") setSelectedImage(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedImage]);

  useEffect(() => {
    document.body.classList.toggle("modal-open", isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    const storageKey = "shvitz-giveaway-dismissed";
    try {
      if (typeof window !== "undefined" && !window.localStorage.getItem(storageKey)) {
        const timer = window.setTimeout(() => setShowGiveaway(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, []);

  const handleGiveawayClose = () => {
    setShowGiveaway(false);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("shvitz-giveaway-dismissed", "true");
      } catch {}
    }
  };

  /** When modal is open, body has overflow:hidden so anchor scroll breaks. Close modal first, then scroll. */
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!showGiveaway || !href.startsWith("#")) return;
      e.preventDefault();
      handleGiveawayClose();
      const id = href.slice(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) {
            window.history.pushState(null, "", href);
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      });
    },
    [showGiveaway]
  );

  // -------------------- Contact Form --------------------
  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const treatment = String(formData.get("treatment") || "").trim();
    const notes = String(formData.get("message") || "").trim();
    const company = String(formData.get("company_field") || "").trim();

    setFormStatus("sending");
    setFormMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, treatment, notes, company_field: company }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setFormStatus("success");
      setFormMessage("Thanks! We will reach out shortly.");
      event.currentTarget.reset();
    } catch {
      setFormStatus("error");
      setFormMessage(`We could not send that right now. Please call ${contactPhone} or email ${contactEmail}.`);
    }
  };

  // -------------------- Displayed Gallery --------------------
  const contactPhoneDial = contactPhone.replace(/[^0-9+]/g, "");
  const whatsappLink = `https://wa.me/${contactPhoneDial.replace("+", "")}`;
  const handleSelectImage = useCallback((image: GalleryItem) => {
    setSelectedImage(image);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // -------------------- JSX --------------------
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="bg-[#F8F1E9] text-[#2B211C]">
      <span id="top" className="block h-0 w-0" />

      {/* Header */}
      <header className="site-header sticky top-0 z-40 border-b border-accent-soft bg-[#F8F1E9]/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <a
            className="text-sm font-semibold tracking-[0.18em] text-accent hover-text-accent"
            href="#top"
          >
            THE SHVITZ
          </a>
          <nav aria-label="Primary" className="nav-pill hidden items-center gap-8 rounded-full border border-accent-soft bg-[#F4EFE7] px-6 py-3 text-xs uppercase tracking-[0.14em] text-[#6F6056] shadow-[0_10px_30px_rgba(43,33,28,0.08)] lg:flex">
            {["top", "about", "services", "experience", "pricing"].map((id) => (
              <a key={id} className="hover-text-accent" href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {id === "top" ? "Home" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              className="button-primary hidden text-xs uppercase tracking-[0.14em] lg:inline-flex"
              href="#contact"
            >
              Contact us
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-accent-soft bg-[#F4EFE7] text-[#6F6056] hover:text-accent lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile app-style overlay + drawer — only in DOM when open so hamburger is never blocked */}
      {menuOpen && (
      <div className="fixed inset-0 z-50 lg:hidden" aria-hidden={false}>
        <button
          type="button"
          className="absolute inset-0 bg-black/40 opacity-100 transition-opacity duration-200"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />
        <aside
          className="fixed top-0 right-0 z-50 flex h-full w-[min(85%,280px)] flex-col border-l border-accent-soft bg-[#F8F1E9] translate-x-0 transition-transform duration-200 ease-out"
          style={{ boxShadow: "-8px 0 24px rgba(43,33,28,0.12)" }}
        >
          <div className="flex items-center justify-between border-b border-accent-soft px-6 py-5">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Menu</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-soft bg-[#F4EFE7] text-[#6F6056] hover:text-accent"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-0 overflow-auto px-6 py-6">
            {["top", "about", "services", "experience", "pricing"].map((id) => (
              <a
                key={id}
                className="border-b border-accent-soft py-4 text-sm font-medium uppercase tracking-[0.14em] text-[#6F6056] hover:text-accent"
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
              >
                {id === "top" ? "Home" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
            <a
              className="button-primary mt-6 inline-flex justify-center text-xs uppercase tracking-[0.14em]"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact us
            </a>
          </nav>
        </aside>
      </div>
      )}

      {/* Main Content */}
      <main>
        {selectedImage && (
          <section className="section-block pb-0">
            <div className="section-shell mx-auto w-full max-w-6xl">
              <div className="surface-card relative overflow-hidden rounded-[2.5rem] border border-accent-soft bg-white/80 p-4 shadow-[0_20px_55px_rgba(53,66,77,0.12)] sm:p-6">
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute right-4 top-4 z-10 rounded-full border border-accent bg-white px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#2B211C] hover-border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Close
                </button>
                <div className="overflow-hidden rounded-[2rem]">
                  <Image
                    key={selectedImage.src}
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    width={1600}
                    height={1000}
                    className="h-[50vh] w-full object-cover sm:h-[60vh]"
                    sizes="100vw"
                    priority
                  />
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.14em] text-slate-500">
                  {selectedImage.alt}
                </p>
              </div>
            </div>
          </section>
        )}
        <div className="water-background">
          <Hero
            showGiveaway={showGiveaway}
            heroImage={gallery[0]}
          />
        </div>
        <section id="about" className="section-block">
          <div className="section-shell mx-auto w-full max-w-6xl">
            <p className="section-label">About</p>
            <h2 className="section-title mt-4 text-slate-600">Unwind in Stillness</h2>
            <div className="mt-10 grid gap-6 text-base text-slate-500 lg:grid-cols-2">
              <p className="section-body">
                Embrace the quiet luxury of Shvitz, a space designed for deep relaxation and renewal. Every detail is intentional, from the warmth of our saunas to the peaceful flow of our interiors.
              </p>
              <p className="section-body">
                Whether you arrive alone or with friends, you’ll find a calm refuge where the noise of daily life fades and balance returns naturally.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="section-block">
          <div className="section-shell mx-auto w-full max-w-6xl">
            <p className="section-label">Amenities</p>
            <p className="section-body section-subtitle max-w-md mt-2">A full circuit of heat, cold, and calm for restoration.</p>
            <div className="section-grid mt-12 grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <div key={service.title} className="surface-card rounded-3xl border border-accent-soft p-6">
                  <h3 className="text-lg font-semibold text-slate-600">{service.title}</h3>
                  <p className="mt-3 text-sm text-slate-500">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Gallery
          gallery={gallery}
          extraGallery={extraGallery}
          onSelectImage={handleSelectImage}
        />
        <Pricing tiers={tiers} />
        <ContactForm
          contactDetails={contactDetails}
          contactPhone={contactPhone}
          contactEmail={contactEmail}
          formStatus={formStatus}
          formMessage={formMessage}
          onSubmit={handleContactSubmit}
        />
      </main>

      {/* Back to Top - at bottom only */}
      <div className="flex justify-center border-t border-accent-soft py-4 md:py-6">
        <a className="button-secondary inline-flex items-center justify-center text-xs uppercase tracking-[0.14em]" href="#top">
          Back to top
        </a>
      </div>

      {/* Footer */}
      <footer className="border-t border-accent-soft">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-3 md:flex-row md:items-center md:justify-between md:gap-4 md:py-2">
          <div>
            <p className="text-sm font-semibold text-slate-600">The Shvitz</p>
            <p className="mt-0.5 text-xs text-slate-500">Heat, cold, and calm for restoration and connection.</p>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[0.7rem] text-slate-500">
            {["about", "services", "experience", "pricing", "contact"].map((id) => (
              <a key={id} className="hover-text-accent" href={`#${id}`}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>
          <p className="text-[0.68rem] text-slate-500">© 2026 The Shvitz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}