"use client";

import { useState } from "react";
import { Heart, Trash2, Download, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import NameCard from "@/components/NameCard";
import type { BabyName } from "@/utils/nameFilter";

interface FavouriteNamesProps {
  favourites: BabyName[];
  onToggleFavourite: (name: BabyName) => void;
  onClearAll: () => void;
}

type FavFilter = "all" | "male" | "female";

export default function FavouriteNames({
  favourites,
  onToggleFavourite,
  onClearAll,
}: FavouriteNamesProps) {
  const [filter, setFilter] = useState<FavFilter>("all");

  const handleExport = () => {
    const boyNames = favourites.filter(
      (f) => f.gender === "male" || f.gender === "unisex"
    );
    const girlNames = favourites.filter(
      (f) => f.gender === "female" || f.gender === "unisex"
    );

    let text = "My Favourite Baby Names\n";
    text += "=".repeat(40) + "\n\n";

    if (boyNames.length > 0) {
      text += "BOY NAMES\n" + "-".repeat(20) + "\n";
      boyNames.forEach(
        (f) => (text += `${f.name} - ${f.meaning} (${f.origin})\n`)
      );
      text += "\n";
    }

    if (girlNames.length > 0) {
      text += "GIRL NAMES\n" + "-".repeat(20) + "\n";
      girlNames.forEach(
        (f) => (text += `${f.name} - ${f.meaning} (${f.origin})\n`)
      );
    }

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "favourite-baby-names.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (favourites.length === 0) {
    return (
      <Card className="shadow-sm border-gray-100 dark:border-gray-800">
        <CardContent className="py-12 text-center">
          <Heart className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No favourite names saved yet
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Click the heart icon on any name card to save it here.
          </p>
        </CardContent>
      </Card>
    );
  }

  const filtered =
    filter === "all"
      ? favourites
      : favourites.filter(
          (n) => n.gender === filter || n.gender === "unisex"
        );

  const boyCount = favourites.filter(
    (n) => n.gender === "male" || n.gender === "unisex"
  ).length;
  const girlCount = favourites.filter(
    (n) => n.gender === "female" || n.gender === "unisex"
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" fill="currentColor" />
            My Favourite Names
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              ({favourites.length})
            </span>
          </h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="text-gray-600 dark:text-gray-300"
          >
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            className="text-red-500 hover:text-red-600 hover:border-red-300"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Gender quick filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
            filter === "all"
              ? "bg-orange-500 text-white border-orange-500"
              : "text-gray-600 border-gray-200 hover:border-orange-300"
          }`}
        >
          <Users className="h-3.5 w-3.5" />
          All ({favourites.length})
        </button>
        <button
          onClick={() => setFilter("male")}
          className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
            filter === "male"
              ? "bg-blue-500 text-white border-blue-500"
              : "text-blue-600 border-blue-200 hover:border-blue-400"
          }`}
        >
          <User className="h-3.5 w-3.5" />
          Boys ({boyCount})
        </button>
        <button
          onClick={() => setFilter("female")}
          className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
            filter === "female"
              ? "bg-pink-500 text-white border-pink-500"
              : "text-pink-600 border-pink-200 hover:border-pink-400"
          }`}
        >
          <User className="h-3.5 w-3.5" />
          Girls ({girlCount})
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((name) => (
          <NameCard
            key={name.name}
            name={name}
            isFavourite={true}
            onToggleFavourite={onToggleFavourite}
          />
        ))}
      </div>
    </div>
  );
}
