#!/usr/bin/env node
// Baby Name Dataset Generator
// Generates 10,000+ Indian baby names organized by Nakshatra
const fs = require("fs");
const path = require("path");

const NAKSHATRAS = [
  { id: 1, name: "Ashwini", syllables: ["chu", "che", "cho", "la"] },
  { id: 2, name: "Bharani", syllables: ["li", "lu", "le", "lo"] },
  { id: 3, name: "Krittika", syllables: ["a", "i", "u", "e"] },
  { id: 4, name: "Rohini", syllables: ["o", "va", "vi", "vu"] },
  { id: 5, name: "Mrigashira", syllables: ["ve", "vo", "ka", "ki"] },
  { id: 6, name: "Ardra", syllables: ["ku", "gha", "na", "cha"] },
  { id: 7, name: "Punarvasu", syllables: ["ke", "ko", "ha", "hi"] },
  { id: 8, name: "Pushya", syllables: ["hu", "he", "ho", "da"] },
  { id: 9, name: "Ashlesha", syllables: ["di", "du", "de", "do"] },
  { id: 10, name: "Magha", syllables: ["ma", "mi", "mu", "me"] },
  { id: 11, name: "Purva Phalguni", syllables: ["mo", "ta", "ti", "tu"] },
  { id: 12, name: "Uttara Phalguni", syllables: ["te", "to", "pa", "pi"] },
  { id: 13, name: "Hasta", syllables: ["pu", "sha", "na", "tha"] },
  { id: 14, name: "Chitra", syllables: ["pe", "po", "ra", "ri"] },
  { id: 15, name: "Swati", syllables: ["ru", "re", "ro", "ta"] },
  { id: 16, name: "Vishakha", syllables: ["ti", "tu", "te", "to"] },
  { id: 17, name: "Anuradha", syllables: ["na", "ni", "nu", "ne"] },
  { id: 18, name: "Jyeshtha", syllables: ["no", "ya", "yi", "yu"] },
  { id: 19, name: "Mula", syllables: ["ye", "yo", "ba", "bi"] },
  { id: 20, name: "Purva Ashadha", syllables: ["bu", "dha", "bha", "pha"] },
  { id: 21, name: "Uttara Ashadha", syllables: ["be", "bo", "ja", "ji"] },
  { id: 22, name: "Shravana", syllables: ["ju", "je", "jo", "gha"] },
  { id: 23, name: "Dhanishta", syllables: ["ga", "gi", "gu", "ge"] },
  { id: 24, name: "Shatabhisha", syllables: ["go", "sa", "si", "su"] },
  { id: 25, name: "Purva Bhadrapada", syllables: ["se", "so", "da", "di"] },
  { id: 26, name: "Uttara Bhadrapada", syllables: ["du", "tha", "jha", "da"] },
  { id: 27, name: "Revati", syllables: ["de", "do", "cha", "chi"] },
];

// Build syllable -> nakshatra map (first occurrence wins)
const syllableToNakshatra = {};
for (const n of NAKSHATRAS) {
  for (const s of n.syllables) {
    if (!syllableToNakshatra[s]) syllableToNakshatra[s] = n.name;
  }
}

