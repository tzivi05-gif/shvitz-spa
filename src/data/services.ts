export type Service = {
  title: string;
  slug: string;
  description: string;
  image?: string;
  imagePosition?: string;
};

export const services: Service[] = [
  { slug: "dry-sauna", title: "Dry Sauna", description: "Enjoy the warmth of our wood-lined dry sauna.", image: "/images/shvitz-09.png" },
  { slug: "wet-sauna", title: "Wet Sauna", description: "Relax in the warmth of our wet sauna.", image: "/images/steam-room.png" },
  { slug: "cold-plunge", title: "Cold Plunge", description: "Cool off between sauna sessions in the cold plunge.", image: "/images/cold-plunge-photo.jpeg" },
  { slug: "jacuzzi", title: "Jacuzzi", description: "Soak in warmth and let stress dissolve.", image: "/images/hot-tub-hero.png" },
  { slug: "lounge", title: "Lounge", description: "Unwind in a refined, comfortable space between sessions.", image: "/images/shvitz-01.jpg" },
  { slug: "outdoor-pool", title: "Outdoor Pool (Seasonal)", description: "Enjoy our outdoor pool during the season. Contact us for current availability." },
];
