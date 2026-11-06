import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { amenities } from "@/data/amenities";
import { whatsappUrl } from "@/data/contact";
import { siteConfig } from "@/data/seo";

export const dynamicParams = false;
export function generateStaticParams() { return amenities.map(({ slug }) => ({ slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = amenities.find(a => a.slug === slug);
  if (!item) return {};
  const url = `${siteConfig.website}/amenities/${slug}`;
  return { title: `${item.title} in Monsey: Benefits & What to Expect`, description: `Explore ${item.title.toLowerCase()} at The Shvitz in Monsey, NY. Learn what to expect, possible benefits and practical precautions. Public hours for men 18+.`,
    alternates: { canonical: url }, openGraph: { title: `${item.title} at The Shvitz`, description: item.intro, url,
      ...(item.image ? { images: [{ url: `${siteConfig.website}${item.image}`, alt: item.imageAlt }] } : {}) },
    twitter: { title: `${item.title} at The Shvitz`, description: item.intro } };
}
export default async function AmenityPage({ params }: Props) {
  const { slug } = await params;
  const item = amenities.find(a => a.slug === slug);
  if (!item) notFound();
  return (
    <div className="min-h-screen bg-[#F8F1E9] text-[#2B211C]">
      <header className="border-b border-accent-soft"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
        <Link href="/" className="text-sm tracking-[0.18em] text-accent">THE SHVITZ</Link>
        <Link href="/amenities" className="text-sm underline underline-offset-4">All amenities</Link>
      </div></header>
      <main className="mx-auto max-w-6xl px-6 py-10 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-xs text-slate-500"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/amenities">Amenities</Link><span aria-hidden="true">/</span><span aria-current="page">{item.title}</span></nav>
        <section className={`grid items-center gap-8 ${item.image ? "lg:grid-cols-2" : "max-w-3xl"}`}>
          <div><p className="section-label">The experience{slug === "outdoor-pool" ? " · Seasonal" : ""}</p><h1 className="hero-title mt-5">{item.title}</h1><p className="mt-4 text-xl text-accent">{item.tagline}</p><p className="mt-5 text-base leading-8 text-slate-600">{item.intro}</p></div>
          {item.image && <Image src={item.image} alt={item.imageAlt || item.title} width={900} height={700} priority className="h-[300px] w-full rounded-3xl object-cover md:h-[410px]" sizes="(min-width:1024px) 50vw, 100vw" />}
        </section>
        <section className="mt-14" aria-labelledby="benefits-title"><h2 id="benefits-title" className="text-3xl text-slate-700">How it can help you</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{item.benefits.map(b => <article key={b.title} className="rounded-2xl border border-accent-soft bg-white/60 p-6"><h3 className="text-xl text-slate-700">{b.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{b.text}</p></article>)}</div></section>
        <div className="mt-10 grid gap-6 lg:grid-cols-2"><section className="rounded-2xl border border-accent-soft p-6"><h2 className="text-2xl text-slate-700">Enjoy it comfortably</h2><p className="mt-4 text-sm leading-7 text-slate-600">{item.enjoy}</p></section><section className="rounded-2xl bg-[#EBE4DC] p-6"><h2 className="text-2xl text-slate-700">Before you begin</h2><p className="mt-4 text-sm leading-7 text-slate-600">{item.care}</p></section></div>
        <section className="mt-8 max-w-3xl"><h2 className="text-xl text-slate-700">A balanced view</h2><p className="mt-3 text-sm leading-7 text-slate-600">{item.evidence}</p><p className="mt-3 text-xs leading-6 text-slate-500">General information, not personal medical advice. Follow posted rules and ask a healthcare professional about suitability for you.</p><details className="mt-5 text-sm text-slate-600"><summary className="cursor-pointer underline underline-offset-4">Health information sources</summary><ul className="mt-3 space-y-3">{item.sources.map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{s.label} ↗</a></li>)}</ul></details></section>
        <section className="mt-12 flex flex-col items-start justify-between gap-5 rounded-3xl bg-white/60 p-6 md:flex-row md:items-center"><div><h2 className="text-2xl text-slate-700">Make time for yourself.</h2><p className="mt-2 text-sm text-slate-600">Public hours are for men ages 18+. Ask about today’s hours and private availability.</p></div><a className="button-primary text-sm" href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp The Shvitz</a></section>
        <nav aria-label="Explore amenities" className="mt-10 flex flex-wrap gap-3">{amenities.filter(a => a.slug !== slug).map(a => <Link key={a.slug} href={`/amenities/${a.slug}`} className="rounded-full border border-accent-soft px-4 py-3 text-sm text-accent hover:bg-white">{a.title} →</Link>)}</nav>
      </main><footer className="border-t border-accent-soft px-6 py-6 text-center text-xs text-slate-500">The Shvitz · Monsey, NY · Public hours: men ages 18+ only</footer>
    </div>
  );
}
