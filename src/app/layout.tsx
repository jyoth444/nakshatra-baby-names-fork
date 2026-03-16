import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Nakshatra Baby Names Finder | Vedic Astrology Baby Names",
  description:
    "Find the perfect baby name based on Vedic astrology. Calculate Nakshatra, Rashi, and Pada from birth details and discover auspicious baby names with their meanings.",
    verification: {
    google: "2UiSM7E-Bjy833fB6gy1OO0Ynn5kY-hwDr1mMrmnYoA",
  },
  keywords: [
    "nakshatra",
    "baby names",
    "vedic astrology",
    "rashi",
    "indian baby names",
    "hindu baby names",
    "name meaning",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
