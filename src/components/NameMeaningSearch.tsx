"use client";

/**
 * NameMeaningSearch - Search bar to look up meanings of any baby name.
 * Shows results from local DB; falls back to AI for unknown names.
 */

import { useState } from "react";
import { Search, Loader2, BookOpen, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { searchNameAction, getNameMeaningAI } from "@/lib/actions";
import NameCard from "@/components/NameCard";
import type { BabyName } from "@/utils/nameFilter";

interface NameMeaningSearchProps {
  isFavourite: (name: string) => boolean;
  onToggleFavourite: (name: BabyName) => void;
}

export default function NameMeaningSearch({
  isFavourite,
  onToggleFavourite,
}: NameMeaningSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BabyName[]>([]);
  const [similarNames, setSimilarNames] = useState<BabyName[]>([]);
  const [aiResult, setAiResult] = useState<{
    name: string;
    meaning: string;
    origin: string;
    gender: string;
    isAI: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    setAiResult(null);

    try {
      // First, search local database
      const { results: localResults, similarNames: similar } =
        await searchNameAction(query);

      setResults(localResults);
      setSimilarNames(similar);

      // If not found locally, try AI
      if (localResults.length === 0) {
        const aiMeaning = await getNameMeaningAI(query);
        setAiResult(aiMeaning);
      }
    } catch (error) {
      console.error("Search error:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card className="shadow-sm border-gray-100 dark:border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="h-5 w-5 text-orange-500" />
            Name Meaning Finder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a name to find its meaning..."
                className="pl-10 border-gray-200 dark:border-gray-700"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Search"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {hasSearched && !isLoading && (
        <div className="space-y-6">
          {/* Local DB Results */}
          {results.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Search Results
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((name) => (
                  <NameCard
                    key={name.name}
                    name={name}
                    isFavourite={isFavourite(name.name)}
                    onToggleFavourite={onToggleFavourite}
                  />
                ))}
              </div>
            </div>
          )}

          {/* AI Result (when not found in local DB) */}
          {aiResult && (
            <Card className="border-amber-200 dark:border-amber-800 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                    {aiResult.isAI ? "AI-Generated Meaning" : "Name Not Found"}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {aiResult.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {aiResult.meaning}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{aiResult.origin}</Badge>
                  <Badge variant="outline">{aiResult.gender}</Badge>
                  <Badge
                    variant="outline"
                    className="border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300"
                  >
                    Starts with: {aiResult.name.charAt(0)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Similar Names */}
          {similarNames.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Similar Names
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {similarNames.map((name) => (
                  <NameCard
                    key={name.name}
                    name={name}
                    isFavourite={isFavourite(name.name)}
                    onToggleFavourite={onToggleFavourite}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
