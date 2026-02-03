import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = DM_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
