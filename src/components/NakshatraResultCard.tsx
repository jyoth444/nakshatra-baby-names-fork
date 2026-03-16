"use client";

import { Star, Moon, Compass, Type } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { NakshatraResult } from "@/utils/nakshatraCalculator";

interface NakshatraResultCardProps {
  result: NakshatraResult;
}

export default function NakshatraResultCard({
  result,
}: NakshatraResultCardProps) {
  const infoRows = [
    {
      icon: Star,
      label: "Nakshatra",
      value: result.nakshatra,
      bg: "bg-orange-50 dark:bg-orange-950/30",
      iconBg: "bg-orange-100 dark:bg-orange-900/50",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
      icon: Moon,
      label: "Rashi (Moon Sign)",
      value: result.rashi,
      bg: "bg-amber-50 dark:bg-amber-950/30",
      iconBg: "bg-amber-100 dark:bg-amber-900/50",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: Compass,
      label: "Pada (Quarter)",
      value: `${result.pada} of 4`,
      bg: "bg-yellow-50 dark:bg-yellow-950/30",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/50",
      iconColor: "text-yellow-600 dark:text-yellow-400",
    },
  ];

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl border-orange-100 dark:border-orange-900/30 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400" />

      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
          Nakshatra Result
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {infoRows.map((row) => (
          <div
            key={row.label}
            className={`flex items-center gap-3 rounded-xl ${row.bg} p-4`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${row.iconBg}`}
            >
              <row.icon className={`h-5 w-5 ${row.iconColor}`} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {row.label}
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {row.value}
              </p>
            </div>
          </div>
        ))}

        {/* Pada-specific syllable highlight */}
        {result.syllables.length > 0 && (
          <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <Type className="h-4 w-4 text-green-600 dark:text-green-400" />
              <p className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide">
                Your Pada Syllable
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.syllables.map((syllable, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-lg bg-green-500 text-white text-lg font-bold px-5 py-2 shadow-sm"
                >
                  {syllable}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* All syllables for the nakshatra */}
        <div className="rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Type className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              All Starting Syllables for {result.nakshatra}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.allSyllables.map((syllable, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`text-base px-4 py-1.5 font-semibold shadow-sm ${
                  result.syllables.includes(syllable)
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white dark:bg-gray-800 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800"
                }`}
              >
                {syllable}
              </Badge>
            ))}
          </div>
        </div>

        <div className="text-center pt-2">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Deity:{" "}
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {result.deity}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
