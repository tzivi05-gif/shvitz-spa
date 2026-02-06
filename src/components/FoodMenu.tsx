import type { ReactNode } from "react";

type MenuItemSimple = {
  name: string;
  price: number;
  description?: string;
};

type MenuItemVariations = {
  name: string;
  description?: string;
  variations: { label: string; price: number }[];
};

type FoodMenuProps = {
  items: (MenuItemSimple | MenuItemVariations)[];
  drinks?: { label: string; price: number }[];
  chefSignature?: string;
  contactAddress?: string;
  contactPhone?: string;
};

function formatPrice(amount: number) {
  return `$${amount}`;
}

function isItemWithVariations(item: MenuItemSimple | MenuItemVariations): item is MenuItemVariations {
  return "variations" in item && Array.isArray((item as MenuItemVariations).variations);
}

export default function FoodMenu({
  items,
  drinks = [],
  chefSignature,
  contactAddress,
  contactPhone,
}: FoodMenuProps) {
  const gridCells: ReactNode[] = [];
  let seenGrilledSteak = false;
  items.forEach((item) => {
    const key = isItemWithVariations(item) ? item.name : item.name;
    gridCells.push(
      <div key={key} className="surface-card rounded-2xl border border-accent-soft p-4">
        {isItemWithVariations(item) ? (
          <>
            <h3 className="text-base font-semibold text-slate-700">{item.name}</h3>
            {item.description && (
              <p className="mt-0.5 text-xs text-slate-500">{item.description}</p>
            )}
            <ul className="mt-3 space-y-1 text-sm text-slate-600">
              {item.variations.map((v) => (
                <li key={v.label} className="flex justify-between gap-2">
                  <span>{v.label}</span>
                  <span className="font-semibold text-slate-700">{formatPrice(v.price)}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h3 className="text-base font-semibold text-slate-700">{item.name}</h3>
            {item.description && (
              <p className="mt-0.5 text-xs text-slate-500">{item.description}</p>
            )}
            <p className="mt-1.5 text-sm font-semibold text-slate-700">{formatPrice(item.price)}</p>
          </>
        )}
      </div>
    );
    if (item.name === "Grilled Steak") seenGrilledSteak = true;
  });
  if (seenGrilledSteak && drinks.length > 0) {
    gridCells.push(
      <div key="drinks" className="surface-card rounded-2xl border border-accent-soft p-4">
        <h3 className="text-base font-semibold text-slate-700">Drinks</h3>
        <ul className="mt-3 space-y-1 text-sm text-slate-600">
          {drinks.map((d) => (
            <li key={d.label} className="flex justify-between gap-2">
              <span>{d.label}</span>
              <span className="font-semibold text-slate-700">{formatPrice(d.price)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section id="menu" className="section-block">
      <div className="section-shell mx-auto w-full max-w-6xl">
        <p className="section-label">Food &amp; drink</p>
        <h2 className="section-title mt-4 text-slate-600">Food Menu</h2>
        <p className="section-body section-subtitle mt-2 max-w-lg">
          Hummus plates, soup, grilled steak, and more. By Chef Shloimy Friedlander.
        </p>

        {/* Menu items in a compact side-by-side grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gridCells}
        </div>

        {/* Contact + chef — compact row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 gap-y-2 text-sm text-slate-600">
          {chefSignature && (
            <p className="italic text-slate-500">{chefSignature}</p>
          )}
          {(contactAddress || contactPhone) && (
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              {contactAddress && <span>{contactAddress}</span>}
              {contactPhone && (
                <a href={`tel:${contactPhone.replace(/[^0-9+]/g, "")}`} className="text-accent hover:underline">
                  {contactPhone}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
