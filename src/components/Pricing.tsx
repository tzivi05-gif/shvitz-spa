import Image from "next/image";

export type PricingRule = {
  title: string;
  text: string;
};

type PricingProps = {
  publicEntry: { cashZelle: number; credit: number };
  fridayEntry: { cashZelle: number; credit: number };
  privateRates: { couple: number; group38: number; additionalPerPerson: number };
  rules: PricingRule[];
  zelleQrImageSrc?: string;
  zelleName?: string;
  zellePhone?: string;
};

function formatPrice(amount: number) {
  return `$${amount}`;
}

export default function Pricing({
  publicEntry,
  fridayEntry,
  privateRates,
  rules,
  zelleQrImageSrc,
  zelleName = "Joshua Friedmann",
  zellePhone = "845-594-9120",
}: PricingProps) {
  return (
    <section id="pricing" className="section-block">
      <div className="section-shell mx-auto w-full max-w-6xl">
        <p className="section-label">Pricing</p>
        <h2 className="section-title mt-4 text-slate-600">Rates &amp; Info</h2>
        <p className="section-body section-subtitle mt-2 max-w-lg">
          Public entry, Friday rates, and private groups.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Public Entry */}
          <div className="surface-card rounded-3xl border border-accent-soft p-6">
            <p className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-accent">
              Public entry
            </p>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              <li className="flex justify-between gap-3">
                <span>Cash or Zelle</span>
                <span className="font-semibold text-slate-700">{formatPrice(publicEntry.cashZelle)}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>Credit card</span>
                <span className="font-semibold text-slate-700">{formatPrice(publicEntry.credit)}</span>
              </li>
            </ul>
          </div>

          {/* Friday Entry */}
          <div className="surface-card rounded-3xl border border-accent-soft p-6">
            <p className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-accent">
              Friday entry
            </p>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              <li className="flex justify-between gap-3">
                <span>Cash or Zelle</span>
                <span className="font-semibold text-slate-700">{formatPrice(fridayEntry.cashZelle)}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>Credit card</span>
                <span className="font-semibold text-slate-700">{formatPrice(fridayEntry.credit)}</span>
              </li>
            </ul>
          </div>

          {/* Private groups */}
          <div className="surface-card rounded-3xl border border-accent-soft p-6">
            <p className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-accent">
              Private group (per hour)
            </p>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              <li className="flex justify-between gap-3">
                <span>Couple</span>
                <span className="font-semibold text-slate-700">{formatPrice(privateRates.couple)}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>3–8 people</span>
                <span className="font-semibold text-slate-700">{formatPrice(privateRates.group38)}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>Each additional guest after 8</span>
                <span className="font-semibold text-slate-700">{formatPrice(privateRates.additionalPerPerson)}/hour</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Rules */}
        <div className="mt-8 rounded-3xl border border-accent-soft bg-accent-soft/30 p-6">
          <p className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-accent">
            Please note
          </p>
          <ul className="mt-5 space-y-4 text-sm text-slate-600">
            {rules.map((rule) => (
              <li key={rule.title}>
                <span className="font-semibold text-slate-700">{rule.title}:</span> {rule.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Zelle: QR centered + contact */}
        <div className="mt-8 flex flex-col items-center">
          <div className="rounded-2xl border border-accent-soft bg-white p-4 shadow-sm">
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
              {zelleName}
            </p>
            <p className="mt-0.5 text-center text-sm text-slate-500">({zellePhone})</p>
            <div className="relative mt-3 aspect-square w-40">
              {zelleQrImageSrc ? (
                <Image
                  src={zelleQrImageSrc}
                  alt="Zelle QR code for payments"
                  width={160}
                  height={160}
                  className="rounded-lg object-contain"
                />
              ) : (
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`Zelle: ${zelleName} ${zellePhone}`)}`}
                  alt="Zelle QR code for payments"
                  width={160}
                  height={160}
                  className="rounded-lg object-contain"
                />
              )}
            </div>
          </div>
          <a
            className="button-secondary mt-4 inline-flex text-xs uppercase tracking-[0.14em] text-accent"
            href="#contact"
          >
            Request availability
          </a>
          <p className="mt-4 max-w-md text-center text-sm text-slate-500">
            Zelle: {zellePhone} ({zelleName}). For WhatsApp, private bookings, or customer service, contact us at:{" "}
            <a href="https://wa.me/18455949120" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              {zellePhone}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
