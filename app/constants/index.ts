// Type definitions
export interface PrayerTime {
  id: string;
  name: string;
  time: string;
  icon: string;
  active: boolean;
  nextPrayer?: boolean;
  arabicName?: string;
  description?: string;
}

export interface AppFeature {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string[];
  route: string;
}

export interface OnlineSession {
  id: string;
  title: string;
  ustadz: string;
  time: string;
  viewers: string;
  isLive: boolean;
  gradient: string;
  category: string;
}

export interface TasbihData {
  totalToday: number;
  completedToday: number;
  currentStreak: number;
  isActive: boolean;
  allTimeCount?: number;
}

export const FEATURED_AYAT = [
    {
      surah: "Al-Fatiha",
      ayah: 1,
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      translation: "In the name of Allah, the Most Gracious, the Most Merciful.",
      reference: "Quran 1:1",
    },
    {
      surah: "Al-Baqarah",
      ayah: 286,
      arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا...",
      translation: "Allah does not burden a soul beyond that it can bear...",
      reference: "Quran 2:286",
    },
    {
      surah: "Dua for Guidance",
      ayah: null,
      arabic: "اللهم اهدني وسددني",
      translation: "O Allah, guide me and keep me steadfast.",
      reference: "Prophetic Dua",
    },
  {
    surah: "Al-Imran",
    ayah: 8,
    arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
    translation:
      "Our Lord! Let not our hearts deviate after You have guided us",
    reference: "Quran 3:8",
  },
  {
    surah: "Al-Imran",
    ayah: 18,
    arabic: "شَهِدَ اللَّهُ أَنَّهُ لَا إِلَٰهَ إِلَّا هُوَ",
    translation: "Allah witnesses that there is no deity except Him",
    reference: "Quran 3:18",
  },
  {
    surah: "Yunus",
    ayah: 57,
    arabic: "يَا أَيُّهَا النَّاسُ قَدْ جَاءَتْكُم مَّوْعِظَةٌ مِّن رَّبِّكُمْ",
    translation: "O mankind, there has come to you instruction from your Lord",
    reference: "Quran 10:57",
  },
  {
    surah: "Ar-Ra'd",
    ayah: 28,
    arabic: "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ",
    translation:
      "Those who have believed and whose hearts are assured by the remembrance of Allah",
    reference: "Quran 13:28",
  },
  {
    surah: "Al-Hijr",
    ayah: 99,
    arabic: "وَاعْبُدْ رَبَّكَ حَتَّىٰ يَأْتِيَكَ الْيَقِينُ",
    translation:
      "And worship your Lord until there comes to you the certainty (death)",
    reference: "Quran 15:99",
  },
  {
    surah: "Ta-Ha",
    ayah: 25 - 28,
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    translation:
      "My Lord, expand my breast for me and make my task easy for me",
    reference: "Quran 20:25-28",
  },
  {
    surah: "Al-Furqan",
    ayah: 77,
    arabic: "قُلْ مَا يَعْبَأُ بِكُمْ رَبِّي لَوْلَا دُعَاؤُكُمْ",
    translation:
      "Say, 'What would my Lord care for you if not for your supplication?'",
    reference: "Quran 25:77",
  },
  {
    surah: "Al-Qasas",
    ayah: 56,
    arabic:
      "إِنَّكَ لَا تَهْدِي مَنْ أَحْبَبْتَ وَلَٰكِنَّ اللَّهَ يَهْدِي مَن يَشَاءُ",
    translation:
      "Indeed, you do not guide whom you like, but Allah guides whom He wills",
    reference: "Quran 28:56",
  },
  {
    surah: "Ar-Rum",
    ayah: 21,
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا",
    translation:
      "And of His signs is that He created for you mates from among yourselves",
    reference: "Quran 30:21",
  },
  {
    surah: "Al-Ahzab",
    ayah: 41 - 42,
    arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا",
    translation:
      "O you who have believed, remember Allah with much remembrance",
    reference: "Quran 33:41-42",
  },
  {
    surah: "Ya-Sin",
    ayah: 82,
    arabic:
      "إِنَّمَا أَمْرُهُ إِذَا أَرَادَ شَيْئًا أَن يَقُولَ لَهُ كُن فَيَكُونُ",
    translation:
      "His command is only when He intends a thing that He says to it, 'Be,' and it is",
    reference: "Quran 36:82",
  },
  {
    surah: "Az-Zumar",
    ayah: 53,
    arabic:
      "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ",
    translation:
      "Say, 'O My servants who have transgressed against themselves: do not despair of Allah's mercy'",
    reference: "Quran 39:53",
  },
  {
    surah: "Ad-Dukhan",
    ayah: 49,
    arabic: "إِنَّ الْمُتَّقِينَ فِي مَقَامٍ أَمِينٍ",
    translation: "Indeed, the righteous will be in a secure place",
    reference: "Quran 44:49",
  },
  {
    surah: "Al-Hujurat",
    ayah: 13,
    arabic: "إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ",
    translation:
      "Indeed, the most noble of you in the sight of Allah is the most righteous of you",
    reference: "Quran 49:13",
  },
  {
    surah: "Ar-Rahman",
    ayah: 1 - 4,
    arabic:
      "الرَّحْمَٰنُ عَلَّمَ الْقُرْآنَ خَلَقَ الْإِنسَانَ عَلَّمَهُ الْبَيَانَ",
    translation:
      "The Most Merciful taught the Quran, created man, taught him eloquence",
    reference: "Quran 55:1-4",
  },
  {
    surah: "Al-Mulk",
    ayah: 2,
    arabic:
      "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا",
    translation:
      "He who created death and life to test you as to which of you is best in deed",
    reference: "Quran 67:2",
  },
  {
    surah: "Al-Muzzammil",
    ayah: 9,
    arabic:
      "رَبُّ الْمَشْرِقِ وَالْمَغْرِبِ لَا إِلَٰهَ إِلَّا هُوَ فَاتَّخِذْهُ وَكِيلًا",
    translation:
      "Lord of the east and the west; there is no deity except Him, so take Him as Disposer of your affairs",
    reference: "Quran 73:9",
  },
  {
    surah: "Dua for Protection",
    ayah: null,
    arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    translation: "I seek refuge in Allah from the accursed Satan",
    reference: "Quran 16:98",
  },
];

