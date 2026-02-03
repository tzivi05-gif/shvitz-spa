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

const services = [
  {
    title: "Dry Sauna",
    description:
      "Feel tension melt away in our classic dry sauna, designed for detox, circulation, and deep relaxation.",
  },
  {
    title: "Steam Room",
    description: "Let aromatic steam cleanse your body and open your breath.",
  },
  {
    title: "Cold Plunge",
    description:
      "Reset your system with invigorating cold immersion therapy.",
  },
  {
    title: "Jacuzzi",
    description: "Soak in warmth and let stress dissolve.",
  },
  {
    title: "Lounge",
    description:
      "Unwind in a refined, comfortable space between sessions.",
  },
  {
    title: "Private Rooms",
    description:
      "Discreet, peaceful spaces for individual or small group experiences.",
  },
];

const gallery: GalleryItem[] = [
  {
    src: "/images/shvitz-calm-1.jpg",
    alt: "Hydrotherapy tub with warm light.",
  },
  {
    src: "/images/shvitz-calm-2.jpg",
    alt: "Relaxation lounge with soft lighting.",
  },
  {
    src: "/images/shvitz-calm-3.jpg",
    alt: "Stone-lined spa entry with cool glow.",
  },
  {
    src: "/images/shvitz-calm-4.jpg",
    alt: "Quiet recovery room with massage chairs.",
  },
];

const extraGallery: GalleryItem[] = [
  {
    src: "/images/shvitz-01.jpg",
    alt: "Warm stone sauna with soft glow.",
    modalClass: "scale-[1.04]",
  },
  {
    src: "/images/shvitz-02.jpg",
    alt: "Spa corridor with ambient lighting.",
    modalClass: "scale-[1.04]",
  },
  {
    src: "/images/shvitz-05.jpg",
    alt: "Relaxation seating with textured finishes.",
    modalClass: "scale-[1.04]",
  },
  {
    src: "/images/shvitz-06.jpg",
    alt: "Quiet lounge with warm tones.",
    modalClass: "scale-[1.04]",
  },
];

