type GiveawayModalProps = {
  show: boolean;
  contactPhone: string;
  contactLocation: string;
  whatsappLink: string;
  onClose: () => void;
};

export default function GiveawayModal({
  show,
  contactPhone,
  contactLocation,
  whatsappLink,
  onClose,
}: GiveawayModalProps) {
  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-[#2B211C]/55 px-6 py-10"
      role="dialog"
      aria-modal="true"
      aria-label="Giveaway announcement"
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-accent-soft bg-[#FDF7F1] shadow-[0_30px_90px_rgba(25,18,14,0.35)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full border border-accent bg-white px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#2B211C] hover-border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label="Close giveaway popup"
        >
          Close
        </button>
        <div className="grid gap-6 px-8 pb-8 pt-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-accent">
              The Shvitz
            </p>
            <h2 className="hero-serif text-2xl text-[#2B211C] md:text-3xl">
              The Shvitz is doing an exciting giveaway!
            </h2>
            <p className="text-sm text-slate-600">
              A VIP night for you and 5 friends.
            </p>
            <p className="text-sm text-slate-600">
              Includes a professional bezem massage for each, drinks, &amp;
              hookah.
            </p>
            <p className="text-sm text-slate-600">
              Repost this on your status, as well as our WhatsApp link and
              get an entry into the giveaway raffle for every 50 views!
            </p>
          </div>
          <div className="space-y-4 rounded-3xl border border-accent-soft bg-white/90 p-6">
            <p className="text-lg font-semibold text-slate-700">
              Let&apos;s get Shvitzing!
            </p>
            <p className="text-sm text-slate-600">
              Call us: {contactPhone}
            </p>
            <p className="text-sm text-slate-600">
              {contactLocation} 10952
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                className="button-secondary text-xs uppercase tracking-[0.14em] text-accent"
                href="#contact"
                onClick={onClose}
              >
                Contact form
              </a>
              <a
                className="button-secondary text-xs uppercase tracking-[0.14em] text-accent"
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp link
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
