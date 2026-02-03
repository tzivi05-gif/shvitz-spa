import Image from "next/image";

export type GalleryItem = {
  src: string;
  alt: string;
  modalClass?: string;
};

type GalleryProps = {
  displayedGallery: GalleryItem[];
  showAllPhotos: boolean;
  onToggleShowAll: () => void;
  onSelectImage: (image: GalleryItem) => void;
};

export default function Gallery({
  displayedGallery,
  showAllPhotos,
  onToggleShowAll,
  onSelectImage,
}: GalleryProps) {
  return (
    <section
      id="experience"
      className="section-block bg-gradient-to-b from-[#F6EDE3] to-[#F0E1D6]/70"
    >
      <div className="section-shell mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-label">
              Gallery
            </p>
          </div>
          <button
            type="button"
            className="button-secondary text-xs uppercase tracking-[0.14em] text-accent"
            onClick={onToggleShowAll}
            aria-pressed={showAllPhotos}
          >
            {showAllPhotos ? "Show fewer" : "More photos"}
          </button>
        </div>
        <div className="section-grid mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayedGallery.map((image) => (
            <button
              key={image.src}
              type="button"
              className="surface-card gallery-card group relative overflow-hidden rounded-3xl border border-white/70 ring-1 ring-accent-soft transition hover:shadow-[0_18px_50px_rgba(53,66,77,0.14)]"
              onClick={() => onSelectImage(image)}
              aria-label={image.alt}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-0 transition group-hover:opacity-100" />
              <Image
                src={image.src}
                alt={image.alt}
                width={640}
                height={480}
                className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
                sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
              />
              <div className="absolute bottom-4 left-4 right-4 translate-y-2 text-left text-xs uppercase tracking-[0.14em] text-white/90 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                {image.alt}
              </div>
            </button>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-500">
          Some images in this gallery are AI-generated.
        </p>
      </div>
    </section>
  );
}
