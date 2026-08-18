import type { Metadata } from "next";
import { Instrument_Serif, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const body = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const heading = Instrument_Serif({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const heading_hero = Instrument_Serif({
  variable: "--font-heading-hero",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://daveboutin.ca"),
  title: { default: "Dave Boutin — Technology Lead & Senior Developer", template: "%s" },
  description:
    "Technology Lead at Freshwater Creative. I lead teams and build durable digital products from complex requirements.",
  icons: {
    icon: [{ url: "/images/favicon.png", type: "image/png" }],
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  openGraph: {
    type: "website", url: "https://daveboutin.ca", siteName: "Dave Boutin",
    title: "Dave Boutin — Technology Lead & Senior Developer",
    description: "Technology leadership, senior development, and durable digital products.",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Dave Boutin — Technology Lead & Senior Developer" }],
  },
  twitter: { card: "summary_large_image", title: "Dave Boutin — Technology Lead & Senior Developer", description: "Technology leadership, senior development, and durable digital products.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${heading.variable} ${heading_hero.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
