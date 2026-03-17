import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Users } from "lucide-react";
import { getAllStartingLetters, getNamesByStartingLetter } from "@/lib/nameUtils";
import NameCard from "@/components/shared/NameCard";

interface Props {
  params: { letter: string };
}

export async function generateStaticParams() {
  const letters = getAllStartingLetters();
  return letters.map((letter) => ({ letter }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const letter = params.letter.toLowerCase();
  const names = getNamesByStartingLetter(letter);
  if (names.length === 0) return { title: "No Names Found" };

  const title = `Baby Names Starting With '${letter.toUpperCase()}' | Indian Baby Names`;
  const description = `Browse ${names.length}+ Indian baby names starting with '${letter.toUpperCase()}'. Find meaningful Sanskrit, Telugu, and Hindu baby names with their meanings and Nakshatra compatibility.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    alternates: { canonical: `https://nakshatranames.com/names/${letter}` },
  };
}

export default function LetterPage({ params }: Props) {
  const letter = params.letter.toLowerCase();
  const names = getNamesByStartingLetter(letter);

  if (names.length === 0) notFound();

  const boyNames = names.filter((n) => n.gender === "boy");
  const girlNames = names.filter((n) => n.gender === "girl");
  const allLetters = getAllStartingLetters();

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
            <span className="font-medium text-gray-900">
              Names starting with &apos;{letter.toUpperCase()}&apos;
            </span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-b border-orange-100">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-4xl font-bold text-white shadow-lg">
              {letter.toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Baby Names Starting With &apos;{letter.toUpperCase()}&apos;
              </h1>
              <p className="mt-2 text-gray-600">
                {names.length}+ Indian baby names — {boyNames.length} boy names & {girlNames.length} girl names
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar: Browse Letters */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sticky top-20">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                Browse by Syllable
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {allLetters.map((l) => (
                  <Link
                    key={l}
                    href={`/names/${l}`}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-medium uppercase transition-colors ${
                      l === letter
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-700"
                    }`}
                  >
                    {l}
                  </Link>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>{names.length} total names</span>
                </div>
                <div className="mt-2 flex gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                    {boyNames.length} boys
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-pink-400"></span>
                    {girlNames.length} girls
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Boy Names Section */}
            {boyNames.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-blue-500 inline-block"></span>
                    Boy Names Starting with &apos;{letter.toUpperCase()}&apos;
                    <span className="text-sm font-normal text-gray-400">({boyNames.length})</span>
                  </h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {boyNames.map((name) => (
                    <NameCard key={name.name} name={name} />
                  ))}
                </div>
              </section>
            )}

            {/* Girl Names Section */}
            {girlNames.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-pink-500 inline-block"></span>
                    Girl Names Starting with &apos;{letter.toUpperCase()}&apos;
                    <span className="text-sm font-normal text-gray-400">({girlNames.length})</span>
                  </h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {girlNames.map((name) => (
                    <NameCard key={name.name} name={name} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
