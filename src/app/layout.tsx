import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig, localKeywords } from "@/data/seo";
import "./globals.css";

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

const metaTitle = `${siteConfig.spaNameShort} — ${siteConfig.city} | ${siteConfig.spaName} Day Spa`;
const metaDescription = `${siteConfig.spaName} in ${siteConfig.city}, ${siteConfig.state}: a serene day spa blending heat therapy, steam, and cold plunge. Book your session for relaxation and recovery.`;

export const metadata: Metadata = {
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
              telephone: `+1-${siteConfig.phone.replace(/\D/g, "")}`,
              address: undefined,
              geo: undefined,
              openingHoursSpecification: undefined,
              priceRange: "$$",
              image: undefined,
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
