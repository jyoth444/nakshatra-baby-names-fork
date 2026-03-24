"use client";

import { useState, useRef } from "react";
import { Star, Sparkles, Heart, Wand2, ChevronDown, ExternalLink } from "lucide-react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import BirthDetailsForm from "@/components/BirthDetailsForm";
import NakshatraResultCard from "@/components/NakshatraResultCard";
import NameSuggestionGrid from "@/components/NameSuggestionGrid";
import AINameGenerator from "@/components/AINameGenerator";
import FavouriteNames from "@/components/FavouriteNames";
import { useFavourites } from "@/hooks/useFavourites";
import type { NakshatraResult } from "@/utils/nakshatraCalculator";
import { buildResultId } from "@/utils/astrology";

type ActiveTab = "names" | "ai" | "favourites";

export default function CalculateNakshatraClient() {
  const [result, setResult] = useState<NakshatraResult | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("names");
  const formRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const { favourites, toggleFavourite, isFavourite, clearFavourites } =
    useFavourites();

  const handleGetStarted = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleResult = (nakshatraResult: NakshatraResult) => {
    setResult(nakshatraResult);
    setActiveTab("names");
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const tabs: { key: ActiveTab; label: string; icon: typeof Star }[] = [
    { key: "names", label: "Name Suggestions", icon: Star },
    { key: "ai", label: "AI Generator", icon: Wand2 },
    {
      key: "favourites",
      label: `My Favourites${favourites.length > 0 ? ` (${favourites.length})` : ""}`,
      icon: Heart,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <HeroSection onGetStarted={handleGetStarted} />

      {/* Scroll hint */}
      <div className="flex justify-center py-4 -mt-2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-orange-400/60" />
      </div>

      {/* Form Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Enter Birth Details
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              We use high-precision Vedic calculations (B.V. Raman Ayanamsa) to
              determine the exact Nakshatra.
            </p>
          </div>
          <div ref={formRef}>
            <BirthDetailsForm onResult={handleResult} />
          </div>
        </div>
      </section>

      {/* Result + Name Suggestions */}
      {result && (
        <section
          ref={resultRef}
          className="py-10 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="mx-auto max-w-7xl space-y-10">
            {/* Result summary banner */}
            <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 p-px shadow-lg">
              <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm font-medium text-orange-500 uppercase tracking-wide mb-1">
                      Calculation Complete
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Nakshatra:{" "}
                      <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                        {result.nakshatra}
                      </span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      Rashi: <strong>{result.rashi}</strong> &bull; Pada:{" "}
                      <strong>{result.pada} of 4</strong> &bull; Deity:{" "}
                      <strong>{result.deity}</strong>
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mr-1">
                        Your syllables:
                      </p>
                      {result.syllables.map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center rounded-lg bg-orange-500 text-white text-base font-bold px-4 py-1.5 shadow"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    {/* Link to full result page */}
                    <Link
                      href={`/result/${buildResultId(result.nakshatra, result.pada)}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-100 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Full {result.nakshatra} Pada {result.pada} Report
                    </Link>
                  </div>
                </div>

                {/* Full nakshatra result card */}
                <NakshatraResultCard result={result} />
              </div>
            </div>

            {/* Tabs */}
            <div>
              <div className="border-b border-gray-200 dark:border-gray-800">
                <nav className="-mb-px flex gap-1 sm:gap-4 overflow-x-auto">
                  {tabs.map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                        activeTab === key
                          ? "border-orange-500 text-orange-600 dark:text-orange-400"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="pt-8">
                {activeTab === "names" && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Names for{" "}
                        <span className="text-orange-500">{result.nakshatra}</span>{" "}
                        Nakshatra
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Showing names that start with the auspicious syllables for
                        your Nakshatra. Toggle syllables to refine the list.
                      </p>
                    </div>
                    <NameSuggestionGrid
                      syllables={result.allSyllables}
                      isFavourite={isFavourite}
                      onToggleFavourite={toggleFavourite}
                    />
                  </div>
                )}

                {activeTab === "ai" && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        AI-Powered Name Generator
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Generate unique names using AI based on your Nakshatra
                        syllable{" "}
                        <strong className="text-gray-700 dark:text-gray-200">
                          &ldquo;{result.syllables[0]}&rdquo;
                        </strong>
                        . Requires an OpenAI API key for AI results; falls back
                        to curated suggestions otherwise.
                      </p>
                    </div>
                    <AINameGenerator
                      defaultSyllable={result.syllables[0]}
                      isFavourite={isFavourite}
                      onToggleFavourite={toggleFavourite}
                    />
                  </div>
                )}

                {activeTab === "favourites" && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Heart className="h-5 w-5 text-red-500" fill="currentColor" />
                        My Favourite Names
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Names you have saved by clicking the heart icon. Stored
                        locally in your browser — export them anytime.
                      </p>
                    </div>
                    <FavouriteNames
                      favourites={favourites}
                      onToggleFavourite={toggleFavourite}
                      onClearAll={clearFavourites}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty state — before calculation */}
      {!result && (
        <section className="py-16 px-4 text-center">
          <div className="mx-auto max-w-md">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 dark:bg-orange-900/30">
              <Star className="h-8 w-8 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Your Nakshatra results will appear here
            </h3>
            <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
              Fill in the birth details above and click &ldquo;Calculate
              Nakshatra&rdquo; to see the birth star, Rashi, Pada, and
              auspicious name syllables.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
