// Quran Surah Constants with complete verse data
export interface Verse {
  number: number;
  arabic: string;
  translation: string;
  transliteration: string;
  juz: number;
  page: number;
  ruku: number;
  sajda: boolean;
}

export interface Surah {
  number: number;
  name: string;
  arabicName: string;
  englishName: string;
  verses: number;
  juz: number;
  type: "Meccan" | "Medinan";
  revelationOrder: number;
  description: string;
  bismillah: string;
  versesData: Verse[];
}

// Complete Al-Fatihah (7 verses)
const AL_FATIHAH_VERSES: Verse[] = [
  {
    number: 1,
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful.",
    transliteration: "Bismillahi ar-rahmani ar-raheem",
    juz: 1,
    page: 1,
    ruku: 1,
    sajda: false
  },
  {
    number: 2,
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    translation: "All praise is due to Allah, Lord of the worlds.",
    transliteration: "Al-hamdu lillahi rabbi al-'alameen",
    juz: 1,
    page: 1,
    ruku: 1,
    sajda: false
  },
  {
    number: 3,
    arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "The Most Gracious, the Most Merciful.",
    transliteration: "Ar-rahmani ar-raheem",
    juz: 1,
    page: 1,
    ruku: 1,
    sajda: false
  },
  {
    number: 4,
    arabic: "مَالِكِ يَوْمِ الدِّينِ",
    translation: "Master of the Day of Judgment.",
    transliteration: "Maliki yawmi ad-deen",
    juz: 1,
    page: 1,
    ruku: 1,
    sajda: false
  },
  {
    number: 5,
    arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    translation: "It is You we worship and You we ask for help.",
    transliteration: "Iyyaka na'budu wa iyyaka nasta'een",
    juz: 1,
    page: 1,
    ruku: 1,
    sajda: false
  },
  {
    number: 6,
    arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    translation: "Guide us to the straight path.",
    transliteration: "Ihdina as-sirata al-mustaqeem",
    juz: 1,
    page: 1,
    ruku: 1,
    sajda: false
  },
  {
    number: 7,
    arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    translation: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
    transliteration: "Sirata allatheena an'amta 'alayhim ghayri al-maghdoobi 'alayhim wa la ad-daalleen",
    juz: 1,
    page: 1,
    ruku: 1,
    sajda: false
  }
];

// First 5 verses of Al-Baqarah
const AL_BAQARAH_VERSES: Verse[] = [
  {
    number: 1,
    arabic: "الٓمٓ",
    translation: "Alif, Lam, Meem.",
    transliteration: "Alif-Lam-Meem",
    juz: 1,
    page: 2,
    ruku: 1,
    sajda: false
  },
  {
    number: 2,
    arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
    translation: "This is the Book about which there is no doubt, a guidance for those conscious of Allah.",
    transliteration: "Thalika al-kitabu la rayba feehi hudan lil-muttaqeen",
    juz: 1,
    page: 2,
    ruku: 1,
    sajda: false
  },
  {
    number: 3,
    arabic: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
    translation: "Who believe in the unseen, establish prayer, and spend out of what We have provided for them.",
    transliteration: "Allatheena yu'minoona bil-ghaybi wa yuqeemoona as-salata wa mimma razaqnahum yunfiqoon",
    juz: 1,
    page: 2,
    ruku: 1,
    sajda: false
  },
  {
    number: 4,
    arabic: "وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ",
    translation: "And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain [in faith].",
    transliteration: "Wallatheena yu'minoona bima unzila ilayka wa ma unzila min qablika wa bil-akhirati hum yooqinoon",
    juz: 1,
    page: 2,
    ruku: 1,
    sajda: false
  },
  {
    number: 5,
    arabic: "أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ",
    translation: "Those are upon [right] guidance from their Lord, and it is those who are the successful.",
    transliteration: "Ula-ika 'ala hudan min rabbihim wa ula-ika humu al-muflihoon",
    juz: 1,
    page: 2,
    ruku: 1,
    sajda: false
  }
];

// Complete Surah data
export const QURAN_SURAHS: Surah[] = [
  {
    number: 1,
    name: "Al-Fatihah",
    arabicName: "الفاتحة",
    englishName: "The Opening",
    verses: 7,
    juz: 1,
    type: "Meccan",
    revelationOrder: 5,
    description: "The opening chapter of the Quran, consisting of seven verses. It is recited in every unit of prayer and is considered the essence of the Quran.",
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    versesData: AL_FATIHAH_VERSES
  },
  {
    number: 2,
    name: "Al-Baqarah",
    arabicName: "البقرة",
    englishName: "The Cow",
    verses: 286,
    juz: 1,
    type: "Medinan",
    revelationOrder: 87,
    description: "The longest chapter of the Quran, containing the story of the cow and various laws and guidance for the Muslim community.",
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    versesData: AL_BAQARAH_VERSES
  },
  {
    number: 3,
    name: "Al-Imran",
    arabicName: "الإمرة",
    englishName: "The Family of Imran",
    verses: 200,
    juz: 1,
    type: "Medinan",
    revelationOrder: 3,
    description: "The chapter of the family of Imran, containing stories of previous prophets and their communities.",
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    versesData: [] // Placeholder until AL_IMRAN_VERSES is defined
  }
];

