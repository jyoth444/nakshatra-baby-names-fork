"use server";

/**
 * Server Actions for Nakshatra Baby Names Finder.
 * Handles nakshatra calculation, name search, and AI name generation.
 */

import { calculateNakshatra, type NakshatraResult } from "@/utils/nakshatraCalculator";
import { searchName, findSimilarNames, filterNames, type BabyName } from "@/utils/nameFilter";

/**
 * Server action to calculate Nakshatra from birth details.
 */
export async function calculateNakshatraAction(
  dateOfBirth: string,
  timeOfBirth: string
): Promise<NakshatraResult> {
  return calculateNakshatra(dateOfBirth, timeOfBirth);
}

/**
 * Server action to filter names by syllables, gender, and origin.
 */
export async function filterNamesAction(
  syllables: string[],
  gender: string,
  origin: string
): Promise<BabyName[]> {
  return filterNames(syllables, gender, origin);
}

/**
 * Server action to search for a name and return its meaning + similar names.
 */
export async function searchNameAction(query: string): Promise<{
  results: BabyName[];
  similarNames: BabyName[];
}> {
  const results = searchName(query);
  const similarNames =
    results.length > 0
      ? findSimilarNames(results[0].name)
      : findSimilarNames(query);

  return { results, similarNames };
}

/**
 * Server action to generate names using OpenAI API.
 * Falls back to a curated list if no API key is configured.
 */
export async function generateNamesWithAI(
  prompt: string
): Promise<{
  names: { name: string; meaning: string; origin: string; gender: string }[];
  isAI: boolean;
}> {
  const apiKey = process.env.OPENAI_API_KEY;

  // If OpenAI API key is available, use it
  if (apiKey) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that generates Indian baby names. Always respond with a JSON array of objects with fields: name, meaning, origin, gender. Generate 8 names.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.8,
          max_tokens: 1000,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices[0]?.message?.content || "[]";
        // Extract JSON from the response
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const names = JSON.parse(jsonMatch[0]);
          return { names, isAI: true };
        }
      }
    } catch (error) {
      console.error("OpenAI API error:", error);
    }
  }

  // Fallback: generate names based on the prompt keywords
  return {
    names: generateFallbackNames(prompt),
    isAI: false,
  };
}

/**
 * Fallback name generator when OpenAI API is not available.
 * Parses the prompt for starting letters and generates curated suggestions.
 */
