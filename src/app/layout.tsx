import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Shvitz — Monsey",
  description:
    "Discover a serene retreat in Monsey. Shvitz blends time-honored heat therapy with modern design to restore your body, quiet your mind, and elevate your everyday.",
  keywords: [
    "Shvitz",
    "sauna",
    "steam room",
    "cold plunge",
    "Monsey",
    "spa",
    "wellness",
    "recovery",
  ],
  openGraph: {
    title: "Shvitz — Monsey",
    description:
      "Discover a serene retreat in Monsey. Shvitz blends time-honored heat therapy with modern design to restore your body, quiet your mind, and elevate your everyday.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shvitz — Monsey",
    description:
      "Discover a serene retreat in Monsey. Shvitz blends time-honored heat therapy with modern design to restore your body, quiet your mind, and elevate your everyday.",
  },
  robots: {
    index: true,
    follow: true,
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
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "DaySpa",
              name: "Shvitz",
              address: {
                "@type": "PostalAddress",
                streetAddress: "10 Sands Point Rd",
                addressLocality: "Monsey",
                addressRegion: "NY",
                postalCode: "10952",
                addressCountry: "US",
              },
              telephone: "+1-845-594-9120",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
