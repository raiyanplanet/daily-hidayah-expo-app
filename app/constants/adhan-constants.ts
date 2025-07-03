export interface PrayerTime {
  name: string;
  time: string;
  icon: string;
  isNext: boolean;
  timestamp: number;
  arabicName: string;
  englishName: string;
  description: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

// Default prayer times (can be customized based on location)
export const DEFAULT_PRAYER_TIMES: PrayerTime[] = [
  {
    name: 'Fajr',
    time: '04:30',
    icon: 'sunny-outline',
    isNext: false,
    timestamp: 330,
    arabicName: 'الفجر',
    englishName: 'Dawn Prayer',
    description: 'The first prayer of the day, before sunrise'
  },
  {
    name: 'Dhuhr',
    time: '12:50',
    icon: 'sunny',
    isNext: false,
    timestamp: 750,
    arabicName: 'الظهر',
    englishName: 'Noon Prayer',
    description: 'The midday prayer, when the sun passes its zenith'
  },
  {
    name: 'Asr',
    time: '15:45',
    icon: 'partly-sunny',
    isNext: false,
    timestamp: 945,
    arabicName: 'العصر',
    englishName: 'Afternoon Prayer',
    description: 'The afternoon prayer, when shadows are equal to objects'
  },
  {
    name: 'Maghrib',
    time: '18:20',
    icon: 'moon-outline',
    isNext: false,
    timestamp: 1100,
    arabicName: 'المغرب',
    englishName: 'Sunset Prayer',
    description: 'The prayer at sunset, when the sun disappears'
  },
  {
    name: 'Isha',
    time: '19:45',
    icon: 'moon',
    isNext: false,
    timestamp: 1185,
    arabicName: 'العشاء',
    englishName: 'Night Prayer',
    description: 'The night prayer, when darkness falls'
  }
];

// Prayer time adjustments for different cities (example data)
export const CITY_PRAYER_TIMES: { [key: string]: { [key: string]: string } } = {
  'Mecca': {
    'Fajr': '05:15',
    'Dhuhr': '12:15',
    'Asr': '15:30',
    'Maghrib': '18:15',
    'Isha': '19:30'
  },
  'Medina': {
    'Fajr': '05:20',
    'Dhuhr': '12:20',
    'Asr': '15:35',
    'Maghrib': '18:20',
    'Isha': '19:35'
  },
  'Istanbul': {
    'Fajr': '05:45',
    'Dhuhr': '12:45',
    'Asr': '16:00',
    'Maghrib': '18:30',
    'Isha': '19:45'
  },
  'Cairo': {
    'Fajr': '05:00',
    'Dhuhr': '12:00',
    'Asr': '15:15',
    'Maghrib': '18:00',
    'Isha': '19:15'
  },
  'Dubai': {
    'Fajr': '05:15',
    'Dhuhr': '12:15',
    'Asr': '15:30',
    'Maghrib': '18:15',
    'Isha': '19:30'
  },
  'Jakarta': {
    'Fajr': '04:30',
    'Dhuhr': '11:45',
    'Asr': '15:00',
    'Maghrib': '17:45',
    'Isha': '19:00'
  },
  'Kuala Lumpur': {
    'Fajr': '05:45',
    'Dhuhr': '13:00',
    'Asr': '16:15',
    'Maghrib': '19:00',
    'Isha': '20:15'
  }
};

// Adhan audio options
export const ADHAN_AUDIO_OPTIONS = {
  Fajr: 'fajr_adhan.mp3',
  Dhuhr: 'dhuhr_adhan.mp3',
  Asr: 'asr_adhan.mp3',
  Maghrib: 'maghrib_adhan.mp3',
  Isha: 'isha_adhan.mp3',
  Default: 'default_adhan.mp3'
};

// Prayer time calculation methods
export const PRAYER_CALCULATION_METHODS = {
  MWL: 'Muslim World League',
  ISNA: 'Islamic Society of North America',
  EGYPT: 'Egyptian General Authority of Survey',
  MAKKAH: 'Umm Al-Qura University, Makkah',
  KARACHI: 'University of Islamic Sciences, Karachi',
  TEHRAN: 'Institute of Geophysics, University of Tehran',
  JAFARI: 'Shia Ithna Ashari, Leva Research Institute, Qum'
};

// Default calculation method
export const DEFAULT_CALCULATION_METHOD = 'MWL';

// Time format options
export const TIME_FORMATS = {
  '12h': '12-hour format (AM/PM)',
  '24h': '24-hour format'
};

// Notification settings
export const NOTIFICATION_SETTINGS = {
  ADHAN_NOTIFICATION: true,
  PRAYER_REMINDER: true,
  REMINDER_MINUTES: 10, // minutes before prayer
  VIBRATION: true,
  SOUND: true
};

// Helper function to get prayer times for a specific city
export const getPrayerTimesForCity = (cityName: string): PrayerTime[] => {
  const cityTimes = CITY_PRAYER_TIMES[cityName];
  
  if (cityTimes) {
    return DEFAULT_PRAYER_TIMES.map(prayer => ({
      ...prayer,
      time: cityTimes[prayer.name] || prayer.time,
      timestamp: parseTimeToTimestamp(cityTimes[prayer.name] || prayer.time)
    }));
  }
  
  return DEFAULT_PRAYER_TIMES;
};

// Helper function to parse time string to timestamp
export const parseTimeToTimestamp = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

// Helper function to determine next prayer
export const getNextPrayer = (prayerTimes: PrayerTime[]): PrayerTime | null => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  // Find the next prayer
  const nextPrayer = prayerTimes.find(prayer => prayer.timestamp > currentMinutes);
  
  // If no prayer found for today, return the first prayer of tomorrow
  if (!nextPrayer) {
    return prayerTimes[0];
  }
  
  return nextPrayer;
};

// Helper function to update prayer times with next prayer indicator
export const updatePrayerTimesWithNext = (prayerTimes: PrayerTime[]): PrayerTime[] => {
  const nextPrayer = getNextPrayer(prayerTimes);
  
  return prayerTimes.map(prayer => ({
    ...prayer,
    isNext: nextPrayer ? prayer.name === nextPrayer.name : false
  }));
};

// Helper function to get time until next prayer
export const getTimeUntilNextPrayer = (prayerTimes: PrayerTime[]): string => {
  const nextPrayer = getNextPrayer(prayerTimes);
  if (!nextPrayer) return '';

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  let timeUntil = nextPrayer.timestamp - currentMinutes;

  // If next prayer is tomorrow, add 24 hours
  if (timeUntil <= 0) {
    timeUntil += 24 * 60;
  }

  if (timeUntil <= 0) return 'Now';
  
  const hours = Math.floor(timeUntil / 60);
  const minutes = timeUntil % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

// Storage keys
export const ADHAN_STORAGE_KEYS = {
  PRAYER_TIMES: 'adhan_prayer_times',
  LOCATION: 'adhan_location',
  SETTINGS: 'adhan_settings',
  NOTIFICATIONS: 'adhan_notifications'
}; 