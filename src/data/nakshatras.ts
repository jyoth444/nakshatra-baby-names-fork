/**
 * Complete mapping of all 27 Nakshatras with their properties.
 * Each nakshatra spans 13°20' (800 arc-minutes) of the ecliptic.
 * Each pada spans 3°20' (200 arc-minutes).
 */

export interface NakshatraInfo {
  id: number;
  name: string;
  deity: string;
  rpiSignStart: string; // Rashi at pada 1
  padas: {
    pada: number;
    rashi: string;
    syllables: string[];
  }[];
  startDegree: number;
  endDegree: number;
}

// Rashi (Zodiac) names in Sanskrit
export const RASHIS = [
  "Mesha (Aries)",
  "Vrishabha (Taurus)",
  "Mithuna (Gemini)",
  "Karka (Cancer)",
  "Simha (Leo)",
  "Kanya (Virgo)",
  "Tula (Libra)",
  "Vrishchika (Scorpio)",
  "Dhanu (Sagittarius)",
  "Makara (Capricorn)",
  "Kumbha (Aquarius)",
  "Meena (Pisces)",
] as const;

/**
 * All 27 Nakshatras with pada-wise syllable and rashi mapping.
 * Degree ranges: each nakshatra = 13°20', each pada = 3°20'
 */
