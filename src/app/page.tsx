"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import ContactForm, { type ContactDetail } from "../components/ContactForm";
import Gallery, { type GalleryItem } from "../components/Gallery";
import GiveawayModal from "../components/GiveawayModal";
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
  { src: "/images/shvitz-01.jpg", alt: "Warm stone sauna with soft glow.", modalClass: "scale-[1.04]" },
  { src: "/images/shvitz-02.jpg", alt: "Spa corridor with ambient lighting.", modalClass: "scale-[1.04]" },
  { src: "/images/shvitz-05.jpg", alt: "Relaxation seating with textured finishes.", modalClass: "scale-[1.04]" },
  { src: "/images/shvitz-06.jpg", alt: "Quiet lounge with warm tones.", modalClass: "scale-[1.04]" },
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
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showGiveaway, setShowGiveaway] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isModalOpen = Boolean(selectedImage) || showGiveaway;

  // -------------------- Scroll Handling --------------------
  const scrollToSection = useCallback((targetId: string) => {
    if (typeof document === "undefined") return;

    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.getElementById(targetId);
    if (target) {
      const headerOffset = 92; // sticky header height
      const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    scrollToSection(targetId);
  };

  // -------------------- Gallery / Giveaway Modals --------------------
  useEffect(() => {
    if (selectedImage) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") setSelectedImage(null);
        if (event.key === "Tab") {
          event.preventDefault();
          closeButtonRef.current?.focus();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      closeButtonRef.current?.focus();
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
  const displayedGallery = showAllPhotos ? [...gallery, ...extraGallery] : gallery;
  const contactPhoneDial = contactPhone.replace(/[^0-9+]/g, "");
  const whatsappLink = `https://wa.me/${contactPhoneDial.replace("+", "")}`;

  // -------------------- JSX --------------------
  return (
    <div className="water-background bg-[#F8F1E9] text-[#2B211C]">
      <span id="top" className="block h-0 w-0" />

      {/* Header */}
      <header className="site-header sticky top-0 z-40 border-b border-accent-soft bg-[#F8F1E9]/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <div className="hidden sm:block">
            <a
              className="text-sm font-semibold tracking-[0.18em] text-accent hover-text-accent"
              href="#top"
              onClick={(e) => handleNavClick(e, "top")}
            >
              THE SHVITZ
            </a>
          </div>
          <nav aria-label="Primary" className="nav-pill flex items-center gap-8 rounded-full border border-accent-soft bg-[#F4EFE7] px-6 py-3 text-xs uppercase tracking-[0.14em] text-[#6F6056] shadow-[0_10px_30px_rgba(43,33,28,0.08)]">
            {["top","about","services","experience","pricing"].map((id) => (
              <a key={id} className="hover-text-accent" href={`#${id}`} onClick={(e) => handleNavClick(e, id)}>
                {id === "top" ? "Home" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>
          <a
            className="button-primary text-xs uppercase tracking-[0.14em]"
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
          >
            Contact us
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Hero showGiveaway={showGiveaway} heroImage={gallery[0]} onNavClick={handleNavClick} />
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
          displayedGallery={displayedGallery}
          showAllPhotos={showAllPhotos}
          onToggleShowAll={() => setShowAllPhotos((prev) => !prev)}
          onSelectImage={setSelectedImage}
        />

        {/* Selected Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Expanded gallery image" onClick={() => setSelectedImage(null)}>
            <div className="relative h-full w-full max-w-none bg-transparent px-6 py-10 sm:px-10" onClick={(e) => e.stopPropagation()}>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute right-6 top-6 rounded-full border border-accent bg-white px-3 py-1 text-sm text-[#2B211C] hover-border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Close
              </button>
              <div className="flex h-full items-center justify-center">
                <div className="overflow-hidden rounded-3xl shadow-[0_18px_50px_rgba(14,20,25,0.35)]">
                  <Image
                    key={selectedImage.src}
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    width={1200}
                    height={900}
                    className={`max-h-[85vh] w-auto max-w-[90vw] object-contain ${selectedImage.modalClass ?? ""}`}
                    sizes="90vw"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <GiveawayModal show={showGiveaway} contactPhone={contactPhone} contactLocation={contactLocation} whatsappLink={whatsappLink} onClose={handleGiveawayClose} onNavClick={handleNavClick} />
        <Pricing tiers={tiers} onNavClick={handleNavClick} />
        <ContactForm contactDetails={contactDetails} contactPhone={contactPhone} contactEmail={contactEmail} formStatus={formStatus} formMessage={formMessage} onSubmit={handleContactSubmit} onNavClick={handleNavClick} />
      </main>

      {/* Back to Top */}
      <a className="button-secondary fixed bottom-4 left-1/2 z-50 inline-flex -translate-x-1/2 items-center justify-center text-xs uppercase tracking-[0.14em] md:bottom-6" href="#top" onClick={(e) => handleNavClick(e, "top")}>
        Back to top
      </a>

      {/* Footer */}
      <footer className="border-t border-accent-soft">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-600">The Shvitz</p>
            <p className="mt-1 text-xs text-slate-500">Heat, cold, and calm for restoration and connection.</p>
          </div>
          <div className="flex flex-wrap gap-2 text-[0.7rem] text-slate-500">
            {["about","services","experience","pricing","contact"].map((id) => (
              <a key={id} className="hover-text-accent" href={`#${id}`} onClick={(e) => handleNavClick(e, id)}>{id.charAt(0).toUpperCase() + id.slice(1)}</a>
            ))}
          </div>
          <p className="text-[0.68rem] text-slate-500">© 2026 The Shvitz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}