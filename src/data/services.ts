export type Service = {
  title: string;
  description: string;
  image?: string;
  imagePosition?: string;
};

export const services: Service[] = [
  { title: "Dry Sauna", description: "Feel tension melt away in our classic dry sauna, designed for detox, circulation, and deep relaxation.", image: "/images/shvitz-09.png" },
  { title: "Steam Room", description: "Let aromatic steam cleanse your body and open your breath.", image: "/images/steam-room.png" },
  { title: "Cold Plunge", description: "Reset your system with invigorating cold immersion therapy.", image: "/images/cold-plunge.png" },
  { title: "Jacuzzi", description: "Soak in warmth and let stress dissolve.", image: "/images/hot-tub-hero.png" },
  { title: "Lounge", description: "Unwind in a refined, comfortable space between sessions.", image: "/images/shvitz-calm-2.jpg" },
];
