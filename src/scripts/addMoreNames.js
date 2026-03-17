// Quick script to add extra names to push past 10,000
const fs = require('fs');
const path = require('path');

const existing = JSON.parse(fs.readFileSync(path.join(__dirname, '../../src/data/names.json'), 'utf8'));
const seenNames = new Set(existing.map(n => n.name.toLowerCase()));

// Additional Sanskrit compound names with more variety
const EXTRA_NAMES = [];
const syllableNakshatraMap = {
  "a": "Krittika", "i": "Krittika", "u": "Krittika", "e": "Krittika",
  "o": "Rohini", "va": "Rohini", "vi": "Rohini", "vu": "Rohini",
  "ve": "Mrigashira", "vo": "Mrigashira", "ka": "Mrigashira", "ki": "Mrigashira",
  "ku": "Ardra", "gha": "Ardra", "na": "Ardra", "cha": "Ardra",
  "ke": "Punarvasu", "ko": "Punarvasu", "ha": "Punarvasu", "hi": "Punarvasu",
  "hu": "Pushya", "he": "Pushya", "ho": "Pushya", "da": "Pushya",
  "di": "Ashlesha", "du": "Ashlesha", "de": "Ashlesha", "do": "Ashlesha",
  "ma": "Magha", "mi": "Magha", "mu": "Magha", "me": "Magha",
  "mo": "Purva Phalguni", "ta": "Purva Phalguni", "ti": "Purva Phalguni", "tu": "Purva Phalguni",
  "te": "Uttara Phalguni", "to": "Uttara Phalguni", "pa": "Uttara Phalguni", "pi": "Uttara Phalguni",
  "pu": "Hasta", "sha": "Hasta", "tha": "Hasta",
  "pe": "Chitra", "po": "Chitra", "ra": "Chitra", "ri": "Chitra",
  "ru": "Swati", "re": "Swati", "ro": "Swati",
  "ni": "Anuradha", "nu": "Anuradha", "ne": "Anuradha",
  "no": "Jyeshtha", "ya": "Jyeshtha", "yi": "Jyeshtha", "yu": "Jyeshtha",
  "ye": "Mula", "yo": "Mula", "ba": "Mula", "bi": "Mula",
  "bu": "Purva Ashadha", "dha": "Purva Ashadha", "bha": "Purva Ashadha", "pha": "Purva Ashadha",
  "be": "Uttara Ashadha", "bo": "Uttara Ashadha", "ja": "Uttara Ashadha", "ji": "Uttara Ashadha",
  "ju": "Shravana", "je": "Shravana", "jo": "Shravana",
  "ga": "Dhanishta", "gi": "Dhanishta", "gu": "Dhanishta", "ge": "Dhanishta",
  "go": "Shatabhisha", "sa": "Shatabhisha", "si": "Shatabhisha", "su": "Shatabhisha",
  "se": "Purva Bhadrapada", "so": "Purva Bhadrapada",
  "jha": "Uttara Bhadrapada",
  "chi": "Revati", "chu": "Ashwini", "che": "Ashwini", "cho": "Ashwini", "la": "Ashwini",
  "li": "Bharani", "lu": "Bharani", "le": "Bharani", "lo": "Bharani",
};

