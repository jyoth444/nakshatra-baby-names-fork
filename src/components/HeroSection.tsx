"use client";

/**
 * HeroSection - Landing section with title, description, and CTA.
 * Features a gradient background with animated stars pattern.
 */

import { Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-yellow-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="text-center">
          {/* Icon badge */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg shadow-orange-200/50">
            <Star className="h-8 w-8 text-white" fill="white" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            <span className="block">Nakshatra</span>
            <span className="block bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Baby Names Finder
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
            Discover the perfect name for your baby based on Vedic astrology.
            Enter birth details to find the Nakshatra, Rashi, and recommended
            starting syllables for auspicious baby names.
          </p>

          {/* Feature pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "27 Nakshatras",
              "Vedic Calculations",
              "AI-Powered Suggestions",
              "1000+ Names",
            ].map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/80 dark:bg-white/10 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm backdrop-blur-sm"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                {feature}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-10">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200/50 hover:from-orange-600 hover:to-amber-600 text-base px-8 py-6 rounded-xl"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Find Your Baby&apos;s Name
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
