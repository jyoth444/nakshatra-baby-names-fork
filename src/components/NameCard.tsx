"use client";

import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { BabyName } from "@/utils/nameFilter";

interface NameCardProps {
  name: BabyName;
  isFavourite: boolean;
  onToggleFavourite: (name: BabyName) => void;
}

const genderConfig = {
  female: {
    gradient: "bg-gradient-to-r from-pink-400 to-rose-400",
    badge: "border-pink-200 text-pink-700 bg-pink-50 dark:border-pink-800 dark:text-pink-300 dark:bg-pink-950/30",
    label: "Girl",
  },
  male: {
    gradient: "bg-gradient-to-r from-blue-400 to-indigo-400",
    badge: "border-blue-200 text-blue-700 bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:bg-blue-950/30",
    label: "Boy",
  },
  unisex: {
    gradient: "bg-gradient-to-r from-purple-400 to-violet-400",
    badge: "border-purple-200 text-purple-700 bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:bg-purple-950/30",
    label: "Unisex",
  },
} as const;

export default function NameCard({
  name,
  isFavourite,
  onToggleFavourite,
}: NameCardProps) {
  const config = genderConfig[name.gender as keyof typeof genderConfig] || genderConfig.unisex;

  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 border-gray-100 dark:border-gray-800">
      <div className={`h-1.5 ${config.gradient}`} />

      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                {name.name}
              </h3>
              <Badge
                variant="outline"
                className={`text-[10px] px-1.5 py-0 font-bold uppercase tracking-wide shrink-0 ${config.badge}`}
              >
                {config.label}
              </Badge>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {name.meaning}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge
                variant="outline"
                className="text-xs border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-400"
              >
                {name.origin}
              </Badge>
              {name.startingLetter && (
                <Badge
                  variant="outline"
                  className="text-xs border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300"
                >
                  {name.startingLetter}
                </Badge>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleFavourite(name)}
            className={`ml-2 flex-shrink-0 transition-colors ${
              isFavourite
                ? "text-red-500 hover:text-red-600"
                : "text-gray-300 hover:text-red-400"
            }`}
          >
            <Heart
              className="h-5 w-5"
              fill={isFavourite ? "currentColor" : "none"}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