// Additional curated names
const ADDITIONAL = [
  // More A names
  { name: "Aarav", gender: "boy", meaning: "Peaceful, serene", origin: "Sanskrit", startingLetter: "a" },
  { name: "Akira", gender: "girl", meaning: "Bright, intelligent", origin: "Modern Indian", startingLetter: "a" },
  { name: "Alok", gender: "boy", meaning: "Light, brightness", origin: "Sanskrit", startingLetter: "a" },
  { name: "Amba", gender: "girl", meaning: "Mother, goddess Durga", origin: "Sanskrit", startingLetter: "a" },
  { name: "Ambalika", gender: "girl", meaning: "Mother, sensitive woman", origin: "Sanskrit", startingLetter: "a" },
  { name: "Ambuj", gender: "boy", meaning: "Lotus, born in water", origin: "Sanskrit", startingLetter: "a" },
  { name: "Amitesh", gender: "boy", meaning: "Lord of infinite glory", origin: "Sanskrit", startingLetter: "a" },
  { name: "Amlan", gender: "boy", meaning: "Unfading, ever bright", origin: "Sanskrit", startingLetter: "a" },
  { name: "Amulya", gender: "girl", meaning: "Priceless, valuable", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anadi", gender: "boy", meaning: "Without beginning, eternal", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anagha", gender: "girl", meaning: "Sinless, pure, faultless", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anand", gender: "boy", meaning: "Bliss, happiness, joy", origin: "Sanskrit", startingLetter: "a" },
  { name: "Ananta", gender: "boy", meaning: "Infinite, eternal, endless", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anantika", gender: "girl", meaning: "Infinite, without end", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anamika", gender: "girl", meaning: "Nameless, ring finger", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anant", gender: "boy", meaning: "Infinite, endless, eternal", origin: "Sanskrit", startingLetter: "a" },
  { name: "Angad", gender: "boy", meaning: "Armlet, son of Bali", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aniket", gender: "boy", meaning: "Lord of world, homeless", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anil", gender: "boy", meaning: "Wind, air, breeze", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anila", gender: "girl", meaning: "Wind, air, breeze", origin: "Sanskrit", startingLetter: "a" },
  // More Vi names
  { name: "Vibha", gender: "girl", meaning: "Light, radiance, brightness", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vibhav", gender: "boy", meaning: "Prosperity, wealth, power", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vibhuti", gender: "girl", meaning: "Ashes of sacred fire, power", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vidhan", gender: "boy", meaning: "Rule, law, fate, destiny", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vidhura", gender: "boy", meaning: "Wise, skillful, clever", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vidoosak", gender: "boy", meaning: "Comedian, jester, witty", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vidur", gender: "boy", meaning: "Wise, skilled, learned", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vidyut", gender: "boy", meaning: "Lightning, electricity, bright", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vijith", gender: "boy", meaning: "Victorious, winner, conqueror", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vikrant", gender: "boy", meaning: "Powerful, brave, mighty", origin: "Sanskrit", startingLetter: "vi" },
  // More Ka names
  { name: "Kalki", gender: "boy", meaning: "Tenth avatar of Vishnu", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kalpana", gender: "girl", meaning: "Imagination, fantasy, idea", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kalpita", gender: "girl", meaning: "Imagined, created, formed", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kamlesh", gender: "boy", meaning: "Lord of lotus, Vishnu", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kamna", gender: "girl", meaning: "Desire, wish, want", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kanta", gender: "girl", meaning: "Beautiful, beloved, desired", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Karunakar", gender: "boy", meaning: "Compassionate one, merciful", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kasav", gender: "boy", meaning: "Bright, beautiful", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kaushal", gender: "boy", meaning: "Skillful, expert, clever", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kaustubh", gender: "boy", meaning: "Gem on Vishnu's chest", origin: "Sanskrit", startingLetter: "ka" },
  // More Sa names
  { name: "Sachit", gender: "boy", meaning: "Truth and consciousness", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Sachidananda", gender: "boy", meaning: "Truth, consciousness, bliss", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Sadashiv", gender: "boy", meaning: "Eternally auspicious, Shiva", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Sadhana", gender: "girl", meaning: "Practice, achievement, effort", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Sadhvi", gender: "girl", meaning: "Pious woman, virtuous", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Sagar", gender: "boy", meaning: "Ocean, sea, vast", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Sagari", gender: "girl", meaning: "Of the ocean, vast", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Sahaj", gender: "boy", meaning: "Natural, simple, easy", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Sahitya", gender: "girl", meaning: "Literature, writing, poetry", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Sameer", gender: "boy", meaning: "Wind, entertainer, companion", origin: "Sanskrit", startingLetter: "sa" },
  // More Ra names
  { name: "Rachita", gender: "girl", meaning: "Created, composed, made", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Radhika", gender: "girl", meaning: "Goddess Radha, prosperous", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Raghav", gender: "boy", meaning: "Lord Rama, descendant of Raghu", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Raghunath", gender: "boy", meaning: "Lord Rama, lord of Raghu", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Rajendra", gender: "boy", meaning: "King of kings, lord of kings", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Rajiv", gender: "boy", meaning: "Lotus, striped", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Rajeev", gender: "boy", meaning: "Lotus flower, blue lotus", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Rajvi", gender: "girl", meaning: "Royal, princess, noble", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Ramdev", gender: "boy", meaning: "Divine Rama, Lord Rama", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Ramesh", gender: "boy", meaning: "Lord Rama, preserver", origin: "Sanskrit", startingLetter: "ra" },
  // More Ma names
  { name: "Madhulika", gender: "girl", meaning: "Honey, sweet, honeybee", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Madhura", gender: "girl", meaning: "Sweet, melodious, pleasant", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Madhukar", gender: "boy", meaning: "Bee, lover, Krishna", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Madhulal", gender: "boy", meaning: "Beloved sweet one, Krishna", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Madhusmita", gender: "girl", meaning: "Sweet smiling woman", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Mahadevi", gender: "girl", meaning: "Great goddess, Parvati", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Mahakali", gender: "girl", meaning: "Great Kali, goddess", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Mahavir", gender: "boy", meaning: "Great hero, Jain saint", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Mahima", gender: "girl", meaning: "Greatness, glory, majesty", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Mahin", gender: "boy", meaning: "Earth, great, world", origin: "Sanskrit", startingLetter: "ma" },
  // More Na names
  { name: "Nabha", gender: "boy", meaning: "Sky, cloud, lotus", origin: "Sanskrit", startingLetter: "na" },
  { name: "Nabhitha", gender: "girl", meaning: "Fearless, brave, bold", origin: "Sanskrit", startingLetter: "na" },
  { name: "Naga", gender: "boy", meaning: "Serpent, mountain, divine", origin: "Sanskrit", startingLetter: "na" },
  { name: "Nagapriya", gender: "girl", meaning: "Beloved of serpents, divine", origin: "Sanskrit", startingLetter: "na" },
  { name: "Nalinaksha", gender: "boy", meaning: "Lotus-eyed, Vishnu", origin: "Sanskrit", startingLetter: "na" },
  { name: "Namita", gender: "girl", meaning: "Bowed, humble, modest", origin: "Sanskrit", startingLetter: "na" },
  { name: "Namrata", gender: "girl", meaning: "Politeness, modesty, humility", origin: "Sanskrit", startingLetter: "na" },
  { name: "Nandesh", gender: "boy", meaning: "Lord of joy, Shiva", origin: "Sanskrit", startingLetter: "na" },
  { name: "Nandita", gender: "girl", meaning: "Happy, joyous, delighted", origin: "Sanskrit", startingLetter: "na" },
  { name: "Naomi", gender: "girl", meaning: "Pleasant, good, beautiful", origin: "Modern Indian", startingLetter: "na" },
  // More Ga names
  { name: "Gajendra", gender: "boy", meaning: "Lord of elephants, king", origin: "Sanskrit", startingLetter: "ga" },
  { name: "Gandharv", gender: "boy", meaning: "Celestial musician, divine", origin: "Sanskrit", startingLetter: "ga" },
  { name: "Gandhira", gender: "girl", meaning: "Deep, profound, thoughtful", origin: "Sanskrit", startingLetter: "ga" },
  { name: "Gargi", gender: "girl", meaning: "Ancient sage, learned woman", origin: "Sanskrit", startingLetter: "ga" },
  { name: "Gargini", gender: "girl", meaning: "Descendant of Garg, wise", origin: "Sanskrit", startingLetter: "ga" },
  { name: "Garishtha", gender: "boy", meaning: "Most excellent, the greatest", origin: "Sanskrit", startingLetter: "ga" },
  { name: "Gatika", gender: "girl", meaning: "Fast, speedy, quick", origin: "Sanskrit", startingLetter: "ga" },
  { name: "Gaurangi", gender: "girl", meaning: "Having golden complexion", origin: "Sanskrit", startingLetter: "ga" },
  { name: "Gaurangini", gender: "girl", meaning: "Fair-limbed, beautiful", origin: "Sanskrit", startingLetter: "ga" },
  { name: "Gaveshan", gender: "boy", meaning: "Research, exploration, seeking", origin: "Sanskrit", startingLetter: "ga" },
];

for (const name of ADDITIONAL) {
  const key = name.name.toLowerCase();
  if (!seenNames.has(key)) {
    seenNames.add(key);
    const nakshatra = syllableNakshatraMap[name.startingLetter] || "";
    existing.push({
      name: name.name,
      meaning: name.meaning,
      gender: name.gender,
      origin: name.origin,
      startingLetter: name.startingLetter,
      nakshatra: nakshatra ? [nakshatra] : [],
    });
  }
}

console.log(`Total after additions: ${existing.length}`);
fs.writeFileSync(path.join(__dirname, '../../src/data/names.json'), JSON.stringify(existing, null, 2));
console.log('Done!');