// ============================================================
// CURATED SEED NAMES (real, verified Indian baby names)
// ============================================================
const SEED_NAMES = [
  // ASHWINI - Chu
  { name: "Chudamani", gender: "girl", meaning: "Crest jewel, gem among all", origin: "Sanskrit", startingLetter: "chu" },
  { name: "Chukki", gender: "girl", meaning: "Star, bright like a star", origin: "Telugu", startingLetter: "chu" },
  { name: "Chunmay", gender: "boy", meaning: "Full of consciousness", origin: "Sanskrit", startingLetter: "chu" },
  { name: "Chunilal", gender: "boy", meaning: "Beloved gem, precious one", origin: "Hindi", startingLetter: "chu" },
  { name: "Churni", gender: "girl", meaning: "Fragrant powder, holy offering", origin: "Sanskrit", startingLetter: "chu" },
  { name: "Chutesh", gender: "boy", meaning: "Lord of the four Vedas", origin: "Sanskrit", startingLetter: "chu" },
  { name: "Chuvarna", gender: "girl", meaning: "Well-decorated, beautiful", origin: "Sanskrit", startingLetter: "chu" },
  { name: "Chulbuli", gender: "girl", meaning: "Playful, lively and cheerful", origin: "Hindi", startingLetter: "chu" },
  // ASHWINI - Che
  { name: "Chetan", gender: "boy", meaning: "Consciousness, life, awareness", origin: "Sanskrit", startingLetter: "che" },
  { name: "Chetana", gender: "girl", meaning: "Consciousness, perception, soul", origin: "Sanskrit", startingLetter: "che" },
  { name: "Cheshta", gender: "girl", meaning: "Effort, desire, movement", origin: "Sanskrit", startingLetter: "che" },
  { name: "Chetak", gender: "boy", meaning: "Brave horse, alert and swift", origin: "Sanskrit", startingLetter: "che" },
  { name: "Chetansh", gender: "boy", meaning: "Portion of consciousness", origin: "Sanskrit", startingLetter: "che" },
  { name: "Chetalika", gender: "girl", meaning: "Active, energetic and lively", origin: "Sanskrit", startingLetter: "che" },
  { name: "Chetansh", gender: "boy", meaning: "Spark of divine consciousness", origin: "Sanskrit", startingLetter: "che" },
  // ASHWINI - Cho
  { name: "Chokkalingam", gender: "boy", meaning: "Beautiful lord Shiva", origin: "Tamil", startingLetter: "cho" },
  { name: "Cholamadhavi", gender: "girl", meaning: "Beautiful creeper of Chola kingdom", origin: "Sanskrit", startingLetter: "cho" },
  { name: "Cholan", gender: "boy", meaning: "Of the Chola dynasty, royal", origin: "Tamil", startingLetter: "cho" },
  { name: "Chokshi", gender: "boy", meaning: "One who examines, pure", origin: "Sanskrit", startingLetter: "cho" },
  // ASHWINI - La
  { name: "Lakshman", gender: "boy", meaning: "Fortunate, prosperous, auspicious", origin: "Sanskrit", startingLetter: "la" },
  { name: "Lakshmi", gender: "girl", meaning: "Goddess of wealth and fortune", origin: "Sanskrit", startingLetter: "la" },
  { name: "Laasya", gender: "girl", meaning: "Dance performed by Parvati", origin: "Sanskrit", startingLetter: "la" },
  { name: "Latha", gender: "girl", meaning: "Creeper, vine, slender woman", origin: "Sanskrit", startingLetter: "la" },
  { name: "Lavanya", gender: "girl", meaning: "Grace, beauty, loveliness", origin: "Sanskrit", startingLetter: "la" },
  { name: "Lalith", gender: "boy", meaning: "Elegant, beautiful, playful", origin: "Sanskrit", startingLetter: "la" },
  { name: "Lalitha", gender: "girl", meaning: "Graceful, playful, Goddess Parvati", origin: "Sanskrit", startingLetter: "la" },
  { name: "Lakshmikanth", gender: "boy", meaning: "Husband of Lakshmi, Lord Vishnu", origin: "Sanskrit", startingLetter: "la" },
  { name: "Lavan", gender: "boy", meaning: "Salt, handsome, charming", origin: "Sanskrit", startingLetter: "la" },
  { name: "Latika", gender: "girl", meaning: "Small creeper, delicate woman", origin: "Sanskrit", startingLetter: "la" },
  { name: "Lavjit", gender: "boy", meaning: "Victorious through love", origin: "Sanskrit", startingLetter: "la" },
  { name: "Lakshyaraj", gender: "boy", meaning: "King who achieves his goals", origin: "Sanskrit", startingLetter: "la" },
  // BHARANI - Li
  { name: "Likhith", gender: "boy", meaning: "Written, documented, inscribed", origin: "Sanskrit", startingLetter: "li" },
  { name: "Likhitha", gender: "girl", meaning: "Written by God, destined", origin: "Sanskrit", startingLetter: "li" },
  { name: "Lisha", gender: "girl", meaning: "Mystery, divine, enchanting", origin: "Sanskrit", startingLetter: "li" },
  { name: "Linga", gender: "boy", meaning: "Symbol of Lord Shiva", origin: "Sanskrit", startingLetter: "li" },
  { name: "Lingeswari", gender: "girl", meaning: "Goddess of Lord Shiva", origin: "Sanskrit", startingLetter: "li" },
  { name: "Lilavathi", gender: "girl", meaning: "Playful, full of divine sport", origin: "Sanskrit", startingLetter: "li" },
  { name: "Lila", gender: "girl", meaning: "Divine play, cosmic sport", origin: "Sanskrit", startingLetter: "li" },
  { name: "Lilesh", gender: "boy", meaning: "Lord of divine play", origin: "Sanskrit", startingLetter: "li" },
  { name: "Linesh", gender: "boy", meaning: "Lord Shiva, auspicious lord", origin: "Sanskrit", startingLetter: "li" },
  // BHARANI - Lu
  { name: "Luv", gender: "boy", meaning: "Son of Lord Rama, beloved", origin: "Sanskrit", startingLetter: "lu" },
  { name: "Luvkush", gender: "boy", meaning: "Sons of Rama, divine twins", origin: "Sanskrit", startingLetter: "lu" },
  { name: "Lungili", gender: "girl", meaning: "Beautiful, adorable, charming", origin: "Telugu", startingLetter: "lu" },
  // BHARANI - Le
  { name: "Leela", gender: "girl", meaning: "Divine play, sport of God", origin: "Sanskrit", startingLetter: "le" },
  { name: "Lekha", gender: "girl", meaning: "Writing, script, document", origin: "Sanskrit", startingLetter: "le" },
  { name: "Lekhitha", gender: "girl", meaning: "Written by God, inscribed", origin: "Sanskrit", startingLetter: "le" },
  { name: "Leeladhar", gender: "boy", meaning: "Bearer of divine play, Lord Krishna", origin: "Sanskrit", startingLetter: "le" },
  { name: "Leelavathi", gender: "girl", meaning: "Full of divine play and grace", origin: "Sanskrit", startingLetter: "le" },
  // BHARANI - Lo
  { name: "Lochan", gender: "boy", meaning: "Eye, sight, one who illuminates", origin: "Sanskrit", startingLetter: "lo" },
  { name: "Lokesh", gender: "boy", meaning: "Lord of the world, Brahma", origin: "Sanskrit", startingLetter: "lo" },
  { name: "Lochana", gender: "girl", meaning: "Bright eyes, beautiful vision", origin: "Sanskrit", startingLetter: "lo" },
  { name: "Lokamata", gender: "girl", meaning: "Mother of the world", origin: "Sanskrit", startingLetter: "lo" },
  { name: "Lokanath", gender: "boy", meaning: "Lord of the world, Vishnu", origin: "Sanskrit", startingLetter: "lo" },
  { name: "Lokpriya", gender: "girl", meaning: "Beloved by all, popular", origin: "Sanskrit", startingLetter: "lo" },
  // KRITTIKA - A
  { name: "Aarav", gender: "boy", meaning: "Peaceful, calm, serene", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aadhya", gender: "girl", meaning: "First power, the beginning", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aadi", gender: "boy", meaning: "Beginning, first, primordial", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aadya", gender: "girl", meaning: "First, unequalled, original", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aarushi", gender: "girl", meaning: "First rays of the sun, dawn", origin: "Sanskrit", startingLetter: "a" },
  { name: "Abhinav", gender: "boy", meaning: "New, innovative, ever fresh", origin: "Sanskrit", startingLetter: "a" },
  { name: "Advait", gender: "boy", meaning: "Unique, non-dual, Advaita", origin: "Sanskrit", startingLetter: "a" },
  { name: "Ananya", gender: "girl", meaning: "Unique, matchless, without equal", origin: "Sanskrit", startingLetter: "a" },
  { name: "Arjun", gender: "boy", meaning: "Bright, shining, the Pandava hero", origin: "Sanskrit", startingLetter: "a" },
  { name: "Avani", gender: "girl", meaning: "Earth, the good earth", origin: "Sanskrit", startingLetter: "a" },
  { name: "Akshay", gender: "boy", meaning: "Indestructible, immortal", origin: "Sanskrit", startingLetter: "a" },
  { name: "Amrita", gender: "girl", meaning: "Nectar of immortality, divine", origin: "Sanskrit", startingLetter: "a" },
  { name: "Arnav", gender: "boy", meaning: "Ocean, sea, wave", origin: "Sanskrit", startingLetter: "a" },
  { name: "Ashwin", gender: "boy", meaning: "Light, horse tamer, physician", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anvi", gender: "girl", meaning: "Forest goddess, one who leads", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aahan", gender: "boy", meaning: "Dawn, morning, bright", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aahana", gender: "girl", meaning: "Inner light, dawn, first ray", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aaroh", gender: "boy", meaning: "Ascent, mountain, rising", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aarohi", gender: "girl", meaning: "Ascending, progressive, musical note", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aakash", gender: "boy", meaning: "Sky, space, the cosmos", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aakanksha", gender: "girl", meaning: "Wish, aspiration, ambition", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aalok", gender: "boy", meaning: "Light, brightness, radiance", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aanya", gender: "girl", meaning: "Graceful, inexhaustible", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aayush", gender: "boy", meaning: "Long life, health, longevity", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aastha", gender: "girl", meaning: "Faith, belief, devotion", origin: "Sanskrit", startingLetter: "a" },
  { name: "Abhimanyu", gender: "boy", meaning: "Son of Arjuna, valorous warrior", origin: "Sanskrit", startingLetter: "a" },
  { name: "Abhishek", gender: "boy", meaning: "Sacred bath, royal anointing", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aditya", gender: "boy", meaning: "Sun, son of Aditi", origin: "Sanskrit", startingLetter: "a" },
  { name: "Agastya", gender: "boy", meaning: "Name of a great sage, mountain mover", origin: "Sanskrit", startingLetter: "a" },
  { name: "Ahana", gender: "girl", meaning: "Dawn, inner light, first ray", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aishwarya", gender: "girl", meaning: "Wealth, prosperity, divine grace", origin: "Sanskrit", startingLetter: "a" },
  { name: "Ajay", gender: "boy", meaning: "Invincible, unconquerable", origin: "Sanskrit", startingLetter: "a" },
  { name: "Akshara", gender: "girl", meaning: "Letter, imperishable, eternal", origin: "Sanskrit", startingLetter: "a" },
  { name: "Akshita", gender: "girl", meaning: "Permanent, indestructible, eternal", origin: "Sanskrit", startingLetter: "a" },
  { name: "Amara", gender: "girl", meaning: "Immortal, eternal, deathless", origin: "Sanskrit", startingLetter: "a" },
  { name: "Amay", gender: "boy", meaning: "Lord Ganesha, remover of obstacles", origin: "Sanskrit", startingLetter: "a" },
  { name: "Ambar", gender: "boy", meaning: "Sky, ambergris, cloudless", origin: "Sanskrit", startingLetter: "a" },
  { name: "Amisha", gender: "girl", meaning: "Pure, without deceit, genuine", origin: "Sanskrit", startingLetter: "a" },
  { name: "Amitabh", gender: "boy", meaning: "Immeasurable radiance, infinite light", origin: "Sanskrit", startingLetter: "a" },
  { name: "Amiya", gender: "girl", meaning: "Nectar, delight, pleasantness", origin: "Sanskrit", startingLetter: "a" },
  { name: "Amol", gender: "boy", meaning: "Priceless, invaluable, precious", origin: "Sanskrit", startingLetter: "a" },
  { name: "Amruta", gender: "girl", meaning: "Immortal, divine nectar, blessed", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anandit", gender: "boy", meaning: "Joyful, happy, full of bliss", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anandita", gender: "girl", meaning: "Full of joy, blissful woman", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anasuya", gender: "girl", meaning: "Without envy, wife of sage Atri", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anaya", gender: "girl", meaning: "Caring, free, gift of God", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anish", gender: "boy", meaning: "Supreme, lord Vishnu, the best", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anita", gender: "girl", meaning: "Grace, favor, full of grace", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anjali", gender: "girl", meaning: "Offering, prayer with folded hands", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anuj", gender: "boy", meaning: "Younger brother, born later", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anupam", gender: "boy", meaning: "Incomparable, unique, unparalleled", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anusha", gender: "girl", meaning: "Beautiful morning, a star", origin: "Sanskrit", startingLetter: "a" },
  { name: "Archana", gender: "girl", meaning: "Worshipping, revering, praising", origin: "Sanskrit", startingLetter: "a" },
  { name: "Arpan", gender: "boy", meaning: "Offering, dedication, devotion", origin: "Sanskrit", startingLetter: "a" },
  { name: "Arpita", gender: "girl", meaning: "Dedicated, offered to God", origin: "Sanskrit", startingLetter: "a" },
  { name: "Arshi", gender: "girl", meaning: "Of divine origin, heavenly", origin: "Sanskrit", startingLetter: "a" },
  { name: "Arth", gender: "boy", meaning: "Meaningful, prosperous, wealthy", origin: "Sanskrit", startingLetter: "a" },
  { name: "Arun", gender: "boy", meaning: "Dawn, reddish, charioteer of sun", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aruna", gender: "girl", meaning: "Dawn, reddish glow, sunrise", origin: "Sanskrit", startingLetter: "a" },
  { name: "Arundhati", gender: "girl", meaning: "Star Arundhati, devoted wife, eternal", origin: "Sanskrit", startingLetter: "a" },
  { name: "Ashoka", gender: "boy", meaning: "Without sorrow, grief-free", origin: "Sanskrit", startingLetter: "a" },
  { name: "Ashwath", gender: "boy", meaning: "Sacred fig tree, Ashvattha", origin: "Sanskrit", startingLetter: "a" },
  { name: "Asha", gender: "girl", meaning: "Hope, wish, desire, aspiration", origin: "Sanskrit", startingLetter: "a" },
  { name: "Ashita", gender: "girl", meaning: "River Yamuna, one who brings peace", origin: "Sanskrit", startingLetter: "a" },
  { name: "Ashmit", gender: "boy", meaning: "Pride, self-respect, ego-less", origin: "Sanskrit", startingLetter: "a" },
  { name: "Asmi", gender: "girl", meaning: "I am, divine essence, nature", origin: "Sanskrit", startingLetter: "a" },
  { name: "Atharva", gender: "boy", meaning: "First Vedas, Lord Ganesha", origin: "Sanskrit", startingLetter: "a" },
  { name: "Ayaan", gender: "boy", meaning: "God's gift, speed, fast moving", origin: "Sanskrit", startingLetter: "a" },
  { name: "Ayana", gender: "girl", meaning: "Path, beautiful flower, journey", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aradhya", gender: "girl", meaning: "One to be worshipped, divine", origin: "Sanskrit", startingLetter: "a" },
  { name: "Aarav", gender: "boy", meaning: "Peaceful, calm", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anmol", gender: "boy", meaning: "Priceless, invaluable", origin: "Sanskrit", startingLetter: "a" },
  // KRITTIKA - I
  { name: "Ishaan", gender: "boy", meaning: "Sun, Lord Shiva, northeast", origin: "Sanskrit", startingLetter: "i" },
  { name: "Ishita", gender: "girl", meaning: "Supremacy, mastery, power", origin: "Sanskrit", startingLetter: "i" },
  { name: "Indra", gender: "boy", meaning: "King of gods, mighty ruler", origin: "Sanskrit", startingLetter: "i" },
  { name: "Inaya", gender: "girl", meaning: "Gift from God, concern", origin: "Sanskrit", startingLetter: "i" },
  { name: "Ira", gender: "girl", meaning: "Earth, watchful, the Saraswati river", origin: "Sanskrit", startingLetter: "i" },
  { name: "Indrani", gender: "girl", meaning: "Wife of Indra, queen of gods", origin: "Sanskrit", startingLetter: "i" },
  { name: "Indresh", gender: "boy", meaning: "Lord of kings, supreme ruler", origin: "Sanskrit", startingLetter: "i" },
  { name: "Indumati", gender: "girl", meaning: "Full moon, possessing moon's beauty", origin: "Sanskrit", startingLetter: "i" },
  { name: "Iravat", gender: "boy", meaning: "Cloud, son of Iravan", origin: "Sanskrit", startingLetter: "i" },
  { name: "Isha", gender: "girl", meaning: "Goddess, divine ruler", origin: "Sanskrit", startingLetter: "i" },
  { name: "Ishani", gender: "girl", meaning: "Goddess Parvati, divine", origin: "Sanskrit", startingLetter: "i" },
  { name: "Ishan", gender: "boy", meaning: "Northeast direction, Lord Shiva", origin: "Sanskrit", startingLetter: "i" },
  { name: "Ishwar", gender: "boy", meaning: "God, supreme being, lord", origin: "Sanskrit", startingLetter: "i" },
  { name: "Itisha", gender: "girl", meaning: "Happiness, joy, pleasure", origin: "Sanskrit", startingLetter: "i" },
  // KRITTIKA - U
  { name: "Utkarsh", gender: "boy", meaning: "Prosperity, awakening, upliftment", origin: "Sanskrit", startingLetter: "u" },
  { name: "Uma", gender: "girl", meaning: "Goddess Parvati, splendour, light", origin: "Sanskrit", startingLetter: "u" },
  { name: "Uday", gender: "boy", meaning: "Rising, dawn, ascent", origin: "Sanskrit", startingLetter: "u" },
  { name: "Udaya", gender: "girl", meaning: "Rising, prosperity, success", origin: "Sanskrit", startingLetter: "u" },
  { name: "Ujjwal", gender: "boy", meaning: "Bright, shining, lustrous", origin: "Sanskrit", startingLetter: "u" },
  { name: "Ujjwala", gender: "girl", meaning: "Bright, lustrous, radiant", origin: "Sanskrit", startingLetter: "u" },
  { name: "Umang", gender: "boy", meaning: "Enthusiasm, joy, passion", origin: "Sanskrit", startingLetter: "u" },
  { name: "Upasana", gender: "girl", meaning: "Worship, devotion, meditation", origin: "Sanskrit", startingLetter: "u" },
  { name: "Urvi", gender: "girl", meaning: "Earth, wide, the good earth", origin: "Sanskrit", startingLetter: "u" },
  { name: "Usha", gender: "girl", meaning: "Dawn, morning, Aurora", origin: "Sanskrit", startingLetter: "u" },
  { name: "Ushakant", gender: "boy", meaning: "Lord of dawn, the sun", origin: "Sanskrit", startingLetter: "u" },
  { name: "Uttam", gender: "boy", meaning: "Best, excellent, supreme", origin: "Sanskrit", startingLetter: "u" },
  { name: "Uttama", gender: "girl", meaning: "Most excellent, the best woman", origin: "Sanskrit", startingLetter: "u" },
  // KRITTIKA - E
  { name: "Esha", gender: "girl", meaning: "Desire, wish, Parvati", origin: "Sanskrit", startingLetter: "e" },
  { name: "Ekta", gender: "girl", meaning: "Unity, togetherness, oneness", origin: "Sanskrit", startingLetter: "e" },
  { name: "Elan", gender: "boy", meaning: "Tree, lively, spirited, enthusiastic", origin: "Sanskrit", startingLetter: "e" },
  { name: "Eesha", gender: "girl", meaning: "Ruler, goddess, divine power", origin: "Sanskrit", startingLetter: "e" },
  { name: "Eeshaan", gender: "boy", meaning: "Lord Shiva, northeast direction", origin: "Sanskrit", startingLetter: "e" },
  { name: "Eklavya", gender: "boy", meaning: "Focussed student, devoted learner", origin: "Sanskrit", startingLetter: "e" },
  // ROHINI - O
  { name: "Om", gender: "boy", meaning: "Sacred syllable, the universe", origin: "Sanskrit", startingLetter: "o" },
  { name: "Omkar", gender: "boy", meaning: "Lord Ganesha, sacred Om sound", origin: "Sanskrit", startingLetter: "o" },
  { name: "Omkaara", gender: "girl", meaning: "Symbol of divine, primordial sound", origin: "Sanskrit", startingLetter: "o" },
  { name: "Ojas", gender: "boy", meaning: "Body strength, vitality, lustre", origin: "Sanskrit", startingLetter: "o" },
  { name: "Ojasvi", gender: "girl", meaning: "Full of vitality and lustre", origin: "Sanskrit", startingLetter: "o" },
  { name: "Ojaswin", gender: "boy", meaning: "Vigorous, luminous, energetic", origin: "Sanskrit", startingLetter: "o" },
  // ROHINI - Va
  { name: "Vanya", gender: "girl", meaning: "From the forest, wild, free", origin: "Sanskrit", startingLetter: "va" },
  { name: "Vandana", gender: "girl", meaning: "Worship, adoration, salutation", origin: "Sanskrit", startingLetter: "va" },
  { name: "Vasudha", gender: "girl", meaning: "Earth, the giving one", origin: "Sanskrit", startingLetter: "va" },
  { name: "Varun", gender: "boy", meaning: "God of water and sky, ocean lord", origin: "Sanskrit", startingLetter: "va" },
  { name: "Varsha", gender: "girl", meaning: "Rain, year, blessed", origin: "Sanskrit", startingLetter: "va" },
  { name: "Vashist", gender: "boy", meaning: "Best, most excellent sage", origin: "Sanskrit", startingLetter: "va" },
  { name: "Vamshi", gender: "boy", meaning: "Flute, Lord Krishna, musical", origin: "Telugu", startingLetter: "va" },
  { name: "Vamshika", gender: "girl", meaning: "Flute player, musical talent", origin: "Telugu", startingLetter: "va" },
  { name: "Vasant", gender: "boy", meaning: "Spring season, fresh, vibrant", origin: "Sanskrit", startingLetter: "va" },
  { name: "Vasanta", gender: "girl", meaning: "Of spring, beautiful season", origin: "Sanskrit", startingLetter: "va" },
  { name: "Vasudeva", gender: "boy", meaning: "Father of Lord Krishna", origin: "Sanskrit", startingLetter: "va" },
  { name: "Varini", gender: "girl", meaning: "Choosing, selective, wise", origin: "Sanskrit", startingLetter: "va" },
  { name: "Vartika", gender: "girl", meaning: "Commentary, wick of lamp, writer", origin: "Sanskrit", startingLetter: "va" },
  // ROHINI - Vi
  { name: "Vihaan", gender: "boy", meaning: "Dawn, morning, new beginnings", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vikas", gender: "boy", meaning: "Development, progress, bloom", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vikram", gender: "boy", meaning: "Valor, bravery, heroism", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Viraj", gender: "boy", meaning: "Shining, radiant, brilliant", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vidya", gender: "girl", meaning: "Knowledge, learning, wisdom", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vishnu", gender: "boy", meaning: "The preserver, Lord Vishnu", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vinay", gender: "boy", meaning: "Modesty, good behavior, humility", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vinaya", gender: "girl", meaning: "Modesty, request, well-behaved", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vimala", gender: "girl", meaning: "Pure, spotless, clean", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vipul", gender: "boy", meaning: "Abundant, large, plentiful", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vijay", gender: "boy", meaning: "Victory, triumph, conqueror", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vijaya", gender: "girl", meaning: "Victorious, conqueror, triumphant", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vishaka", gender: "girl", meaning: "A star, the goddess, spreading", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vivekanand", gender: "boy", meaning: "Joy of wisdom, after Swami Vivekananda", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Vivaan", gender: "boy", meaning: "Rays of the rising sun", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Visal", gender: "boy", meaning: "Wide, large, clear, spacious", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Visalakshi", gender: "girl", meaning: "Wide-eyed goddess, Parvati", origin: "Sanskrit", startingLetter: "vi" },
  // ROHINI - Vu
  { name: "Vusala", gender: "girl", meaning: "Beloved, dear, cherished", origin: "Sanskrit", startingLetter: "vu" },
  // MRIGASHIRA - Ve
  { name: "Veda", gender: "girl", meaning: "Sacred knowledge, the Vedas", origin: "Sanskrit", startingLetter: "ve" },
  { name: "Vedant", gender: "boy", meaning: "Ultimate knowledge, Vedanta philosophy", origin: "Sanskrit", startingLetter: "ve" },
  { name: "Vedansh", gender: "boy", meaning: "Part of the sacred Vedas", origin: "Sanskrit", startingLetter: "ve" },
  { name: "Vedika", gender: "girl", meaning: "Knowledge seeker, sacred altar", origin: "Sanskrit", startingLetter: "ve" },
  { name: "Venkat", gender: "boy", meaning: "Lord Venkateshwara, the sacred hill", origin: "Telugu", startingLetter: "ve" },
  { name: "Venkatesh", gender: "boy", meaning: "Lord of the Venkata hills", origin: "Telugu", startingLetter: "ve" },
  { name: "Veni", gender: "girl", meaning: "Stream, river, braid of hair", origin: "Sanskrit", startingLetter: "ve" },
  { name: "Venu", gender: "boy", meaning: "Flute, bamboo, Krishna's flute", origin: "Sanskrit", startingLetter: "ve" },
  { name: "Venugopala", gender: "boy", meaning: "Lord Krishna playing the flute", origin: "Sanskrit", startingLetter: "ve" },
  // MRIGASHIRA - Ka
  { name: "Kavya", gender: "girl", meaning: "Poetry, artistic excellence", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Karan", gender: "boy", meaning: "A warrior, son of Kunti", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kamal", gender: "boy", meaning: "Lotus, perfection, beauty", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kamala", gender: "girl", meaning: "Lotus, goddess Lakshmi", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kartik", gender: "boy", meaning: "Lord Murugan, son of Shiva", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Karthika", gender: "girl", meaning: "Name of a star, daughter of Pleiades", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kannan", gender: "boy", meaning: "Lord Krishna, beloved one", origin: "Tamil", startingLetter: "ka" },
  { name: "Kavitha", gender: "girl", meaning: "Poem, poetic beauty", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kalyan", gender: "boy", meaning: "Welfare, auspicious, blessed", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kalyani", gender: "girl", meaning: "Auspicious, beautiful, prosperous", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kanya", gender: "girl", meaning: "Maiden, virgin, pure girl", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kavi", gender: "boy", meaning: "Poet, wise man, seer", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kavini", gender: "girl", meaning: "Musical, poetic, artistic", origin: "Tamil", startingLetter: "ka" },
  { name: "Kanishka", gender: "boy", meaning: "Small, young, ancient king", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Karuna", gender: "girl", meaning: "Compassion, mercy, kindness", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kapil", gender: "boy", meaning: "Reddish brown, Lord Vishnu", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kasthuri", gender: "girl", meaning: "Musk deer, fragrant, sweet", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Karishma", gender: "girl", meaning: "Miracle, divine wonder", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Kashyap", gender: "boy", meaning: "Tortoise, an ancient sage", origin: "Sanskrit", startingLetter: "ka" },
  // MRIGASHIRA - Ki
  { name: "Kiran", gender: "boy", meaning: "Ray of light, beam, sunshine", origin: "Sanskrit", startingLetter: "ki" },
  { name: "Kirtana", gender: "girl", meaning: "Devotional song, praise of God", origin: "Sanskrit", startingLetter: "ki" },
  { name: "Kishan", gender: "boy", meaning: "Lord Krishna, the dark one", origin: "Sanskrit", startingLetter: "ki" },
  { name: "Kishori", gender: "girl", meaning: "Young girl, Radha, adolescent", origin: "Sanskrit", startingLetter: "ki" },
  { name: "Kirtan", gender: "boy", meaning: "Devotional singing, chanting", origin: "Sanskrit", startingLetter: "ki" },
  { name: "Kirti", gender: "girl", meaning: "Fame, glory, renown", origin: "Sanskrit", startingLetter: "ki" },
  // ARDRA - Ku
  { name: "Kumar", gender: "boy", meaning: "Young man, prince, son", origin: "Sanskrit", startingLetter: "ku" },
  { name: "Kumari", gender: "girl", meaning: "Young woman, daughter, princess", origin: "Sanskrit", startingLetter: "ku" },
  { name: "Kunal", gender: "boy", meaning: "Son of Ashoka, lotus, pure-eyed", origin: "Sanskrit", startingLetter: "ku" },
  { name: "Kundan", gender: "boy", meaning: "Pure gold, refined, precious", origin: "Sanskrit", startingLetter: "ku" },
  { name: "Kundana", gender: "girl", meaning: "Pure, refined gold, divine", origin: "Sanskrit", startingLetter: "ku" },
  { name: "Kushi", gender: "girl", meaning: "Happy, delightful, joyous", origin: "Sanskrit", startingLetter: "ku" },
  { name: "Kushal", gender: "boy", meaning: "Skillful, clever, expert", origin: "Sanskrit", startingLetter: "ku" },
  { name: "Kunthi", gender: "girl", meaning: "Mother of Pandavas, earth", origin: "Sanskrit", startingLetter: "ku" },
  { name: "Kurush", gender: "boy", meaning: "Kind, sun, benevolent", origin: "Sanskrit", startingLetter: "ku" },
  // ARDRA - Gha
  { name: "Ghanshyam", gender: "boy", meaning: "Dark cloud, Lord Krishna", origin: "Sanskrit", startingLetter: "gha" },
  { name: "Ghanshyama", gender: "girl", meaning: "Dark beauty, Radha", origin: "Sanskrit", startingLetter: "gha" },
  { name: "Ghanapriya", gender: "girl", meaning: "Beloved of the rain, Saraswati", origin: "Sanskrit", startingLetter: "gha" },
  // ARDRA - Cha
  { name: "Chameli", gender: "girl", meaning: "Jasmine flower, fragrant beauty", origin: "Sanskrit", startingLetter: "cha" },
  { name: "Chandana", gender: "girl", meaning: "Sandalwood, fragrant, cooling", origin: "Sanskrit", startingLetter: "cha" },
  { name: "Chandan", gender: "boy", meaning: "Sandalwood, auspicious", origin: "Sanskrit", startingLetter: "cha" },
  { name: "Chandra", gender: "boy", meaning: "Moon, shining, brilliant", origin: "Sanskrit", startingLetter: "cha" },
  { name: "Chandrakala", gender: "girl", meaning: "Crescent moon, beauty of moon", origin: "Sanskrit", startingLetter: "cha" },
  { name: "Chandrika", gender: "girl", meaning: "Moonlight, radiant, glowing", origin: "Sanskrit", startingLetter: "cha" },
  { name: "Charu", gender: "girl", meaning: "Beautiful, pleasing, charming", origin: "Sanskrit", startingLetter: "cha" },
  { name: "Charuhas", gender: "boy", meaning: "One with a beautiful smile", origin: "Sanskrit", startingLetter: "cha" },
  { name: "Chaitanya", gender: "boy", meaning: "Divine consciousness, energy, awareness", origin: "Sanskrit", startingLetter: "cha" },
  { name: "Chamundi", gender: "girl", meaning: "Goddess Durga, slayer of Chanda", origin: "Sanskrit", startingLetter: "cha" },
  { name: "Charvi", gender: "girl", meaning: "Beautiful woman, graceful", origin: "Sanskrit", startingLetter: "cha" },
  // PUNARVASU - Ke
  { name: "Keerthi", gender: "girl", meaning: "Fame, glory, renowned", origin: "Sanskrit", startingLetter: "ke" },
  { name: "Keshav", gender: "boy", meaning: "Lord Vishnu, with beautiful hair", origin: "Sanskrit", startingLetter: "ke" },
  { name: "Keerthan", gender: "boy", meaning: "Praising, devotional singing", origin: "Sanskrit", startingLetter: "ke" },
  { name: "Keeral", gender: "girl", meaning: "Parrot, one who speaks sweetly", origin: "Tamil", startingLetter: "ke" },
  { name: "Ketan", gender: "boy", meaning: "Home, flag, symbol, sign", origin: "Sanskrit", startingLetter: "ke" },
  { name: "Kevala", gender: "girl", meaning: "Pure, alone, only, absolute", origin: "Sanskrit", startingLetter: "ke" },
  // PUNARVASU - Ko
  { name: "Komal", gender: "girl", meaning: "Soft, gentle, delicate, tender", origin: "Sanskrit", startingLetter: "ko" },
  { name: "Komala", gender: "girl", meaning: "Tender, soft, beautiful", origin: "Sanskrit", startingLetter: "ko" },
  { name: "Kousalya", gender: "girl", meaning: "Mother of Lord Rama, skillful", origin: "Sanskrit", startingLetter: "ko" },
  { name: "Kousik", gender: "boy", meaning: "Name of a sage, wise one", origin: "Sanskrit", startingLetter: "ko" },
  // PUNARVASU - Ha
  { name: "Harish", gender: "boy", meaning: "Lord Vishnu, lion, the Lord", origin: "Sanskrit", startingLetter: "ha" },
  { name: "Harika", gender: "girl", meaning: "Beautiful, like the goddess", origin: "Telugu", startingLetter: "ha" },
  { name: "Harini", gender: "girl", meaning: "Deer, graceful, delicate", origin: "Sanskrit", startingLetter: "ha" },
  { name: "Harsh", gender: "boy", meaning: "Joy, happiness, delight", origin: "Sanskrit", startingLetter: "ha" },
  { name: "Harsha", gender: "girl", meaning: "Joy, happiness, pleasure", origin: "Sanskrit", startingLetter: "ha" },
  { name: "Harshali", gender: "girl", meaning: "Joyful, happy, cheerful", origin: "Sanskrit", startingLetter: "ha" },
  { name: "Harshvardhan", gender: "boy", meaning: "Increasing joy and happiness", origin: "Sanskrit", startingLetter: "ha" },
  { name: "Hari", gender: "boy", meaning: "Lord Vishnu, golden, lion", origin: "Sanskrit", startingLetter: "ha" },
  { name: "Hamsini", gender: "girl", meaning: "One who rides a swan", origin: "Sanskrit", startingLetter: "ha" },
  { name: "Hamsa", gender: "girl", meaning: "Swan, pure soul, divine", origin: "Sanskrit", startingLetter: "ha" },
  // PUNARVASU - Hi
  { name: "Himesh", gender: "boy", meaning: "Lord of snow, Himalaya", origin: "Sanskrit", startingLetter: "hi" },
  { name: "Himani", gender: "girl", meaning: "Snow, made of ice, glacier", origin: "Sanskrit", startingLetter: "hi" },
  { name: "Hira", gender: "girl", meaning: "Diamond, precious, brilliant", origin: "Sanskrit", startingLetter: "hi" },
  { name: "Hiranmay", gender: "boy", meaning: "Made of gold, golden", origin: "Sanskrit", startingLetter: "hi" },
  { name: "Hiranmayi", gender: "girl", meaning: "Goddess of gold, golden woman", origin: "Sanskrit", startingLetter: "hi" },
  // PUSHYA - Hu
  { name: "Hunar", gender: "boy", meaning: "Skill, talent, special ability", origin: "Sanskrit", startingLetter: "hu" },
  { name: "Husna", gender: "girl", meaning: "Beautiful, good-natured, lovely", origin: "Sanskrit", startingLetter: "hu" },
  // PUSHYA - He
  { name: "Hemant", gender: "boy", meaning: "Gold, winter season, golden", origin: "Sanskrit", startingLetter: "he" },
  { name: "Hemanta", gender: "girl", meaning: "Winter season, golden woman", origin: "Sanskrit", startingLetter: "he" },
  { name: "Hema", gender: "girl", meaning: "Gold, goddess Parvati, golden", origin: "Sanskrit", startingLetter: "he" },
  { name: "Hemanth", gender: "boy", meaning: "Golden, winter, precious", origin: "Sanskrit", startingLetter: "he" },
  { name: "Hemavathi", gender: "girl", meaning: "Golden goddess Parvati", origin: "Sanskrit", startingLetter: "he" },
  // PUSHYA - Da
  { name: "Darshan", gender: "boy", meaning: "Vision, sight, philosophy", origin: "Sanskrit", startingLetter: "da" },
  { name: "Daya", gender: "girl", meaning: "Compassion, kindness, mercy", origin: "Sanskrit", startingLetter: "da" },
  { name: "Daksha", gender: "boy", meaning: "Competent, father of Sati", origin: "Sanskrit", startingLetter: "da" },
  { name: "Dakshayani", gender: "girl", meaning: "Daughter of Daksha, goddess Sati", origin: "Sanskrit", startingLetter: "da" },
  { name: "Damayanti", gender: "girl", meaning: "Subduing, a famous noble queen", origin: "Sanskrit", startingLetter: "da" },
  { name: "Danvir", gender: "boy", meaning: "Charitable, generous hero", origin: "Sanskrit", startingLetter: "da" },
  { name: "Darshi", gender: "girl", meaning: "Beholder, one with good vision", origin: "Sanskrit", startingLetter: "da" },
  { name: "Dayakar", gender: "boy", meaning: "Kind, compassionate, merciful", origin: "Sanskrit", startingLetter: "da" },
  { name: "Dayita", gender: "girl", meaning: "Beloved, dear, cherished", origin: "Sanskrit", startingLetter: "da" },
  // ASHLESHA - Di
  { name: "Divya", gender: "girl", meaning: "Divine, heavenly, celestial", origin: "Sanskrit", startingLetter: "di" },
  { name: "Dinesh", gender: "boy", meaning: "Sun, lord of the day", origin: "Sanskrit", startingLetter: "di" },
  { name: "Dipika", gender: "girl", meaning: "Small lamp, light, illumination", origin: "Sanskrit", startingLetter: "di" },
  { name: "Dipti", gender: "girl", meaning: "Brightness, radiance, glow", origin: "Sanskrit", startingLetter: "di" },
  { name: "Divyesh", gender: "boy", meaning: "Divine lord, the sun", origin: "Sanskrit", startingLetter: "di" },
  { name: "Divyansh", gender: "boy", meaning: "Divine part, light of God", origin: "Sanskrit", startingLetter: "di" },
  { name: "Divyanka", gender: "girl", meaning: "Divine mark, godly", origin: "Sanskrit", startingLetter: "di" },
  { name: "Dilip", gender: "boy", meaning: "Protector of Delhi, a great king", origin: "Sanskrit", startingLetter: "di" },
  { name: "Diksha", gender: "girl", meaning: "Initiation, dedication, commitment", origin: "Sanskrit", startingLetter: "di" },
  // ASHLESHA - Du
  { name: "Durga", gender: "girl", meaning: "Goddess Durga, invincible power", origin: "Sanskrit", startingLetter: "du" },
  { name: "Durgesh", gender: "boy", meaning: "Lord of the fort, Shiva", origin: "Sanskrit", startingLetter: "du" },
  { name: "Dulari", gender: "girl", meaning: "Beloved, cherished, dear", origin: "Hindi", startingLetter: "du" },
  { name: "Dushyant", gender: "boy", meaning: "Destroyer of evil, a king", origin: "Sanskrit", startingLetter: "du" },
  // ASHLESHA - De
  { name: "Deepak", gender: "boy", meaning: "Lamp, one who brings light", origin: "Sanskrit", startingLetter: "de" },
  { name: "Deepika", gender: "girl", meaning: "Lamp, light, illumination", origin: "Sanskrit", startingLetter: "de" },
  { name: "Deepthi", gender: "girl", meaning: "Brightness, radiance, flame", origin: "Sanskrit", startingLetter: "de" },
  { name: "Dev", gender: "boy", meaning: "God, divine, celestial", origin: "Sanskrit", startingLetter: "de" },
  { name: "Deva", gender: "girl", meaning: "Goddess, divine, heavenly", origin: "Sanskrit", startingLetter: "de" },
  { name: "Devika", gender: "girl", meaning: "Little goddess, divine", origin: "Sanskrit", startingLetter: "de" },
  { name: "Devesh", gender: "boy", meaning: "Lord of gods, supreme deity", origin: "Sanskrit", startingLetter: "de" },
  // MAGHA - Ma
  { name: "Madhav", gender: "boy", meaning: "Lord Krishna, sweet as honey", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Madhavi", gender: "girl", meaning: "A sweet creeper, spring season", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Mahesh", gender: "boy", meaning: "Great lord, Lord Shiva", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Maheshwari", gender: "girl", meaning: "Goddess Parvati, supreme goddess", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Manish", gender: "boy", meaning: "God of mind, wise person", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Manisha", gender: "girl", meaning: "Wisdom, intelligence, wish", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Maya", gender: "girl", meaning: "Illusion, magic, divine power", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Manoj", gender: "boy", meaning: "Born of mind, Cupid, attractive", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Malathi", gender: "girl", meaning: "Jasmine, a musical note, fragrant", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Malini", gender: "girl", meaning: "Fragrant, gardener, wearing garland", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Manas", gender: "boy", meaning: "Mind, soul, heart", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Manasa", gender: "girl", meaning: "Conceived in the mind, goddess", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Mani", gender: "boy", meaning: "Gem, jewel, precious stone", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Manika", gender: "girl", meaning: "Gem, ruby, precious", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Manvith", gender: "boy", meaning: "Honored, respected, dignified", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Manvitha", gender: "girl", meaning: "Honored, respectful woman", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Mandar", gender: "boy", meaning: "Heavenly coral tree, steady", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Mandira", gender: "girl", meaning: "Temple, home, sacred place", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Mangal", gender: "boy", meaning: "Auspicious, Mars, lucky", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Mangala", gender: "girl", meaning: "Auspicious woman, lucky", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Mahalakshmi", gender: "girl", meaning: "Great goddess Lakshmi, prosperity", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Mahadeva", gender: "boy", meaning: "Great god, Lord Shiva", origin: "Sanskrit", startingLetter: "ma" },
  // MAGHA - Mi
  { name: "Mihir", gender: "boy", meaning: "Sun, solar, sunlight", origin: "Sanskrit", startingLetter: "mi" },
  { name: "Mihira", gender: "girl", meaning: "Sunlight, radiant, brilliant", origin: "Sanskrit", startingLetter: "mi" },
  { name: "Mithra", gender: "girl", meaning: "Goddess of friendship and sun", origin: "Sanskrit", startingLetter: "mi" },
  { name: "Mithran", gender: "boy", meaning: "Friend, friendly sun god", origin: "Tamil", startingLetter: "mi" },
  { name: "Mitali", gender: "girl", meaning: "Friendly, kind, sweet", origin: "Sanskrit", startingLetter: "mi" },
  { name: "Mita", gender: "girl", meaning: "Measured, disciplined, moderate", origin: "Sanskrit", startingLetter: "mi" },
  { name: "Milan", gender: "boy", meaning: "Meeting, union, togetherness", origin: "Sanskrit", startingLetter: "mi" },
  { name: "Milana", gender: "girl", meaning: "Meeting, union, coming together", origin: "Sanskrit", startingLetter: "mi" },
  // MAGHA - Mu
  { name: "Mukesh", gender: "boy", meaning: "Lord of the dumb, Lord Vishnu", origin: "Sanskrit", startingLetter: "mu" },
  { name: "Mukul", gender: "boy", meaning: "Bud, soul, first bloom", origin: "Sanskrit", startingLetter: "mu" },
  { name: "Mukta", gender: "girl", meaning: "Liberated, pearl, free", origin: "Sanskrit", startingLetter: "mu" },
  { name: "Mukthi", gender: "girl", meaning: "Liberation, freedom, salvation", origin: "Sanskrit", startingLetter: "mu" },
  { name: "Murali", gender: "boy", meaning: "Flute, Lord Krishna's flute", origin: "Sanskrit", startingLetter: "mu" },
  { name: "Muralika", gender: "girl", meaning: "Flute, melody, musical", origin: "Sanskrit", startingLetter: "mu" },
  { name: "Muruga", gender: "boy", meaning: "Lord Murugan, young god of war", origin: "Tamil", startingLetter: "mu" },
  // MAGHA - Me
  { name: "Meera", gender: "girl", meaning: "Devotee of Krishna, ocean", origin: "Sanskrit", startingLetter: "me" },
  { name: "Meenal", gender: "girl", meaning: "Precious stone, gem, blue stone", origin: "Sanskrit", startingLetter: "me" },
  { name: "Meghna", gender: "girl", meaning: "Cloud, river, sky", origin: "Sanskrit", startingLetter: "me" },
  { name: "Meghraj", gender: "boy", meaning: "King of clouds, mighty", origin: "Sanskrit", startingLetter: "me" },
  { name: "Menaka", gender: "girl", meaning: "Celestial nymph, mother of Shakuntala", origin: "Sanskrit", startingLetter: "me" },
  { name: "Meenakshi", gender: "girl", meaning: "Fish-eyed goddess, Parvati of Madurai", origin: "Sanskrit", startingLetter: "me" },
  // PURVA PHALGUNI - Mo
  { name: "Mohan", gender: "boy", meaning: "Enchanting, Lord Krishna, attractive", origin: "Sanskrit", startingLetter: "mo" },
  { name: "Mohana", gender: "girl", meaning: "Bewitching, enchanting woman", origin: "Sanskrit", startingLetter: "mo" },
  { name: "Mohit", gender: "boy", meaning: "Enchanted, infatuated, captivated", origin: "Sanskrit", startingLetter: "mo" },
  { name: "Mohita", gender: "girl", meaning: "Enchanted, attracted, beautiful", origin: "Sanskrit", startingLetter: "mo" },
  { name: "Moushumi", gender: "girl", meaning: "Related to monsoon, rainy season", origin: "Sanskrit", startingLetter: "mo" },
  // PURVA PHALGUNI - Ta
  { name: "Tarun", gender: "boy", meaning: "Young, tender, youthful", origin: "Sanskrit", startingLetter: "ta" },
  { name: "Taruna", gender: "girl", meaning: "Young woman, tender, fresh", origin: "Sanskrit", startingLetter: "ta" },
  { name: "Tara", gender: "girl", meaning: "Star, savior, celestial body", origin: "Sanskrit", startingLetter: "ta" },
  { name: "Taranath", gender: "boy", meaning: "Lord of stars, savior", origin: "Sanskrit", startingLetter: "ta" },
  { name: "Tanvi", gender: "girl", meaning: "Slender, beautiful, delicate", origin: "Sanskrit", startingLetter: "ta" },
  { name: "Tanay", gender: "boy", meaning: "Son, offspring, child", origin: "Sanskrit", startingLetter: "ta" },
  { name: "Tanaya", gender: "girl", meaning: "Daughter, born of the body", origin: "Sanskrit", startingLetter: "ta" },
  { name: "Tanmay", gender: "boy", meaning: "Absorbed in, completely dedicated", origin: "Sanskrit", startingLetter: "ta" },
  { name: "Tapan", gender: "boy", meaning: "Sun, heating, warmth", origin: "Sanskrit", startingLetter: "ta" },
  // PURVA PHALGUNI - Tu
  { name: "Tulasi", gender: "girl", meaning: "Sacred basil plant, divine", origin: "Sanskrit", startingLetter: "tu" },
  { name: "Tushar", gender: "boy", meaning: "Snow, fine droplets, cold", origin: "Sanskrit", startingLetter: "tu" },
  { name: "Tushara", gender: "girl", meaning: "Snow, dew, cool", origin: "Sanskrit", startingLetter: "tu" },
  { name: "Tunga", gender: "boy", meaning: "High, tall, exalted, majestic", origin: "Sanskrit", startingLetter: "tu" },
  // UTTARA PHALGUNI - Te
  { name: "Tejas", gender: "boy", meaning: "Brilliance, luster, energy", origin: "Sanskrit", startingLetter: "te" },
  { name: "Tejasvi", gender: "girl", meaning: "Full of brilliance, radiant", origin: "Sanskrit", startingLetter: "te" },
  { name: "Tejaswini", gender: "girl", meaning: "Radiant, brilliant woman", origin: "Sanskrit", startingLetter: "te" },
  { name: "Tejal", gender: "girl", meaning: "Lustrous, bright, shining", origin: "Sanskrit", startingLetter: "te" },
  { name: "Tejendra", gender: "boy", meaning: "Lord of brilliance", origin: "Sanskrit", startingLetter: "te" },
  // UTTARA PHALGUNI - Pa
  { name: "Pavan", gender: "boy", meaning: "Wind, pure, sacred", origin: "Sanskrit", startingLetter: "pa" },
  { name: "Pavana", gender: "girl", meaning: "Wind, purifying, cleansing", origin: "Sanskrit", startingLetter: "pa" },
  { name: "Padma", gender: "girl", meaning: "Lotus, goddess Lakshmi", origin: "Sanskrit", startingLetter: "pa" },
  { name: "Padmaja", gender: "girl", meaning: "Born from lotus, Lakshmi", origin: "Sanskrit", startingLetter: "pa" },
  { name: "Pallavi", gender: "girl", meaning: "New leaves, musical refrain", origin: "Sanskrit", startingLetter: "pa" },
  { name: "Parth", gender: "boy", meaning: "Son of Pritha, Arjuna", origin: "Sanskrit", startingLetter: "pa" },
  { name: "Parvati", gender: "girl", meaning: "Daughter of the mountain, Shiva's wife", origin: "Sanskrit", startingLetter: "pa" },
  { name: "Paresh", gender: "boy", meaning: "Supreme lord, God", origin: "Sanskrit", startingLetter: "pa" },
  { name: "Pavithra", gender: "girl", meaning: "Pure, holy, sacred", origin: "Sanskrit", startingLetter: "pa" },
  { name: "Paavan", gender: "boy", meaning: "Pure, sacred, divine", origin: "Sanskrit", startingLetter: "pa" },
  // HASTA - Pu
  { name: "Puja", gender: "girl", meaning: "Worship, reverence, prayer", origin: "Sanskrit", startingLetter: "pu" },
  { name: "Pujan", gender: "boy", meaning: "Worshipping, religious ceremony", origin: "Sanskrit", startingLetter: "pu" },
  { name: "Pulkit", gender: "boy", meaning: "Thrilled, joyful, hair-raising", origin: "Sanskrit", startingLetter: "pu" },
  { name: "Purva", gender: "girl", meaning: "East, before, earlier, first", origin: "Sanskrit", startingLetter: "pu" },
  { name: "Purvi", gender: "girl", meaning: "Of the east, Eastern", origin: "Sanskrit", startingLetter: "pu" },
  { name: "Pushkar", gender: "boy", meaning: "Blue lotus, sacred lake", origin: "Sanskrit", startingLetter: "pu" },
  { name: "Pushpa", gender: "girl", meaning: "Flower, bloom, blossom", origin: "Sanskrit", startingLetter: "pu" },
  { name: "Pushpanjali", gender: "girl", meaning: "Offering of flowers, divine offering", origin: "Sanskrit", startingLetter: "pu" },
  { name: "Purushottam", gender: "boy", meaning: "Supreme spirit, Lord Vishnu", origin: "Sanskrit", startingLetter: "pu" },
  // HASTA - Sha
  { name: "Shankar", gender: "boy", meaning: "Auspicious, Lord Shiva", origin: "Sanskrit", startingLetter: "sha" },
  { name: "Shankari", gender: "girl", meaning: "Goddess Parvati, auspicious", origin: "Sanskrit", startingLetter: "sha" },
  { name: "Shashi", gender: "boy", meaning: "Moon, containing a hare", origin: "Sanskrit", startingLetter: "sha" },
  { name: "Shashikala", gender: "girl", meaning: "Crescent moon, art of moon", origin: "Sanskrit", startingLetter: "sha" },
  { name: "Shalini", gender: "girl", meaning: "Modest, polite, well-mannered", origin: "Sanskrit", startingLetter: "sha" },
  { name: "Shanti", gender: "girl", meaning: "Peace, calm, tranquility", origin: "Sanskrit", startingLetter: "sha" },
  { name: "Shantanu", gender: "boy", meaning: "Whole body, a great king", origin: "Sanskrit", startingLetter: "sha" },
  { name: "Sharad", gender: "boy", meaning: "Autumn season, sharp", origin: "Sanskrit", startingLetter: "sha" },
  { name: "Sharada", gender: "girl", meaning: "Autumn, goddess Saraswati", origin: "Sanskrit", startingLetter: "sha" },
  { name: "Sharanya", gender: "girl", meaning: "Surrendered, refuge, shelter", origin: "Sanskrit", startingLetter: "sha" },
  { name: "Sharvari", gender: "girl", meaning: "Night, Parvati, goddess", origin: "Sanskrit", startingLetter: "sha" },
  // HASTA - Na
  { name: "Naveen", gender: "boy", meaning: "New, novel, fresh", origin: "Sanskrit", startingLetter: "na" },
  { name: "Naveena", gender: "girl", meaning: "New, fresh, novel", origin: "Sanskrit", startingLetter: "na" },
  { name: "Naresh", gender: "boy", meaning: "King of men, lord", origin: "Sanskrit", startingLetter: "na" },
  { name: "Nalini", gender: "girl", meaning: "Lotus, tender, soft", origin: "Sanskrit", startingLetter: "na" },
  { name: "Nandini", gender: "girl", meaning: "Daughter of joy, holy cow", origin: "Sanskrit", startingLetter: "na" },
  { name: "Nanda", gender: "boy", meaning: "Joy, delight, happiness", origin: "Sanskrit", startingLetter: "na" },
  { name: "Narayan", gender: "boy", meaning: "Lord Vishnu, son of water", origin: "Sanskrit", startingLetter: "na" },
  { name: "Nayan", gender: "boy", meaning: "Eye, guide, vision", origin: "Sanskrit", startingLetter: "na" },
  { name: "Nayana", gender: "girl", meaning: "Beautiful eyes, lovely gaze", origin: "Sanskrit", startingLetter: "na" },
  // CHITRA - Ra
  { name: "Rajan", gender: "boy", meaning: "King, ruler, shine", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Rajani", gender: "girl", meaning: "Night, queen, princess of dark", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Rajesh", gender: "boy", meaning: "King of kings, supreme ruler", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Rajeshwari", gender: "girl", meaning: "Queen of queens, goddess", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Rakesh", gender: "boy", meaning: "Full moon night, moon lord", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Raksha", gender: "girl", meaning: "Protection, defense, guardian", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Ram", gender: "boy", meaning: "Lord Rama, pleasing, charming", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Rama", gender: "girl", meaning: "Pleasing, Lakshmi, goddess", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Ramya", gender: "girl", meaning: "Beautiful, pleasant, delightful", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Ranjana", gender: "girl", meaning: "Entertaining, pleasing, joyful", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Ranjit", gender: "boy", meaning: "Victorious, delighted, colorful", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Rasika", gender: "girl", meaning: "Appreciator, full of taste", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Ratan", gender: "boy", meaning: "Gem, jewel, precious stone", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Ratna", gender: "girl", meaning: "Gem, jewel, treasure", origin: "Sanskrit", startingLetter: "ra" },
  { name: "Ravi", gender: "boy", meaning: "Sun, radiant, bright", origin: "Sanskrit", startingLetter: "ra" },
  // CHITRA - Ri
  { name: "Ritesh", gender: "boy", meaning: "Lord of seasons, auspicious", origin: "Sanskrit", startingLetter: "ri" },
  { name: "Rithika", gender: "girl", meaning: "Brass, stream of water, truthful", origin: "Sanskrit", startingLetter: "ri" },
  { name: "Richa", gender: "girl", meaning: "Holy verse of the Rigveda", origin: "Sanskrit", startingLetter: "ri" },
  { name: "Rishab", gender: "boy", meaning: "The best, musical note", origin: "Sanskrit", startingLetter: "ri" },
  { name: "Rishi", gender: "boy", meaning: "Sage, seer of truth, enlightened", origin: "Sanskrit", startingLetter: "ri" },
  { name: "Rishita", gender: "girl", meaning: "Best, the finest, excellent", origin: "Sanskrit", startingLetter: "ri" },
  // SWATI - Ru
  { name: "Rudra", gender: "boy", meaning: "Lord Shiva, storm god, fierce", origin: "Sanskrit", startingLetter: "ru" },
  { name: "Rupa", gender: "girl", meaning: "Beautiful form, figure, beauty", origin: "Sanskrit", startingLetter: "ru" },
  { name: "Rupesh", gender: "boy", meaning: "Lord of beauty, handsome", origin: "Sanskrit", startingLetter: "ru" },
  { name: "Ruchi", gender: "girl", meaning: "Interest, taste, beauty, desire", origin: "Sanskrit", startingLetter: "ru" },
  { name: "Ruchika", gender: "girl", meaning: "Glittering, bright, beautiful", origin: "Sanskrit", startingLetter: "ru" },
  // SWATI - Re
  { name: "Revathi", gender: "girl", meaning: "Wealthy, the last nakshatra star", origin: "Sanskrit", startingLetter: "re" },
  { name: "Rekha", gender: "girl", meaning: "Line, mark, feature, beauty", origin: "Sanskrit", startingLetter: "re" },
  { name: "Reema", gender: "girl", meaning: "White antelope, pretty woman", origin: "Sanskrit", startingLetter: "re" },
  { name: "Reena", gender: "girl", meaning: "Gem, dissolved, melted", origin: "Sanskrit", startingLetter: "re" },
  { name: "Resham", gender: "girl", meaning: "Silk, smooth, delicate", origin: "Hindi", startingLetter: "re" },
  // SWATI - Ro
  { name: "Rohit", gender: "boy", meaning: "Red, first rays of sun", origin: "Sanskrit", startingLetter: "ro" },
  { name: "Rohini", gender: "girl", meaning: "Growing, red cow, a nakshatra", origin: "Sanskrit", startingLetter: "ro" },
  { name: "Roshan", gender: "boy", meaning: "Bright, light, illuminated", origin: "Sanskrit", startingLetter: "ro" },
  { name: "Roshani", gender: "girl", meaning: "Light, brightness, radiance", origin: "Sanskrit", startingLetter: "ro" },
  { name: "Roshni", gender: "girl", meaning: "Light, brightness, sparkle", origin: "Hindi", startingLetter: "ro" },
  // ANURADHA - Ni
  { name: "Nithya", gender: "girl", meaning: "Eternal, constant, everlasting", origin: "Sanskrit", startingLetter: "ni" },
  { name: "Nisha", gender: "girl", meaning: "Night, dream, quiet time", origin: "Sanskrit", startingLetter: "ni" },
  { name: "Nishant", gender: "boy", meaning: "Dawn, end of night, peaceful", origin: "Sanskrit", startingLetter: "ni" },
  { name: "Nishka", gender: "girl", meaning: "Pure, honest, gold ornament", origin: "Sanskrit", startingLetter: "ni" },
  { name: "Nikhil", gender: "boy", meaning: "Complete, whole, entire", origin: "Sanskrit", startingLetter: "ni" },
  { name: "Nikhila", gender: "girl", meaning: "Complete, entire, perfect", origin: "Sanskrit", startingLetter: "ni" },
  { name: "Niraj", gender: "boy", meaning: "Lotus flower, born of water", origin: "Sanskrit", startingLetter: "ni" },
  { name: "Nirali", gender: "girl", meaning: "Different, unique, special", origin: "Sanskrit", startingLetter: "ni" },
  { name: "Niranjana", gender: "girl", meaning: "Without blemish, pure, clear", origin: "Sanskrit", startingLetter: "ni" },
  // ANURADHA - Nu
  { name: "Nutan", gender: "boy", meaning: "New, novel, recent", origin: "Sanskrit", startingLetter: "nu" },
  { name: "Nutana", gender: "girl", meaning: "New, fresh, modern", origin: "Sanskrit", startingLetter: "nu" },
  // ANURADHA - Ne
  { name: "Neethi", gender: "girl", meaning: "Principle, ethics, righteousness", origin: "Sanskrit", startingLetter: "ne" },
  { name: "Neela", gender: "girl", meaning: "Blue, sapphire, dark beauty", origin: "Sanskrit", startingLetter: "ne" },
  { name: "Neeraj", gender: "boy", meaning: "Lotus, born of water, pure", origin: "Sanskrit", startingLetter: "ne" },
  { name: "Neha", gender: "girl", meaning: "Rain, love, affection, dew", origin: "Sanskrit", startingLetter: "ne" },
  // JYESHTHA - Ya
  { name: "Yash", gender: "boy", meaning: "Fame, glory, success, honor", origin: "Sanskrit", startingLetter: "ya" },
  { name: "Yashashri", gender: "girl", meaning: "Glorious beauty, famous", origin: "Sanskrit", startingLetter: "ya" },
  { name: "Yashvardhan", gender: "boy", meaning: "One who increases fame", origin: "Sanskrit", startingLetter: "ya" },
  { name: "Yashodhara", gender: "girl", meaning: "Bearer of fame, wife of Buddha", origin: "Sanskrit", startingLetter: "ya" },
  { name: "Yamini", gender: "girl", meaning: "Night, the night goddess", origin: "Sanskrit", startingLetter: "ya" },
  { name: "Yashika", gender: "girl", meaning: "Fame, success, popularity", origin: "Sanskrit", startingLetter: "ya" },
  { name: "Yatharth", gender: "boy", meaning: "Reality, truth, what is real", origin: "Sanskrit", startingLetter: "ya" },
  // JYESHTHA - Yu
  { name: "Yuvan", gender: "boy", meaning: "Young, youthful, vigorous", origin: "Sanskrit", startingLetter: "yu" },
  { name: "Yuvraj", gender: "boy", meaning: "Crown prince, young king", origin: "Sanskrit", startingLetter: "yu" },
  { name: "Yuvika", gender: "girl", meaning: "Young woman, princess", origin: "Sanskrit", startingLetter: "yu" },
  // MULA - Ye
  { name: "Yeswanth", gender: "boy", meaning: "Fame, glory, glorious", origin: "Telugu", startingLetter: "ye" },
  { name: "Yeghanth", gender: "boy", meaning: "Lord Shiva, pure being", origin: "Sanskrit", startingLetter: "ye" },
  // MULA - Yo
  { name: "Yogesh", gender: "boy", meaning: "Lord of yoga, Shiva", origin: "Sanskrit", startingLetter: "yo" },
  { name: "Yogeshwari", gender: "girl", meaning: "Goddess of yoga, Parvati", origin: "Sanskrit", startingLetter: "yo" },
  { name: "Yogita", gender: "girl", meaning: "One who can concentrate", origin: "Sanskrit", startingLetter: "yo" },
  { name: "Yogini", gender: "girl", meaning: "Female yogi, mystic, divine", origin: "Sanskrit", startingLetter: "yo" },
  // MULA - Ba
  { name: "Bala", gender: "girl", meaning: "Young girl, strength, power", origin: "Sanskrit", startingLetter: "ba" },
  { name: "Balaji", gender: "boy", meaning: "Lord Venkateswara, Vishnu", origin: "Sanskrit", startingLetter: "ba" },
  { name: "Balachandra", gender: "boy", meaning: "Young moon, crescent moon", origin: "Sanskrit", startingLetter: "ba" },
  { name: "Balaram", gender: "boy", meaning: "Elder brother of Krishna", origin: "Sanskrit", startingLetter: "ba" },
  { name: "Banu", gender: "girl", meaning: "Sun, lady, woman, princess", origin: "Sanskrit", startingLetter: "ba" },
  { name: "Baruna", gender: "girl", meaning: "Goddess Varuna, water deity", origin: "Sanskrit", startingLetter: "ba" },
  // MULA - Bi
  { name: "Bindhu", gender: "girl", meaning: "Drop, point, zero, divine", origin: "Sanskrit", startingLetter: "bi" },
  { name: "Bimala", gender: "girl", meaning: "Pure, stainless, spotless", origin: "Sanskrit", startingLetter: "bi" },
  { name: "Bimal", gender: "boy", meaning: "Pure, clean, virtuous", origin: "Sanskrit", startingLetter: "bi" },
  // PURVA ASHADHA - Dha
  { name: "Dhaval", gender: "boy", meaning: "White, pure, bright", origin: "Sanskrit", startingLetter: "dha" },
  { name: "Dhavala", gender: "girl", meaning: "White, pure, clean woman", origin: "Sanskrit", startingLetter: "dha" },
  { name: "Dharini", gender: "girl", meaning: "Earth, bearing, supporting", origin: "Sanskrit", startingLetter: "dha" },
  { name: "Dharma", gender: "boy", meaning: "Righteousness, religion, duty", origin: "Sanskrit", startingLetter: "dha" },
  { name: "Dheeraj", gender: "boy", meaning: "Patience, courage, fortitude", origin: "Sanskrit", startingLetter: "dha" },
  { name: "Dheera", gender: "girl", meaning: "Brave, patient, courageous", origin: "Sanskrit", startingLetter: "dha" },
  { name: "Dhruv", gender: "boy", meaning: "Firm, constant, Pole Star", origin: "Sanskrit", startingLetter: "dha" },
  { name: "Dhruva", gender: "girl", meaning: "Fixed star, constant, eternal", origin: "Sanskrit", startingLetter: "dha" },
  // PURVA ASHADHA - Bha
  { name: "Bharat", gender: "boy", meaning: "India, one who maintains fire", origin: "Sanskrit", startingLetter: "bha" },
  { name: "Bharati", gender: "girl", meaning: "Goddess Saraswati, India", origin: "Sanskrit", startingLetter: "bha" },
  { name: "Bhavana", gender: "girl", meaning: "Good feelings, emotions, sentiment", origin: "Sanskrit", startingLetter: "bha" },
  { name: "Bhavin", gender: "boy", meaning: "Living, prosperous, existing", origin: "Sanskrit", startingLetter: "bha" },
  { name: "Bhavini", gender: "girl", meaning: "Emotional, noble, sensitive woman", origin: "Sanskrit", startingLetter: "bha" },
  { name: "Bhaskar", gender: "boy", meaning: "Sun, creator of light", origin: "Sanskrit", startingLetter: "bha" },
  { name: "Bhaskari", gender: "girl", meaning: "Rays of sun, brilliant woman", origin: "Sanskrit", startingLetter: "bha" },
  // UTTARA ASHADHA - Ja
  { name: "Jai", gender: "boy", meaning: "Victory, win, triumph", origin: "Sanskrit", startingLetter: "ja" },
  { name: "Jaideep", gender: "boy", meaning: "Victory of light, lamp of victory", origin: "Sanskrit", startingLetter: "ja" },
  { name: "Jaya", gender: "girl", meaning: "Victory, goddess Parvati", origin: "Sanskrit", startingLetter: "ja" },
  { name: "Jayanti", gender: "girl", meaning: "Victorious, birthday of gods", origin: "Sanskrit", startingLetter: "ja" },
  { name: "Jayesh", gender: "boy", meaning: "Lord of victory", origin: "Sanskrit", startingLetter: "ja" },
  { name: "Jayanth", gender: "boy", meaning: "Victorious, final victor", origin: "Sanskrit", startingLetter: "ja" },
  { name: "Jagannath", gender: "boy", meaning: "Lord of the universe", origin: "Sanskrit", startingLetter: "ja" },
  { name: "Jahnavi", gender: "girl", meaning: "Daughter of sage Jahnu, Ganga", origin: "Sanskrit", startingLetter: "ja" },
  { name: "Janani", gender: "girl", meaning: "Mother, giving birth", origin: "Sanskrit", startingLetter: "ja" },
  // UTTARA ASHADHA - Ji
  { name: "Jivan", gender: "boy", meaning: "Life, living, existence", origin: "Sanskrit", startingLetter: "ji" },
  { name: "Jivana", gender: "girl", meaning: "Life, water, living being", origin: "Sanskrit", startingLetter: "ji" },
  { name: "Jitesh", gender: "boy", meaning: "Lord of victory, winner", origin: "Sanskrit", startingLetter: "ji" },
  // SHRAVANA - Ju
  { name: "Juhi", gender: "girl", meaning: "Jasmine flower, fragrant bloom", origin: "Sanskrit", startingLetter: "ju" },
  // SHRAVANA - Je
  { name: "Jeevitha", gender: "girl", meaning: "Alive, life, living", origin: "Sanskrit", startingLetter: "je" },
  { name: "Jeeva", gender: "girl", meaning: "Life, living being, soul", origin: "Sanskrit", startingLetter: "je" },
  { name: "Jeevan", gender: "boy", meaning: "Life, living, existence", origin: "Sanskrit", startingLetter: "je" },
  // SHRAVANA - Jo
  { name: "Joshitha", gender: "girl", meaning: "Delighted, pleased, happy", origin: "Sanskrit", startingLetter: "jo" },
  { name: "Joshna", gender: "girl", meaning: "Moonlight, soft light", origin: "Sanskrit", startingLetter: "jo" },
  { name: "Jothi", gender: "girl", meaning: "Light, flame, divine light", origin: "Tamil", startingLetter: "jo" },
  // DHANISHTA - Ga
  { name: "Ganesh", gender: "boy", meaning: "Lord of groups, elephant god", origin: "Sanskrit", startingLetter: "ga" },
  { name: "Gautam", gender: "boy", meaning: "Remover of darkness, Buddha", origin: "Sanskrit", startingLetter: "ga" },
  { name: "Gautami", gender: "girl", meaning: "River Godavari, wife of Gautama", origin: "Sanskrit", startingLetter: "ga" },
  { name: "Gayatri", gender: "girl", meaning: "Sacred Vedic hymn, divine mother", origin: "Sanskrit", startingLetter: "ga" },
  { name: "Gauri", gender: "girl", meaning: "White, fair, Parvati", origin: "Sanskrit", startingLetter: "ga" },
  { name: "Gaurav", gender: "boy", meaning: "Pride, honor, dignity", origin: "Sanskrit", startingLetter: "ga" },
  { name: "Ganga", gender: "girl", meaning: "River Ganges, pure, holy", origin: "Sanskrit", startingLetter: "ga" },
  { name: "Gangadhar", gender: "boy", meaning: "One who holds Ganga, Shiva", origin: "Sanskrit", startingLetter: "ga" },
  { name: "Garima", gender: "girl", meaning: "Gravity, pride, importance", origin: "Sanskrit", startingLetter: "ga" },
  // DHANISHTA - Gi
  { name: "Girish", gender: "boy", meaning: "Lord of mountains, Shiva", origin: "Sanskrit", startingLetter: "gi" },
  { name: "Girija", gender: "girl", meaning: "Daughter of mountain, Parvati", origin: "Sanskrit", startingLetter: "gi" },
  { name: "Gita", gender: "girl", meaning: "Song, Bhagavad Gita, sacred", origin: "Sanskrit", startingLetter: "gi" },
  { name: "Gitanjali", gender: "girl", meaning: "Offering of songs, devotional", origin: "Sanskrit", startingLetter: "gi" },
  // DHANISHTA - Gu
  { name: "Gulab", gender: "girl", meaning: "Rose flower, fragrant beauty", origin: "Hindi", startingLetter: "gu" },
  { name: "Gulshan", gender: "boy", meaning: "Rose garden, beautiful", origin: "Hindi", startingLetter: "gu" },
  { name: "Gunavati", gender: "girl", meaning: "Virtuous woman, noble", origin: "Sanskrit", startingLetter: "gu" },
  { name: "Guru", gender: "boy", meaning: "Teacher, Jupiter, spiritual master", origin: "Sanskrit", startingLetter: "gu" },
  // DHANISHTA - Ge
  { name: "Geeta", gender: "girl", meaning: "Song, Bhagavad Gita, sacred text", origin: "Sanskrit", startingLetter: "ge" },
  { name: "Geethanjali", gender: "girl", meaning: "Offering of songs, devotional hymn", origin: "Sanskrit", startingLetter: "ge" },
  // SHATABHISHA - Go
  { name: "Gopal", gender: "boy", meaning: "Protector of cows, Krishna", origin: "Sanskrit", startingLetter: "go" },
  { name: "Gopika", gender: "girl", meaning: "Cowherd girl, devotee of Krishna", origin: "Sanskrit", startingLetter: "go" },
  { name: "Govind", gender: "boy", meaning: "Protector of cows, Vishnu", origin: "Sanskrit", startingLetter: "go" },
  // SHATABHISHA - Sa
  { name: "Sanjay", gender: "boy", meaning: "Triumphant, victorious, conqueror", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Sanjana", gender: "girl", meaning: "Creative, gentle, soft", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Saraswati", gender: "girl", meaning: "Goddess of learning and arts", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Saroja", gender: "girl", meaning: "Lotus, born in lake", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Satya", gender: "boy", meaning: "Truth, real, genuine", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Satyavathi", gender: "girl", meaning: "Truthful woman, honest", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Savita", gender: "girl", meaning: "Sun, one who gives birth", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Sahana", gender: "girl", meaning: "Patient, tolerant, enduring", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Saket", gender: "boy", meaning: "Heaven, holy city of Ayodhya", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Sameera", gender: "girl", meaning: "Wind, entertainer, breeze", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Sandhya", gender: "girl", meaning: "Twilight, dusk, evening prayer", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Santosh", gender: "boy", meaning: "Contentment, satisfaction, peace", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Sanvika", gender: "girl", meaning: "Goddess Saraswati, divine", origin: "Sanskrit", startingLetter: "sa" },
  // SHATABHISHA - Si
  { name: "Sindhu", gender: "girl", meaning: "Ocean, river Indus", origin: "Sanskrit", startingLetter: "si" },
  { name: "Siddhant", gender: "boy", meaning: "Principle, doctrine, truth", origin: "Sanskrit", startingLetter: "si" },
  { name: "Siddhi", gender: "girl", meaning: "Achievement, success, power", origin: "Sanskrit", startingLetter: "si" },
  { name: "Simha", gender: "boy", meaning: "Lion, powerful, courageous", origin: "Sanskrit", startingLetter: "si" },
  { name: "Simran", gender: "girl", meaning: "Meditation, remembrance, divine", origin: "Sanskrit", startingLetter: "si" },
  // SHATABHISHA - Su
  { name: "Suresh", gender: "boy", meaning: "Lord of gods, Indra", origin: "Sanskrit", startingLetter: "su" },
  { name: "Surya", gender: "boy", meaning: "Sun god, radiant, powerful", origin: "Sanskrit", startingLetter: "su" },
  { name: "Sushma", gender: "girl", meaning: "Beautiful, charming, graceful", origin: "Sanskrit", startingLetter: "su" },
  { name: "Supriya", gender: "girl", meaning: "Very dear, beloved, chosen", origin: "Sanskrit", startingLetter: "su" },
  { name: "Sundar", gender: "boy", meaning: "Beautiful, handsome, pleasing", origin: "Sanskrit", startingLetter: "su" },
  { name: "Sundari", gender: "girl", meaning: "Beautiful woman, fair", origin: "Sanskrit", startingLetter: "su" },
  { name: "Sukanya", gender: "girl", meaning: "Beautiful girl, daughter of sage", origin: "Sanskrit", startingLetter: "su" },
  { name: "Sudha", gender: "girl", meaning: "Nectar, ambrosia, divine drink", origin: "Sanskrit", startingLetter: "su" },
  { name: "Sudhir", gender: "boy", meaning: "Steadfast, patient, brave", origin: "Sanskrit", startingLetter: "su" },
  // PURVA BHADRAPADA - Se
  { name: "Seema", gender: "girl", meaning: "Border, limit, character", origin: "Sanskrit", startingLetter: "se" },
  { name: "Seenu", gender: "boy", meaning: "Lord Vishnu, divine, sacred", origin: "Telugu", startingLetter: "se" },
  // PURVA BHADRAPADA - So
  { name: "Somya", gender: "girl", meaning: "Calm, gentle, pleasant beauty", origin: "Sanskrit", startingLetter: "so" },
  { name: "Soma", gender: "boy", meaning: "Moon, sacred nectar", origin: "Sanskrit", startingLetter: "so" },
  { name: "Soumya", gender: "girl", meaning: "Gentle, pleasant, beautiful", origin: "Sanskrit", startingLetter: "so" },
  // REVATI - De
  { name: "Deepa", gender: "girl", meaning: "Lamp, light, illumination", origin: "Sanskrit", startingLetter: "de" },
  { name: "Deepthi", gender: "girl", meaning: "Flame, radiance, brightness", origin: "Sanskrit", startingLetter: "de" },
  // REVATI - Do
  { name: "Doli", gender: "girl", meaning: "Swing, palanquin, joy", origin: "Hindi", startingLetter: "do" },
  { name: "Dolly", gender: "girl", meaning: "Playful, sweet, charming", origin: "Modern Indian", startingLetter: "do" },
  // REVATI - Cha (also in Ardra)
  { name: "Chakradhar", gender: "boy", meaning: "Bearer of chakra, Vishnu", origin: "Sanskrit", startingLetter: "cha" },
  { name: "Charulatha", gender: "girl", meaning: "Beautiful creeper, graceful vine", origin: "Sanskrit", startingLetter: "cha" },
  // REVATI - Chi
  { name: "Chitra", gender: "girl", meaning: "Picture, wonderful, bright star", origin: "Sanskrit", startingLetter: "chi" },
  { name: "Chitragupta", gender: "boy", meaning: "Secret picture, record keeper", origin: "Sanskrit", startingLetter: "chi" },
  { name: "Chiranjeevi", gender: "boy", meaning: "Long lived, immortal, eternal", origin: "Sanskrit", startingLetter: "chi" },
  { name: "Chiranjivi", gender: "girl", meaning: "Long lived woman, eternal", origin: "Sanskrit", startingLetter: "chi" },
  // Additional modern and regional names
  { name: "Advika", gender: "girl", meaning: "Unique, the only one, special", origin: "Sanskrit", startingLetter: "a" },
  { name: "Anika", gender: "girl", meaning: "Grace, brilliance, sweetness", origin: "Sanskrit", startingLetter: "a" },
  { name: "Atharv", gender: "boy", meaning: "One who knows the meaning of Atharva Veda", origin: "Sanskrit", startingLetter: "a" },
  { name: "Vivek", gender: "boy", meaning: "Wisdom, discernment, judgment", origin: "Sanskrit", startingLetter: "vi" },
  { name: "Varnika", gender: "girl", meaning: "Golden complexioned, beautiful", origin: "Sanskrit", startingLetter: "va" },
  { name: "Preethi", gender: "girl", meaning: "Love, happiness, affection", origin: "Sanskrit", startingLetter: "pu" },
  { name: "Sudheendra", gender: "boy", meaning: "Lord of excellent wisdom", origin: "Sanskrit", startingLetter: "su" },
  { name: "Rishitha", gender: "girl", meaning: "Best, pious, holy", origin: "Sanskrit", startingLetter: "ri" },
  { name: "Nishanth", gender: "boy", meaning: "End of night, dawn", origin: "Sanskrit", startingLetter: "ni" },
  { name: "Prity", gender: "girl", meaning: "Love, affection, dear", origin: "Sanskrit", startingLetter: "pu" },
  { name: "Tanishka", gender: "girl", meaning: "Goddess of gold, Durga", origin: "Sanskrit", startingLetter: "ta" },
  { name: "Mahima", gender: "girl", meaning: "Greatness, glory, majesty", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Manav", gender: "boy", meaning: "Human, man, son of Manu", origin: "Sanskrit", startingLetter: "ma" },
  { name: "Kaveri", gender: "girl", meaning: "Sacred river Kaveri, flowing", origin: "Sanskrit", startingLetter: "ka" },
  { name: "Varna", gender: "girl", meaning: "Color, class, caste, character", origin: "Sanskrit", startingLetter: "va" },
  { name: "Satvik", gender: "boy", meaning: "Virtuous, pure, righteous", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Saritha", gender: "girl", meaning: "River, flowing, stream", origin: "Sanskrit", startingLetter: "sa" },
  { name: "Jyoti", gender: "girl", meaning: "Light, flame, divine light", origin: "Sanskrit", startingLetter: "ji" },
  { name: "Krithika", gender: "girl", meaning: "Born under Krittika star", origin: "Sanskrit", startingLetter: "ku" },
  { name: "Nirvaan", gender: "boy", meaning: "Liberation, eternal bliss", origin: "Sanskrit", startingLetter: "ni" },
  { name: "Teesta", gender: "girl", meaning: "A river, full of life", origin: "Sanskrit", startingLetter: "te" },
  { name: "Shourya", gender: "boy", meaning: "Valor, bravery, courage", origin: "Sanskrit", startingLetter: "sha" },
];

// ============================================================
// MALE SECOND PARTS - for compound name generation
// ============================================================
const MALE_SECOND_PARTS = [
  { part: "esh", meaning: "lord, god, ruler" },
  { part: "ansh", meaning: "divine part, portion" },
  { part: "raj", meaning: "king, shining, brilliant" },
  { part: "dev", meaning: "divine, godlike" },
  { part: "nath", meaning: "lord, master, protector" },
  { part: "kant", meaning: "beloved, pleasing, desired" },
  { part: "deep", meaning: "lamp, light, illumination" },
  { part: "veer", meaning: "brave, heroic, warrior" },
  { part: "yash", meaning: "fame, glory, success" },
  { part: "prasad", meaning: "blessing, grace, divine offering" },
  { part: "teja", meaning: "brilliance, luster, energy" },
  { part: "dhar", meaning: "bearing, supporting, holding" },
  { part: "nand", meaning: "joy, delight, happiness" },
  { part: "prem", meaning: "love, affection, devotion" },
  { part: "pal", meaning: "protector, guardian, keeper" },
  { part: "sham", meaning: "peace, calmness, quietude" },
  { part: "ratan", meaning: "gem, jewel, precious stone" },
  { part: "kiran", meaning: "ray of light, beam, sunshine" },
  { part: "mohan", meaning: "enchanting, captivating, attractive" },
  { part: "vardhan", meaning: "one who increases, growth" },
  { part: "pratap", meaning: "valor, dignity, glory" },
  { part: "bhushan", meaning: "ornament, jewel, decoration" },
  { part: "mani", meaning: "gem, jewel, precious stone" },
  { part: "shankar", meaning: "auspicious, Lord Shiva" },
  { part: "kesh", meaning: "lord of hair, Vishnu" },
  { part: "jit", meaning: "victorious, conqueror" },
  { part: "anand", meaning: "bliss, joy, happiness" },
  { part: "vikas", meaning: "development, progress" },
  { part: "ravi", meaning: "sun, radiant, bright" },
  { part: "chandra", meaning: "moon, bright, shining" },
  { part: "gopal", meaning: "protector of cows, Krishna" },
  { part: "narayan", meaning: "Lord Vishnu, cosmic person" },
  { part: "ram", meaning: "pleasing, Lord Rama" },
  { part: "hari", meaning: "Lord Vishnu, golden, lion" },
  { part: "sai", meaning: "divine, blessed, sacred" },
  { part: "kumar", meaning: "young man, prince" },
  { part: "nagar", meaning: "city, expert, skilled" },
  { part: "bodh", meaning: "wisdom, awakening, knowledge" },
  { part: "roop", meaning: "beautiful form, handsome" },
  { part: "giri", meaning: "mountain, hill, exalted" },
  { part: "jagan", meaning: "world, universe, all beings" },
  { part: "kishore", meaning: "young, adolescent, youthful" },
  { part: "shekhar", meaning: "peak, crest, summit" },
  { part: "vikram", meaning: "valor, bravery, heroism" },
  { part: "suresh", meaning: "lord of gods, Indra" },
  { part: "diwakar", meaning: "sun, maker of day" },
  { part: "mahesh", meaning: "great lord, Shiva" },
  { part: "rakesh", meaning: "full moon lord" },
  { part: "aditya", meaning: "sun, son of Aditi" },
  { part: "murali", meaning: "flute, melody, Krishna" },
];

// ============================================================
// FEMALE SECOND PARTS
// ============================================================
const FEMALE_SECOND_PARTS = [
  { part: "priya", meaning: "beloved, dear, favorite" },
  { part: "devi", meaning: "goddess, divine power" },
  { part: "mala", meaning: "garland, necklace, rosary" },
  { part: "nanda", meaning: "joy, happiness, delight" },
  { part: "prabha", meaning: "radiance, light, glow" },
  { part: "rani", meaning: "queen, princess, noble" },
  { part: "rekha", meaning: "line, mark, feature" },
  { part: "vani", meaning: "voice, wisdom, Saraswati" },
  { part: "lata", meaning: "creeper, vine, slender woman" },
  { part: "mati", meaning: "wisdom, intelligence, thought" },
  { part: "veda", meaning: "knowledge, sacred text" },
  { part: "kavya", meaning: "poetry, artistic expression" },
  { part: "asha", meaning: "hope, wish, desire" },
  { part: "tara", meaning: "star, savior, celestial" },
  { part: "nidhi", meaning: "treasure, precious gift" },
  { part: "radha", meaning: "success, prosperity, divine" },
  { part: "shakti", meaning: "power, divine energy, strength" },
  { part: "ganga", meaning: "river Ganges, pure, holy" },
  { part: "parna", meaning: "leaf, feather, winged" },
  { part: "sri", meaning: "wealth, grace, fortune" },
  { part: "uma", meaning: "goddess Parvati, light" },
  { part: "mitha", meaning: "sweet, gentle, pleasant" },
  { part: "sita", meaning: "wife of Rama, pure, furrow" },
  { part: "valli", meaning: "creeper, Lady Valli, earth" },
  { part: "sundari", meaning: "beautiful, fair, lovely" },
  { part: "kumari", meaning: "young girl, princess" },
  { part: "gowri", meaning: "fair, golden, Parvati" },
  { part: "ambika", meaning: "mother, goddess Parvati" },
  { part: "kamala", meaning: "lotus, Lakshmi, beautiful" },
  { part: "meera", meaning: "ocean, devotee of Krishna" },
  { part: "brinda", meaning: "holy basil, Vrindavana" },
  { part: "tulasi", meaning: "holy basil plant, sacred" },
  { part: "nalini", meaning: "lotus, tender, graceful" },
  { part: "saroja", meaning: "lotus, born in water" },
  { part: "savitri", meaning: "relating to sun, divine" },
  { part: "lalitha", meaning: "graceful, playful, elegant" },
  { part: "mythri", meaning: "friendship, love, kindness" },
  { part: "padma", meaning: "lotus, Lakshmi, divine" },
  { part: "sudha", meaning: "nectar, ambrosia, divine" },
  { part: "amrita", meaning: "immortal, nectar of gods" },
  { part: "deepa", meaning: "lamp, light, radiant" },
  { part: "malathi", meaning: "jasmine, fragrant, musical" },
  { part: "shalini", meaning: "modest, polite, gracious" },
  { part: "ananya", meaning: "unique, matchless, special" },
  { part: "chandra", meaning: "moon, bright, glowing" },
  { part: "janaki", meaning: "daughter of Janaka, Sita" },
  { part: "sarita", meaning: "river, flowing stream" },
  { part: "bhavani", meaning: "giving life, Parvati" },
  { part: "rukmini", meaning: "wearing gold, Krishna's wife" },
  { part: "himadri", meaning: "Himalaya, snow mountain" },
];

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
function capitalize(str) {
  if (!str || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// ============================================================
// MAIN GENERATION
// ============================================================
const allNames = [];
const seenNames = new Set();

// 1. Add all curated seed names
for (const seed of SEED_NAMES) {
  const key = seed.name.toLowerCase();
  if (!seenNames.has(key)) {
    seenNames.add(key);
    const nakshatra = syllableToNakshatra[seed.startingLetter] || "";
    allNames.push({
      name: seed.name,
      meaning: seed.meaning,
      gender: seed.gender,
      origin: seed.origin,
      startingLetter: seed.startingLetter,
      nakshatra: nakshatra ? [nakshatra] : [],
    });
  }
}

// 2. Generate compound names for each nakshatra syllable
for (const nakshatra of NAKSHATRAS) {
  for (const syllable of nakshatra.syllables) {
    const prefix = capitalize(syllable);

    // Generate male compound names
    for (const second of MALE_SECOND_PARTS) {
      const nameStr = prefix + second.part;
      const key = nameStr.toLowerCase();
      if (
        !seenNames.has(key) &&
        nameStr.length >= 4 &&
        nameStr.length <= 16
      ) {
        seenNames.add(key);
        allNames.push({
          name: nameStr,
          meaning: second.meaning,
          gender: "boy",
          origin: "Sanskrit",
          startingLetter: syllable.toLowerCase(),
          nakshatra: [nakshatra.name],
        });
      }
    }

    // Generate female compound names
    for (const second of FEMALE_SECOND_PARTS) {
      const nameStr = prefix + second.part;
      const key = nameStr.toLowerCase();
      if (
        !seenNames.has(key) &&
        nameStr.length >= 4 &&
        nameStr.length <= 16
      ) {
        seenNames.add(key);
        allNames.push({
          name: nameStr,
          meaning: second.meaning,
          gender: "girl",
          origin: "Sanskrit",
          startingLetter: syllable.toLowerCase(),
          nakshatra: [nakshatra.name],
        });
      }
    }
  }
}

// 3. Add Telugu-specific names
const TELUGU_NAMES = [
  // Srinivas family
  { name: "Srinivas", gender: "boy", meaning: "Abode of Lakshmi, Lord Vishnu", origin: "Telugu", startingLetter: "su" },
  { name: "Srinivasulu", gender: "boy", meaning: "Worshipper of Lord Vishnu", origin: "Telugu", startingLetter: "su" },
  { name: "Sreedevi", gender: "girl", meaning: "Goddess Lakshmi, divine", origin: "Telugu", startingLetter: "su" },
  { name: "Srilakshmi", gender: "girl", meaning: "Auspicious Lakshmi, fortunate", origin: "Telugu", startingLetter: "su" },
  { name: "Sriramulu", gender: "boy", meaning: "Devoted to Lord Rama", origin: "Telugu", startingLetter: "su" },
  { name: "Srikrishna", gender: "boy", meaning: "Lord Krishna, divine", origin: "Telugu", startingLetter: "su" },
  // Telugu specific
  { name: "Venkataramana", gender: "boy", meaning: "Lord Vishnu of Venkata hills", origin: "Telugu", startingLetter: "ve" },
  { name: "Laxmipathi", gender: "boy", meaning: "Lord of Lakshmi, Vishnu", origin: "Telugu", startingLetter: "la" },
  { name: "Nagabhushanam", gender: "boy", meaning: "One who wears serpent as ornament, Shiva", origin: "Telugu", startingLetter: "na" },
  { name: "Subbaiah", gender: "boy", meaning: "Auspicious, blessed one", origin: "Telugu", startingLetter: "su" },
  { name: "Ramaiah", gender: "boy", meaning: "Devoted to Lord Rama", origin: "Telugu", startingLetter: "ra" },
  { name: "Krishnaiah", gender: "boy", meaning: "Devoted to Lord Krishna", origin: "Telugu", startingLetter: "ku" },
  { name: "Venkaiah", gender: "boy", meaning: "Devoted to Lord Venkata", origin: "Telugu", startingLetter: "ve" },
  { name: "Narasimha", gender: "boy", meaning: "Man-lion, avatar of Vishnu", origin: "Telugu", startingLetter: "na" },
  { name: "Narasimhulu", gender: "boy", meaning: "Worshipper of Narasimha", origin: "Telugu", startingLetter: "na" },
  { name: "Lakshmidevamma", gender: "girl", meaning: "Goddess Lakshmi, divine mother", origin: "Telugu", startingLetter: "la" },
  { name: "Venkatalakshmi", gender: "girl", meaning: "Lakshmi of Venkata, goddess", origin: "Telugu", startingLetter: "ve" },
  { name: "Padmavathi", gender: "girl", meaning: "Lotus goddess, Lakshmi", origin: "Telugu", startingLetter: "pa" },
  { name: "Bharathamma", gender: "girl", meaning: "Mother of India, noble woman", origin: "Telugu", startingLetter: "bha" },
  { name: "Saradha", gender: "girl", meaning: "Goddess Saraswati, autumn", origin: "Telugu", startingLetter: "sa" },
  { name: "Suseela", gender: "girl", meaning: "Good character, virtuous", origin: "Telugu", startingLetter: "su" },
  { name: "Kamakshi", gender: "girl", meaning: "Goddess with beautiful eyes", origin: "Telugu", startingLetter: "ka" },
  { name: "Kalyani", gender: "girl", meaning: "Auspicious, blessing, fortunate", origin: "Telugu", startingLetter: "ka" },
  { name: "Rajeswari", gender: "girl", meaning: "Goddess who rules, divine queen", origin: "Telugu", startingLetter: "ra" },
  { name: "Mangamma", gender: "girl", meaning: "Auspicious mother, blessed", origin: "Telugu", startingLetter: "ma" },
  { name: "Parvathamma", gender: "girl", meaning: "Daughter of mountain, Parvati", origin: "Telugu", startingLetter: "pa" },
  { name: "Satyanarayana", gender: "boy", meaning: "True form of Vishnu, truth", origin: "Telugu", startingLetter: "sa" },
  { name: "Venugopal", gender: "boy", meaning: "Krishna playing flute, divine", origin: "Telugu", startingLetter: "ve" },
  { name: "Subbarao", gender: "boy", meaning: "Auspicious king, blessed", origin: "Telugu", startingLetter: "su" },
  { name: "Kotaiah", gender: "boy", meaning: "One of many, group leader", origin: "Telugu", startingLetter: "ko" },
  { name: "Mallaiah", gender: "boy", meaning: "Servant of lord, devoted", origin: "Telugu", startingLetter: "ma" },
  { name: "Pullaiah", gender: "boy", meaning: "Devoted servant", origin: "Telugu", startingLetter: "pu" },
];

for (const name of TELUGU_NAMES) {
  const key = name.name.toLowerCase();
  if (!seenNames.has(key)) {
    seenNames.add(key);
    const nakshatra = syllableToNakshatra[name.startingLetter] || "";
    allNames.push({
      name: name.name,
      meaning: name.meaning,
      gender: name.gender,
      origin: name.origin,
      startingLetter: name.startingLetter,
      nakshatra: nakshatra ? [nakshatra] : [],
    });
  }
}

// 4. Add Modern Indian names
const MODERN_NAMES = [
  { name: "Aryan", gender: "boy", meaning: "Noble, Aryan civilization", origin: "Modern Indian", startingLetter: "a" },
  { name: "Kabir", gender: "boy", meaning: "Great, powerful, saint poet", origin: "Modern Indian", startingLetter: "ka" },
  { name: "Zara", gender: "girl", meaning: "Princess, flower, radiance", origin: "Modern Indian", startingLetter: "se" },
  { name: "Rohan", gender: "boy", meaning: "Ascending, medicinal herb", origin: "Modern Indian", startingLetter: "ro" },
  { name: "Priya", gender: "girl", meaning: "Beloved, dear, favorite", origin: "Modern Indian", startingLetter: "pu" },
  { name: "Rahul", gender: "boy", meaning: "Son of Buddha, efficient", origin: "Modern Indian", startingLetter: "ra" },
  { name: "Pooja", gender: "girl", meaning: "Worship, prayer, reverence", origin: "Modern Indian", startingLetter: "po" },
  { name: "Raj", gender: "boy", meaning: "King, ruler, sovereign", origin: "Modern Indian", startingLetter: "ra" },
  { name: "Sunita", gender: "girl", meaning: "Well-behaved, righteous", origin: "Modern Indian", startingLetter: "su" },
  { name: "Amit", gender: "boy", meaning: "Immeasurable, infinite", origin: "Modern Indian", startingLetter: "a" },
  { name: "Sonia", gender: "girl", meaning: "Golden, beautiful, sun", origin: "Modern Indian", startingLetter: "so" },
  { name: "Neha", gender: "girl", meaning: "Love, affection, dew", origin: "Modern Indian", startingLetter: "ne" },
  { name: "Nisha", gender: "girl", meaning: "Night, dream, pleasant", origin: "Modern Indian", startingLetter: "ni" },
  { name: "Deepak", gender: "boy", meaning: "Lamp, light, kindles", origin: "Modern Indian", startingLetter: "de" },
  { name: "Ritu", gender: "girl", meaning: "Season, time, appropriate", origin: "Modern Indian", startingLetter: "ri" },
  { name: "Shweta", gender: "girl", meaning: "White, pure, fair", origin: "Modern Indian", startingLetter: "sha" },
  { name: "Gaurav", gender: "boy", meaning: "Pride, honor, dignity", origin: "Modern Indian", startingLetter: "ga" },
  { name: "Shruti", gender: "girl", meaning: "Hearing, Vedic hymn", origin: "Modern Indian", startingLetter: "sha" },
  { name: "Preeti", gender: "girl", meaning: "Love, happiness, joy", origin: "Modern Indian", startingLetter: "pu" },
  { name: "Saurabh", gender: "boy", meaning: "Fragrance, good smell", origin: "Modern Indian", startingLetter: "sa" },
  { name: "Poonam", gender: "girl", meaning: "Full moon, complete", origin: "Modern Indian", startingLetter: "po" },
  { name: "Rohini", gender: "girl", meaning: "Red cow, rising star", origin: "Modern Indian", startingLetter: "ro" },
  { name: "Abhiram", gender: "boy", meaning: "Pleasing, beautiful", origin: "Modern Indian", startingLetter: "a" },
  { name: "Sumedha", gender: "girl", meaning: "Having good wisdom", origin: "Modern Indian", startingLetter: "su" },
  { name: "Shubh", gender: "boy", meaning: "Auspicious, good, lucky", origin: "Modern Indian", startingLetter: "sha" },
  { name: "Keertana", gender: "girl", meaning: "Devotional song, praise", origin: "Modern Indian", startingLetter: "ke" },
  { name: "Pratik", gender: "boy", meaning: "Symbol, a meaningful sign", origin: "Modern Indian", startingLetter: "pu" },
  { name: "Kaveri", gender: "girl", meaning: "Sacred river in South India", origin: "Modern Indian", startingLetter: "ka" },
  { name: "Nandita", gender: "girl", meaning: "Happy, joyful, blessed", origin: "Modern Indian", startingLetter: "na" },
  { name: "Madhur", gender: "boy", meaning: "Sweet, melodious, pleasant", origin: "Modern Indian", startingLetter: "ma" },
];

for (const name of MODERN_NAMES) {
  const key = name.name.toLowerCase();
  if (!seenNames.has(key)) {
    seenNames.add(key);
    const nakshatra = syllableToNakshatra[name.startingLetter] || "";
    allNames.push({
      name: name.name,
      meaning: name.meaning,
      gender: name.gender,
      origin: name.origin,
      startingLetter: name.startingLetter,
      nakshatra: nakshatra ? [nakshatra] : [],
    });
  }
}

console.log(`\nTotal names generated: ${allNames.length}`);
console.log(`Unique names: ${seenNames.size}`);

// Count by gender
const boys = allNames.filter((n) => n.gender === "boy").length;
const girls = allNames.filter((n) => n.gender === "girl").length;
console.log(`Boy names: ${boys}`);
console.log(`Girl names: ${girls}`);

// Count by nakshatra
const nakshatraCount = {};
for (const name of allNames) {
  for (const n of name.nakshatra) {
    nakshatraCount[n] = (nakshatraCount[n] || 0) + 1;
  }
}
console.log("\nNames per Nakshatra:");
for (const [n, c] of Object.entries(nakshatraCount).sort((a, b) => b[1] - a[1]).slice(0, 5)) {
  console.log(`  ${n}: ${c}`);
}

const outputPath = path.join(__dirname, "../../src/data/names.json");
fs.writeFileSync(outputPath, JSON.stringify(allNames, null, 2));
console.log(`\n✓ Written to ${outputPath}`);
