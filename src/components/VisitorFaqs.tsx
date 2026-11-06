import Link from "next/link";
import { visitorFaqs } from "@/data/visitorFaqs";

export default function VisitorFaqs() {
  return <section id="visitor-questions" className="section-block"><div className="section-shell mx-auto w-full max-w-6xl"><p className="section-label">Plan your visit</p><h2 className="section-title mt-4 text-slate-700">A few helpful answers.</h2><div className="mt-8 grid gap-4 md:grid-cols-2">{visitorFaqs.map(item => <article key={item.question} className="rounded-2xl border border-accent-soft bg-white/60 p-6"><h3 className="text-lg text-slate-700">{item.question}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p></article>)}</div><Link href="/visit" className="button-secondary mt-7 inline-flex text-sm">Visitor guide →</Link></div></section>;
}
