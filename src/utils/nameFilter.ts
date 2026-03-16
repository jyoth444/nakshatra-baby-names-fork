/**
 * Name filtering utilities for baby name suggestions.
 * Filters the local JSON database based on syllables, gender, and origin.
 */

import babyNames from "@/data/babyNames.json";

export interface BabyName {
  name: string;
  gender: string;
  meaning: string;
  origin: string;
  startingLetter: string;
  nakshatra?: string;
}

/**
 * Filter baby names by starting syllables.
 * Matches if the name starts with any of the provided syllables (case-insensitive).
 */
export function filterBySyllables(
  names: BabyName[],
  syllables: string[]
): BabyName[] {
  if (!syllables.length) return names;

  return names.filter((name) =>
    syllables.some((syllable) =>
      name.name.toLowerCase().startsWith(syllable.toLowerCase())
    )
  );
}

/**
 * Filter baby names by gender.
 */
export function filterByGender(
  names: BabyName[],
  gender: string
): BabyName[] {
  if (!gender || gender === "all") return names;
  return names.filter(
    (name) => name.gender === gender || name.gender === "unisex"
  );
}

/**
 * Filter baby names by origin.
 */
export function filterByOrigin(
  names: BabyName[],
  origin: string
): BabyName[] {
  if (!origin || origin === "all") return names;
  return names.filter(
    (name) => name.origin.toLowerCase() === origin.toLowerCase()
  );
}

/**
 * Combined filter function - applies all filters at once.
 */
export function filterNames(
  syllables: string[],
  gender: string,
  origin: string
): BabyName[] {
  let filtered: BabyName[] = babyNames as BabyName[];

  filtered = filterBySyllables(filtered, syllables);
  filtered = filterByGender(filtered, gender);
  filtered = filterByOrigin(filtered, origin);

  return filtered;
}

/**
 * Search for a name by exact or partial match.
 */
export function searchName(query: string): BabyName[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  return (babyNames as BabyName[]).filter((name) =>
    name.name.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Find similar names based on starting letter or pattern.
 */
export function findSimilarNames(name: string, limit: number = 5): BabyName[] {
  const lowerName = name.toLowerCase();
  const startLetter = lowerName.substring(0, 2);

  return (babyNames as BabyName[])
    .filter(
      (n) =>
        n.name.toLowerCase() !== lowerName &&
        n.name.toLowerCase().startsWith(startLetter)
    )
    .slice(0, limit);
}

/**
 * Get all unique origins from the database.
 */
export function getUniqueOrigins(): string[] {
  const origins = new Set(
    (babyNames as BabyName[]).map((name) => name.origin)
  );
  return Array.from(origins).sort();
}
