"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import { contactDetails } from "@/data/contactDetails";
import { contactEmail, contactPhone } from "@/data/contact";
import { foodMenuDrinks, foodMenuItems } from "@/data/foodMenu";
import { extraGallery, gallery } from "@/data/gallery";
import { pricing } from "@/data/pricing";
import { services, type Service } from "@/data/services";
import ContactForm from "@/components/ContactForm";
import FoodMenu from "@/components/FoodMenu";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useContactForm } from "@/hooks/useContactForm";
import { useGalleryModal } from "@/hooks/useGalleryModal";
import { useGiveaway } from "@/hooks/useGiveaway";
import { mobileMenuLinks, useMobileMenu } from "@/hooks/useMobileMenu";

export default function Home() {
  const { selectedImage, setSelectedImage, handleSelectImage } = useGalleryModal();
  const allGalleryImages = useMemo(() => [...gallery, ...extraGallery], []);
  const galleryIndex = selectedImage
    ? allGalleryImages.findIndex((img) => img.src === selectedImage.src)
    : -1;
  const goPrev = () => {
    if (galleryIndex <= 0) setSelectedImage(allGalleryImages[allGalleryImages.length - 1]);
    else setSelectedImage(allGalleryImages[galleryIndex - 1]);
  };
  const goNext = () => {
    if (galleryIndex >= allGalleryImages.length - 1) setSelectedImage(allGalleryImages[0]);
    else setSelectedImage(allGalleryImages[galleryIndex + 1]);
  };

  useEffect(() => {
    if (!selectedImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goPrev();
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        goNext();
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedImage, galleryIndex]);

  useGiveaway();
  const { formState, handleContactSubmit, closeBookingSuccessPopup, closeBookingErrorPopup } =
    useContactForm({ contactPhone, contactEmail });
  const {
    menuOpen,
    closeMenu,
    handleBackdropClick,
    menuButtonRef,
    menuPanelRef,
  } = useMobileMenu();

  const isModalOpen =
    !!selectedImage ||
    menuOpen ||
    formState.status === "success" ||
    formState.status === "error";
  useBodyScrollLock(isModalOpen);

  return (
    <div className="min-w-full w-full bg-[#F8F1E9] text-[#2B211C] overflow-x-hidden">
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

      {/* Mobile menu overlay — portal so it's never clipped; backdrop below header (z-[90]) */}
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
      {formState.status === "success" && (
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
      {formState.status === "error" && (
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
              {formState.message}
            </p>
          </div>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 z-[170] flex flex-col items-center justify-center overflow-hidden p-3 pb-6"
          aria-modal="true"
          aria-label="Image lightbox — view gallery photo full size"
          onDoubleClick={() => setSelectedImage(null)}
        >
          {/* Backdrop — click anywhere outside the picture to close */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
            aria-hidden="true"
          />
          {/* Content — stop propagation so clicking the picture/controls doesn't close */}
          <div
            className="relative z-10 flex flex-col items-center max-w-[85vw]"
            onClick={(e) => e.stopPropagation()}
          >
          {/* Close */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-end pointer-events-none">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="pointer-events-auto rounded-full bg-white px-4 py-2 text-xs uppercase tracking-[0.14em] text-black hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Close"
            >
              Close
            </button>
          </div>

          {/* Prev/Next buttons — positioned outside the image */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 -translate-x-full -ml-6 items-center justify-center rounded-full border border-white/30 bg-white/70 text-black shadow-md hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 translate-x-full -mr-6 items-center justify-center rounded-full border border-white/30 bg-white/70 text-black shadow-md hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Main image — sized to fit viewport without scroll */}
          <div className="flex w-full flex-shrink-0 items-center justify-center pt-24 pb-2">
            <div className="relative h-[50vh] w-full max-w-[85vw]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain object-center"
                sizes="90vw"
                priority
              />
            </div>
          </div>

          {/* Counter */}
          <p className="flex-shrink-0 text-center text-xs uppercase tracking-wider text-white/90 mt-1">
            {galleryIndex + 1} of {allGalleryImages.length}
          </p>

          {/* Thumbnails — centered strip below image */}
          <div className="flex flex-shrink-0 w-full max-w-3xl justify-center overflow-x-auto mt-2 mb-1 scrollbar-thin mx-auto">
            <div className="flex gap-1.5">
              {allGalleryImages.map((img, i) => (
                <button
                  key={`${img.src}-${i}`}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  aria-label={`View image ${i + 1}`}
                  aria-current={i === galleryIndex ? "true" : undefined}
                  className={`relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer ${
                    i === galleryIndex
                      ? "border-white ring-2 ring-white/40 opacity-100"
                      : "border-white/20 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="48px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Caption */}
          <p className="flex-shrink-0 max-w-xl text-center text-[0.65rem] uppercase tracking-[0.14em] text-white/80 mt-1 mb-3">
            {selectedImage.alt}
          </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
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
                Whether you arrive alone or with friends, you'll find a calm refuge where the noise of daily life fades and balance returns naturally.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="section-block">
          <div className="section-shell mx-auto w-full max-w-6xl">
            <p className="section-label">Amenities</p>
            <p className="section-body section-subtitle max-w-md mt-2">A full circuit of heat, cold, and calm for restoration.</p>
            <div className="section-grid mt-12 grid gap-6 md:grid-cols-2">
              {services.map((service: Service) => (
                <div key={service.title} className="surface-card flex gap-4 rounded-3xl border border-accent-soft p-6">
                  {service.image && (
                    <div className="h-20 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-accent-soft">
                      <Image
                        src={service.image}
                        alt=""
                        width={96}
                        height={80}
                        className="h-full w-full object-cover"
                        style={service.imagePosition ? { objectPosition: service.imagePosition } : undefined}
                        sizes="96px"
                      />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-slate-600">{service.title}</h3>
                    <p className="mt-3 text-sm text-slate-500">{service.description}</p>
                  </div>
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
          formStatus={formState.status}
          formMessage={formState.message}
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
