"use client";

import { useState } from "react";

function MenuImage({ src, alt, className, width, height, cropPosition }: { 
  src: string; 
  alt: string; 
  className?: string;
  width: number;
  height: number;
  cropPosition?: string; // CSS background-position for cropping
}) {
  const [imageError, setImageError] = useState(false);

  // If cropPosition is provided, use CSS background-image to crop from menu image
  if (cropPosition) {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${src})`,
          backgroundSize: '200%', // Make background larger to allow cropping
          backgroundPosition: cropPosition,
          backgroundRepeat: 'no-repeat',
        }}
        role="img"
        aria-label={alt}
      />
    );
  }

  // Regular image loading - always show, handle errors gracefully
  if (imageError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
        <div className="text-center p-4">
          <svg className="w-12 h-12 mx-auto mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-xs text-slate-500">Image not found</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImageError(true)}
      style={{ 
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  );
}

type MenuItemSimple = {
  name: string;
  price: number;
  description?: string;
  image?: string;
  cropPosition?: string; // CSS background-position for cropping from menu image
};

type MenuItemVariations = {
  name: string;
  description?: string;
  variations: { label: string; price: number }[];
  image?: string;
  cropPosition?: string; // CSS background-position for cropping from menu image
};

type FoodMenuProps = {
  items: (MenuItemSimple | MenuItemVariations)[];
  drinks?: { label: string; price: number; image?: string }[];
  drinksImage?: string;
  drinksImageCrop?: string;
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

function extractBadge(name: string): { badge: string | null; cleanName: string } {
  if (name.includes("All week:")) {
    return { badge: "All Week", cleanName: name.replace("All week:", "").trim() };
  }
  if (name.includes("Motzei Shabbos:")) {
    return { badge: "Motzei Shabbos", cleanName: name.replace("Motzei Shabbos:", "").trim() };
  }
  if (name.includes("Thursday night:")) {
    return { badge: "Thursday", cleanName: name.replace("Thursday night:", "").trim() };
  }
  return { badge: null, cleanName: name };
}

export default function FoodMenu({
  items,
  drinks = [],
  drinksImage,
  drinksImageCrop,
  chefSignature,
  contactAddress,
  contactPhone,
}: FoodMenuProps) {
  return (
    <section id="menu" className="section-block relative">
      <div className="section-shell mx-auto w-full max-w-3xl relative z-10 pb-14 md:pb-16">
        <div className="flex items-center gap-3 mb-5">
          <p className="section-label bg-accent/10 border border-accent/20">Food &amp; drink</p>
        </div>
        <h2 className="section-title mt-4 text-slate-600">
          Food Menu
        </h2>
        <p className="section-body section-subtitle mt-4 max-w-lg">
          Hummus plates, soup, grilled steak, and more.
          {chefSignature && (
            <span className="block mt-2 text-sm text-slate-500">
              {chefSignature}
            </span>
          )}
        </p>

        {/* Menu card - warm, inviting */}
        <div className="mt-8">
          <div
            className="surface-card rounded-2xl overflow-hidden border border-[rgba(201,168,108,0.2)] px-5 sm:px-6 md:px-8 py-6 sm:py-7 md:py-8 shadow-[0_8px_32px_rgba(45,35,31,0.08),0_0_0_1px_rgba(255,255,255,0.5)_inset]"
            style={{
              background: "linear-gradient(165deg, rgba(255,253,251,0.98) 0%, rgba(249,243,236,0.94) 50%, rgba(243,236,228,0.92) 100%)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7 md:gap-y-6">
              {items.map((item) => {
                const { badge, cleanName } = extractBadge(item.name);

                return (
                  <div
                    key={item.name}
                    className="flex gap-4 items-start group"
                  >
                    {item.image && (
                      <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#f0ebe4] shadow-[0_4px_14px_rgba(45,35,31,0.08)] ring-1 ring-black/5 transition-shadow duration-200 group-hover:shadow-[0_6px_20px_rgba(45,35,31,0.1)]">
                        <MenuImage
                          src={item.image}
                          alt={cleanName}
                          width={500}
                          height={400}
                          className="w-full h-full object-cover"
                          cropPosition={item.cropPosition}
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 pt-0.5">
                      {badge && (
                        <span className="inline-block px-2.5 py-1 mb-2 text-[0.65rem] font-semibold uppercase tracking-widest text-[#5c4a3a] bg-[rgba(201,168,108,0.18)] rounded-full border border-[rgba(201,168,108,0.3)]">
                          {badge}
                        </span>
                      )}
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-semibold text-[#2d2622] text-[0.95rem] leading-snug text-balance">
                          {cleanName}
                        </h3>
                        {!isItemWithVariations(item) && (
                          <span className="font-semibold text-[#5c6b7a] text-[0.95rem] tabular-nums flex-shrink-0">
                            {formatPrice(item.price)}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-[0.8125rem] text-[#6b6360] mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      {isItemWithVariations(item) && (
                        <ul className="mt-2.5 space-y-1.5">
                          {item.variations.map((v) => (
                            <li
                              key={v.label}
                              className="flex justify-between gap-3 text-[0.8125rem] text-[#4a4542]"
                            >
                              <span>{v.label}</span>
                              <span className="font-medium text-[#5c6b7a] tabular-nums whitespace-nowrap">
                                {formatPrice(v.price)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}

              {drinks.length > 0 && (
                <div className="flex gap-4 items-start md:col-start-2">
                  {drinksImage && (
                    <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#f0ebe4] shadow-[0_4px_14px_rgba(45,35,31,0.08)] ring-1 ring-black/5">
                      <MenuImage
                        src={drinksImage}
                        alt="Drinks"
                        width={500}
                        height={400}
                        className="w-full h-full object-cover"
                        cropPosition={drinksImageCrop}
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <h3 className="font-semibold text-[#2d2622] text-[0.95rem] mb-2.5">
                      Drinks
                    </h3>
                    <ul className="space-y-1.5">
                      {drinks.map((d) => (
                        <li
                          key={d.label}
                          className="flex justify-between gap-3 text-[0.8125rem] text-[#4a4542]"
                        >
                          <span>{d.label}</span>
                          <span className="font-medium text-[#5c6b7a] tabular-nums whitespace-nowrap">
                            {formatPrice(d.price)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Contact footer */}
            {(chefSignature || contactAddress || contactPhone) && (
              <div className="mt-8 pt-6 text-center border-t border-[rgba(45,35,31,0.08)]">
                {chefSignature && (
                  <p className="text-[#5c4a3a] text-[0.8125rem] font-medium italic leading-snug">
                    {chefSignature}
                  </p>
                )}
                {(contactAddress || contactPhone) && (
                  <p className="text-[#6b6360] text-[0.8125rem] mt-2 leading-snug">
                    {contactAddress && <span>{contactAddress}</span>}
                    {contactAddress && contactPhone && <span className="mx-2 opacity-60">·</span>}
                    {contactPhone && (
                      <a
                        href={`tel:${contactPhone.replace(/[^0-9+]/g, "")}`}
                        className="text-[#5c6b7a] hover:text-[#6B879C] font-medium transition-colors"
                      >
                        {contactPhone}
                      </a>
                    )}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
