export interface BabyName {
  name: string;
  meaning: string;
  gender: "boy" | "girl" | "unisex";
  origin: string;
  startingLetter: string;
  nakshatra: string[];
}

export interface NakshatraInfo {
  id: number;
  name: string;
  slug: string;
  deity: string;
  symbol: string;
  description: string;
  syllables: string[];
  qualities: string[];
  rashi: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
}
