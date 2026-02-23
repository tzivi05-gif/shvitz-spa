"use client";

import Image from "next/image";

export type GalleryItem = {
  src: string;
  alt: string;
  modalClass?: string;
  /** When true, display only the top-left quadrant (e.g. for 2x2 collage images). */
  cropTopLeft?: boolean;
  /** Trim this percentage from each edge (e.g. 10 = 10% top/right/bottom/left) to remove white/black borders. Default 10. */
  cropBorders?: number;
};

type GalleryProps = {
  gallery: GalleryItem[];
  extraGallery: GalleryItem[];
  onSelectImage: (image: GalleryItem) => void;
};

export default function Gallery({
  gallery,
  extraGallery,
  onSelectImage,
}: GalleryProps) {
  const images = [...gallery, ...extraGallery];

  return (
    <section id="experience" className="section-block relative overflow-hidden">
      <div className="section-shell relative z-10 mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="section-label">Gallery</p>
        </div>

        <div className="section-grid mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((image, index) => {
            const { src, alt } = image;

            return (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => onSelectImage(image)}
                aria-label={alt}
                className="surface-card gallery-card group relative aspect-square overflow-hidden rounded-3xl border border-white/70 ring-1 ring-accent-soft transition-all duration-300 hover:shadow-[0_18px_50px_rgba(53,66,77,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {/* Stable square container for next/image fill */}
                <div className="relative size-full overflow-hidden transition-transform duration-300 ease-out group-hover:scale-105">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover object-[center_55%]"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>

                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Caption */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-2 text-left text-xs uppercase tracking-[0.14em] text-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {alt}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}