export const DAILY_INSPIRATIONS = [
  {
    quote:
      "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.",
    reference: "Quran 65:3",
    category: "Trust in Allah",
    emoji: "🤲",
    color: "#8B5CF6",
  },
  {
    quote:
      "Verily, with hardship comes ease. Verily, with hardship comes ease.",
    reference: "Quran 94:5-6",
    category: "Patience",
    emoji: "💪",
    color: "#10B981",
  },
  {
    quote: "Indeed, Allah is with those who are patient.",
    reference: "Quran 2:153",
    category: "Patience",
    emoji: "🌱",
    color: "#059669",
  },
  {
    quote: "The best of you are those who are best to their families.",
    reference: "Prophetic Hadith",
    category: "Family",
    emoji: "👨‍👩‍👧‍👦",
    color: "#F59E0B",
  },
  {
    quote: "Seek knowledge from the cradle to the grave.",
    reference: "Prophetic Hadith",
    category: "Knowledge",
    emoji: "📚",
    color: "#3B82F6",
  },
  {
    quote:
      "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.",
    reference: "Prophetic Hadith",
    category: "Self-Control",
    emoji: "🧘",
    color: "#EC4899",
  },
  {
    quote:
      "Allah does not look at your appearance or your wealth, but He looks at your hearts and your deeds.",
    reference: "Prophetic Hadith",
    category: "Character",
    emoji: "❤️",
    color: "#EF4444",
  },
  {
    quote: "The best of people are those who are most beneficial to people.",
    reference: "Prophetic Hadith",
    category: "Service",
    emoji: "🤝",
    color: "#06B6D4",
  },
  {
    quote:
      "Whoever believes in Allah and the Last Day, let him speak good or remain silent.",
    reference: "Prophetic Hadith",
    category: "Speech",
    emoji: "🗣️",
    color: "#8B5CF6",
  },
  {
    quote:
      "The most beloved places to Allah are the mosques, and the most disliked places to Allah are the markets.",
    reference: "Prophetic Hadith",
    category: "Worship",
    emoji: "🕌",
    color: "#059669",
  },
  {
    quote: "Allah is Beautiful and He loves beauty.",
    reference: "Prophetic Hadith",
    category: "Appreciation",
    emoji: "🌹",
    color: "#EC4899",
  },
  {
    quote: "The world is the believer's prison and the unbeliever's paradise.",
    reference: "Prophetic Hadith",
    category: "Perspective",
    emoji: "🌍",
    color: "#3B82F6",
  },
  {
    quote:
      "Do not be people without minds of your own, saying that if others treat you well you will treat them well, and that if they do wrong you will do wrong. But accustom yourselves to do good if people do good and not to do wrong if they do evil.",
    reference: "Prophetic Hadith",
    category: "Character",
    emoji: "🧠",
    color: "#8B5CF6",
  },
  {
    quote:
      "The most perfect believer in faith is the one who is best in moral character.",
    reference: "Prophetic Hadith",
    category: "Character",
    emoji: "🌟",
    color: "#F59E0B",
  },
  {
    quote: "Kindness is a mark of faith, and whoever is not kind has no faith.",
    reference: "Prophetic Hadith",
    category: "Kindness",
    emoji: "💝",
    color: "#EF4444",
  },
  {
    quote:
      "Whoever treads a path in search of knowledge, Allah will make easy for him the path to Paradise.",
    reference: "Prophetic Hadith",
    category: "Knowledge",
    emoji: "🛣️",
    color: "#3B82F6",
  },
  {
    quote:
      "The believer's shade on the Day of Resurrection will be his charity.",
    reference: "Prophetic Hadith",
    category: "Charity",
    emoji: "🌳",
    color: "#10B981",
  },
  {
    quote: "Allah says: 'I am as My servant thinks I am.'",
    reference: "Prophetic Hadith (Qudsi)",
    category: "Mindset",
    emoji: "💭",
    color: "#8B5CF6",
  },
  {
    quote: "The best charity is that given when one is in need and struggling.",
    reference: "Prophetic Hadith",
    category: "Charity",
    emoji: "🤲",
    color: "#EF4444",
  },
  {
    quote:
      "None of you truly believes until he loves for his brother what he loves for himself.",
    reference: "Prophetic Hadith",
    category: "Brotherhood",
    emoji: "🫂",
    color: "#06B6D4",
  },
  {
    quote: "Remember often the destroyer of pleasures - death.",
    reference: "Prophetic Hadith",
    category: "Remembrance",
    emoji: "☪️",
    color: "#059669",
  },
];

