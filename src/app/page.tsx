"use client";

import { useState } from "react";

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
    title: "Inground Jacuzzi",
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

const gallery = [
  {
    src: "/images/shvitz-04.jpg",
    alt: "Relaxation lounge seating.",
  },
  {
    src: "/images/shvitz-02.jpg",
    alt: "Cold plunge pool.",
  },
  {
    src: "/images/shvitz-05.jpg",
    alt: "Lockers and changing area.",
  },
  {
    src: "/images/shvitz-03.jpg",
    alt: "Hot tub with warm lighting.",
  },
  {
    src: "/images/shvitz-01.jpg",
    alt: "Wood-lined sauna benches.",
  },
  {
    src: "/images/shvitz-logo.png",
    alt: "The Shvitz logo.",
  },
];

const tiers = [
  {
    name: "Drop-in sessions",
    price: "Contact us",
    detail: "Single visits designed to fit your schedule.",
    items: ["Flexible access", "Ideal for first-time visits", "Easy to book"],
  },
  {
    name: "Multi-visit packages",
    price: "Contact us",
    detail: "Save when you visit more often.",
    items: ["Bundle options", "Perfect for regular recovery", "Shareable"],
  },
  {
    name: "Monthly memberships",
    price: "Contact us",
    detail: "Consistent wellness and member perks.",
    items: ["Best value", "Priority availability", "Built-in ritual"],
  },
];

