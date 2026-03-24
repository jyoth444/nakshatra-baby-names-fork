"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, Filter, Users } from "lucide-react";
import namesData from "@/data/names.json";
import type { BabyName } from "@/lib/types";
import NameCard from "@/components/shared/NameCard";

const allNames = namesData as BabyName[];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState<"all" | "boy" | "girl">("all");
  const [originFilter, setOriginFilter] = useState("all");
  const [nakshatraFilter, setNakshatraFilter] = useState("all");

  const origins = useMemo(() => {
    const set = new Set(allNames.map((n) => n.origin));
    return ["all", ...Array.from(set).sort()];
  }, []);

  const nakshatras = useMemo(() => {
    const set = new Set(allNames.flatMap((n) => n.nakshatra));
    return ["all", ...Array.from(set).sort()];
  }, []);

  const results = useMemo(() => {
    if (!query && genderFilter === "all" && originFilter === "all" && nakshatraFilter === "all") return [];

    return allNames.filter((name) => {
      const matchesQuery =
        !query ||
        name.name.toLowerCase().includes(query.toLowerCase()) ||
        name.meaning.toLowerCase().includes(query.toLowerCase());

      const matchesGender =
        genderFilter === "all" || name.gender === genderFilter;

      const matchesOrigin =
        originFilter === "all" || name.origin === originFilter;

      const matchesNakshatra =
        nakshatraFilter === "all" || name.nakshatra.includes(nakshatraFilter);

      return matchesQuery && matchesGender && matchesOrigin && matchesNakshatra;
    });
  }, [query, genderFilter, originFilter, nakshatraFilter]);

  const hasFilters = query || genderFilter !== "all" || originFilter !== "all" || nakshatraFilter !== "all";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-b border-orange-100">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Search Indian Baby Names
          </h1>
          <p className="mt-3 text-gray-600">
            Search through 10,000+ Indian baby names by name or meaning
          </p>

          {/* Search bar */}
          <div className="mt-8 relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or meaning... (e.g. Aarav, peaceful, light)"
              className="w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-12 py-4 text-base shadow-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <Filter className="h-4 w-4" />
            Filters:
          </div>

          {/* Gender Filter */}
          <div className="flex gap-1.5">
            {(["all", "boy", "girl"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGenderFilter(g)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  genderFilter === g
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-700"
                }`}
              >
                {g === "all" ? "All Genders" : g === "boy" ? "Boy Names" : "Girl Names"}
              </button>
            ))}
          </div>

          {/* Origin Filter */}
          <select
            value={originFilter}
            onChange={(e) => setOriginFilter(e.target.value)}
            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 focus:border-orange-400 focus:outline-none"
          >
            {origins.map((o) => (
              <option key={o} value={o}>
                {o === "all" ? "All Origins" : o}
              </option>
            ))}
          </select>

          {/* Nakshatra Filter */}
          <select
            value={nakshatraFilter}
            onChange={(e) => setNakshatraFilter(e.target.value)}
            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-600 focus:border-orange-400 focus:outline-none"
          >
            {nakshatras.map((n) => (
              <option key={n} value={n}>
                {n === "all" ? "All Nakshatras" : `${n} Nakshatra`}
              </option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={() => { setQuery(""); setGenderFilter("all"); setOriginFilter("all"); setNakshatraFilter("all"); }}
              className="ml-auto text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1"
            >
              <X className="h-3.5 w-3.5" />
              Clear all
            </button>
          )}
        </div>

        {/* Results */}
        {hasFilters ? (
          <>
            <div className="flex items-center gap-2 mb-5">
              <Users className="h-5 w-5 text-gray-400" />
              <p className="text-sm text-gray-600">
                Found <strong>{results.length}</strong> names
                {query && <> matching &quot;<strong>{query}</strong>&quot;</>}
              </p>
            </div>

            {results.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {results.slice(0, 100).map((name) => (
                  <NameCard key={name.name} name={name} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No names found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try a different search term or clear the filters
                </p>
              </div>
            )}
          </>
        ) : (
          /* Default state: Popular searches */
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Searches</h2>
            <div className="flex flex-wrap gap-3 mb-10">
              {["Aarav", "Vihaan", "Aadhya", "Ananya", "Arjun", "Kavya", "Ganesh", "Lakshmi", "Ram", "Priya"].map(
                (name) => (
                  <button
                    key={name}
                    onClick={() => setQuery(name)}
                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-colors shadow-sm"
                  >
                    {name}
                  </button>
                )
              )}
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-6">Browse by Meaning</h2>
            <div className="flex flex-wrap gap-3">
              {["peaceful", "divine", "victory", "light", "goddess", "lord", "beautiful", "knowledge", "moon", "sun"].map(
                (meaning) => (
                  <button
                    key={meaning}
                    onClick={() => setQuery(meaning)}
                    className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-100 transition-colors"
                  >
                    {meaning}
                  </button>
                )
              )}
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {[
                { title: "Browse by Nakshatra", desc: "Find names for all 27 Nakshatras", href: "/nakshatra/ashwini" },
                { title: "Browse by Letter", desc: "Find names starting with a syllable", href: "/names/a" },
                { title: "Trending Names", desc: "See popular Indian baby names 2025", href: "/" },
              ].map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:border-orange-200 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900">{card.title}</h3>
                  <p className="mt-1.5 text-sm text-gray-500">{card.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
