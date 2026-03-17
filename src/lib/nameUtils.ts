import namesData from "@/data/names.json";
import type { BabyName } from "./types";

export const allNames: BabyName[] = namesData as BabyName[];

export function getNameBySlug(slug: string): BabyName | undefined {
  return allNames.find((n) => n.name.toLowerCase() === slug.toLowerCase());
}

export function getNamesByNakshatra(nakshatra: string): BabyName[] {
  return allNames.filter((n) =>
    n.nakshatra.some((nk) => nk.toLowerCase() === nakshatra.toLowerCase())
  );
}

export function getNamesByStartingLetter(letter: string): BabyName[] {
  return allNames.filter(
    (n) => n.startingLetter.toLowerCase() === letter.toLowerCase()
  );
}

export function getSimilarNames(name: BabyName, limit = 8): BabyName[] {
  return allNames
    .filter(
      (n) =>
        n.name !== name.name &&
        n.startingLetter.toLowerCase() === name.startingLetter.toLowerCase()
    )
    .slice(0, limit);
}

export function getTrendingNames(): BabyName[] {
  const trending = [
    "Aarav", "Vihaan", "Vivaan", "Aditya", "Viraj",
    "Aadhya", "Ananya", "Aanya", "Kavya",
    "Arjun", "Advait", "Atharva", "Akshay", "Arnav",
    "Ishaan", "Kiran", "Meera", "Nisha", "Priya", "Ganesh"
  ];
  return trending
    .map((name) => allNames.find((n) => n.name === name))
    .filter(Boolean) as BabyName[];
}

export function getAllStartingLetters(): string[] {
  const letters = new Set(allNames.map((n) => n.startingLetter.toLowerCase()));
  return Array.from(letters).sort();
}

export function getAllNakshatras(): string[] {
  const nakshatras = new Set<string>();
  allNames.forEach((n) => n.nakshatra.forEach((nk) => nakshatras.add(nk)));
  return Array.from(nakshatras).sort();
}

export function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}
