import type { Metadata } from "next";
import CalculateNakshatraClient from "./CalculateNakshatraClient";

export const metadata: Metadata = {
  title: "Calculate Nakshatra | Find Your Baby's Birth Star & Auspicious Names",
  description:
    "Enter your baby's date and time of birth to instantly calculate their Nakshatra (birth star), Rashi, and Pada using high-precision Vedic astrology. Get auspicious name syllables and hundreds of matching Indian baby names.",
  keywords: [
    "nakshatra calculator",
    "calculate nakshatra",
    "birth star calculator",
    "vedic astrology baby names",
    "janma nakshatra",
    "rashi calculator",
    "pada calculator",
    "auspicious baby names",
    "indian baby names nakshatra",
  ],
  openGraph: {
    title: "Calculate Nakshatra | Find Your Baby's Birth Star",
    description:
      "Enter birth date and time to calculate Nakshatra, Rashi, and Pada. Get auspicious name syllables and matching Indian baby names instantly.",
    type: "website",
    url: "https://nakshatranames.com/calculate-nakshatra",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculate Nakshatra | Find Your Baby's Birth Star",
    description:
      "Free Nakshatra calculator using B.V. Raman Ayanamsa. Instantly find your baby's birth star and auspicious name syllables.",
  },
};

export default function CalculateNakshatraPage() {
  return <CalculateNakshatraClient />;
}
