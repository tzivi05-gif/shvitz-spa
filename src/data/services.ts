export type Service = {
  title: string;
  description: string;
  image?: string;
  imagePosition?: string;
};

export const services: Service[] = [
  { title: "Dry Sauna", description: "Enjoy the warmth of our wood-lined dry sauna.", image: "/images/shvitz-09.png" },
  { title: "Wet Sauna", description: "Relax in the warmth of our wet sauna.", image: "/images/steam-room.png" },
  { title: "Cold Plunge", description: "Cool off between sauna sessions in the cold plunge.", image: "/images/cold-plunge-photo.jpeg" },
  { title: "Jacuzzi", description: "Soak in warmth and let stress dissolve.", image: "/images/hot-tub-hero.png" },
  { title: "Lounge", description: "Unwind in a refined, comfortable space between sessions.", image: "/images/shvitz-01.jpg" },
  { title: "Outdoor Pool (Seasonal)", description: "Enjoy our outdoor pool during the season. Contact us for current availability." },
];