// Utility functions
export const getSurahByNumber = (number: number): Surah | undefined => {
  return QURAN_SURAHS.find(surah => surah.number === number);
};

export const getVerseByNumber = (surahNumber: number, verseNumber: number): Verse | undefined => {
  const surah = getSurahByNumber(surahNumber);
  return surah?.versesData.find(verse => verse.number === verseNumber);
};

export const getSurahProgress = (surahNumber: number, lastVerseRead: number): number => {
  const surah = getSurahByNumber(surahNumber);
  if (!surah) return 0;
  return Math.round((lastVerseRead / surah.verses) * 100);
};

export const formatVerseReference = (surahNumber: number, verseNumber: number): string => {
  const surah = getSurahByNumber(surahNumber);
  return `${surah?.name} ${verseNumber}`;
};

export const getTotalVerses = (): number => {
  return QURAN_SURAHS.reduce((total, surah) => total + surah.verses, 0);
};

export const getSurahByJuz = (juzNumber: number): Surah[] => {
  return QURAN_SURAHS.filter(surah => surah.juz === juzNumber);
};

export const getSurahByType = (type: "Meccan" | "Medinan"): Surah[] => {
  return QURAN_SURAHS.filter(surah => surah.type === type);
};

// Search functions
export const searchSurahs = (query: string): Surah[] => {
  const lowercaseQuery = query.toLowerCase();
  return QURAN_SURAHS.filter(surah => 
    surah.name.toLowerCase().includes(lowercaseQuery) ||
    surah.arabicName.includes(query) ||
    surah.englishName.toLowerCase().includes(lowercaseQuery) ||
    surah.description.toLowerCase().includes(lowercaseQuery)
  );
};

export const searchVerses = (query: string): { surah: Surah; verse: Verse }[] => {
  const results: { surah: Surah; verse: Verse }[] = [];
  const lowercaseQuery = query.toLowerCase();
  
  QURAN_SURAHS.forEach(surah => {
    surah.versesData.forEach(verse => {
      if (
        verse.translation.toLowerCase().includes(lowercaseQuery) ||
        verse.transliteration.toLowerCase().includes(lowercaseQuery) ||
        verse.arabic.includes(query)
      ) {
        results.push({ surah, verse });
      }
    });
  });
  
  return results;
};

// Reading session types
export interface ReadingSession {
  surahNumber: number;
  startVerse: number;
  endVerse: number;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in seconds
}

export interface ReadingProgress {
  surahNumber: number;
  lastVerseRead: number;
  totalVersesRead: number;
  lastReadDate: string;
  readingTime: number; // in seconds
  sessions: ReadingSession[];
}

// Default reading progress
export const getDefaultReadingProgress = (): ReadingProgress => ({
  surahNumber: 1,
  lastVerseRead: 0,
  totalVersesRead: 0,
  lastReadDate: "",
  readingTime: 0,
  sessions: []
});

// Quran app settings
export interface QuranSettings {
  showTranslation: boolean;
  showTransliteration: boolean;
  showArabic: boolean;
  fontSize: number;
  theme: "light" | "dark" | "auto";
  autoScroll: boolean;
  showVerseNumbers: boolean;
  showPageNumbers: boolean;
  showRukuMarks: boolean;
  showSajdaMarks: boolean;
}

export const DEFAULT_QURAN_SETTINGS: QuranSettings = {
  showTranslation: true,
  showTransliteration: false,
  showArabic: true,
  fontSize: 16,
  theme: "auto",
  autoScroll: false,
  showVerseNumbers: true,
  showPageNumbers: true,
  showRukuMarks: true,
  showSajdaMarks: true,
};

// Storage keys
export const QURAN_STORAGE_KEYS = {
  READING_PROGRESS: "quran_reading_progress_v2",
  BOOKMARKS: "quran_bookmarks_v2",
  SETTINGS: "quran_settings_v2",
  SESSIONS: "quran_sessions_v2",
  STATS: "quran_stats_v2",
} as const;

// Quran statistics
export interface QuranStats {
  totalVersesRead: number;
  totalReadingTime: number; // in seconds
  currentStreak: number;
  longestStreak: number;
  surahsCompleted: number[];
  lastReadDate: string;
  averageReadingTime: number; // in seconds per session
  totalSessions: number;
}

export const getDefaultQuranStats = (): QuranStats => ({
  totalVersesRead: 0,
  totalReadingTime: 0,
  currentStreak: 0,
  longestStreak: 0,
  surahsCompleted: [],
  lastReadDate: "",
  averageReadingTime: 0,
  totalSessions: 0,
});

// Bookmark types
export interface QuranBookmark {
  surahNumber: number;
  verseNumber: number;
  timestamp: string;
  note?: string;
  tags?: string[];
}

// Export all constants
export default {
  QURAN_SURAHS,
  getSurahByNumber,
  getVerseByNumber,
  getSurahProgress,
  formatVerseReference,
  getTotalVerses,
  getSurahByJuz,
  getSurahByType,
  searchSurahs,
  searchVerses,
  getDefaultReadingProgress,
  DEFAULT_QURAN_SETTINGS,
  QURAN_STORAGE_KEYS,
  getDefaultQuranStats,
}; 