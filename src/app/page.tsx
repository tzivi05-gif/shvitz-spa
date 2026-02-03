"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";

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

type GalleryItem = {
  src: string;
  alt: string;
  modalClass?: string;
};

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

const tiers = [
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

const contactDetails = [
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

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    event.preventDefault();
    if (targetId === "top") {
      const scrollOptions: ScrollToOptions = { top: 0, left: 0, behavior: "smooth" };
      document.documentElement.scrollTo(scrollOptions);
      document.body.scrollTo(scrollOptions);
      window.scrollTo(scrollOptions);
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
        <section
          className={`hero-glow relative overflow-hidden transition-opacity duration-300 ${
            showGiveaway ? "opacity-30" : "opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),transparent_60%)]" />
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20 xl:flex-row xl:items-center">
            <div className="relative z-10 order-2 flex-1">
              <p className="text-sm uppercase tracking-[0.18em] text-accent">
                Shvitz — Monsey, NY
              </p>
              <h1 className="hero-serif hero-title mt-6 text-slate-600">
                <span className="block font-normal text-slate-600">
                  A Retreat into Pure Relaxation
                </span>
              </h1>
              <p className="hero-lead mt-6 max-w-xl text-slate-600">
                Discover a serene retreat in the heart of Monsey. Shvitz blends
                time-honored heat therapy with modern design to restore your
                body, quiet your mind, and elevate your everyday.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  className="button-primary text-sm uppercase tracking-[0.14em]"
                  href="#contact"
                  onClick={(event) => handleNavClick(event, "contact")}
                >
                  Book your session
                </a>
                <a
                  className="button-secondary text-sm uppercase tracking-[0.14em] text-accent"
                  href="#services"
                  onClick={(event) => handleNavClick(event, "services")}
                >
                  View amenities
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-xs uppercase tracking-[0.14em] text-accent">
                <span>Heat + healing</span>
                <span>Cold + clarity</span>
                <span>Quiet renewal</span>
              </div>
            </div>
            <div className="relative z-10 order-1 flex-1">
              <div className="flex h-full items-start justify-center pt-6 md:justify-end md:pt-10">
                <div className="hero-image-shell relative w-full max-w-md overflow-hidden bg-white/60 shadow-[0_12px_36px_rgba(43,33,28,0.14)] backdrop-blur md:max-w-lg">
                  <Image
                    src={gallery[0].src}
                    alt={gallery[0].alt}
                    width={960}
                    height={720}
                    className="hero-image h-[420px] w-full object-cover transition duration-700 md:h-[460px]"
                    style={{ filter: "url(#hero-sharpen)" }}
                    priority
                    sizes="(min-width: 1280px) 520px, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/0 to-black/0" />
                </div>
              </div>
            </div>
          </div>
        </section>

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

        <section
          id="experience"
          className="section-block bg-gradient-to-b from-[#F6EDE3] to-[#F0E1D6]/70"
        >
          <div className="section-shell mx-auto w-full max-w-6xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="section-label">
                  Gallery
                </p>
              </div>
              <button
                type="button"
                className="button-secondary text-xs uppercase tracking-[0.14em] text-accent"
                onClick={() => setShowAllPhotos((prev) => !prev)}
                aria-pressed={showAllPhotos}
              >
                {showAllPhotos ? "Show fewer" : "More photos"}
              </button>
            </div>
            <div className="section-grid mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {displayedGallery.map((image) => (
                <button
                  key={image.src}
                  type="button"
                  className="surface-card gallery-card group relative overflow-hidden rounded-3xl border border-white/70 ring-1 ring-accent-soft transition hover:shadow-[0_18px_50px_rgba(53,66,77,0.14)]"
                  onClick={() => setSelectedImage(image)}
                  aria-label={image.alt}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-0 transition group-hover:opacity-100" />
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={640}
                    height={480}
                    className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
                  />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 text-left text-xs uppercase tracking-[0.14em] text-white/90 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    {image.alt}
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs text-slate-500">
              Some images in this gallery are AI-generated.
            </p>
          </div>
        </section>

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

        {showGiveaway ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B211C]/55 px-6 py-10"
            role="dialog"
            aria-modal="true"
            aria-label="Giveaway announcement"
          >
            <div className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-accent-soft bg-[#FDF7F1] shadow-[0_30px_90px_rgba(25,18,14,0.35)]">
              <button
                type="button"
                onClick={handleGiveawayClose}
                className="absolute right-5 top-5 rounded-full border border-accent bg-white px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#2B211C] hover-border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-label="Close giveaway popup"
              >
                Close
              </button>
              <div className="grid gap-6 px-8 pb-8 pt-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-accent">
                    The Shvitz
                  </p>
                  <h2 className="hero-serif text-2xl text-[#2B211C] md:text-3xl">
                    The Shvitz is doing an exciting giveaway!
                  </h2>
                  <p className="text-sm text-slate-600">
                    A VIP night for you and 5 friends.
                  </p>
                  <p className="text-sm text-slate-600">
                    Includes a professional bezem massage for each, drinks, &amp;
                    hookah.
                  </p>
                  <p className="text-sm text-slate-600">
                    Repost this on your status, as well as our WhatsApp link and
                    get an entry into the giveaway raffle for every 50 views!
                  </p>
                </div>
                <div className="space-y-4 rounded-3xl border border-accent-soft bg-white/90 p-6">
                  <p className="text-lg font-semibold text-slate-700">
                    Let&apos;s get Shvitzing!
                  </p>
                  <p className="text-sm text-slate-600">
                    Call us: {contactPhone}
                  </p>
                  <p className="text-sm text-slate-600">
                    {contactLocation} 10952
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      className="button-secondary text-xs uppercase tracking-[0.14em] text-accent"
                      href="#contact"
                      onClick={handleGiveawayClose}
                    >
                      Contact form
                    </a>
                    <a
                      className="button-secondary text-xs uppercase tracking-[0.14em] text-accent"
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp link
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <section id="pricing" className="section-block">
          <div className="section-shell mx-auto w-full max-w-6xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="section-label">
                  Visit or join
                </p>
                
              </div>
              <p className="section-body section-subtitle max-w-md">
                We offer single sessions, packages, and memberships to fit your
                lifestyle.
              </p>
            </div>
            <p className="section-body mt-6 text-sm">
              Contact us for current pricing and availability.
            </p>
            <div className="section-grid mt-12 grid gap-6 lg:grid-cols-3">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="surface-card rounded-3xl border border-accent-soft p-6"
                >
                  <p className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-accent">
                    {tier.name}
                  </p>
                  <p className="mt-4 text-sm text-slate-500">{tier.detail}</p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-600">
                    {tier.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-accent">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    className="button-secondary mt-6 inline-flex text-xs uppercase tracking-[0.14em] text-accent"
                    href="#contact"
                    onClick={(event) => handleNavClick(event, "contact")}
                  >
                    Request availability
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

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
                            className="text-lg font-semibold leading-snug text-slate-900 hover-text-accent"
                            href={stat.href}
                            target={stat.href.startsWith("http") ? "_blank" : undefined}
                            rel={stat.href.startsWith("http") ? "noreferrer" : undefined}
                          >
                            {stat.value}
                          </a>
                        ) : (
                          <p className="text-lg font-semibold leading-snug text-slate-900">
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
                    <p className="text-sm font-semibold text-slate-600">
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
                onSubmit={handleContactSubmit}
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
                <p
                  className="mt-4 text-xs text-slate-500"
                  role="status"
                  aria-live="polite"
                >
                  {formMessage}
                </p>
                <p className="mt-4 text-xs text-slate-500">
                  Prefer to call? Dial {contactPhone}. Email {contactEmail}.
                </p>
              </form>
            </div>
          </div>
        </section>
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
