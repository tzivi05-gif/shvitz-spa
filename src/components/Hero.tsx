import Image from "next/image";
type HeroImage = {
  src: string;
  alt: string;
};

type HeroProps = {
  heroImage: HeroImage;
};

export default function Hero({ heroImage }: HeroProps) {
  return (
    <section className="hero-glow relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),transparent_60%)]" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20 xl:flex-row xl:items-center">
        <div className="relative z-10 order-2 flex-1">
          <p className="text-sm uppercase tracking-[0.18em] text-accent">
            Shvitz — Monsey, NY
          </p>
          <h1 className="hero-serif hero-title mt-6">
            A Retreat into
            <br />
            Pure Relaxation
          </h1>
          <p className="hero-lead mt-6 max-w-xl">
            Discover a serene retreat in the heart of Monsey. Shvitz blends
            time-honored heat therapy with modern design to restore your
            body, quiet your mind, and elevate your everyday.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              className="button-primary text-sm uppercase tracking-[0.14em]"
              href="#contact"
            >
              Book your session
            </a>
            <a
              className="button-secondary text-sm uppercase tracking-[0.14em] text-accent"
              href="#services"
            >
              View amenities
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-xs uppercase tracking-[0.14em] text-accent">
            <span>Heat + healing</span>
            <span>Cold + clarity</span>
            <span>Quiet renewal</span>
          </div>
        </div>
        <div className="relative z-10 order-1 flex-1">
          <div className="flex h-full items-start justify-center pt-6 md:justify-end md:pt-10">
            <div className="hero-image-shell relative w-full max-w-md overflow-hidden bg-white/60 shadow-[0_12px_36px_rgba(43,33,28,0.14)] backdrop-blur md:max-w-lg">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                width={960}
                height={720}
                className="hero-image h-[420px] w-full object-cover transition duration-700 md:h-[460px]"
                style={{ filter: "url(#hero-sharpen)" }}
                priority
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1280px) 520px, (min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/0 to-black/0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
