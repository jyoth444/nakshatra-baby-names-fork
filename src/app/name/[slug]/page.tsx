import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Star, BookOpen, Globe, User, ArrowLeft, ChevronRight } from "lucide-react";
import { allNames, getNameBySlug, getSimilarNames } from "@/lib/nameUtils";
import { getNakshatraByName } from "@/lib/nakshatraData";
import NameCard from "@/components/shared/NameCard";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return allNames.map((name) => ({
    slug: name.name.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = getNameBySlug(params.slug);
  if (!name) return { title: "Name Not Found" };

  const nakshatraNames = name.nakshatra.join(", ");
  const title = `${name.name} Name Meaning, Origin, and Nakshatra Compatibility`;
  const description = `${name.name} is a ${name.gender === "boy" ? "baby boy" : name.gender === "girl" ? "baby girl" : ""} name of ${name.origin} origin meaning "${name.meaning}". Compatible with ${nakshatraNames || "multiple"} Nakshatra.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://nakshatranames.com/name/${params.slug}`,
    },
    twitter: { card: "summary", title, description },
    alternates: { canonical: `https://nakshatranames.com/name/${params.slug}` },
  };
}

export default function NamePage({ params }: Props) {
  const name = getNameBySlug(params.slug);
  if (!name) notFound();

  const similarNames = getSimilarNames(name, 8);
  const nakshatraInfo = name.nakshatra.length > 0
    ? getNakshatraByName(name.nakshatra[0])
    : null;

  const genderColor =
    name.gender === "boy"
      ? "from-blue-50 to-indigo-50 border-blue-100"
      : name.gender === "girl"
      ? "from-pink-50 to-rose-50 border-pink-100"
      : "from-purple-50 to-violet-50 border-purple-100";

  const genderBadge =
    name.gender === "boy"
      ? "bg-blue-100 text-blue-700"
      : name.gender === "girl"
      ? "bg-pink-100 text-pink-700"
      : "bg-purple-100 text-purple-700";

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
            <Link href={`/names/${name.startingLetter.toLowerCase()}`} className="hover:text-orange-500">
              Names starting with &apos;{name.startingLetter.toUpperCase()}&apos;
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gray-900">{name.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Name Hero Card */}
            <div className={`rounded-2xl border bg-gradient-to-br ${genderColor} p-8`}>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${genderBadge}`}>
                    <User className="h-3.5 w-3.5" />
                    {name.gender === "boy" ? "Baby Boy Name" : name.gender === "girl" ? "Baby Girl Name" : "Unisex Name"}
                  </span>
                  <h1 className="mt-4 text-5xl font-bold tracking-tight text-gray-900">
                    {name.name}
                  </h1>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="mt-1 h-5 w-5 flex-shrink-0 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Meaning</p>
                    <p className="text-lg font-medium text-gray-800">{name.meaning}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="mt-1 h-5 w-5 flex-shrink-0 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Origin</p>
                    <p className="text-lg font-medium text-gray-800">{name.origin}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nakshatra Compatibility */}
            {name.nakshatra.length > 0 && (
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 text-orange-500" fill="currentColor" />
                  <h2 className="text-xl font-bold text-gray-900">Compatible Nakshatras</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {name.nakshatra.map((nk) => (
                    <Link
                      key={nk}
                      href={`/nakshatra/${nk.toLowerCase().replace(/\s+/g, "-")}`}
                      className="group flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-2.5 hover:bg-orange-100 transition-colors"
                    >
                      <Star className="h-4 w-4 text-orange-500" />
                      <span className="font-medium text-orange-700">{nk}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>

                {nakshatraInfo && (
                  <div className="mt-4 rounded-xl bg-amber-50 border border-amber-100 p-4">
                    <p className="text-sm text-amber-800 leading-relaxed">
                      <strong>{name.nakshatra[0]}</strong>: {nakshatraInfo.description.slice(0, 200)}...
                    </p>
                    <Link
                      href={`/nakshatra/${nakshatraInfo.slug}`}
                      className="mt-2 inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-900"
                    >
                      Learn more about {name.nakshatra[0]}
                      <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Name Analysis */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                About the Name {name.name}
              </h2>
              <div className="prose prose-gray max-w-none text-gray-600 space-y-3">
                <p>
                  <strong>{name.name}</strong> is a beautiful {name.gender === "boy" ? "boy" : name.gender === "girl" ? "girl" : "unisex"} name
                  of <strong>{name.origin}</strong> origin. The name carries the meaning of &quot;{name.meaning}&quot;,
                  making it a meaningful choice for your baby.
                </p>
                <p>
                  In Vedic tradition, this name is associated with the{" "}
                  {name.nakshatra.length > 0 ? (
                    <>
                      <strong>{name.nakshatra.join(" and ")}</strong> nakshatra
                      {name.nakshatra.length > 1 ? "s" : ""}.
                    </>
                  ) : (
                    "ancient Sanskrit tradition."
                  )}{" "}
                  Names starting with the syllable &apos;{name.startingLetter.toUpperCase()}&apos; are especially
                  auspicious for children born under the compatible nakshatras.
                </p>
                <p>
                  The name {name.name} reflects the rich cultural heritage of{" "}
                  {name.origin} traditions and carries positive vibrations that
                  are believed to bring good fortune and success to the child.
                </p>
              </div>
            </div>

            {/* Starting Letter Link */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                More Names Starting with &apos;{name.startingLetter.toUpperCase()}&apos;
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Explore all Indian baby names that begin with the same syllable as {name.name}.
              </p>
              <Link
                href={`/names/${name.startingLetter.toLowerCase()}`}
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
              >
                View All &apos;{name.startingLetter.toUpperCase()}&apos; Names
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Facts</h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Name</dt>
                  <dd className="text-sm font-semibold text-gray-900">{name.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Gender</dt>
                  <dd className="text-sm font-semibold text-gray-900 capitalize">{name.gender}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Origin</dt>
                  <dd className="text-sm font-semibold text-gray-900">{name.origin}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Starting Letter</dt>
                  <dd className="text-sm font-semibold text-gray-900">{name.startingLetter.toUpperCase()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Length</dt>
                  <dd className="text-sm font-semibold text-gray-900">{name.name.length} letters</dd>
                </div>
              </dl>
            </div>

            {/* Nakshatra Info Sidebar */}
            {nakshatraInfo && (
              <div className="rounded-2xl border border-orange-100 bg-gradient-to-b from-orange-50 to-amber-50 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-4 w-4 text-orange-500" fill="currentColor" />
                  <h3 className="text-lg font-bold text-gray-900">{nakshatraInfo.name}</h3>
                </div>
                <p className="text-xs text-gray-500 mb-3">Deity: {nakshatraInfo.deity}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {nakshatraInfo.syllables.map((s) => (
                    <span key={s} className="rounded-md bg-white px-2 py-0.5 text-xs font-medium text-orange-700 border border-orange-200">
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Recommended starting syllables for {nakshatraInfo.name} nakshatra babies.
                </p>
                <Link
                  href={`/nakshatra/${nakshatraInfo.slug}`}
                  className="mt-3 block w-full rounded-lg bg-orange-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-orange-600 transition-colors"
                >
                  Explore {nakshatraInfo.name} Names
                </Link>
              </div>
            )}

            {/* Numerology */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Name Numerology</h3>
              <div className="text-center p-4 rounded-xl bg-gray-50">
                <div className="text-4xl font-bold text-orange-500">
                  {((name.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 9) || 9)}
                </div>
                <p className="mt-1 text-sm text-gray-500">Life Path Number</p>
              </div>
              <p className="mt-3 text-xs text-gray-400 text-center">
                Based on the ancient Vedic numerology system
              </p>
            </div>
          </div>
        </div>

        {/* Similar Names */}
        {similarNames.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Similar Names Starting with &apos;{name.startingLetter.toUpperCase()}&apos;
              </h2>
              <Link
                href={`/names/${name.startingLetter.toLowerCase()}`}
                className="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center gap-1"
              >
                View all
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {similarNames.map((similar) => (
                <NameCard key={similar.name} name={similar} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
