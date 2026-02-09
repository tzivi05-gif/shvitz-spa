"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import ContactForm, { type ContactDetail } from "../components/ContactForm";
import FoodMenu from "../components/FoodMenu";
import Gallery, { type GalleryItem } from "../components/Gallery";
import Hero from "../components/Hero";
import Pricing from "../components/Pricing";
import WhatsAppWidget from "../components/WhatsAppWidget";

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
  { src: "/images/hot-tub-hero.png", alt: "Cozy wood-paneled spa atmosphere with warm lights." },
  { src: "/images/shvitz-calm-2.jpg", alt: "Relaxation lounge with soft lighting." },
  { src: "/images/stone-entry-glow.png", alt: "Stone-lined spa entry with soft glow.", cropTopLeft: true },
  { src: "/images/shvitz-calm-4.jpg", alt: "Quiet recovery room with massage chairs." },
];

const extraGallery: GalleryItem[] = [
  { src: "/images/shvitz-07.jpg", alt: "Fresh towel stacks by the changing area.", modalClass: "scale-[1.04]" },
  { src: "/images/shvitz-08.jpg", alt: "Refreshment bar with coffee and snacks.", modalClass: "scale-[1.04]" },
  { src: "/images/shvitz-09.png", alt: "Sauna heater with warm cedar seating.", modalClass: "scale-[1.04]" },
  { src: "/images/shvitz-10.jpg", alt: "Cold plunge entry with marble walls.", modalClass: "scale-[1.04]" },
];

const pricing = {
  publicEntry: { cashZelle: 60, credit: 65 },
  fridayEntry: { cashZelle: 50, credit: 55 },
  privateRates: { couple: 200, group38: 250, additionalPerPerson: 25 },
  rules: [
    { title: "Dressing area", text: "Please leave the dressing area neat to allow others space as well. Please put your stuff in a locker, not on the benches." },
    { title: "Neighbors", text: "Please respect our neighbors. When outdoors at night please stay silent." },
    { title: "Parking", text: "Please park in a way to minimize traffic. Your continued efforts will allow us to stay open." },
  ],
};

const foodMenuItems = [
  {
    name: "All week: Chummus Plates",
    description: "Comes with toasted pita.",
    image: "/images/menu/chummus.png",
    variations: [
      { label: "Regular", price: 15 },
      { label: "Shwarma", price: 20 },
      { label: "Liver", price: 20 },
      { label: "Pulled Beef", price: 25 },
    ],
  },
  { 
    name: "Soup of the day", 
    price: 10,
    image: "/images/menu/soup.png",
  },
  {
    name: "Grilled Steak",
    price: 75,
    description: "Comes with side of fries, or mashed potatoes.",
    image: "/images/menu/steak.png",
  },
  { 
    name: "Motzei Shabbos: 12\" Sourdough Pizza", 
    price: 25,
    image: "/images/menu/pizza.png",
  },
  { 
    name: "Thursday night: Chulent", 
    price: 10,
    image: "/images/menu/chulent.png",
  },
];

