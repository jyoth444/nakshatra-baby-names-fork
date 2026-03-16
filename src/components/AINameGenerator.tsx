"use client";

/**
 * AINameGenerator - Generate baby names using OpenAI API.
 * Users can enter custom prompts or use quick-start templates.
 */

import { useState } from "react";
import { Sparkles, Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { generateNamesWithAI } from "@/lib/actions";
import type { BabyName } from "@/utils/nameFilter";
import NameCard from "@/components/NameCard";

interface AINameGeneratorProps {
  defaultSyllable?: string;
  isFavourite: (name: string) => boolean;
  onToggleFavourite: (name: BabyName) => void;
}

const QUICK_PROMPTS = [
  "Generate modern Indian baby names starting with 'Vi' with meanings",
  "Suggest unique Sanskrit girl names starting with 'A'",
  "Generate rare Indian boy names starting with 'Sa' with meanings",
  "Suggest beautiful names starting with 'Ka' for a baby girl",
  "Generate powerful warrior names starting with 'Ra' for a baby boy",
];

export default function AINameGenerator(props: AINameGeneratorProps) {
  const { defaultSyllable, isFavourite, onToggleFavourite } = props;

  const defaultPrompt = defaultSyllable
    ? "Generate modern Indian baby names starting with '" + defaultSyllable + "' with meanings."
    : "";

  const [prompt, setPrompt] = useState(defaultPrompt);
  const [generatedNames, setGeneratedNames] = useState<
    Array<{ name: string; meaning: string; origin: string; gender: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAI, setIsAI] = useState(false);

  async function handleGenerate() {
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const result = await generateNamesWithAI(prompt);
      setGeneratedNames(result.names);
      setIsAI(result.isAI);
    } catch (error) {
      console.error("AI generation error:", error);
    }
    setIsLoading(false);
  }

  function handleQuickPrompt(quickPrompt: string) {
    setPrompt(quickPrompt);
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border-gray-100 dark:border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Wand2 className="h-5 w-5 text-purple-500" />
            AI Name Generator
          </CardTitle>
          <CardDescription>
            Describe the type of names you are looking for, and we will generate
            personalized suggestions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Quick prompts:
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map(function (qp, index) {
                return (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer text-xs hover:border-purple-300 hover:text-purple-600 dark:hover:border-purple-700 dark:hover:text-purple-400 transition-colors"
                    onClick={function () {
                      handleQuickPrompt(qp);
                    }}
                  >
                    {qp.length > 50 ? qp.substring(0, 50) + "..." : qp}
                  </Badge>
                );
              })}
            </div>
          </div>

          <Textarea
            value={prompt}
            onChange={function (e) {
              setPrompt(e.target.value);
            }}
            placeholder="e.g., Generate modern Indian baby names starting with Vi with meanings."
            rows={3}
            className="border-gray-200 dark:border-gray-700 resize-none"
          />

          <Button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Names...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Names
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedNames.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Generated Names
            </h3>
            <Badge
              variant="outline"
              className={
                isAI
                  ? "border-green-200 text-green-700 dark:border-green-800 dark:text-green-300"
                  : "border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-300"
              }
            >
              {isAI ? "AI-Powered" : "Curated Suggestions"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedNames.map(function (genName, index) {
              const babyName: BabyName = {
                name: genName.name,
                meaning: genName.meaning,
                origin: genName.origin || "Sanskrit",
                gender: genName.gender || "unisex",
                startingLetter: genName.name.substring(0, 2),
              };

              return (
                <NameCard
                  key={genName.name + "-" + index}
                  name={babyName}
                  isFavourite={isFavourite(genName.name)}
                  onToggleFavourite={onToggleFavourite}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
