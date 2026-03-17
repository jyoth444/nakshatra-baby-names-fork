import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Nakshatra Baby Names | Indian Baby Names with Vedic Astrology",
    template: "%s | Nakshatra Baby Names",
  },
  description:
    "Discover 10,000+ Indian baby names based on Vedic astrology. Find auspicious baby names by Nakshatra, starting syllable, or meaning. Sanskrit, Telugu, Hindu names with full meanings.",
  keywords: [
    "nakshatra baby names",
    "indian baby names",
    "vedic astrology names",
    "sanskrit baby names",
    "hindu baby names",
    "telugu baby names",
    "baby name meaning",
    "nakshatra name calculator",
  ],
  metadataBase: new URL("https://nakshatranames.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nakshatranames.com",
    siteName: "Nakshatra Baby Names",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nakshatranames",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