function generateFallbackNames(
  prompt: string
): { name: string; meaning: string; origin: string; gender: string }[] {
  // Try to extract starting syllable from the prompt
  const syllableMatch = prompt.match(/starting with ['"]?(\w+)['"]?/i);
  const syllable = syllableMatch?.[1] || "";

  const genderMatch = prompt.match(/\b(boy|girl|male|female)\b/i);
  const gender = genderMatch?.[1]?.toLowerCase() || "";

  // Curated fallback names organized by starting letters
  const fallbackDb: Record<string, { name: string; meaning: string; origin: string; gender: string }[]> = {
    a: [
      { name: "Aadhira", meaning: "Moon, lightning", origin: "Sanskrit", gender: "female" },
      { name: "Aaryan", meaning: "Noble, warrior", origin: "Sanskrit", gender: "male" },
      { name: "Amara", meaning: "Immortal, eternal", origin: "Sanskrit", gender: "female" },
      { name: "Akshay", meaning: "Indestructible", origin: "Sanskrit", gender: "male" },
      { name: "Ahana", meaning: "First rays of dawn", origin: "Sanskrit", gender: "female" },
      { name: "Advika", meaning: "Unique, world", origin: "Sanskrit", gender: "female" },
      { name: "Arnav", meaning: "Ocean, sea", origin: "Sanskrit", gender: "male" },
      { name: "Aisha", meaning: "Living, prosperous", origin: "Arabic", gender: "female" },
    ],
    vi: [
      { name: "Vihaan", meaning: "Dawn, morning", origin: "Sanskrit", gender: "male" },
      { name: "Viveka", meaning: "Wisdom, discernment", origin: "Sanskrit", gender: "female" },
      { name: "Viraaj", meaning: "Splendour, sovereign", origin: "Sanskrit", gender: "male" },
      { name: "Vidushi", meaning: "Intelligent, learned", origin: "Sanskrit", gender: "female" },
      { name: "Virat", meaning: "Massive, supreme", origin: "Sanskrit", gender: "male" },
      { name: "Visha", meaning: "Universe, world", origin: "Sanskrit", gender: "female" },
      { name: "Vishwa", meaning: "Universe", origin: "Sanskrit", gender: "male" },
      { name: "Vinaya", meaning: "Modesty, humility", origin: "Sanskrit", gender: "female" },
    ],
    ka: [
      { name: "Kavish", meaning: "King of poets", origin: "Sanskrit", gender: "male" },
      { name: "Kaira", meaning: "Peaceful, unique", origin: "Sanskrit", gender: "female" },
      { name: "Kairav", meaning: "White lotus", origin: "Sanskrit", gender: "male" },
      { name: "Kashvi", meaning: "Shining, bright", origin: "Sanskrit", gender: "female" },
      { name: "Kartik", meaning: "Lord Murugan", origin: "Sanskrit", gender: "male" },
      { name: "Kamini", meaning: "Beautiful, desirable", origin: "Sanskrit", gender: "female" },
      { name: "Kalyan", meaning: "Auspicious, blessed", origin: "Sanskrit", gender: "male" },
      { name: "Kavya", meaning: "Poetry", origin: "Sanskrit", gender: "female" },
    ],
    sa: [
      { name: "Saahas", meaning: "Bravery, courage", origin: "Sanskrit", gender: "male" },
      { name: "Saanvi", meaning: "Goddess Lakshmi", origin: "Sanskrit", gender: "female" },
      { name: "Samarth", meaning: "Powerful, capable", origin: "Sanskrit", gender: "male" },
      { name: "Sahana", meaning: "Patience, endurance", origin: "Sanskrit", gender: "female" },
      { name: "Sachit", meaning: "Consciousness", origin: "Sanskrit", gender: "male" },
      { name: "Saira", meaning: "Princess, traveller", origin: "Arabic", gender: "female" },
      { name: "Sankalp", meaning: "Determination", origin: "Sanskrit", gender: "male" },
      { name: "Saranya", meaning: "Surrendered, shelter", origin: "Sanskrit", gender: "female" },
    ],
    ra: [
      { name: "Raghav", meaning: "Descendant of Raghu", origin: "Sanskrit", gender: "male" },
      { name: "Radhika", meaning: "Successful, prosperous", origin: "Sanskrit", gender: "female" },
      { name: "Rajveer", meaning: "Brave king", origin: "Sanskrit", gender: "male" },
      { name: "Ramya", meaning: "Beautiful, pleasant", origin: "Sanskrit", gender: "female" },
      { name: "Ranbir", meaning: "Brave warrior", origin: "Sanskrit", gender: "male" },
      { name: "Rashmi", meaning: "Ray of light", origin: "Sanskrit", gender: "female" },
      { name: "Ratan", meaning: "Gem, jewel", origin: "Sanskrit", gender: "male" },
      { name: "Rajeshwari", meaning: "Queen, goddess", origin: "Sanskrit", gender: "female" },
    ],
  };

  const key = syllable.toLowerCase().substring(0, 2);

  let names = fallbackDb[key] || fallbackDb["a"] || [];

  // Filter by gender if specified
  if (gender === "boy" || gender === "male") {
    names = names.filter((n) => n.gender === "male");
  } else if (gender === "girl" || gender === "female") {
    names = names.filter((n) => n.gender === "female");
  }

  return names.length > 0 ? names : fallbackDb["a"]!;
}

/**
 * Server action to get meaning of a specific name using AI.
 * Falls back to a generic response if API is unavailable.
 */
export async function getNameMeaningAI(name: string): Promise<{
  name: string;
  meaning: string;
  origin: string;
  gender: string;
  isAI: boolean;
}> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                'You are a name meaning expert. Respond with ONLY a JSON object with fields: name, meaning, origin, gender. No markdown, no extra text.',
            },
            {
              role: "user",
              content: `What is the meaning, origin, and gender of the name "${name}"?`,
            },
          ],
          temperature: 0.3,
          max_tokens: 200,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices[0]?.message?.content || "{}";
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          return { ...result, name, isAI: true };
        }
      }
    } catch (error) {
      console.error("OpenAI API error:", error);
    }
  }

  return {
    name,
    meaning: "Meaning not available in database. Add an OpenAI API key to get AI-powered meanings.",
    origin: "Unknown",
    gender: "Unknown",
    isAI: false,
  };
}
