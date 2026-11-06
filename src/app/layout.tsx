import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig, localKeywords } from "@/data/seo";
import "./globals.css";
import SiteAnalytics from "@/components/SiteAnalytics";
import { amenities } from "@/data/amenities";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["300", "400"],
});

const metaTitle = `Men’s Sauna & Cold Plunge in Monsey | The Shvitz`;
const metaDescription = "The Shvitz in Monsey, Rockland County: dry and wet saunas, cold plunge, Jacuzzi and lounge. $75 public entry for men 18+. Contact us for current hours.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.website),
  title: {
    default: metaTitle,
    template: `%s | ${siteConfig.spaName}`,
  },
  description: metaDescription,
  keywords: localKeywords,
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: "website",
    locale: "en_US",
    url: siteConfig.website,
    siteName: siteConfig.spaName,
    images: [{ url: "/images/shvitz-01.jpg", width: 1200, height: 900, alt: "The Shvitz lounge in Monsey" }],
  },
  twitter: {
    card: "summary_large_image",
    title: metaTitle,
    description: metaDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.website,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=spa"
        />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DaySpa",
              "@id": `${siteConfig.website}/#organization`,
              name: siteConfig.spaName,
              description: metaDescription,
              url: siteConfig.website,
              telephone: `+1${siteConfig.phone.replace(/\D/g, "")}`,
              areaServed: [{ "@type": "City", name: "Monsey", containedInPlace: { "@type": "AdministrativeArea", name: "Rockland County, New York" } }],
              knowsAbout: amenities.map(a => a.title),
              hasOfferCatalog: { "@type": "OfferCatalog", name: "The Shvitz amenities", itemListElement: amenities.map(a => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: a.title, description: a.intro, url: `${siteConfig.website}/amenities/${a.slug}`, provider: { "@id": `${siteConfig.website}/#organization` } } })) },
              makesOffer: { "@type": "Offer", name: "Public entry for men ages 18+", price: "75", priceCurrency: "USD", url: `${siteConfig.website}/#pricing`, description: "Public hours are for men ages 18 and over. Contact for current hours." },
              address: undefined,
              geo: undefined,
              openingHoursSpecification: undefined,
              priceRange: "$$",
              image: `${siteConfig.website}/images/shvitz-calm-1.jpg`,
            }),
          }}
        />
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
