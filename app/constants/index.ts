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
  ];

export const DAILY_INSPIRATIONS = [
  {
    quote: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.",
    reference: "Quran 65:3",
    category: "Trust in Allah",
    emoji: "🤲",
    color: "#8B5CF6"
  },
  {
    quote: "Verily, with hardship comes ease. Verily, with hardship comes ease.",
    reference: "Quran 94:5-6",
    category: "Patience",
    emoji: "💪",
    color: "#10B981"
  },
  {
    quote: "Indeed, Allah is with those who are patient.",
    reference: "Quran 2:153",
    category: "Patience",
    emoji: "🌱",
    color: "#059669"
  },
  {
    quote: "The best of you are those who are best to their families.",
    reference: "Prophetic Hadith",
    category: "Family",
    emoji: "👨‍👩‍👧‍👦",
    color: "#F59E0B"
  },
  {
    quote: "Seek knowledge from the cradle to the grave.",
    reference: "Prophetic Hadith",
    category: "Knowledge",
    emoji: "📚",
    color: "#3B82F6"
  },
  {
    quote: "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.",
    reference: "Prophetic Hadith",
    category: "Self-Control",
    emoji: "🧘",
    color: "#EC4899"
  },
  {
    quote: "Allah does not look at your appearance or your wealth, but He looks at your hearts and your deeds.",
    reference: "Prophetic Hadith",
    category: "Character",
    emoji: "❤️",
    color: "#EF4444"
  },
  {
    quote: "The best of people are those who are most beneficial to people.",
    reference: "Prophetic Hadith",
    category: "Service",
    emoji: "🤝",
    color: "#06B6D4"
  },
  {
    quote: "Whoever believes in Allah and the Last Day, let him speak good or remain silent.",
    reference: "Prophetic Hadith",
    category: "Speech",
    emoji: "🗣️",
    color: "#8B5CF6"
  },
  {
    quote: "The most beloved places to Allah are the mosques, and the most disliked places to Allah are the markets.",
    reference: "Prophetic Hadith",
    category: "Worship",
    emoji: "🕌",
    color: "#059669"
  }
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
  { id: "5", name: "Isha", time: "19:11", icon: "moon", active: false },
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
    name: "Qibla",
    icon: "compass",
    color: "bg-orange-500",
    gradient: ["#F97316", "#EA580C"],
    route: "/qibla",
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
export const TASBIH_STORAGE_KEY = "tasbih_data_v2";

// Utility Functions
export function timeToSeconds(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 3600 + minutes * 60;
}

export function getCurrentTimeInSeconds(): number {
  const now = new Date();
  return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
}

export function calculateTimeDifferenceWithSeconds(targetTimeInSeconds: number): string {
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