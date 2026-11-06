import Image from "next/image";
import { contactLocation, contactPhone, whatsappUrl } from "@/data/contact";
import { pricing } from "@/data/pricing";

type HeroProps = { heroImage: { src: string; alt: string } };

export default function Hero({ heroImage }: HeroProps) {
  return (
    <section className="hero-glow relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),transparent_60%)]" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-6 py-10 md:py-14 lg:grid-cols-2 lg:gap-12">
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.18em] text-accent">The Shvitz · Monsey, NY</p>
          <h1 className="hero-serif hero-title mt-4">Your time<br />to unwind.</h1>
          <p className="hero-lead mt-5 max-w-xl">Saunas, steam, a cold plunge, and a place to relax with friends. Take a break at The Shvitz.</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-700">
            <strong className="text-xl font-medium">${pricing.publicEntry.cashZelle} entry</strong>
            <span>Adults 18+</span>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a className="button-primary text-sm" href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
            <a className="button-secondary text-sm text-accent" href={`tel:+1${contactPhone.replace(/\D/g, "")}`}>Call {contactPhone}</a>
          </div>
          <p className="mt-5 text-sm text-slate-600">{contactLocation}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">Message us for today’s hours and private group availability.</p>
          <a className="mt-4 inline-block text-xs uppercase tracking-[0.12em] text-accent underline underline-offset-4" href="#experience">Explore the photos</a>
        </div>
        <div className="relative z-10">
          <div className="overflow-hidden rounded-[1.75rem] border border-white/70 shadow-[0_12px_36px_rgba(43,33,28,0.14)]">
            <Image src={heroImage.src} alt={heroImage.alt} width={960} height={720}
              className="h-[270px] w-full object-cover sm:h-[360px] lg:h-[440px]"
              priority loading="eager" fetchPriority="high"
              sizes="(min-width: 1024px) 520px, (min-width: 640px) 80vw, 100vw" />
          </div>
          <p className="mt-3 text-center text-xs tracking-wide text-slate-500">A look inside The Shvitz</p>
        </div>
      </div>
    </section>
  );
}