export const PRAYER_TIMES: PrayerTime[] = [
  { id: "1", name: "Fajr", time: "04:41", icon: "sunrise", active: false },
  {
    id: "2",
    name: "Dhuhr",
    time: "12:24",
    icon: "sunny",
    active: true,
    nextPrayer: true,
  },
  { id: "3", name: "Asr", time: "15:14", icon: "partly-sunny", active: false },
  { id: "4", name: "Maghrib", time: "18:02", icon: "sunset", active: false },
  { id: "5", name: "Isha", time: "20:11", icon: "moon", active: false },
];

export const APP_FEATURES: AppFeature[] = [
  {
    id: "1",
    name: "Quran",
    icon: "book",
    color: "bg-emerald-500",
    gradient: ["#10B981", "#059669"],
    route: "/screens/quran",
  },
  {
    id: "2",
    name: "Adzan",
    icon: "notifications",
    color: "bg-blue-500",
    gradient: ["#3B82F6", "#1D4ED8"],
    route: "/screens/adzan",
  },
  {
    id: "3",
    name: "Salat",
    icon: "hand-left-outline",
    color: "bg-orange-500",
    gradient: ["#F97316", "#EA580C"],
    route: "/salat-tutorial-modal",
  },
  {
    id: "4",
    name: "Duas",
    icon: "heart",
    color: "bg-pink-500",
    gradient: ["#EC4899", "#DB2777"],
    route: "/screens/duas",
  },
  {
    id: "5",
    name: "Dhikr",
    icon: "library",
    color: "bg-purple-500",
    gradient: ["#8B5CF6", "#7C3AED"],
    route: "/screens/dhikr",
  },
  {
    id: "6",
    name: "Tasbih",
    icon: "repeat",
    color: "bg-indigo-500",
    gradient: ["#6366F1", "#4F46E5"],
    route: "/screens/tasbih",
  },
];