const whyUs = [
  "Authentic, European-inspired sauna culture",
  "Immaculately clean, modern facilities",
  "Calm, private, and respectful environment",
  "Designed for recovery, clarity, and reset",
  "Ideal for individuals, friends, and group visits",
];

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<
    (typeof gallery)[number] | null
  >(null);

  return (
    <div className="bg-[#FAFAFA] text-[#1F2328]">
      <header className="border-b border-[#E3E6E8]/70 bg-[#FAFAFA]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <div className="hidden sm:block">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-600">
              The Shvitz
            </p>
            <p className="text-lg font-semibold text-slate-900">
              Sauna + Spa
            </p>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-[#6B7280] md:flex">
            <a className="hover:text-slate-900" href="#about">
              About
            </a>
            <a className="hover:text-slate-900" href="#services">
              Services
            </a>
            <a className="hover:text-slate-900" href="#experience">
              Experience
            </a>
            <a className="hover:text-slate-900" href="#pricing">
              Visit
            </a>
            <a className="hover:text-slate-900" href="#contact">
              Contact
            </a>
          </nav>
            <a
              className="rounded-full border border-[#E3E6E8] px-4 py-2 text-sm font-semibold text-[#1F2328] hover:border-[#C7CDD3]"
              href="#contact"
            >
              Book now
            </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),transparent_60%)]" />
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 md:flex-row md:items-center">
            <div className="relative z-10 flex-1">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                Shvitz — Monsey
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
                An Urban Sanctuary of Heat & Healing
              </h1>
              <p className="mt-6 text-lg text-slate-600">
                Discover a serene retreat in the heart of Monsey. Shvitz blends
                time-honored heat therapy with modern design to restore your
                body, quiet your mind, and elevate your everyday.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  className="rounded-full bg-[#1F2328] px-6 py-3 text-sm font-semibold text-[#FAFAFA] hover:bg-[#2F343A]"
                  href="#contact"
                >
                  Book Your Session
                </a>
                <a
                  className="rounded-full border border-[#E3E6E8] px-6 py-3 text-sm font-semibold text-[#1F2328] hover:border-[#C7CDD3]"
                  href="#services"
                >
                  View amenities
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-500">
                <span>Heat + healing</span>
                <span>Cold + clarity</span>
                <span>Quiet renewal</span>
              </div>
            </div>
            <div className="relative z-10 flex-1">
            </div>
          </div>
        </section>

        <section id="about" className="border-t border-[#E3E6E8]/70">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  About
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-900">
                  Unwind in Stillness
                </h2>
              </div>
            </div>
            <div className="mt-10 grid gap-6 text-base text-slate-500 lg:grid-cols-2">
              <p>
                Embrace the quiet luxury of Shvitz, a space designed for deep
                relaxation and renewal. Every detail is intentional, from the
                warmth of our saunas to the peaceful flow of our interiors.
              </p>
              <p>
                Whether you arrive alone or with friends, you’ll find a calm
                refuge where the noise of daily life fades and balance returns
                naturally.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="border-t border-[#E3E6E8]/70">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  Amenities
                </p>
                
              </div>
              <p className="max-w-md text-base text-slate-500">
                A full circuit of heat, cold, and calm for restoration.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-3xl border border-[#E3E6E8]/70 bg-[#F2F3F5] p-6"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
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
          className="border-t border-[#E3E6E8]/70 bg-gradient-to-b from-[#F7F8FA] to-[#F2F3F5]/70"
        >
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  Gallery
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-900">
                  A Calm, Modern Retreat
                </h2>
              </div>
              <p className="max-w-md text-base text-slate-500">
                From warm wood finishes to calming lighting and thoughtfully
                designed spaces, every detail is crafted to create a deeply
                relaxing experience.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((image) => (
                <button
                  key={image.src}
                  type="button"
                  className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white shadow-sm ring-1 ring-[#E3E6E8]/60 transition hover:-translate-y-1 hover:shadow-lg"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-0 transition group-hover:opacity-100" />
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 text-left text-xs uppercase tracking-[0.2em] text-white/90 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    {image.alt}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {selectedImage ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 py-10"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="relative max-h-full w-full max-w-4xl overflow-hidden rounded-3xl bg-[#FAFAFA] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 rounded-full border border-[#E3E6E8] bg-white px-3 py-1 text-sm text-[#1F2328] hover:border-[#C7CDD3]"
              >
                Close
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        ) : null}

        <section id="pricing" className="border-t border-[#E3E6E8]/70">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  Visit or join
                </p>
                
              </div>
              <p className="max-w-md text-base text-slate-500">
                We offer single sessions, packages, and memberships to fit your
                lifestyle.
              </p>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Contact us for current pricing and availability.
            </p>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="rounded-3xl border border-[#E3E6E8]/70 bg-[#F2F3F5] p-6"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {tier.name}
                  </p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">
                    {tier.price}
                  </p>
                  <p className="mt-3 text-sm text-slate-500">{tier.detail}</p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-600">
                    {tier.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-[#A7B0B7]">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    className="mt-6 inline-flex rounded-full border border-[#E3E6E8] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#1F2328] hover:border-[#C7CDD3]"
                    href="#contact"
                  >
                    Book {tier.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-[#E3E6E8]/70">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                  Contact
                </p>
                <p className="mt-3 text-base text-slate-500">
                  Have questions or want to book a group? We’d love to hear
                  from you.
                </p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {[
                    { label: "Location", value: "10 Sands Point Rd" },
                    { label: "Phone", value: "845-594-9120" },
                    { label: "Visits", value: "Individuals or groups" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-3xl border border-[#E3E6E8]/70 bg-[#F2F3F5] p-5"
                    >
                      <p className="text-2xl font-semibold text-slate-900">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-3xl border border-[#E3E6E8]/70 bg-[#FAFAFA] p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Hours
                      </p>
                      <p className="mt-3 text-sm text-slate-900">
                        Sun–Thu: 8am–10pm
                      </p>
                      <p className="mt-1 text-sm text-slate-900">Fri: 8am–2pm</p>
                      <p className="mt-1 text-sm text-slate-900">Sat: Closed</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Parking
                      </p>
                      <p className="mt-3 text-sm text-slate-900">
                        On-site and street parking available.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-3xl border border-[#E3E6E8]/70 bg-[#F2F3F5] p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">
                      The Shvitz experience
                    </p>
                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs text-[#6B7280]">
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
                        className="flex items-center justify-between rounded-2xl bg-white px-4 py-3"
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
                className="rounded-3xl border border-[#E3E6E8]/70 bg-[#FAFAFA] p-6"
                onSubmit={(event) => {
                  event.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <div className="space-y-4">
                  <div>
                    <label
                      className="text-xs uppercase tracking-[0.2em] text-slate-500"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="mt-2 w-full rounded-2xl border border-[#E3E6E8] bg-[#FAFAFA] px-4 py-3 text-sm text-[#1F2328] outline-none focus:border-[#C7CDD3]"
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs uppercase tracking-[0.2em] text-slate-500"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-2 w-full rounded-2xl border border-[#E3E6E8] bg-[#FAFAFA] px-4 py-3 text-sm text-[#1F2328] outline-none focus:border-[#C7CDD3]"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs uppercase tracking-[0.2em] text-slate-500"
                      htmlFor="budget"
                    >
                      Preferred treatment
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="mt-2 w-full rounded-2xl border border-[#E3E6E8] bg-[#FAFAFA] px-4 py-3 text-sm text-[#1F2328] outline-none focus:border-[#C7CDD3]"
                    >
                      <option>Day pass</option>
                      <option>Group booking</option>
                      <option>Membership</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label
                      className="text-xs uppercase tracking-[0.2em] text-slate-500"
                      htmlFor="message"
                    >
                      Notes
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="mt-2 w-full rounded-2xl border border-[#E3E6E8] bg-[#FAFAFA] px-4 py-3 text-sm text-[#1F2328] outline-none focus:border-[#C7CDD3]"
                      placeholder="Share any preferences or focus areas."
                    />
                  </div>
                </div>
                <button
                  className="mt-6 w-full rounded-full bg-[#1F2328] px-6 py-3 text-sm font-semibold text-[#FAFAFA] hover:bg-[#2F343A]"
                  type="submit"
                >
                  Request availability
                </button>
                <p className="mt-4 text-xs text-slate-500">
                  Prefer to call? Dial 845-594-9120
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <a
        className="fixed bottom-4 left-4 right-4 z-50 rounded-full bg-[#1F2328] px-5 py-3 text-center text-sm font-semibold text-[#FAFAFA] shadow-lg hover:bg-[#2F343A] md:hidden"
        href="#contact"
      >
        Book Now
      </a>
      <a
        className="fixed bottom-20 right-4 z-50 inline-flex items-center justify-center rounded-full border border-[#E3E6E8] bg-[#FAFAFA] px-4 py-3 text-sm font-semibold text-[#1F2328] shadow-lg hover:border-[#C7CDD3] md:bottom-6"
        href="tel:845-594-9120"
      >
        Call
      </a>

      <footer className="border-t border-[#E3E6E8]/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-semibold text-slate-900">The Shvitz</p>
            <p className="mt-2 text-sm text-slate-500">
              Heat, cold, and calm for restoration and connection.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            <a className="hover:text-slate-900" href="#about">
              About
            </a>
            <a className="hover:text-slate-900" href="#services">
              Services
            </a>
            <a className="hover:text-slate-900" href="#experience">
              Experience
            </a>
            <a className="hover:text-slate-900" href="#pricing">
              Visit
            </a>
            <a className="hover:text-slate-900" href="#contact">
              Contact
            </a>
          </div>
          <p className="text-xs text-slate-500">
            © 2026 The Shvitz. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
