export type Tier = {
  name: string;
  detail: string;
  items: string[];
};

type PricingProps = {
  tiers: Tier[];
};

export default function Pricing({ tiers }: PricingProps) {
  return (
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
              >
                Request availability
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