export const BASE_PRAYER_TIMES = [
  {
    id: "1",
    name: "Fajr",
    arabicName: "الفجر",
    time: "04:41",
    icon: "sunrise-outline",
    description: "Dawn Prayer",
  },
  {
    id: "2",
    name: "Dhuhr",
    arabicName: "الظهر",
    time: "12:54",
    icon: "sunny-outline",
    description: "Noon Prayer",
  },
  {
    id: "3",
    name: "Asr",
    arabicName: "العصر",
    time: "15:14",
    icon: "partly-sunny-outline",
    description: "Afternoon Prayer",
  },
  {
    id: "4",
    name: "Maghrib",
    arabicName: "المغرب",
    time: "18:02",
    icon: "sunset-outline",
    description: "Sunset Prayer",
  },
  {
    id: "5",
    name: "Isha",
    arabicName: "العشاء",
    time: "19:11",
    icon: "moon-outline",
    description: "Night Prayer",
  },
];

  export const basePrayerTimes = [
    {
      name: "Fajr",
      arabicName: "الفجر",
      time: "04:41",
      icon: "partly-sunny",
      description: "Dawn Prayer",
    },
    {
      name: "Dhuhr",
      arabicName: "الظهر",
      time: "12:04",
      icon: "sunny-outline",
      description: "Noon Prayer",
    },
    {
      name: "Asr",
      arabicName: "العصر",
      time: "15:14",
      icon: "partly-sunny-outline",
      description: "Afternoon Prayer",
    },
    {
      name: "Maghrib",
      arabicName: "المغرب",
      time: "18:02",
      icon: "partly-sunny",
      description: "Sunset Prayer",
    },
    {
      name: "Isha",
      arabicName: "العشاء",
      time: "19:11",
      icon: "moon-outline",
      description: "Night Prayer",
    },
  ];

// Storage Keys
export const TASBIH_STORAGE_KEY = "tasbih_data_v3";

// Utility Functions
export function timeToSeconds(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 3600 + minutes * 60;
}

export function getCurrentTimeInSeconds(): number {
  const now = new Date();
  return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
}

