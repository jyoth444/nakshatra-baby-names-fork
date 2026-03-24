import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowLeft, ChevronRight, Sparkles, BookOpen, HelpCircle } from "lucide-react";
import { NAKSHATRA_DATA, getNakshatraBySlug } from "@/lib/nakshatraData";
import { getNamesByNakshatra } from "@/lib/nameUtils";
import { getNakshatraSEOContent } from "@/lib/nakshatraSEOContent";
import NameCard from "@/components/shared/NameCard";
import AdSlot from "@/components/shared/AdSlot";
import EmailCapture from "@/components/shared/EmailCapture";

interface Props {
  params: { star: string };
}

export async function generateStaticParams() {
  return NAKSHATRA_DATA.map((n) => ({ star: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const nakshatra = getNakshatraBySlug(params.star);
  if (!nakshatra) return { title: "Nakshatra Not Found" };

  const seo = getNakshatraSEOContent(params.star);
  const title = seo?.seoTitle ?? `${nakshatra.name} Nakshatra Baby Names | Starting Syllables & Meanings`;
  const description =
    seo?.metaDescription ??
    `Discover baby names for ${nakshatra.name} nakshatra. Find auspicious Indian baby names starting with ${nakshatra.syllables.join(", ")} syllables.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    alternates: { canonical: `https://nakshatranames.com/nakshatra/${params.star}` },
  };
}

export default function NakshatraPage({ params }: Props) {
  const nakshatra = getNakshatraBySlug(params.star);
  if (!nakshatra) notFound();

  const seo = getNakshatraSEOContent(params.star);
  const names = getNamesByNakshatra(nakshatra.name);
  const boyNames = names.filter((n) => n.gender === "boy");
  const girlNames = names.filter((n) => n.gender === "girl");

  const prevNakshatra = NAKSHATRA_DATA.find((n) => n.id === nakshatra.id - 1);
  const nextNakshatra = NAKSHATRA_DATA.find((n) => n.id === nakshatra.id + 1);

  const allFeatured = seo
    ? [...seo.popularNames, ...seo.uniqueNames, ...seo.modernNames]
    : [];
  const featuredBoys = allFeatured.filter((n) => n.gender === "boy" || n.gender === "unisex");
  const featuredGirls = allFeatured.filter((n) => n.gender === "girl" || n.gender === "unisex");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-500 flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" />
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gray-900">{nakshatra.name} Nakshatra</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-b border-orange-100">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg">
                <Star className="h-6 w-6 text-white" fill="white" />
              </div>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                Nakshatra #{nakshatra.id} of 27
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {nakshatra.name} Nakshatra
            </h1>
            <p className="mt-4 text-xl text-gray-600">Baby Names & Starting Syllables</p>
            <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl">
              {nakshatra.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-5">
            {/* Nakshatra Details */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Nakshatra Details</h2>
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
                  <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">Rashi</dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-800">{nakshatra.rashi}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-400 uppercase tracking-wider">Total Names</dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-800">{names.length}+ names</dd>
                </div>
              </dl>
            </div>

            {/* Starting Syllables */}
            <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                <Sparkles className="inline h-4 w-4 text-orange-500 mr-1.5 -mt-0.5" />
                Starting Syllables
              </h2>
              <p className="text-xs text-gray-500 mb-3">
                Recommended syllables for {nakshatra.name} babies:
              </p>
              <div className="flex flex-wrap gap-2">
                {nakshatra.syllables.map((syllable) => (
                  <Link
                    key={syllable}
                    href={`/names/${syllable.toLowerCase()}`}
                    className="rounded-xl bg-white border border-orange-200 px-3 py-2 text-sm font-bold text-orange-700 hover:bg-orange-100 transition-colors"
                  >
                    {syllable}
                  </Link>
                ))}
              </div>
            </div>

            {/* Qualities */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Key Qualities</h2>
              <div className="flex flex-wrap gap-2">
                {nakshatra.qualities.map((q) => (
                  <span key={q} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 capitalize">
                    {q}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-2">
              {prevNakshatra && (
                <Link
                  href={`/nakshatra/${prevNakshatra.slug}`}
                  className="flex items-center justify-between rounded-lg p-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <span>← {prevNakshatra.name}</span>
                </Link>
              )}
              {nextNakshatra && (
                <Link
                  href={`/nakshatra/${nextNakshatra.slug}`}
                  className="flex items-center justify-between rounded-lg p-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                  <span>{nextNakshatra.name} →</span>
                </Link>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Names", value: names.length + allFeatured.length },
                { label: "Boy Names", value: boyNames.length + featuredBoys.length },
                { label: "Girl Names", value: girlNames.length + featuredGirls.length },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm">
                  <div className="text-2xl font-bold text-orange-500">{stat.value}+</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* SEO Introduction */}
            {seo && (
              <section className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-orange-500" />
                  <h2 className="text-xl font-bold text-gray-900">
                    About {nakshatra.name} Nakshatra Baby Names
                  </h2>
                </div>
                <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-4">
                  {seo.introduction.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Boy Names from DB */}
            {boyNames.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500 inline-block"></span>
                  {nakshatra.name} Boy Names
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {boyNames.slice(0, 12).map((name) => (
                    <NameCard key={name.name} name={name} showNakshatra={false} />
                  ))}
                </div>
                {boyNames.length > 12 && (
                  <p className="mt-4 text-sm text-gray-500 text-center">
                    Showing 12 of {boyNames.length} boy names for {nakshatra.name}
                  </p>
                )}
              </section>
            )}

            {/* Girl Names from DB */}
            {girlNames.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-pink-500 inline-block"></span>
                  {nakshatra.name} Girl Names
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {girlNames.slice(0, 12).map((name) => (
                    <NameCard key={name.name} name={name} showNakshatra={false} />
                  ))}
                </div>
                {girlNames.length > 12 && (
                  <p className="mt-4 text-sm text-gray-500 text-center">
                    Showing 12 of {girlNames.length} girl names for {nakshatra.name}
                  </p>
                )}
              </section>
            )}

            {/* SEO Curated Names Sections */}
            {seo && (
              <>
                {/* Popular Names */}
                <section className="rounded-2xl border border-amber-100 bg-amber-50/50 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-500" fill="currentColor" />
                    Popular {nakshatra.name} Names
                  </h2>
                  <p className="text-sm text-gray-500 mb-5">
                    Time-tested, widely loved names for {nakshatra.name} nakshatra children
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {seo.popularNames.map((n) => (
                      <div
                        key={n.name}
                        className="rounded-xl bg-white border border-amber-100 p-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-gray-900">{n.name}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              n.gender === "boy"
                                ? "bg-blue-50 text-blue-600"
                                : n.gender === "girl"
                                ? "bg-pink-50 text-pink-600"
                                : "bg-purple-50 text-purple-600"
                            }`}
                          >
                            {n.gender}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-snug">{n.meaning}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Unique Names */}
                <section className="rounded-2xl border border-purple-100 bg-purple-50/30 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    Unique {nakshatra.name} Names
                  </h2>
                  <p className="text-sm text-gray-500 mb-5">
                    Rare and distinctive names with deep roots in Sanskrit and Vedic tradition
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {seo.uniqueNames.map((n) => (
                      <div
                        key={n.name}
                        className="rounded-xl bg-white border border-purple-100 p-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-gray-900">{n.name}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              n.gender === "boy"
                                ? "bg-blue-50 text-blue-600"
                                : n.gender === "girl"
                                ? "bg-pink-50 text-pink-600"
                                : "bg-purple-50 text-purple-600"
                            }`}
                          >
                            {n.gender}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-snug">{n.meaning}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Modern Names */}
                <section className="rounded-2xl border border-green-100 bg-green-50/30 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    Modern {nakshatra.name} Names
                  </h2>
                  <p className="text-sm text-gray-500 mb-5">
                    Contemporary names that honor the nakshatra while feeling fresh and current
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {seo.modernNames.map((n) => (
                      <div
                        key={n.name}
                        className="rounded-xl bg-white border border-green-100 p-4 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-gray-900">{n.name}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              n.gender === "boy"
                                ? "bg-blue-50 text-blue-600"
                                : n.gender === "girl"
                                ? "bg-pink-50 text-pink-600"
                                : "bg-purple-50 text-purple-600"
                            }`}
                          >
                            {n.gender}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 leading-snug">{n.meaning}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Significance & Traditions */}
                <div className="grid gap-6 md:grid-cols-2">
                  <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-3">
                      Significance & Shakti
                    </h2>
                    <div className="text-sm text-gray-600 leading-relaxed space-y-3">
                      {seo.significance.split("\n\n").map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </section>
                  <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-3">
                      Naming Traditions
                    </h2>
                    <div className="text-sm text-gray-600 leading-relaxed space-y-3">
                      {seo.namingTraditions.split("\n\n").map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Tips for Parents */}
                <section className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>💡</span> Tips for Parents
                  </h2>
                  <div className="text-sm text-gray-700 leading-relaxed space-y-3">
                    {seo.tipsForParents.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </section>

                {/* FAQ Section */}
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <HelpCircle className="h-5 w-5 text-orange-500" />
                    <h2 className="text-xl font-bold text-gray-900">
                      Frequently Asked Questions
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {seo.faqs.map((faq, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                      >
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* Ad slot — mid content */}
            <AdSlot format="horizontal" slot="1234567890" />

            {/* Email capture */}
            <EmailCapture variant="inline" />

            {/* All Nakshatras link */}
            <div className="rounded-2xl border border-dashed border-orange-300 bg-orange-50/50 p-6 text-center">
              <Star className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 mb-3">
                Explore names for all 27 Nakshatras
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {NAKSHATRA_DATA.filter((n) => n.id !== nakshatra.id).slice(0, 8).map((n) => (
                  <Link
                    key={n.slug}
                    href={`/nakshatra/${n.slug}`}
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
