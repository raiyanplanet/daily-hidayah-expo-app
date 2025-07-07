// Salat (Prayer) Constants
export interface PrayerTutorial {
  name: string;
  arabic: string;
  icon: string;
  tutorial: string;
  rakats: number;
  time: string;
  gradient: string[];
  color: string;
}

export interface PrayerStep {
  step: number;
  title: string;
  description: string;
  arabic?: string;
  transliteration?: string;
}

export const PRAYER_TUTORIALS: PrayerTutorial[] = [
  {
    name: 'Fajr',
    arabic: 'الفجر',
    icon: '🌅',
    rakats: 2,
    time: 'Before Sunrise',
    gradient: ['#FF6B6B', '#FF8E8E'],
    color: '#FF6B6B',
    tutorial: 'Fajr consists of 2 rak\'ahs. It is performed before sunrise. Intention, recitation of Al-Fatiha and a surah, bowing (ruku\'), prostration (sujud), and sitting (tashahhud) are included.'
  },
  {
    name: 'Dhuhr',
    arabic: 'الظهر',
    icon: '☀️',
    rakats: 4,
    time: 'After Noon',
    gradient: ['#4ECDC4', '#44A08D'],
    color: '#4ECDC4',
    tutorial: 'Dhuhr consists of 4 rak\'ahs. It is performed after the sun passes its zenith. Each rak\'ah includes recitation, bowing, prostration, and sitting.'
  },
  {
    name: 'Asr',
    arabic: 'العصر',
    icon: '🌇',
    rakats: 4,
    time: 'Afternoon',
    gradient: ['#45B7D1', '#96C93D'],
    color: '#45B7D1',
    tutorial: 'Asr consists of 4 rak\'ahs. It is performed in the afternoon. Each rak\'ah includes recitation, bowing, prostration, and sitting.'
  },
  {
    name: 'Maghrib',
    arabic: 'المغرب',
    icon: '🌆',
    rakats: 3,
    time: 'After Sunset',
    gradient: ['#A8E6CF', '#DCEDC8'],
    color: '#A8E6CF',
    tutorial: 'Maghrib consists of 3 rak\'ahs. It is performed just after sunset. Each rak\'ah includes recitation, bowing, prostration, and sitting.'
  },
  {
    name: 'Isha',
    arabic: 'العشاء',
    icon: '🌃',
    rakats: 4,
    time: 'Night',
    gradient: ['#667eea', '#764ba2'],
    color: '#667eea',
    tutorial: 'Isha consists of 4 rak\'ahs. It is performed at night. Each rak\'ah includes recitation, bowing, prostration, and sitting.'
  },
];

export const PRAYER_STEPS: PrayerStep[] = [
  {
    step: 1,
    title: 'Intention (Niyyah)',
    description: 'Make the intention in your heart to perform the specific prayer',
    arabic: 'النية',
    transliteration: 'Niyyah'
  },
  {
    step: 2,
    title: 'Takbir (Opening)',
    description: 'Raise your hands and say "Allahu Akbar"',
    arabic: 'الله أكبر',
    transliteration: 'Allahu Akbar'
  },
  {
    step: 3,
    title: 'Recitation',
    description: 'Recite Al-Fatiha and a surah from the Quran',
    arabic: 'القراءة',
    transliteration: 'Qira\'ah'
  },
  {
    step: 4,
    title: 'Ruku (Bowing)',
    description: 'Bow down and say "Subhana Rabbiyal Adheem"',
    arabic: 'الركوع',
    transliteration: 'Ruku\''
  },
  {
    step: 5,
    title: 'Sujud (Prostration)',
    description: 'Prostrate and say "Subhana Rabbiyal A\'la"',
    arabic: 'السجود',
    transliteration: 'Sujud'
  },
  {
    step: 6,
    title: 'Tashahhud',
    description: 'Sit and recite the testimony of faith',
    arabic: 'التشهد',
    transliteration: 'Tashahhud'
  },
  {
    step: 7,
    title: 'Salam (Closing)',
    description: 'Turn your head right and left saying "Assalamu alaikum"',
    arabic: 'السلام',
    transliteration: 'Salam'
  }
];

export const PRAYER_BENEFITS = {
  spiritual: [
    'Strengthens connection with Allah',
    'Purifies the heart and soul',
    'Provides spiritual peace and tranquility',
    'Increases faith and piety'
  ],
  physical: [
    'Improves posture and flexibility',
    'Provides regular exercise',
    'Helps with blood circulation',
    'Reduces stress and anxiety'
  ],
  mental: [
    'Improves focus and concentration',
    'Provides mental clarity',
    'Helps with time management',
    'Reduces negative thoughts'
  ]
};

export const PRAYER_TIMES_DESCRIPTION = {
  Fajr: 'The dawn prayer, performed before sunrise when the first light appears in the sky',
  Dhuhr: 'The noon prayer, performed after the sun passes its zenith (highest point)',
  Asr: 'The afternoon prayer, performed when shadows are equal to objects',
  Maghrib: 'The sunset prayer, performed just after the sun disappears below the horizon',
  Isha: 'The night prayer, performed when darkness falls and the twilight disappears'
};

export const PRAYER_ETIQUETTE = [
  'Perform ablution (wudu) before prayer',
  'Face the Qibla (direction of Kaaba)',
  'Wear clean and modest clothing',
  'Pray in a clean place',
  'Focus your mind and heart on Allah',
  'Avoid talking during prayer',
  'Complete each movement with tranquility'
];

export const SALAT_STORAGE_KEYS = {
  PRAYER_HISTORY: 'salat_prayer_history',
  PRAYER_SETTINGS: 'salat_prayer_settings',
  TUTORIAL_PROGRESS: 'salat_tutorial_progress',
  REMINDERS: 'salat_reminders'
}; 