const foodMenuDrinks = [
  { label: "Cans of soda", price: 2 },
  { label: "Bottled soda", price: 3 },
  { label: "Beer", price: 3 },
  { label: "Fruit Sorbet", price: 5 },
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
    event.stopPropagation();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const treatment = String(formData.get("treatment") || "").trim();
    const notes = String(formData.get("message") || "").trim();
    const company = String(formData.get("company_field") || "").trim();

    console.log("Form submitted:", { name, email, treatment, notes: notes.substring(0, 20) });

    setFormStatus("sending");
    setFormMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, treatment, notes, company_field: company }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMessage = data?.error || `Server error (${response.status}). Please try again.`;
        console.error("Contact form error:", errorMessage, data);
        throw new Error(errorMessage);
      }

      setFormStatus("success");
      setFormMessage("Thanks! We will reach out shortly.");
      form.reset();
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setFormStatus("error");
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setFormMessage(`Error: ${errorMessage}. Please call ${contactPhone} or email ${contactEmail}.`);
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

  // -------------------- Mobile menu — fixed overlay via portal so it’s never clipped --------------------
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenedAtRef = useRef<number>(0);
  const menuPanelRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Lock body scroll only for gallery lightbox, mobile menu, or booking popups
  const isModalOpen = !!selectedImage || menuOpen || formStatus === "success" || formStatus === "error";
  useEffect(() => {
    document.body.classList.toggle("modal-open", isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  const closeBookingSuccessPopup = useCallback(() => {
    setFormStatus("idle");
    setFormMessage("");
  }, []);

  const closeBookingErrorPopup = useCallback(() => {
    setFormStatus("idle");
    setFormMessage("");
  }, []);

  useEffect(() => {
    if (formStatus !== "success" && formStatus !== "error") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeBookingSuccessPopup();
        closeBookingErrorPopup();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [formStatus, closeBookingSuccessPopup, closeBookingErrorPopup]);

  // Native click listener on hamburger so menu opens even if React synthetic events don't fire
  useEffect(() => {
    const btn = menuButtonRef.current;
    if (!btn) return;
    const handleClick = () => {
      setMenuOpen((prev) => {
        if (!prev) menuOpenedAtRef.current = Date.now();
        return !prev;
      });
    };
    btn.addEventListener("click", handleClick);
    return () => btn.removeEventListener("click", handleClick);
  }, []);

  // Only close from backdrop if menu has been open long enough (stops opening click from closing)
  const handleBackdropClick = useCallback(() => {
    if (Date.now() - menuOpenedAtRef.current < 150) return;
    closeMenu();
  }, [closeMenu]);

  const mobileMenuLinks = [
    { id: "top", label: "Home" },
    { id: "contact", label: "Contact" },
    { id: "pricing", label: "Pricing" },
    { id: "experience", label: "Experience" },
    { id: "menu", label: "Menu" },
  ];

  return (
    <div className="bg-[#F8F1E9] text-[#2B211C]">
      <span id="top" className="block h-0 w-0" />

      {/* Header — z-[200] so it stays above menu overlay and any modals; hamburger/close always clickable */}
      <header className="site-header sticky top-0 z-[200] border-b border-accent-soft bg-[#F8F1E9] backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <a
            className="text-sm font-semibold tracking-[0.18em] text-accent hover-text-accent"
            href="#top"
          >
            THE SHVITZ
          </a>
          <nav aria-label="Primary" className="nav-pill hidden items-center gap-8 rounded-full border border-accent-soft bg-[#F4EFE7] px-6 py-3 text-xs uppercase tracking-[0.14em] text-[#6F6056] shadow-[0_10px_30px_rgba(43,33,28,0.08)] lg:flex">
            {["top", "about", "services", "experience", "pricing", "menu"].map((id) => (
              <a key={id} className="hover-text-accent" href={`#${id}`}>
                {id === "top" ? "Home" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>
          <div className="relative flex items-center gap-3">
            <a
              className="button-primary hidden text-xs uppercase tracking-[0.14em] lg:inline-flex"
              href="#contact"
            >
              Contact us
            </a>
            {/* Mobile menu — button toggles; overlay shows menu and backdrop */}
            <div className="relative z-[120] block lg:hidden">
              <button
                ref={menuButtonRef}
                type="button"
                aria-expanded={menuOpen}
                aria-haspopup="true"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="relative z-[120] flex h-10 w-10 flex-shrink-0 cursor-pointer touch-manipulation select-none items-center justify-center rounded-full border border-accent-soft bg-[#F4EFE7] text-[#6F6056] hover:text-accent active:bg-[#EBE4DC]"
              >
                <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay — portal so it’s never clipped; backdrop below header (z-[90]) */}
      {menuOpen && (
        <div
            className="fixed inset-0 z-[150] lg:hidden"
            aria-hidden="false"
          >
            <div
              className="absolute inset-0 bg-[#2B211C]/25"
              onClick={handleBackdropClick}
              aria-hidden="true"
            />
            <div className="absolute right-4 top-5 z-20 flex flex-col items-end">
              <nav
                ref={menuPanelRef}
                aria-label="Mobile menu"
                className="surface-card relative min-w-[200px] rounded-2xl border border-accent-soft pt-14 pb-2 shadow-[0_14px_40px_rgba(43,33,28,0.18)]"
                onClick={(e) => e.stopPropagation()}
              >
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-accent-soft bg-[#F4EFE7] text-[#6F6056] hover:text-accent active:bg-[#EBE4DC]"
              >
                <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              {mobileMenuLinks.map(({ id, label }) => (
                <a
                  key={label}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    closeMenu();
                    // Small delay to ensure menu closes before scroll
                    setTimeout(() => {
                      const element = document.getElementById(id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                        window.history.pushState(null, "", `#${id}`);
                      }
                    }, 100);
                  }}
                  className="block px-5 py-3 text-sm font-medium uppercase tracking-[0.14em] text-[#6F6056] hover:bg-[#F4EFE7] hover:text-accent transition-colors"
                >
                  {label}
                </a>
              ))}
              </nav>
            </div>
          </div>
      )}

      {/* Booking success popup */}
      {formStatus === "success" && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[#2B211C]/55 px-6 py-10"
          role="dialog"
          aria-modal="true"
          aria-label="Booking request sent"
          onClick={closeBookingSuccessPopup}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-accent-soft bg-[#FDF7F1] p-8 shadow-[0_30px_90px_rgba(25,18,14,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeBookingSuccessPopup}
              className="absolute right-5 top-5 rounded-full border border-accent bg-white px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#2B211C] hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label="Close popup"
            >
              Close
            </button>
            <p className="text-xs uppercase tracking-[0.24em] text-accent">The Shvitz</p>
            <p className="mt-4 text-xl font-semibold text-[#2B211C] md:text-2xl">
              Thanks! We will reach out shortly.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              We received your request and will get back to you soon.
            </p>
          </div>
        </div>
      )}

      {/* Booking error popup */}
      {formStatus === "error" && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[#2B211C]/55 px-6 py-10"
          role="dialog"
          aria-modal="true"
          aria-label="Booking request error"
          onClick={closeBookingErrorPopup}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-red-200 bg-[#FDF7F1] p-8 shadow-[0_30px_90px_rgba(25,18,14,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeBookingErrorPopup}
              className="absolute right-5 top-5 rounded-full border border-accent bg-white px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#2B211C] hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label="Close popup"
            >
              Close
            </button>
            <p className="text-xs uppercase tracking-[0.24em] text-accent">The Shvitz</p>
            <p className="mt-4 text-lg font-semibold text-red-700 md:text-xl">
              Unable to send your request
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {formMessage}
            </p>
          </div>
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
                  {selectedImage.cropTopLeft ? (
                    <div className="relative h-[50vh] w-full overflow-hidden sm:h-[60vh]">
                      <Image
                        key={selectedImage.src}
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        width={1600}
                        height={1000}
                        className="absolute left-0 top-0 object-cover object-left-top"
                        style={{ width: "320%", height: "320%", objectFit: "cover", objectPosition: "0 0" }}
                        sizes="100vw"
                        priority
                      />
                    </div>
                  ) : (
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
                  )}
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.14em] text-slate-500">
                  {selectedImage.alt}
                </p>
              </div>
            </div>
          </section>
        )}
        <div className="water-background">
          <Hero heroImage={gallery[0]} />
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
        <Pricing
          publicEntry={pricing.publicEntry}
          fridayEntry={pricing.fridayEntry}
          privateRates={pricing.privateRates}
          rules={pricing.rules}
        />
        <FoodMenu
          items={foodMenuItems}
          drinks={foodMenuDrinks}
          drinksImage="/images/menu/drinks.png"
          chefSignature="By Chef Shloimy Friedlander"
          contactAddress="10 Sands Point Rd, Monsey, NY 10952"
          contactPhone={contactPhone}
        />
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
      <div className="flex justify-center py-4 md:py-6">
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
            {["about", "services", "experience", "pricing", "menu", "contact"].map((id) => (
              <a key={id} className="hover-text-accent" href={`#${id}`}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>
          <p className="text-[0.68rem] text-slate-500">© 2026 The Shvitz. All rights reserved.</p>
        </div>
      </footer>

      {/* WhatsApp Widget */}
      <WhatsAppWidget phoneNumber={contactPhone} />
    </div>
  );
}