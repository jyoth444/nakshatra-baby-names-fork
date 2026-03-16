"use client";

/**
 * Main page - Nakshatra Baby Names Finder
 * Orchestrates all sections: Hero, Birth Details, Nakshatra Result,
 * Name Suggestions, Name Search, AI Generator, and Favourites.
 */

import { useState, useRef } from "react";
import { Star, Baby, Search, Sparkles, Heart, ChevronUp } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import BirthDetailsForm from "@/components/BirthDetailsForm";
import NakshatraResultCard from "@/components/NakshatraResultCard";
import NameSuggestionGrid from "@/components/NameSuggestionGrid";
import NameMeaningSearch from "@/components/NameMeaningSearch";
import AINameGenerator from "@/components/AINameGenerator";
import FavouriteNames from "@/components/FavouriteNames";
import { useFavourites } from "@/hooks/useFavourites";
import type { NakshatraResult } from "@/utils/nakshatraCalculator";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [nakshatraResult, setNakshatraResult] =
    useState<NakshatraResult | null>(null);
  const [activeSection, setActiveSection] = useState<string>("birth-details");

  // Refs for scroll-to-section
  const birthDetailsRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const favouritesRef = useRef<HTMLDivElement>(null);

  // Favourites hook
  const {
    favourites,
    isFavourite,
    toggleFavourite,
    clearFavourites,
  } = useFavourites();

  // Handle nakshatra calculation result
  const handleNakshatraResult = (result: NakshatraResult) => {
    setNakshatraResult(result);
    // Scroll to suggestions after a short delay
    setTimeout(() => {
      suggestionsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  // Scroll to birth details section from hero
  const handleGetStarted = () => {
    birthDetailsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Navigation items
  const navItems = [
    { id: "birth-details", label: "Birth Details", icon: Star, ref: birthDetailsRef },
    { id: "suggestions", label: "Suggestions", icon: Baby, ref: suggestionsRef },
    { id: "search", label: "Search", icon: Search, ref: searchRef },
    { id: "ai-generate", label: "AI Generate", icon: Sparkles, ref: aiRef },
    { id: "favourites", label: "Favourites", icon: Heart, ref: favouritesRef },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  item.ref.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.id === "favourites" && favourites.length > 0 && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {favourites.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-16">
        {/* Section 1: Birth Details Input */}
        <section ref={birthDetailsRef} id="birth-details" className="scroll-mt-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Calculate Nakshatra
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Enter the birth details to find the Nakshatra and recommended
              starting syllables
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Birth Details Form */}
            <BirthDetailsForm onResult={handleNakshatraResult} />

            {/* Nakshatra Result Card */}
            {nakshatraResult ? (
              <NakshatraResultCard result={nakshatraResult} />
            ) : (
              <div className="w-full max-w-lg mx-auto rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 p-12 text-center">
                <Star className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 dark:text-gray-500 text-lg">
                  Your Nakshatra details will appear here
                </p>
                <p className="text-sm text-gray-300 dark:text-gray-600 mt-1">
                  Fill in the birth details and click calculate
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Section 2: Name Suggestions */}
        <section ref={suggestionsRef} id="suggestions" className="scroll-mt-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Baby Name Suggestions
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {nakshatraResult
                ? `Names matching Nakshatra "${nakshatraResult.nakshatra}" syllables`
                : "Browse and filter baby names from our database"}
            </p>
          </div>

          <NameSuggestionGrid
            syllables={nakshatraResult?.allSyllables || []}
            isFavourite={isFavourite}
            onToggleFavourite={toggleFavourite}
          />
        </section>

        {/* Section 3: Name Meaning Search */}
        <section ref={searchRef} id="search" className="scroll-mt-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Name Meaning Finder
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Look up the meaning of any baby name
            </p>
          </div>

          <NameMeaningSearch
            isFavourite={isFavourite}
            onToggleFavourite={toggleFavourite}
          />
        </section>

        {/* Section 4: AI Name Generator */}
        <section ref={aiRef} id="ai-generate" className="scroll-mt-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              AI Name Generator
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Generate unique baby names powered by AI
            </p>
          </div>

          <AINameGenerator
            defaultSyllable={nakshatraResult?.syllables[0]}
            isFavourite={isFavourite}
            onToggleFavourite={toggleFavourite}
          />
        </section>

        {/* Section 5: Favourite Names */}
        <section ref={favouritesRef} id="favourites" className="scroll-mt-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Favourite Names
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Your saved baby names collection
            </p>
          </div>

          <FavouriteNames
            favourites={favourites}
            onToggleFavourite={toggleFavourite}
            onClearAll={clearFavourites}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Star className="h-5 w-5 text-orange-500" fill="currentColor" />
              <span className="text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Nakshatra Baby Names Finder
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Find the perfect name for your baby based on Vedic astrology.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              &copy; {new Date().getFullYear()} Nakshatra Baby Names Finder.
              Built with love and tradition.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <Button
        onClick={scrollToTop}
        size="icon"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg h-12 w-12"
      >
        <ChevronUp className="h-5 w-5" />
      </Button>
    </div>
  );
}