export function calculateTimeDifferenceWithSeconds(
  targetTimeInSeconds: number
): string {
  const currentSeconds = getCurrentTimeInSeconds();
  let diffSeconds = targetTimeInSeconds - currentSeconds;
  if (diffSeconds <= 0) diffSeconds += 24 * 3600;
  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

export interface DailyAmal {
  id: string;
  arabic: string;
  english: string;
  bangla: string;
  banglaPronunciation: string;
  reference: string;
  category: string;
  emoji: string;
  color: string;
}

export const DAILY_AMAL: DailyAmal[] = [
  {
    id: "1",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    english: "Glory be to Allah and His is the praise",
    bangla: "আল্লাহর পবিত্রতা এবং তাঁরই প্রশংসা",
    banglaPronunciation: "সুবহানাল্লাহি ওয়া বিহামদিহি",
    reference: "Sahih Bukhari 6405",
    category: "Dhikr",
    emoji: "🤲",
    color: "#10B981",
  },
  {
    id: "2",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    english: "There is no deity except Allah, alone, without any partner",
    bangla: "আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি একক, তাঁর কোন শরীক নেই",
    banglaPronunciation: "লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকালাহু",
    reference: "Sahih Muslim 2691",
    category: "Tawheed",
    emoji: "☪️",
    color: "#3B82F6",
  },
  {
    id: "3",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    english: "I seek forgiveness from Allah",
    bangla: "আমি আল্লাহর কাছে ক্ষমা চাই",
    banglaPronunciation: "আস্তাগফিরুল্লাহ",
    reference: "Quran 11:52",
    category: "Istighfar",
    emoji: "🙏",
    color: "#8B5CF6",
  },
  {
    id: "4",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
    english: "O Allah, send prayers upon Muhammad",
    bangla: "হে আল্লাহ, মুহাম্মদের উপর দরূদ পাঠ করুন",
    banglaPronunciation: "আল্লাহুম্মা সাল্লি আলা মুহাম্মাদিন",
    reference: "Sahih Bukhari 3370",
    category: "Salawat",
    emoji: "🌹",
    color: "#EC4899",
  },
  {
    id: "5",
    arabic: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
    english: "Glory be to Allah, and praise be to Allah, and there is no deity except Allah, and Allah is the Greatest",
    bangla: "আল্লাহর পবিত্রতা, আল্লাহর প্রশংসা, আল্লাহ ছাড়া কোন ইলাহ নেই, আল্লাহ মহান",
    banglaPronunciation: "সুবহানাল্লাহি ওয়াল হামদু লিল্লাহি ওয়াল্লাহু আকবার",
    reference: "Sahih Muslim 2694",
    category: "Dhikr",
    emoji: "✨",
    color: "#F59E0B",
  },
  {
    id: "6",
    arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ",
    english: "My Lord, forgive me and accept my repentance",
    bangla: "হে আমার রব, আমাকে ক্ষমা করুন এবং আমার তাওবা কবুল করুন",
    banglaPronunciation: "রাব্বিগফিরলি ওয়া তুব আলাইয়া",
    reference: "Abu Dawud 1516",
    category: "Istighfar",
    emoji: "💝",
    color: "#EF4444",
  },
  {
    id: "7",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ",
    english: "O Allah, I ask You for Paradise and I seek refuge with You from the Fire",
    bangla: "হে আল্লাহ, আমি আপনার কাছে জান্নাত চাই এবং আমি আপনার কাছে জাহান্নাম থেকে আশ্রয় চাই",
    banglaPronunciation: "আল্লাহুম্মা ইন্নি আসআলুকাল জান্নাতা ওয়া আউজু বিকা মিনান নার",
    reference: "Abu Dawud 792",
    category: "Dua",
    emoji: "🕌",
    color: "#06B6D4",
  },
  {
    id: "8",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ",
    english: "Glory be to Allah and His is the praise, Glory be to Allah the Most Great",
    bangla: "আল্লাহর পবিত্রতা এবং তাঁরই প্রশংসা, মহান আল্লাহর পবিত্রতা",
    banglaPronunciation: "সুবহানাল্লাহি ওয়া বিহামদিহি সুবহানাল্লাহিল আজিম",
    reference: "Sahih Bukhari 6682",
    category: "Dhikr",
    emoji: "🌟",
    color: "#059669",
  },
  {
    id: "9",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    english: "There is no power and no strength except with Allah",
    bangla: "আল্লাহ ছাড়া কোন ক্ষমতা এবং শক্তি নেই",
    banglaPronunciation: "লা হাওলা ওয়া লা কুওয়াতা ইল্লা বিল্লাহ",
    reference: "Sahih Bukhari 6610",
    category: "Dhikr",
    emoji: "💪",
    color: "#8B5CF6",
  },
  {
    id: "10",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
    english: "O Allah, I ask You for guidance, piety, chastity and self-sufficiency",
    bangla: "হে আল্লাহ, আমি আপনার কাছে হিদায়াত, তাকওয়া, পবিত্রতা এবং স্বয়ংসম্পূর্ণতা চাই",
    banglaPronunciation: "আল্লাহুম্মা ইন্নি আসআলুকাল হুদা ওয়াত তুকা ওয়াল আফাফা ওয়াল গিনা",
    reference: "Sahih Muslim 2721",
    category: "Dua",
    emoji: "🧭",
    color: "#3B82F6",
  },
  {
    id: "11",
    arabic: "سُبْحَانَ اللَّهِ مِائَةَ مَرَّةٍ",
    english: "Glory be to Allah one hundred times",
    bangla: "আল্লাহর পবিত্রতা একশত বার",
    banglaPronunciation: "সুবহানাল্লাহি মিয়াতা মাররাতিন",
    reference: "Sahih Muslim 2691",
    category: "Dhikr",
    emoji: "🔢",
    color: "#10B981",
  },
  {
    id: "12",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    english: "Praise be to Allah Who has fed me this and provided it for me, with no power or might from myself",
    bangla: "সকল প্রশংসা আল্লাহর জন্য যিনি আমাকে এটা খাওয়ালেন এবং আমার জন্য এর ব্যবস্থা করলেন, আমার কোন ক্ষমতা বা শক্তি ছাড়াই",
    banglaPronunciation: "আল হামদু লিল্লাহিল্লাজি আতআমানি হাজা ওয়া রাজাকানিহি মিন গাইরি হাওলিন মিন্নি ওয়া লা কুওয়াতিন",
    reference: "Abu Dawud 4023",
    category: "Dua",
    emoji: "🍽️",
    color: "#F59E0B",
  },
  {
    id: "13",
    arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    english: "In the name of Allah and with the blessings of Allah",
    bangla: "আল্লাহর নামে এবং আল্লাহর বরকতে",
    banglaPronunciation: "বিসমিল্লাহি ওয়া আলা বারাকাতিল্লাহ",
    reference: "Abu Dawud 3767",
    category: "Dua",
    emoji: "📿",
    color: "#EC4899",
  },
  {
    id: "14",
    arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    english: "O Allah, bless us in what You have provided for us and protect us from the punishment of the Fire",
    bangla: "হে আল্লাহ, আপনি আমাদের যা দিয়েছেন তাতে আমাদের বরকত দিন এবং আমাদের জাহান্নামের শাস্তি থেকে রক্ষা করুন",
    banglaPronunciation: "আল্লাহুম্মা বারিক লানা ফিমা রাজাকতানা ওয়া কিনা আজাবান নার",
    reference: "Ibn Majah 3282",
    category: "Dua",
    emoji: "🔥",
    color: "#EF4444",
  },
  {
    id: "15",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ",
    english: "Glory be to Allah and His is the praise by the number of His creation",
    bangla: "আল্লাহর পবিত্রতা এবং তাঁরই প্রশংসা তাঁর সৃষ্টির সংখ্যা অনুযায়ী",
    banglaPronunciation: "সুবহানাল্লাহি ওয়া বিহামদিহি আদাদা খালকিহি",
    reference: "Sahih Muslim 2726",
    category: "Dhikr",
    emoji: "🌌",
    color: "#8B5CF6",
  },
  {
    id: "16",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ",
    english: "O Allah, I seek refuge with You from disbelief and poverty",
    bangla: "হে আল্লাহ, আমি আপনার কাছে কুফর এবং দারিদ্র্য থেকে আশ্রয় চাই",
    banglaPronunciation: "আল্লাহুম্মা ইন্নি আউজু বিকা মিনাল কুফরি ওয়াল ফাকরি",
    reference: "Abu Dawud 1547",
    category: "Dua",
    emoji: "🛡️",
    color: "#3B82F6",
  },
  {
    id: "17",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    english: "Our Lord, grant us good in this world and good in the Hereafter and protect us from the punishment of the Fire",
    bangla: "হে আমাদের রব, আমাদের দুনিয়াতে কল্যাণ দিন এবং আখিরাতে কল্যাণ দিন এবং আমাদের জাহান্নামের শাস্তি থেকে রক্ষা করুন",
    banglaPronunciation: "রাব্বানা আতিনা ফিদ দুনইয়া হাসানাতান ওয়া ফিল আখিরাতি হাসানাতান ওয়া কিনা আজাবান নার",
    reference: "Quran 2:201",
    category: "Dua",
    emoji: "🌍",
    color: "#10B981",
  },
  {
    id: "18",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ",
    english: "O Allah, I ask You for pardon and well-being",
    bangla: "হে আল্লাহ, আমি আপনার কাছে ক্ষমা এবং সুস্থতা চাই",
    banglaPronunciation: "আল্লাহুম্মা ইন্নি আসআলুকাল আফওয়া ওয়াল আফিয়াতা",
    reference: "Abu Dawud 5074",
    category: "Dua",
    emoji: "💚",
    color: "#059669",
  },
  {
    id: "19",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ مِائَةَ مَرَّةٍ",
    english: "Glory be to Allah and His is the praise one hundred times",
    bangla: "আল্লাহর পবিত্রতা এবং তাঁরই প্রশংসা একশত বার",
    banglaPronunciation: "সুবহানাল্লাহি ওয়া বিহামদিহি মিয়াতা মাররাতিন",
    reference: "Sahih Bukhari 6405",
    category: "Dhikr",
    emoji: "💯",
    color: "#F59E0B",
  },
  {
    id: "20",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ",
    english: "O Allah, I ask You for Your pleasure and Paradise",
    bangla: "হে আল্লাহ, আমি আপনার কাছে আপনার সন্তুষ্টি এবং জান্নাত চাই",
    banglaPronunciation: "আল্লাহুম্মা ইন্নি আসআলুকা রিদাকা ওয়াল জান্নাতা",
    reference: "Tirmidhi 3489",
    category: "Dua",
    emoji: "😊",
    color: "#EC4899",
  },
];
