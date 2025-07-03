import { Verse } from '../quran-constants';
import { surahJsonMap } from './surahJsonMap';

// Dynamically load any surah JSON file by key
declare const require: any;

export async function loadSurahVerses(surahKey: string): Promise<Verse[]> {
  try {
    const data = surahJsonMap[surahKey];
    if (!data) throw new Error(`Surah ${surahKey} not found`);
    return data;
  } catch (error) {
    console.error(`Error loading surah ${surahKey}:`, error);
    return [];
  }
}

// Helper function to get surah key from surah number
export function getSurahKey(surahNumber: number): string {
  // Map of surah numbers to their actual JSON file keys (only for files that exist)
  const surahKeyMap: { [key: number]: string } = {
    1: "fatiha",
    2: "baqarah", 
    3: "imran",
    17: "isra",
    18: "kahf",
    19: "maryam",
    20: "taha",
    21: "anbya",
    22: "hajj",
    23: "muminoon",
    24: "nur",
    25: "furqan",
    26: "shuara",
    27: "naml",
    28: "qasas",
    29: "ankabut",
    30: "rum",
    31: "luqman",
    32: "sajdah",
    33: "ahzab",
    34: "saba",
    35: "fatir",
    36: "yasin",
    37: "saffat",
    38: "sad",
    39: "zumar",
    40: "ghafir",
    41: "fussilat",
    42: "shura",
    43: "zukhruf",
    44: "dukhan",
    46: "ahqaf",
    47: "muhammad",
    48: "fath",
    49: "hujurat",
    50: "qaf",
    51: "dhariyat",
    52: "tur",
    53: "najm",
    54: "qamar",
    55: "rahman",
    56: "waqiah",
    57: "hadid",
    58: "mujadila",
    59: "hashr",
    60: "mumtahanah",
    61: "saf",
    62: "jumuah",
    63: "munafiqun",
    64: "taghabun",
    65: "talaq",
    66: "tahrim",
    67: "mulk",
    68: "qalam",
    69: "haqqah",
    70: "maarij",
    71: "nuh",
    72: "jinn",
    73: "muzzammil",
    74: "muddathir",
    75: "qiyamah",
    76: "insan",
    77: "mursalat",
    78: "naba",
    79: "naziyat",
    80: "abasa",
    81: "takwir",
    82: "infitar",
    83: "mutaffifin",
    84: "inshiqaq",
    85: "buruj",
    86: "tariq",
    87: "ala",
    88: "ghashiyah",
    89: "fajr",
    90: "balad",
    91: "shams",
    92: "layl",
    93: "adduha",
    94: "sharh",
    95: "tin",
    96: "alaq",
    97: "qadr",
    98: "bayyinah",
    99: "zilzal",
    100: "adiyat",
    101: "qariah",
    102: "takathur",
    103: "asr",
    104: "humazah",
    105: "fil",
    106: "quraish",
    107: "maun",
    108: "kawthar",
    109: "kafirun",
    110: "nasr",
    111: "masad",
    112: "ikhlas",
    113: "falaq",
    114: "nas"
  };
  
  return surahKeyMap[surahNumber] || "";
}

// Helper function to load verses by surah number
export async function loadSurahVersesByNumber(surahNumber: number): Promise<Verse[]> {
  const surahKey = getSurahKey(surahNumber);
  if (!surahKey) {
    console.warn(`No verses available for surah ${surahNumber}`);
    return [];
  }
  return loadSurahVerses(surahKey);
} 