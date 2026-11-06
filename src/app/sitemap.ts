import type { MetadataRoute } from "next";
import { amenities } from "@/data/amenities";
import { siteConfig } from "@/data/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.website, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.website}/visit`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.website}/amenities`, changeFrequency: "monthly", priority: 0.8 },
    ...amenities.map(a => ({ url: `${siteConfig.website}/amenities/${a.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