const tiers: Tier[] = [
  {
    name: "Drop-in sessions",
    detail: "Single visits designed to fit your schedule.",
    items: ["Flexible access", "Ideal for first-time visits", "Easy to book"],
  },
  {
    name: "Multi-visit packages",
    detail: "Save when you visit more often.",
    items: ["Bundle options", "Perfect for regular recovery", "Shareable"],
  },
  {
    name: "Monthly memberships",
    detail: "Consistent wellness and member perks.",
    items: ["Best value", "Priority availability", "Built-in ritual"],
  },
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
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
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
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M4.5 5.5a2 2 0 0 1 2-2h2l1.5 4-2 1.2a12.5 12.5 0 0 0 6.8 6.8l1.2-2 4 1.5v2a2 2 0 0 1-2 2A15.5 15.5 0 0 1 4.5 5.5Z" />
      </svg>
    ),
  },
  {
    label: "Visits",
    value: "Individuals or groups",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M16 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z" />
        <path d="M8 12a2.6 2.6 0 1 0-2.6-2.6A2.6 2.6 0 0 0 8 12Z" />
        <path d="M20 19a4 4 0 0 0-8 0" />
        <path d="M12 19a5.2 5.2 0 0 0-9.4 0" />
      </svg>
    ),
  },
];

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTouchYRef = useRef<number | null>(null);
  const autoScrollTimeoutRef = useRef<number | null>(null);
  const isAutoScrollingRef = useRef(false);
  const [showGiveaway, setShowGiveaway] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const originalRelease = Element.prototype.releasePointerCapture;
    Element.prototype.releasePointerCapture = function (pointerId: number) {
      try {
        if (this.hasPointerCapture && !this.hasPointerCapture(pointerId)) {
          return;
        }
        return originalRelease.call(this, pointerId);
      } catch (error) {
        if (error instanceof DOMException && error.name === "NotFoundError") {
          return;
        }
        throw error;
      }
    };

    return () => {
      Element.prototype.releasePointerCapture = originalRelease;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const storageKey = "shvitz-giveaway-dismissed";
    try {
      if (window.localStorage.getItem(storageKey)) {
        return;
      }
    } catch {
      // Ignore storage access errors (private mode or disabled storage).
    }
    const timer = window.setTimeout(() => {
      setShowGiveaway(true);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedImage) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setSelectedImage(null);
        }
        if (event.key === "Tab") {
          event.preventDefault();
          closeButtonRef.current?.focus();
        }
      };

      document.body.classList.add("modal-open");
      window.addEventListener("keydown", handleKeyDown);
      closeButtonRef.current?.focus();
      return () => {
        document.body.classList.remove("modal-open");
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedImage]);

  const handleGiveawayClose = () => {
    setShowGiveaway(false);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("shvitz-giveaway-dismissed", "true");
      } catch {
        // Ignore storage access errors (private mode or disabled storage).
      }
    }
  };

  const contactPhoneDial = contactPhone.replace(/[^0-9+]/g, "");
  const whatsappLink = `https://wa.me/${contactPhoneDial.replace("+", "")}`;

  const scrollToTop = useCallback(() => {
    const scrollOptions: ScrollToOptions = { top: 0, left: 0, behavior: "smooth" };
    document.documentElement.scrollTo(scrollOptions);
    document.body.scrollTo(scrollOptions);
    window.scrollTo(scrollOptions);
  }, []);

  const handleScrollUpIntent = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window.scrollY <= 0 || isAutoScrollingRef.current) {
      return;
    }

    isAutoScrollingRef.current = true;
    scrollToTop();

    if (autoScrollTimeoutRef.current) {
      window.clearTimeout(autoScrollTimeoutRef.current);
    }

    autoScrollTimeoutRef.current = window.setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 600);
  }, [scrollToTop]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY < 0) {
        handleScrollUpIntent();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      lastTouchYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY;
      const lastY = lastTouchYRef.current;
      if (currentY !== undefined && lastY !== null && currentY > lastY) {
        handleScrollUpIntent();
      }
      lastTouchYRef.current = currentY ?? null;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      if (autoScrollTimeoutRef.current) {
        window.clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, [handleScrollUpIntent]);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    event.preventDefault();
    if (targetId === "top") {
      scrollToTop();
      return;
    }
    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const displayedGallery = showAllPhotos
    ? [...gallery, ...extraGallery]
    : gallery;

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
        body: JSON.stringify({
          name,
          email,
          treatment,
          notes,
          company_field: company,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const errorMessage =
          data?.error || "Something went wrong. Please try again.";
        throw new Error(errorMessage);
      }

      setFormStatus("success");
      setFormMessage("Thanks! We will reach out shortly.");
      event.currentTarget.reset();
    } catch (error) {
      setFormStatus("error");
      setFormMessage(
        `We could not send that right now. Please call ${contactPhone} or email ${contactEmail}.`
      );
    }
  };

  return (
    <div className="water-background bg-[#F8F1E9] text-[#2B211C]">
      <span id="top" className="block h-0 w-0" />
      <header className="site-header sticky top-0 z-40 border-b border-accent-soft bg-[#F8F1E9]/95 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <div className="hidden sm:block">
            <p className="text-sm font-semibold tracking-[0.18em] text-accent">
              THE SHVITZ
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center md:flex-none">
            <nav
              aria-label="Primary"
              className="nav-pill flex items-center gap-8 rounded-full border border-accent-soft bg-[#F4EFE7] px-6 py-3 text-xs uppercase tracking-[0.14em] text-[#6F6056] shadow-[0_10px_30px_rgba(43,33,28,0.08)]"
            >
              <a
                className="hover-text-accent"
                href="#about"
                onClick={(event) => handleNavClick(event, "about")}
              >
                About
              </a>
              <a
                className="hover-text-accent"
                href="#services"
                onClick={(event) => handleNavClick(event, "services")}
              >
                Services
              </a>
              <a
                className="hover-text-accent"
                href="#experience"
                onClick={(event) => handleNavClick(event, "experience")}
              >
                Experience
              </a>
              <a
                className="hover-text-accent"
                href="#pricing"
                onClick={(event) => handleNavClick(event, "pricing")}
              >
                Visit
              </a>
            </nav>
          </div>
          <a
            className="button-primary text-xs uppercase tracking-[0.14em]"
            href="#contact"
            onClick={(event) => handleNavClick(event, "contact")}
          >
            Contact us
          </a>
        </div>
      </header>

      <main>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0"
        >
          <defs>
            <filter id="hero-sharpen">
              <feConvolveMatrix
                order="3"
                kernelMatrix="-0.5 -0.5 -0.5 -0.5 6 -0.5 -0.5 -0.5 -0.5"
              />
            </filter>
          </defs>
        </svg>
        <Hero
          showGiveaway={showGiveaway}
          heroImage={gallery[0]}
          onNavClick={handleNavClick}
        />

        <section id="about" className="section-block">
          <div className="section-shell mx-auto w-full max-w-6xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="section-label">
                  About
                </p>
                <h2 className="section-title mt-4 text-slate-600">
                  Unwind in Stillness
                </h2>
              </div>
            </div>
            <div className="mt-10 grid gap-6 text-base text-slate-500 lg:grid-cols-2">
              <p className="section-body">
                Embrace the quiet luxury of Shvitz, a space designed for deep
                relaxation and renewal. Every detail is intentional, from the
                warmth of our saunas to the peaceful flow of our interiors.
              </p>
              <p className="section-body">
                Whether you arrive alone or with friends, you’ll find a calm
                refuge where the noise of daily life fades and balance returns
                naturally.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="section-block">
          <div className="section-shell mx-auto w-full max-w-6xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="section-label">
                  Amenities
                </p>
              </div>
              <p className="section-body section-subtitle max-w-md">
                A full circuit of heat, cold, and calm for restoration.
              </p>
            </div>
            <div className="section-grid mt-12 grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="surface-card rounded-3xl border border-accent-soft p-6"
                >
                  <h3 className="text-lg font-semibold text-slate-600">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-500">
                    {service.description}
                  </p>
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

        {selectedImage ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Expanded gallery image"
          >
            <div
              className="relative h-full w-full max-w-none bg-transparent px-6 py-10 sm:px-10"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                ref={closeButtonRef}
                onClick={() => setSelectedImage(null)}
                className="absolute right-6 top-6 rounded-full border border-accent bg-white px-3 py-1 text-sm text-[#2B211C] hover-border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-label="Close image"
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
                    className={`max-h-[85vh] w-auto max-w-[90vw] object-contain ${
                      selectedImage.modalClass ?? ""
                    }`}
                    sizes="90vw"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <GiveawayModal
          show={showGiveaway}
          contactPhone={contactPhone}
          contactLocation={contactLocation}
          whatsappLink={whatsappLink}
          onClose={handleGiveawayClose}
          onNavClick={handleNavClick}
        />

        <Pricing tiers={tiers} onNavClick={handleNavClick} />

        <ContactForm
          contactDetails={contactDetails}
          contactPhone={contactPhone}
          contactEmail={contactEmail}
          formStatus={formStatus}
          formMessage={formMessage}
          onSubmit={handleContactSubmit}
        />
      </main>

      <a
        className="button-secondary fixed bottom-4 left-1/2 z-50 inline-flex -translate-x-1/2 items-center justify-center text-xs uppercase tracking-[0.14em] md:bottom-6"
        href="#top"
        onClick={(event) => handleNavClick(event, "top")}
      >
        Back to top
      </a>

      <footer className="border-t border-accent-soft">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-600">The Shvitz</p>
            <p className="mt-1 text-xs text-slate-500">
              Heat, cold, and calm for restoration and connection.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[0.7rem] text-slate-500">
            <a
              className="hover-text-accent"
              href="#about"
              onClick={(event) => handleNavClick(event, "about")}
            >
              About
            </a>
            <a
              className="hover-text-accent"
              href="#services"
              onClick={(event) => handleNavClick(event, "services")}
            >
              Services
            </a>
            <a
              className="hover-text-accent"
              href="#experience"
              onClick={(event) => handleNavClick(event, "experience")}
            >
              Experience
            </a>
            <a
              className="hover-text-accent"
              href="#pricing"
              onClick={(event) => handleNavClick(event, "pricing")}
            >
              Visit
            </a>
            <a
              className="hover-text-accent"
              href="#contact"
              onClick={(event) => handleNavClick(event, "contact")}
            >
              Contact
            </a>
          </div>
          <p className="text-[0.68rem] text-slate-500">
            © 2026 The Shvitz. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
