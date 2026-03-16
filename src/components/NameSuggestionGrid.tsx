"use client";

import { useState, useEffect } from "react";
import { Filter, Baby, User, Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { filterNamesAction } from "@/lib/actions";
import NameCard from "@/components/NameCard";
import type { BabyName } from "@/utils/nameFilter";

interface NameSuggestionGridProps {
  syllables: string[];
  isFavourite: (name: string) => boolean;
  onToggleFavourite: (name: BabyName) => void;
}

type GenderTab = "all" | "male" | "female" | "unisex";

export default function NameSuggestionGrid({
  syllables,
  isFavourite,
  onToggleFavourite,
}: NameSuggestionGridProps) {
  const [allNames, setAllNames] = useState<BabyName[]>([]);
  const [activeTab, setActiveTab] = useState<GenderTab>("all");
  const [origin, setOrigin] = useState("all");
  const [selectedSyllables, setSelectedSyllables] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCount, setShowCount] = useState(12);

  useEffect(() => {
    if (syllables.length > 0) {
      setSelectedSyllables(syllables);
    }
  }, [syllables]);

  useEffect(() => {
    const fetchNames = async () => {
      setIsLoading(true);
      try {
        const filtered = await filterNamesAction(
          selectedSyllables,
          "all",
          origin
        );
        setAllNames(filtered);
      } catch (error) {
        console.error("Error filtering names:", error);
      }
      setIsLoading(false);
    };

    fetchNames();
  }, [selectedSyllables, origin]);

  useEffect(() => {
    setShowCount(12);
  }, [activeTab, selectedSyllables, origin]);

  const toggleSyllable = (syllable: string) => {
    setSelectedSyllables((prev) =>
      prev.includes(syllable)
        ? prev.filter((s) => s !== syllable)
        : [...prev, syllable]
    );
  };

  const filteredNames =
    activeTab === "all"
      ? allNames
      : allNames.filter(
          (n) => n.gender === activeTab || n.gender === "unisex"
        );

  const visibleNames = filteredNames.slice(0, showCount);

  const boyCount = allNames.filter(
    (n) => n.gender === "male" || n.gender === "unisex"
  ).length;
  const girlCount = allNames.filter(
    (n) => n.gender === "female" || n.gender === "unisex"
  ).length;

  const genderTabs: { key: GenderTab; label: string; count: number; color: string; activeColor: string; icon: typeof Baby }[] = [
    {
      key: "all",
      label: "All Names",
      count: allNames.length,
      color: "text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600",
      activeColor: "bg-orange-500 text-white border-orange-500 shadow-md",
      icon: Users,
    },
    {
      key: "male",
      label: "Boy Names",
      count: boyCount,
      color: "text-blue-600 border-blue-200 hover:border-blue-400 hover:bg-blue-50",
      activeColor: "bg-blue-500 text-white border-blue-500 shadow-md",
      icon: User,
    },
    {
      key: "female",
      label: "Girl Names",
      count: girlCount,
      color: "text-pink-600 border-pink-200 hover:border-pink-400 hover:bg-pink-50",
      activeColor: "bg-pink-500 text-white border-pink-500 shadow-md",
      icon: User,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-orange-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filter Names
          </h3>
        </div>

        <div className="space-y-4">
          {/* Syllable selection */}
          {syllables.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                Starting Syllables
              </Label>
              <div className="flex flex-wrap gap-2">
                {syllables.map((syllable) => (
                  <Badge
                    key={syllable}
                    variant={
                      selectedSyllables.includes(syllable)
                        ? "default"
                        : "outline"
                    }
                    className={`cursor-pointer text-sm px-3 py-1.5 transition-all ${
                      selectedSyllables.includes(syllable)
                        ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500"
                        : "hover:border-orange-300 hover:text-orange-600"
                    }`}
                    onClick={() => toggleSyllable(syllable)}
                  >
                    {syllable}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Origin filter */}
          <div className="max-w-xs">
            <Label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
              Origin
            </Label>
            <Select value={origin} onValueChange={setOrigin}>
              <SelectTrigger className="border-gray-200 dark:border-gray-700">
                <SelectValue placeholder="All Origins" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Origins</SelectItem>
                <SelectItem value="Sanskrit">Sanskrit</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
                <SelectItem value="Tamil">Tamil</SelectItem>
                <SelectItem value="Telugu">Telugu</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Gender Tabs */}
      <div className="flex flex-wrap gap-3">
        {genderTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all ${
              activeTab === tab.key ? tab.activeColor : tab.color
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
            <span
              className={`ml-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                activeTab === tab.key
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              Showing{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                {Math.min(showCount, filteredNames.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                {filteredNames.length}
              </span>{" "}
              {activeTab === "male"
                ? "boy"
                : activeTab === "female"
                ? "girl"
                : ""}{" "}
              names
            </>
          )}
        </p>
      </div>

      {/* Name cards grid */}
      {visibleNames.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleNames.map((name) => (
              <NameCard
                key={name.name}
                name={name}
                isFavourite={isFavourite(name.name)}
                onToggleFavourite={onToggleFavourite}
              />
            ))}
          </div>

          {showCount < filteredNames.length && (
            <div className="text-center pt-4">
              <Button
                variant="outline"
                onClick={() => setShowCount((prev) => prev + 12)}
                className="px-8 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-400 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950"
              >
                Show More ({filteredNames.length - showCount} remaining)
              </Button>
            </div>
          )}
        </>
      ) : (
        !isLoading && (
          <div className="text-center py-12">
            <Baby className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">
              No names found matching your filters.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Try adjusting the syllables or filters above.
            </p>
          </div>
        )
      )}
    </div>
  );
}
