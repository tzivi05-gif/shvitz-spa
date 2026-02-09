"use client";

import Image from "next/image";

export type GalleryItem = {
  src: string;
  alt: string;
  modalClass?: string;
  /** When true, display only the top-left quadrant (e.g. for 2x2 collage images). */
  cropTopLeft?: boolean;
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
  const allImages = [...gallery, ...extraGallery];

  return (
    <section
      id="experience"
      className="section-block relative overflow-hidden"
    >
      <div className="section-shell relative z-10 mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-label">Gallery</p>
          </div>
        </div>

        <div className="section-grid mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {allImages.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              className="surface-card gallery-card group relative overflow-hidden rounded-3xl border border-white/70 ring-1 ring-accent-soft transition hover:shadow-[0_18px_50px_rgba(53,66,77,0.14)]"
              onClick={() => onSelectImage(image)}
              aria-label={image.alt}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-0 transition group-hover:opacity-100" />

              {image.cropTopLeft ? (
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={640}
                    height={480}
                    className="absolute left-0 top-0 h-64 w-full object-cover object-left-top transition duration-700 group-hover:scale-105"
                    style={{ width: "320%", height: "320%", objectFit: "cover", objectPosition: "0 0" }}
                    loading="lazy"
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
                  />
                </div>
              ) : (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={640}
                  height={480}
                  className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
                />
              )}

              <div className="absolute bottom-4 left-4 right-4 translate-y-2 text-left text-xs uppercase tracking-[0.14em] text-white/90 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                {image.alt}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}