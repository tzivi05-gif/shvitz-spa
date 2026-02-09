"use client";

import { useState } from "react";
import type { ReactNode } from "react";

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
      <div className="section-shell mx-auto w-full max-w-3xl relative z-10" style={{ paddingBottom: 0 }}>
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

        {/* Two column menu layout - compact ad style */}
        <div className="mt-8">
          <div className="surface-card menu-card-no-bottom-padding rounded-2xl border border-slate-200/40 px-5 sm:px-6 md:px-7 pt-5 sm:pt-6 md:pt-7 shadow-[0_4px_20px_rgba(45,35,31,0.05)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5" style={{ paddingBottom: 0, marginBottom: 0 }}>
              {items.map((item) => {
                const { badge, cleanName } = extractBadge(item.name);
                
                return (
                  <div key={item.name} className="pb-4 border-b border-slate-200/40 last:border-0">
                    <div className="flex gap-3 items-start">
                      {/* Image - compact, aligned to top */}
                      {item.image && (
                        <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(45,35,31,0.06)] bg-slate-50 ring-1 ring-slate-200/30">
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
                      {/* Content - compact */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        {badge && (
                          <span className="inline-flex items-center px-2 py-0.5 mb-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-accent/90 bg-accent/6 rounded border border-accent/12 w-fit">
                            {badge}
                          </span>
                        )}
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-slate-800 text-sm md:text-base leading-tight">
                            {cleanName}
                          </h3>
                          {!isItemWithVariations(item) && (
                            <span className="font-bold text-accent text-sm md:text-base whitespace-nowrap flex-shrink-0">
                              {formatPrice(item.price)}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-xs text-slate-500 leading-relaxed mb-1.5">
                            {item.description}
                          </p>
                        )}
                        {isItemWithVariations(item) && (
                          <ul className="mt-1 space-y-0.5">
                            {item.variations.map((v) => (
                              <li 
                                key={v.label} 
                                className="flex items-center justify-between gap-2"
                              >
                                <span className="text-slate-700 text-xs font-medium">{v.label}</span>
                                <span className="font-semibold text-accent text-xs whitespace-nowrap">
                                  {formatPrice(v.price)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Drinks Section - positioned in column 2 */}
              {drinks.length > 0 && (
                <div className="pb-4 border-b border-slate-200/40 md:col-start-2">
                  <div className="flex gap-3 items-start">
                    {/* Drinks Image - compact, aligned to top */}
                    {drinksImage && (
                      <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(45,35,31,0.06)] bg-slate-50 ring-1 ring-slate-200/30 self-start">
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
                    {/* Drinks Content */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      <h3 className="font-semibold text-slate-800 text-sm md:text-base mb-1">Drinks</h3>
                      <ul className="space-y-0.5">
                        {drinks.map((d) => (
                          <li 
                            key={d.label} 
                            className="flex items-center justify-between gap-2"
                          >
                            <span className="text-slate-700 text-xs font-medium">
                              {d.label}
                            </span>
                            <span className="font-semibold text-accent text-xs whitespace-nowrap">
                              {formatPrice(d.price)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact info */}
              <div className="pt-2 pb-3 border-t border-slate-200/40 md:col-span-2">
                <div className="flex flex-col items-center justify-center gap-0 text-[0.7rem] text-slate-500 text-center" style={{ lineHeight: '1.2' }}>
                  {chefSignature && (
                    <p className="text-slate-600 font-medium italic text-[0.7rem]" style={{ marginBottom: 0, paddingBottom: 0, lineHeight: '1.2' }}>{chefSignature}</p>
                  )}
                  {(contactAddress || contactPhone) && (
                    <div className="flex flex-wrap items-center justify-center gap-x-3 text-[0.7rem]" style={{ paddingBottom: 0, marginBottom: 0, marginTop: '2px', lineHeight: '1.2' }}>
                      {contactAddress && (
                        <span className="text-slate-500">{contactAddress}</span>
                      )}
                      {contactPhone && (
                        <a 
                          href={`tel:${contactPhone.replace(/[^0-9+]/g, "")}`} 
                          className="text-accent hover:text-accent/80 font-medium transition-colors duration-200"
                        >
                          {contactPhone}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
