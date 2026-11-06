import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/seo";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/"] },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: ["/api/", "/admin/"] },
    ],
    sitemap: `${siteConfig.website}/sitemap.xml`,
    host: siteConfig.website,
  };
}