export const NAKSHATRAS: NakshatraInfo[] = [
  {
    id: 1,
    name: "Ashwini",
    deity: "Ashwini Kumaras",
    rpiSignStart: "Mesha (Aries)",
    startDegree: 0,
    endDegree: 13.333,
    padas: [
      { pada: 1, rashi: "Mesha (Aries)", syllables: ["Chu"] },
      { pada: 2, rashi: "Mesha (Aries)", syllables: ["Che"] },
      { pada: 3, rashi: "Mesha (Aries)", syllables: ["Cho"] },
      { pada: 4, rashi: "Mesha (Aries)", syllables: ["La"] },
    ],
  },
  {
    id: 2,
    name: "Bharani",
    deity: "Yama",
    rpiSignStart: "Mesha (Aries)",
    startDegree: 13.333,
    endDegree: 26.667,
    padas: [
      { pada: 1, rashi: "Mesha (Aries)", syllables: ["Li"] },
      { pada: 2, rashi: "Mesha (Aries)", syllables: ["Lu"] },
      { pada: 3, rashi: "Mesha (Aries)", syllables: ["Le"] },
      { pada: 4, rashi: "Mesha (Aries)", syllables: ["Lo"] },
    ],
  },
  {
    id: 3,
    name: "Krittika",
    deity: "Agni",
    rpiSignStart: "Mesha (Aries)",
    startDegree: 26.667,
    endDegree: 40,
    padas: [
      { pada: 1, rashi: "Mesha (Aries)", syllables: ["A"] },
      { pada: 2, rashi: "Vrishabha (Taurus)", syllables: ["I"] },
      { pada: 3, rashi: "Vrishabha (Taurus)", syllables: ["U"] },
      { pada: 4, rashi: "Vrishabha (Taurus)", syllables: ["E"] },
    ],
  },
  {
    id: 4,
    name: "Rohini",
    deity: "Brahma",
    rpiSignStart: "Vrishabha (Taurus)",
    startDegree: 40,
    endDegree: 53.333,
    padas: [
      { pada: 1, rashi: "Vrishabha (Taurus)", syllables: ["O"] },
      { pada: 2, rashi: "Vrishabha (Taurus)", syllables: ["Va"] },
      { pada: 3, rashi: "Vrishabha (Taurus)", syllables: ["Vi"] },
      { pada: 4, rashi: "Vrishabha (Taurus)", syllables: ["Vu"] },
    ],
  },
  {
    id: 5,
    name: "Mrigashira",
    deity: "Soma",
    rpiSignStart: "Vrishabha (Taurus)",
    startDegree: 53.333,
    endDegree: 66.667,
    padas: [
      { pada: 1, rashi: "Vrishabha (Taurus)", syllables: ["Ve"] },
      { pada: 2, rashi: "Vrishabha (Taurus)", syllables: ["Vo"] },
      { pada: 3, rashi: "Mithuna (Gemini)", syllables: ["Ka"] },
      { pada: 4, rashi: "Mithuna (Gemini)", syllables: ["Ki"] },
    ],
  },
  {
    id: 6,
    name: "Ardra",
    deity: "Rudra",
    rpiSignStart: "Mithuna (Gemini)",
    startDegree: 66.667,
    endDegree: 80,
    padas: [
      { pada: 1, rashi: "Mithuna (Gemini)", syllables: ["Ku"] },
      { pada: 2, rashi: "Mithuna (Gemini)", syllables: ["Gha"] },
      { pada: 3, rashi: "Mithuna (Gemini)", syllables: ["Ng"] },
      { pada: 4, rashi: "Mithuna (Gemini)", syllables: ["Na"] },
    ],
  },
  {
    id: 7,
    name: "Punarvasu",
    deity: "Aditi",
    rpiSignStart: "Mithuna (Gemini)",
    startDegree: 80,
    endDegree: 93.333,
    padas: [
      { pada: 1, rashi: "Mithuna (Gemini)", syllables: ["Ke"] },
      { pada: 2, rashi: "Mithuna (Gemini)", syllables: ["Ko"] },
      { pada: 3, rashi: "Mithuna (Gemini)", syllables: ["Ha"] },
      { pada: 4, rashi: "Karka (Cancer)", syllables: ["Hi"] },
    ],
  },
  {
    id: 8,
    name: "Pushya",
    deity: "Brihaspati",
    rpiSignStart: "Karka (Cancer)",
    startDegree: 93.333,
    endDegree: 106.667,
    padas: [
      { pada: 1, rashi: "Karka (Cancer)", syllables: ["Hu"] },
      { pada: 2, rashi: "Karka (Cancer)", syllables: ["He"] },
      { pada: 3, rashi: "Karka (Cancer)", syllables: ["Ho"] },
      { pada: 4, rashi: "Karka (Cancer)", syllables: ["Da"] },
    ],
  },
  {
    id: 9,
    name: "Ashlesha",
    deity: "Sarpa",
    rpiSignStart: "Karka (Cancer)",
    startDegree: 106.667,
    endDegree: 120,
    padas: [
      { pada: 1, rashi: "Karka (Cancer)", syllables: ["Di"] },
      { pada: 2, rashi: "Karka (Cancer)", syllables: ["Du"] },
      { pada: 3, rashi: "Karka (Cancer)", syllables: ["De"] },
      { pada: 4, rashi: "Karka (Cancer)", syllables: ["Do"] },
    ],
  },
  {
    id: 10,
    name: "Magha",
    deity: "Pitrs",
    rpiSignStart: "Simha (Leo)",
    startDegree: 120,
    endDegree: 133.333,
    padas: [
      { pada: 1, rashi: "Simha (Leo)", syllables: ["Ma"] },
      { pada: 2, rashi: "Simha (Leo)", syllables: ["Mi"] },
      { pada: 3, rashi: "Simha (Leo)", syllables: ["Mu"] },
      { pada: 4, rashi: "Simha (Leo)", syllables: ["Me"] },
    ],
  },
  {
    id: 11,
    name: "Purva Phalguni",
    deity: "Bhaga",
    rpiSignStart: "Simha (Leo)",
    startDegree: 133.333,
    endDegree: 146.667,
    padas: [
      { pada: 1, rashi: "Simha (Leo)", syllables: ["Mo"] },
      { pada: 2, rashi: "Simha (Leo)", syllables: ["Ta"] },
      { pada: 3, rashi: "Simha (Leo)", syllables: ["Ti"] },
      { pada: 4, rashi: "Simha (Leo)", syllables: ["Tu"] },
    ],
  },
  {
    id: 12,
    name: "Uttara Phalguni",
    deity: "Aryaman",
    rpiSignStart: "Simha (Leo)",
    startDegree: 146.667,
    endDegree: 160,
    padas: [
      { pada: 1, rashi: "Simha (Leo)", syllables: ["Te"] },
      { pada: 2, rashi: "Kanya (Virgo)", syllables: ["To"] },
      { pada: 3, rashi: "Kanya (Virgo)", syllables: ["Pa"] },
      { pada: 4, rashi: "Kanya (Virgo)", syllables: ["Pi"] },
    ],
  },
  {
    id: 13,
    name: "Hasta",
    deity: "Savitar",
    rpiSignStart: "Kanya (Virgo)",
    startDegree: 160,
    endDegree: 173.333,
    padas: [
      { pada: 1, rashi: "Kanya (Virgo)", syllables: ["Pu"] },
      { pada: 2, rashi: "Kanya (Virgo)", syllables: ["Sha"] },
      { pada: 3, rashi: "Kanya (Virgo)", syllables: ["Na"] },
      { pada: 4, rashi: "Kanya (Virgo)", syllables: ["Tha"] },
    ],
  },
  {
    id: 14,
    name: "Chitra",
    deity: "Vishvakarma",
    rpiSignStart: "Kanya (Virgo)",
    startDegree: 173.333,
    endDegree: 186.667,
    padas: [
      { pada: 1, rashi: "Kanya (Virgo)", syllables: ["Pe"] },
      { pada: 2, rashi: "Kanya (Virgo)", syllables: ["Po"] },
      { pada: 3, rashi: "Tula (Libra)", syllables: ["Ra"] },
      { pada: 4, rashi: "Tula (Libra)", syllables: ["Ri"] },
    ],
  },
  {
    id: 15,
    name: "Swati",
    deity: "Vayu",
    rpiSignStart: "Tula (Libra)",
    startDegree: 186.667,
    endDegree: 200,
    padas: [
      { pada: 1, rashi: "Tula (Libra)", syllables: ["Ru"] },
      { pada: 2, rashi: "Tula (Libra)", syllables: ["Re"] },
      { pada: 3, rashi: "Tula (Libra)", syllables: ["Ro"] },
      { pada: 4, rashi: "Tula (Libra)", syllables: ["Ta"] },
    ],
  },
  {
    id: 16,
    name: "Vishakha",
    deity: "Indra-Agni",
    rpiSignStart: "Tula (Libra)",
    startDegree: 200,
    endDegree: 213.333,
    padas: [
      { pada: 1, rashi: "Tula (Libra)", syllables: ["Ti"] },
      { pada: 2, rashi: "Tula (Libra)", syllables: ["Tu"] },
      { pada: 3, rashi: "Tula (Libra)", syllables: ["Te"] },
      { pada: 4, rashi: "Vrishchika (Scorpio)", syllables: ["To"] },
    ],
  },
  {
    id: 17,
    name: "Anuradha",
    deity: "Mitra",
    rpiSignStart: "Vrishchika (Scorpio)",
    startDegree: 213.333,
    endDegree: 226.667,
    padas: [
      { pada: 1, rashi: "Vrishchika (Scorpio)", syllables: ["Na"] },
      { pada: 2, rashi: "Vrishchika (Scorpio)", syllables: ["Ni"] },
      { pada: 3, rashi: "Vrishchika (Scorpio)", syllables: ["Nu"] },
      { pada: 4, rashi: "Vrishchika (Scorpio)", syllables: ["Ne"] },
    ],
  },
  {
    id: 18,
    name: "Jyeshtha",
    deity: "Indra",
    rpiSignStart: "Vrishchika (Scorpio)",
    startDegree: 226.667,
    endDegree: 240,
    padas: [
      { pada: 1, rashi: "Vrishchika (Scorpio)", syllables: ["No"] },
      { pada: 2, rashi: "Vrishchika (Scorpio)", syllables: ["Ya"] },
      { pada: 3, rashi: "Vrishchika (Scorpio)", syllables: ["Yi"] },
      { pada: 4, rashi: "Vrishchika (Scorpio)", syllables: ["Yu"] },
    ],
  },
  {
    id: 19,
    name: "Mula",
    deity: "Nirriti",
    rpiSignStart: "Dhanu (Sagittarius)",
    startDegree: 240,
    endDegree: 253.333,
    padas: [
      { pada: 1, rashi: "Dhanu (Sagittarius)", syllables: ["Ye"] },
      { pada: 2, rashi: "Dhanu (Sagittarius)", syllables: ["Yo"] },
      { pada: 3, rashi: "Dhanu (Sagittarius)", syllables: ["Ba"] },
      { pada: 4, rashi: "Dhanu (Sagittarius)", syllables: ["Bi"] },
    ],
  },
  {
    id: 20,
    name: "Purva Ashadha",
    deity: "Apas",
    rpiSignStart: "Dhanu (Sagittarius)",
    startDegree: 253.333,
    endDegree: 266.667,
    padas: [
      { pada: 1, rashi: "Dhanu (Sagittarius)", syllables: ["Bu"] },
      { pada: 2, rashi: "Dhanu (Sagittarius)", syllables: ["Dha"] },
      { pada: 3, rashi: "Dhanu (Sagittarius)", syllables: ["Bha"] },
      { pada: 4, rashi: "Dhanu (Sagittarius)", syllables: ["Fa"] },
    ],
  },
  {
    id: 21,
    name: "Uttara Ashadha",
    deity: "Vishvedevas",
    rpiSignStart: "Dhanu (Sagittarius)",
    startDegree: 266.667,
    endDegree: 280,
    padas: [
      { pada: 1, rashi: "Dhanu (Sagittarius)", syllables: ["Be"] },
      { pada: 2, rashi: "Makara (Capricorn)", syllables: ["Bo"] },
      { pada: 3, rashi: "Makara (Capricorn)", syllables: ["Ja"] },
      { pada: 4, rashi: "Makara (Capricorn)", syllables: ["Ji"] },
    ],
  },
  {
    id: 22,
    name: "Shravana",
    deity: "Vishnu",
    rpiSignStart: "Makara (Capricorn)",
    startDegree: 280,
    endDegree: 293.333,
    padas: [
      { pada: 1, rashi: "Makara (Capricorn)", syllables: ["Ju", "Khi"] },
      { pada: 2, rashi: "Makara (Capricorn)", syllables: ["Je", "Khu"] },
      { pada: 3, rashi: "Makara (Capricorn)", syllables: ["Jo", "Khe"] },
      { pada: 4, rashi: "Makara (Capricorn)", syllables: ["Gha", "Kho"] },
    ],
  },
  {
    id: 23,
    name: "Dhanishta",
    deity: "Vasus",
    rpiSignStart: "Makara (Capricorn)",
    startDegree: 293.333,
    endDegree: 306.667,
    padas: [
      { pada: 1, rashi: "Makara (Capricorn)", syllables: ["Ga"] },
      { pada: 2, rashi: "Makara (Capricorn)", syllables: ["Gi"] },
      { pada: 3, rashi: "Kumbha (Aquarius)", syllables: ["Gu"] },
      { pada: 4, rashi: "Kumbha (Aquarius)", syllables: ["Ge"] },
    ],
  },
  {
    id: 24,
    name: "Shatabhisha",
    deity: "Varuna",
    rpiSignStart: "Kumbha (Aquarius)",
    startDegree: 306.667,
    endDegree: 320,
    padas: [
      { pada: 1, rashi: "Kumbha (Aquarius)", syllables: ["Go"] },
      { pada: 2, rashi: "Kumbha (Aquarius)", syllables: ["Sa"] },
      { pada: 3, rashi: "Kumbha (Aquarius)", syllables: ["Si"] },
      { pada: 4, rashi: "Kumbha (Aquarius)", syllables: ["Su"] },
    ],
  },
  {
    id: 25,
    name: "Purva Bhadrapada",
    deity: "Ajaikapada",
    rpiSignStart: "Kumbha (Aquarius)",
    startDegree: 320,
    endDegree: 333.333,
    padas: [
      { pada: 1, rashi: "Kumbha (Aquarius)", syllables: ["Se"] },
      { pada: 2, rashi: "Kumbha (Aquarius)", syllables: ["So"] },
      { pada: 3, rashi: "Kumbha (Aquarius)", syllables: ["Da"] },
      { pada: 4, rashi: "Meena (Pisces)", syllables: ["Di"] },
    ],
  },
  {
    id: 26,
    name: "Uttara Bhadrapada",
    deity: "Ahirbudhnya",
    rpiSignStart: "Meena (Pisces)",
    startDegree: 333.333,
    endDegree: 346.667,
    padas: [
      { pada: 1, rashi: "Meena (Pisces)", syllables: ["Du"] },
      { pada: 2, rashi: "Meena (Pisces)", syllables: ["Tha"] },
      { pada: 3, rashi: "Meena (Pisces)", syllables: ["Jha"] },
      { pada: 4, rashi: "Meena (Pisces)", syllables: ["Da"] },
    ],
  },
  {
    id: 27,
    name: "Revati",
    deity: "Pushan",
    rpiSignStart: "Meena (Pisces)",
    startDegree: 346.667,
    endDegree: 360,
    padas: [
      { pada: 1, rashi: "Meena (Pisces)", syllables: ["De"] },
      { pada: 2, rashi: "Meena (Pisces)", syllables: ["Do"] },
      { pada: 3, rashi: "Meena (Pisces)", syllables: ["Cha"] },
      { pada: 4, rashi: "Meena (Pisces)", syllables: ["Chi"] },
    ],
  },
];

/**
 * Get all syllables for a given nakshatra
 */
export function getAllSyllables(nakshatraName: string): string[] {
  const nakshatra = NAKSHATRAS.find(
    (n) => n.name.toLowerCase() === nakshatraName.toLowerCase()
  );
  if (!nakshatra) return [];
  return nakshatra.padas.flatMap((p) => p.syllables);
}

/**
 * Get syllables for a specific pada of a nakshatra
 */
export function getSyllablesForPada(
  nakshatraName: string,
  pada: number
): string[] {
  const nakshatra = NAKSHATRAS.find(
    (n) => n.name.toLowerCase() === nakshatraName.toLowerCase()
  );
  if (!nakshatra) return [];
  const padaInfo = nakshatra.padas.find((p) => p.pada === pada);
  return padaInfo ? padaInfo.syllables : [];
}
