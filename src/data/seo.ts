/**
 * Central SEO & business info. Replace placeholders with your spa details.
 * Used for metadata, JSON-LD, and local SEO content across the site.
 */
export const siteConfig = {
  /** Your spa / business name (e.g. "The Shvitz") */
  spaName: "The Shvitz",
  /** Short name for titles (e.g. "Shvitz") */
  spaNameShort: "Shvitz",
  /** City (e.g. "Monsey") */
  city: "Monsey",
  /** State code (e.g. "NY") */
  state: "NY",
  /** Full phone, display format (e.g. "845-594-9120") */
  phone: "845-594-9120",
  /** Full street address (e.g. "10 Sands Point Rd, Monsey, NY 10952") */
  address: "10 Sands Point Rd, Monsey, NY 10952",
  /** Street only for schema (e.g. "10 Sands Point Rd") */
  streetAddress: "10 Sands Point Rd",
  postalCode: "10952",
  /** Canonical website URL (e.g. "https://theshvitz.com") */
  website: "https://theshvitz.com",
} as const;

/** Local SEO keywords derived from config */
export const localKeywords = [
  siteConfig.spaNameShort,
  "shvitz",
  "sauna",
  "steam room",
  "cold plunge",
  "day spa",
  "wellness",
  "heat therapy",
  "recovery",
  "Monsey spa",
  `${siteConfig.city} spa`,
  `${siteConfig.city} sauna`,
  `${siteConfig.state} day spa`,
];
