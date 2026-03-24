import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Star, ArrowLeft, ChevronRight, Sparkles, BookOpen,
  Shield, Zap, Heart, Target, Gem, Calendar,
} from "lucide-react";
import {
  getAllResultIds,
  parseResultId,
  getNakshatraPersonality,
  getPadaTheme,
} from "@/utils/astrology";
import { getNakshatraBySlug, NAKSHATRA_DATA } from "@/lib/nakshatraData";
import { NAKSHATRAS } from "@/data/nakshatras";
import { getNamesByNakshatra } from "@/lib/nameUtils";
import { getNakshatraSEOContent } from "@/lib/nakshatraSEOContent";
import NameCard from "@/components/shared/NameCard";
import AdSlot from "@/components/shared/AdSlot";
import EmailCapture from "@/components/shared/EmailCapture";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return getAllResultIds();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const parsed = parseResultId(params.id);
  if (!parsed) return { title: "Result Not Found" };

  const nakshatra = getNakshatraBySlug(parsed.slug);
  if (!nakshatra) return { title: "Nakshatra Not Found" };

  const title = `${nakshatra.name} Nakshatra Pada ${parsed.pada} — Baby Names, Personality & Lucky Letters`;
  const description = `Your baby is born under ${nakshatra.name} Nakshatra, Pada ${parsed.pada}. Discover personality traits, strengths, lucky letters, and ${nakshatra.syllables.join(", ")} baby names for ${nakshatra.name} nakshatra.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://nakshatranames.com/result/${params.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://nakshatranames.com/result/${params.id}`,
    },
  };
}

