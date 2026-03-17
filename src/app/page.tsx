import Link from "next/link";
import { Star, Search, Sparkles, ArrowRight, BookOpen, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import { getTrendingNames } from "@/lib/nameUtils";
import { NAKSHATRA_DATA } from "@/lib/nakshatraData";
import { BLOG_POSTS } from "@/lib/blogData";
import NameCard from "@/components/shared/NameCard";

export const metadata: Metadata = {
  title: "Nakshatra Baby Names | Find the Perfect Indian Baby Name Based on Vedic Astrology",
  description: "Discover 10,000+ Indian baby names based on Vedic astrology. Find auspicious baby names by Nakshatra, starting syllable, or meaning. Free baby name search with Sanskrit, Telugu, and Hindu names.",
  keywords: ["nakshatra baby names", "indian baby names", "vedic astrology names", "sanskrit names", "hindu baby names", "baby name meaning"],
  openGraph: {
    title: "Nakshatra Baby Names | Find the Perfect Indian Baby Name",
    description: "Discover 10,000+ Indian baby names based on Vedic astrology and Nakshatra compatibility.",
    type: "website",
    url: "https://nakshatranames.com",
  },
};

const POPULAR_NAKSHATRAS = [
  { name: "Ashwini", slug: "ashwini", syllables: "Chu, Che, Cho, La", emoji: "🐴" },
  { name: "Rohini", slug: "rohini", syllables: "O, Va, Vi, Vu", emoji: "🌸" },
  { name: "Krittika", slug: "krittika", syllables: "A, I, U, E", emoji: "🔥" },
  { name: "Magha", slug: "magha", syllables: "Ma, Mi, Mu, Me", emoji: "👑" },
  { name: "Punarvasu", slug: "punarvasu", syllables: "Ke, Ko, Ha, Hi", emoji: "🏹" },
  { name: "Pushya", slug: "pushya", syllables: "Hu, He, Ho, Da", emoji: "🪷" },
  { name: "Chitra", slug: "chitra", syllables: "Pe, Po, Ra, Ri", emoji: "💎" },
  { name: "Revati", slug: "revati", syllables: "De, Do, Cha, Chi", emoji: "🐟" },
];

export default function HomePage() {
  const trendingNames = getTrendingNames();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-yellow-200/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-medium text-orange-700 shadow-sm backdrop-blur-sm mb-8">
              <Star className="h-4 w-4 text-orange-500" fill="currentColor" />
              10,000+ Indian Baby Names
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Find the Perfect Baby Name
              <span className="block mt-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Based on Nakshatra
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl leading-relaxed">
              Discover meaningful Indian baby names using Vedic astrology.
              Browse 10,000+ names by Nakshatra, starting syllable, or meaning.
            </p>

            {/* Feature pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["27 Nakshatras", "Sanskrit Names", "Telugu Names", "Free Search"].map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-sm"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  {f}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/calculate-nakshatra"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-base font-semibold text-white shadow-lg hover:from-orange-600 hover:to-amber-600 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                <Sparkles className="h-5 w-5" />
                Calculate Nakshatra
              </Link>
              <Link
                href="/nakshatra/ashwini"
                className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-700 shadow-sm hover:border-orange-300 hover:text-orange-600 transition-all hover:-translate-y-0.5"
              >
                <Star className="h-5 w-5" />
                Find Names by Nakshatra
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-700 shadow-sm hover:border-orange-300 hover:text-orange-600 transition-all hover:-translate-y-0.5"
              >
                <Search className="h-5 w-5" />
                Search Name Meaning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-y border-gray-100 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "10,000+", label: "Baby Names" },
              { value: "27", label: "Nakshatras Covered" },
              { value: "5+", label: "Origins (Sanskrit, Telugu...)" },
              { value: "Free", label: "Name Search" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-orange-500">{stat.value}</div>
                <div className="mt-0.5 text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Names Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium text-orange-600">Trending in 2025</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Trending Baby Names
              </h2>
              <p className="mt-2 text-gray-500">
                Most popular Indian baby names right now
              </p>
            </div>
            <Link
              href="/search"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-600"
            >
              Browse all names
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {trendingNames.map((name) => (
              <NameCard key={name.name} name={name} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/search"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-500"
            >
              Browse all names
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Nakshatras */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Star className="h-5 w-5 text-orange-500" fill="currentColor" />
              <span className="text-sm font-medium text-orange-600">All 27 Nakshatras</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Explore Names by Nakshatra
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Each Nakshatra has specific starting syllables for baby names.
              Find names that align with your child&apos;s birth star.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {POPULAR_NAKSHATRAS.map((nk) => (
              <Link
                key={nk.slug}
                href={`/nakshatra/${nk.slug}`}
                className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:border-orange-200 hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{nk.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {nk.name}
                    </h3>
                    <p className="text-xs text-gray-400">{nk.syllables}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end text-xs font-medium text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  View names <ArrowRight className="h-3 w-3 ml-1" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {NAKSHATRA_DATA.slice(8).map((nk) => (
                <Link
                  key={nk.slug}
                  href={`/nakshatra/${nk.slug}`}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors shadow-sm"
                >
                  {nk.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Letter */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Browse by Starting Syllable</h2>
            <p className="mt-3 text-gray-500">Find names starting with auspicious syllables</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {["a", "aa", "vi", "va", "ka", "ki", "ma", "mi", "na", "ni", "ra", "ri", "sa", "si", "su", "ga", "gi", "ha", "hi", "pa", "pu", "sha", "ta", "ti", "da", "de", "cha", "chi"].map((letter) => (
              <Link
                key={letter}
                href={`/names/${letter}`}
                className="rounded-xl border border-orange-200 bg-white px-4 py-2.5 text-sm font-semibold text-orange-700 uppercase hover:bg-orange-100 hover:border-orange-300 transition-colors shadow-sm"
              >
                {letter}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-orange-500" />
                <span className="text-sm font-medium text-orange-600">Baby Name Resources</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-600"
            >
              View all articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:border-orange-200 hover:shadow-md transition-all"
              >
                <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
                  {post.category}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.description}</p>
                <p className="mt-3 text-xs text-gray-400">{post.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Star className="h-12 w-12 text-white/80 mx-auto mb-4" fill="currentColor" />
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Find Your Baby&apos;s Perfect Name
          </h2>
          <p className="mt-4 text-xl text-orange-100">
            Use Vedic astrology wisdom to choose an auspicious name that aligns
            with your baby&apos;s birth Nakshatra
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/search"
              className="rounded-2xl bg-white px-8 py-4 text-base font-semibold text-orange-600 shadow-lg hover:bg-orange-50 transition-colors"
            >
              Search Names Free
            </Link>
            <Link
              href="/"
              className="rounded-2xl border border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 transition-colors"
            >
              Calculate Nakshatra
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
