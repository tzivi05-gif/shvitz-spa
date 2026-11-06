import Link from "next/link";
import type { Metadata } from "next";
import { visitorFaqs } from "@/data/visitorFaqs";
import { amenities } from "@/data/amenities";
import { siteConfig } from "@/data/seo";
import { whatsappUrl } from "@/data/contact";
export const metadata: Metadata = {
  title: "Visit Our Heimishe Men’s Spa in Monsey",
  description: "Visit The Shvitz, a heimishe men’s spa in Monsey, Rockland County: $75 public entry for men 18+, saunas, cold plunge, Jacuzzi and private group inquiries. Contact us for current hours.",
  alternates: { canonical: `${siteConfig.website}/visit` },
  openGraph: { title: "Plan Your Visit to The Shvitz in Monsey", description: "Public hours for men ages 18+. $75 entry. Message for current hours and private availability.", url: `${siteConfig.website}/visit` },
};
export default function VisitPage() {
  return <div className="min-h-screen bg-[#F8F1E9] text-[#2B211C]"><header className="mx-auto flex max-w-6xl justify-between px-6 py-6"><Link href="/" className="text-sm tracking-[0.18em] text-accent">THE SHVITZ</Link><Link href="/amenities" className="text-sm underline">Explore amenities</Link></header><main className="mx-auto max-w-6xl px-6 py-12"><p className="section-label">Monsey · Rockland County, New York</p><h1 className="hero-title mt-5">Your visit to The Shvitz.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">A heimishe men’s spa in Monsey for heat, cold and time to unwind. Public hours are for men ages 18 and over, with $75 public entry. Contact us for current hours or to discuss private group availability.</p><a className="button-primary mt-7 inline-flex text-sm" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Ask about your visit on WhatsApp</a><section className="mt-12 grid gap-5 md:grid-cols-2">{visitorFaqs.map(item => <article key={item.question} className="rounded-2xl border border-accent-soft bg-white/60 p-6"><h2 className="text-xl text-slate-700">{item.question}</h2><p className="mt-4 text-sm leading-7 text-slate-600">{item.answer}</p></article>)}</section><section className="mt-12"><h2 className="text-2xl text-slate-700">Explore the experience</h2><div className="mt-5 flex flex-wrap gap-3">{amenities.map(a => <Link className="rounded-full border border-accent-soft px-4 py-3 text-sm text-accent" key={a.slug} href={`/amenities/${a.slug}`}>{a.title} →</Link>)}</div><Link href="/#pricing" className="mt-6 inline-block text-sm underline">See public and private rates</Link></section></main><footer className="p-6 text-center text-xs text-slate-500">The Shvitz · Monsey, NY · Public hours: men ages 18+ only</footer></div>;
}