export default function ResultPage({ params }: Props) {
  const parsed = parseResultId(params.id);
  if (!parsed) notFound();

  const nakshatra = getNakshatraBySlug(parsed.slug);
  if (!nakshatra) notFound();

  const pada = parsed.pada;
  const personality = getNakshatraPersonality(parsed.slug);
  const padaTheme = getPadaTheme(parsed.slug, pada);
  const seo = getNakshatraSEOContent(parsed.slug);

  // Get pada-specific data from the calculation-oriented NAKSHATRAS data
  const nakshatraCalcData = NAKSHATRAS.find(
    (n) => n.name.toLowerCase() === nakshatra.name.toLowerCase()
  );
  const padaInfo = nakshatraCalcData?.padas.find((p) => p.pada === pada);
  const padaSyllables: string[] = padaInfo?.syllables || nakshatra.syllables;
  const allSyllables: string[] = nakshatra.syllables;

  // Get names
  const allNames = getNamesByNakshatra(nakshatra.name);
  const boyNames = allNames.filter((n) => n.gender === "boy");
  const girlNames = allNames.filter((n) => n.gender === "girl");

  // Featured names from SEO content
  const featuredNames = seo
    ? [...seo.popularNames, ...seo.uniqueNames, ...seo.modernNames]
    : [];
  const featuredBoys = featuredNames.filter((n) => n.gender === "boy" || n.gender === "unisex");
  const featuredGirls = featuredNames.filter((n) => n.gender === "girl" || n.gender === "unisex");

  const prevNakshatra = NAKSHATRA_DATA.find((n) => n.id === nakshatra.id - 1);
  const nextNakshatra = NAKSHATRA_DATA.find((n) => n.id === nakshatra.id + 1);

  const padaRashi: string = padaInfo?.rashi || nakshatra.rashi;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-orange-500 flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/calculate-nakshatra" className="hover:text-orange-500">
              Calculate Nakshatra
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gray-900">
              {nakshatra.name} — Pada {pada}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero — Result Card */}
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-b border-orange-100">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Nakshatra number badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg">
                <Star className="h-7 w-7 text-white" fill="white" />
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                  Nakshatra #{nakshatra.id} of 27
                </span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
                  Pada {pada} of 4
                </span>
                {personality && (
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                    {personality.gana} Gana
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {nakshatra.name} Nakshatra
            </h1>
            <p className="mt-2 text-xl font-semibold text-orange-600">
              Pada {pada} · {padaRashi}
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed max-w-3xl text-lg">
              {nakshatra.description}
            </p>

            {/* Lucky Starting Syllables for this pada */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gray-600">Lucky Starting Letters (Pada {pada}):</span>
              {padaSyllables.map((s: string) => (
                <Link
                  key={s}
                  href={`/names/${s.toLowerCase()}`}
                  className="rounded-xl bg-orange-500 px-4 py-2 text-base font-bold text-white hover:bg-orange-600 transition-colors shadow-sm"
                >
                  {s}
                </Link>
              ))}
            </div>

            {/* Share / Calculate Again CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/calculate-nakshatra"
                className="inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-white px-5 py-2.5 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                Calculate Again
              </Link>
              <Link
                href={`/nakshatra/${nakshatra.slug}`}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Full {nakshatra.name} Guide
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            {/* Quick Facts */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Facts</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">Deity</dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-800">{nakshatra.deity}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-800">{nakshatra.symbol}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">Rashi (Pada {pada})</dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-800">{padaRashi}</dd>
                </div>
                {personality && (
                  <>
                    <div>
                      <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">Planetary Ruler</dt>
                      <dd className="mt-1 text-sm font-semibold text-gray-800">{personality.planetaryRuler}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">Element</dt>
                      <dd className="mt-1 text-sm font-semibold text-gray-800">{personality.element}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">Nature</dt>
                      <dd className="mt-1 text-sm font-semibold text-gray-800">{personality.nature}</dd>
                    </div>
                  </>
                )}
              </dl>
            </div>

            {/* All Syllables */}
            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
              <h2 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-orange-500" />
                All {nakshatra.name} Syllables
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {allSyllables.map((s: string) => (
                  <Link
                    key={s}
                    href={`/names/${s.toLowerCase()}`}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                      padaSyllables.includes(s)
                        ? "bg-orange-500 text-white"
                        : "bg-white border border-orange-200 text-orange-700 hover:bg-orange-100"
                    }`}
                  >
                    {s}
                  </Link>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">Highlighted: Pada {pada} syllables</p>
            </div>

            {/* Lucky Info */}
            {personality && (
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                  <Gem className="h-4 w-4 text-purple-500" />
                  Lucky Elements
                </h2>
                <div className="space-y-2.5">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-medium">Colors</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {personality.luckyColors.map((c) => (
                        <span key={c} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded">{c}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-medium">Numbers</p>
                    <div className="flex gap-2 mt-1">
                      {personality.luckyNumbers.map((n) => (
                        <span key={n} className="text-xs font-bold bg-amber-50 text-amber-700 w-7 h-7 flex items-center justify-center rounded-full border border-amber-200">{n}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-medium">Gemstones</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {personality.luckyGems.map((g) => (
                        <span key={g} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">{g}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-medium">Lucky Days</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {personality.luckyDays.map((d) => (
                        <span key={d} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pada Navigation */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">All Padas</h2>
              <div className="space-y-1.5">
                {[1, 2, 3, 4].map((p) => (
                  <Link
                    key={p}
                    href={`/result/${parsed.slug}-pada-${p}`}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                      p === pada
                        ? "bg-orange-100 text-orange-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-orange-600"
                    }`}
                  >
                    <span>Pada {p}</span>
                    {p === pada && <Star className="h-3.5 w-3.5 text-orange-500" fill="currentColor" />}
                  </Link>
                ))}
              </div>
            </div>

            {/* Neighboring Nakshatras */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-1">
              {prevNakshatra && (
                <Link
                  href={`/result/${prevNakshatra.slug}-pada-1`}
                  className="flex items-center gap-2 rounded-lg p-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  ← {prevNakshatra.name}
                </Link>
              )}
              {nextNakshatra && (
                <Link
                  href={`/result/${nextNakshatra.slug}-pada-1`}
                  className="flex items-center gap-2 rounded-lg p-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  {nextNakshatra.name} →
                </Link>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Names", value: allNames.length + featuredNames.length },
                { label: "Boy Names", value: boyNames.length + featuredBoys.length },
                { label: "Girl Names", value: girlNames.length + featuredGirls.length },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-orange-500">{stat.value}+</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Pada Theme */}
            {padaTheme && (
              <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-5 w-5 text-amber-500" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Pada {pada} Theme
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">{padaTheme.theme}</p>
                <div className="flex flex-wrap gap-2">
                  {padaTheme.qualities.map((q) => (
                    <span key={q} className="rounded-full bg-white border border-amber-200 px-3 py-1 text-xs font-medium text-amber-700">
                      {q}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Personality Traits */}
            {personality && (
              <section className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <Heart className="h-5 w-5 text-rose-500" fill="currentColor" />
                  <h2 className="text-xl font-bold text-gray-900">
                    {nakshatra.name} Personality Traits
                  </h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {personality.personalities.map((trait, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl bg-rose-50 p-3.5 border border-rose-100">
                      <div className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-rose-400"></div>
                      <p className="text-sm text-gray-700 leading-relaxed">{trait}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Strengths & Weaknesses */}
            {personality && (
              <div className="grid gap-6 md:grid-cols-2">
                <section className="rounded-2xl border border-green-100 bg-green-50/50 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5 text-green-500" />
                    <h2 className="text-lg font-bold text-gray-900">Strengths</h2>
                  </div>
                  <ul className="space-y-2">
                    {personality.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-green-500 font-bold flex-shrink-0">✓</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-2xl border border-orange-100 bg-orange-50/50 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="h-5 w-5 text-orange-500" />
                    <h2 className="text-lg font-bold text-gray-900">Areas to Watch</h2>
                  </div>
                  <ul className="space-y-2">
                    {personality.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-orange-400 font-bold flex-shrink-0">•</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            )}

            {/* Life Theme */}
            {personality && (
              <section className="rounded-2xl border border-purple-100 bg-purple-50/30 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-purple-500" />
                  <h2 className="text-lg font-bold text-gray-900">Life Theme</h2>
                </div>
                <p className="text-gray-700 text-base italic leading-relaxed">
                  &ldquo;{personality.lifeTheme}&rdquo;
                </p>
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Ideal Career Paths</p>
                  <div className="flex flex-wrap gap-2">
                    {personality.careerPaths.map((c) => (
                      <span key={c} className="rounded-full bg-white border border-purple-200 px-3 py-1 text-xs font-medium text-purple-700">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Nakshatra Introduction from SEO content */}
            {seo && (
              <section className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-orange-500" />
                  <h2 className="text-xl font-bold text-gray-900">
                    About {nakshatra.name} Nakshatra
                  </h2>
                </div>
                <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
                  {seo.introduction.split("\n\n").slice(0, 2).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <Link
                  href={`/nakshatra/${nakshatra.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-600"
                >
                  Read Full {nakshatra.name} Guide
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </section>
            )}

            {/* Suggested Baby Names — Pada Specific */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Star className="h-5 w-5 text-orange-500" fill="currentColor" />
                  Suggested Baby Names for Pada {pada}
                </h2>
              </div>
              <p className="text-sm text-gray-500 mb-5">
                Names starting with{" "}
                {padaSyllables.map((s: string, i: number) => (
                  <span key={s}>
                    {i > 0 && ", "}
                    <Link href={`/names/${s.toLowerCase()}`} className="font-semibold text-orange-600 hover:underline">{s}</Link>
                  </span>
                ))}{" "}
                — the auspicious syllable(s) for {nakshatra.name} Pada {pada}.
              </p>

              {/* Boy Names */}
              {boyNames.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500 inline-block"></span>
                    Boy Names
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {boyNames.slice(0, 9).map((name) => (
                      <NameCard key={name.name} name={name} showNakshatra={false} />
                    ))}
                  </div>
                </div>
              )}

              {/* Girl Names */}
              {girlNames.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-pink-500 inline-block"></span>
                    Girl Names
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {girlNames.slice(0, 9).map((name) => (
                      <NameCard key={name.name} name={name} showNakshatra={false} />
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Popular Names from SEO content */}
            {seo && seo.popularNames.length > 0 && (
              <section className="rounded-2xl border border-amber-100 bg-amber-50/50 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" fill="currentColor" />
                  Popular {nakshatra.name} Names
                </h2>
                <p className="text-sm text-gray-500 mb-5">
                  Time-tested, widely loved names for {nakshatra.name} nakshatra children
                </p>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {seo.popularNames.slice(0, 12).map((n) => (
                    <Link
                      key={n.name}
                      href={`/name/${n.name.toLowerCase()}`}
                      className="rounded-xl bg-white border border-amber-100 p-4 shadow-sm hover:border-orange-300 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{n.name}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            n.gender === "boy"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-pink-50 text-pink-600"
                          }`}
                        >
                          {n.gender}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-snug">{n.meaning}</p>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link
                    href={`/nakshatra/${nakshatra.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-600"
                  >
                    View all {nakshatra.name} names
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </section>
            )}

            {/* Compatible Nakshatras */}
            {personality && (
              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-3">
                  Compatible Nakshatras
                </h2>
                <div className="flex flex-wrap gap-2">
                  {personality.compatibleNakshatras.map((nk) => {
                    const slug = nk.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <Link
                        key={nk}
                        href={`/nakshatra/${slug}`}
                        className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-100 transition-colors flex items-center gap-1.5"
                      >
                        <Star className="h-3.5 w-3.5" />
                        {nk}
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Ad slot */}
            <AdSlot format="horizontal" slot="2345678901" />

            {/* Email capture */}
            <EmailCapture variant="inline" />

            {/* CTA — Calculate Again */}
            <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-white text-center">
              <Star className="h-10 w-10 text-white/80 mx-auto mb-3" fill="currentColor" />
              <h2 className="text-2xl font-bold">Find the Perfect Name for Your Baby</h2>
              <p className="mt-2 text-orange-100 max-w-lg mx-auto">
                Browse {nakshatra.name} names by syllable, or explore all 10,000+ Indian baby names
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href={`/nakshatra/${nakshatra.slug}`}
                  className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  Explore {nakshatra.name} Names
                </Link>
                <Link
                  href="/search"
                  className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  Search All Names
                </Link>
              </div>
            </div>

            {/* Explore All Nakshatras */}
            <div className="rounded-2xl border border-dashed border-orange-300 bg-orange-50/50 p-6">
              <p className="text-sm font-medium text-gray-700 mb-3 text-center">
                Explore names for all 27 Nakshatras
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {NAKSHATRA_DATA.filter((n) => n.id !== nakshatra.id)
                  .slice(0, 10)
                  .map((n) => (
                    <Link
                      key={n.slug}
                      href={`/result/${n.slug}-pada-1`}
                      className="rounded-lg bg-white border border-orange-200 px-3 py-1 text-xs font-medium text-orange-700 hover:bg-orange-100 transition-colors"
                    >
                      {n.name}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
