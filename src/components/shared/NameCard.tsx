import Link from "next/link";
import { Star, User, BookOpen, ArrowRight } from "lucide-react";
import type { BabyName } from "@/lib/types";

interface NameCardProps {
  name: BabyName;
  showNakshatra?: boolean;
}

export default function NameCard({ name, showNakshatra = true }: NameCardProps) {
  const slug = name.name.toLowerCase();
  const genderColor =
    name.gender === "boy"
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : name.gender === "girl"
      ? "bg-pink-50 text-pink-700 border-pink-200"
      : "bg-purple-50 text-purple-700 border-purple-200";

  const genderLabel =
    name.gender === "boy" ? "Boy" : name.gender === "girl" ? "Girl" : "Unisex";

  return (
    <Link href={`/name/${slug}`} className="group block">
      <div className="relative h-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-lg hover:-translate-y-1">
        {/* Gender badge */}
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${genderColor}`}
        >
          <User className="h-3 w-3" />
          {genderLabel}
        </span>

        {/* Name */}
        <h3 className="mt-3 text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
          {name.name}
        </h3>

        {/* Meaning */}
        <div className="mt-2 flex items-start gap-1.5">
          <BookOpen className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
          <p className="text-sm text-gray-600 line-clamp-2">{name.meaning}</p>
        </div>

        {/* Origin */}
        <p className="mt-2 text-xs text-gray-400">Origin: {name.origin}</p>

        {/* Nakshatra */}
        {showNakshatra && name.nakshatra.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {name.nakshatra.slice(0, 2).map((nk) => (
              <span
                key={nk}
                className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700"
              >
                <Star className="h-2.5 w-2.5" />
                {nk}
              </span>
            ))}
          </div>
        )}

        {/* Arrow */}
        <div className="mt-4 flex items-center text-xs font-medium text-orange-500 opacity-0 transition-opacity group-hover:opacity-100">
          View details
          <ArrowRight className="ml-1 h-3 w-3" />
        </div>
      </div>
    </Link>
  );
}
