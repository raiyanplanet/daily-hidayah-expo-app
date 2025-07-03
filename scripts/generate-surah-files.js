const fs = require('fs');
const path = require('path');

// Quran surah metadata
const surahMetadata = [
  { number: 1, name: "Al-Fatihah", arabicName: "الفاتحة", englishName: "The Opening", verses: 7, juz: 1, type: "Meccan", revelationOrder: 5 },
  { number: 2, name: "Al-Baqarah", arabicName: "البقرة", englishName: "The Cow", verses: 286, juz: 1, type: "Medinan", revelationOrder: 87 },
  { number: 3, name: "Al-Imran", arabicName: "آل عمران", englishName: "The Family of Imran", verses: 200, juz: 3, type: "Medinan", revelationOrder: 89 },
  { number: 4, name: "An-Nisa", arabicName: "النساء", englishName: "The Women", verses: 176, juz: 4, type: "Medinan", revelationOrder: 92 },
  { number: 5, name: "Al-Ma'idah", arabicName: "المائدة", englishName: "The Table Spread", verses: 120, juz: 6, type: "Medinan", revelationOrder: 112 },
  { number: 6, name: "Al-An'am", arabicName: "الأنعام", englishName: "The Cattle", verses: 165, juz: 7, type: "Meccan", revelationOrder: 55 },
  { number: 7, name: "Al-A'raf", arabicName: "الأعراف", englishName: "The Heights", verses: 206, juz: 8, type: "Meccan", revelationOrder: 39 },
  { number: 8, name: "Al-Anfal", arabicName: "الأنفال", englishName: "The Spoils of War", verses: 75, juz: 9, type: "Medinan", revelationOrder: 88 },
  { number: 9, name: "At-Tawbah", arabicName: "التوبة", englishName: "The Repentance", verses: 129, juz: 10, type: "Medinan", revelationOrder: 113 },
  { number: 10, name: "Yunus", arabicName: "يونس", englishName: "Jonah", verses: 109, juz: 11, type: "Meccan", revelationOrder: 51 },
  { number: 11, name: "Hud", arabicName: "هود", englishName: "Hud", verses: 123, juz: 11, type: "Meccan", revelationOrder: 52 },
  { number: 12, name: "Yusuf", arabicName: "يوسف", englishName: "Joseph", verses: 111, juz: 12, type: "Meccan", revelationOrder: 53 },
  { number: 13, name: "Ar-Ra'd", arabicName: "الرعد", englishName: "The Thunder", verses: 43, juz: 13, type: "Medinan", revelationOrder: 96 },
  { number: 14, name: "Ibrahim", arabicName: "إبراهيم", englishName: "Abraham", verses: 52, juz: 13, type: "Meccan", revelationOrder: 72 },
  { number: 15, name: "Al-Hijr", arabicName: "الحجر", englishName: "The Rocky Tract", verses: 99, juz: 14, type: "Meccan", revelationOrder: 54 },
  { number: 16, name: "An-Nahl", arabicName: "النحل", englishName: "The Bee", verses: 128, juz: 14, type: "Meccan", revelationOrder: 70 },
  { number: 17, name: "Al-Isra", arabicName: "الإسراء", englishName: "The Night Journey", verses: 111, juz: 15, type: "Meccan", revelationOrder: 50 },
  { number: 18, name: "Al-Kahf", arabicName: "الكهف", englishName: "The Cave", verses: 110, juz: 15, type: "Meccan", revelationOrder: 69 },
  { number: 19, name: "Maryam", arabicName: "مريم", englishName: "Mary", verses: 98, juz: 16, type: "Meccan", revelationOrder: 44 },
  { number: 20, name: "Ta-Ha", arabicName: "طه", englishName: "Ta-Ha", verses: 135, juz: 16, type: "Meccan", revelationOrder: 45 },
  { number: 21, name: "Al-Anbya", arabicName: "الأنبياء", englishName: "The Prophets", verses: 112, juz: 17, type: "Meccan", revelationOrder: 73 },
  { number: 22, name: "Al-Hajj", arabicName: "الحج", englishName: "The Pilgrimage", verses: 78, juz: 17, type: "Medinan", revelationOrder: 103 },
  { number: 23, name: "Al-Mu'minun", arabicName: "المؤمنون", englishName: "The Believers", verses: 118, juz: 18, type: "Meccan", revelationOrder: 74 },
  { number: 24, name: "An-Nur", arabicName: "النور", englishName: "The Light", verses: 64, juz: 18, type: "Medinan", revelationOrder: 102 },
  { number: 25, name: "Al-Furqan", arabicName: "الفرقان", englishName: "The Criterion", verses: 77, juz: 19, type: "Meccan", revelationOrder: 42 },
  { number: 26, name: "Ash-Shu'ara", arabicName: "الشعراء", englishName: "The Poets", verses: 227, juz: 19, type: "Meccan", revelationOrder: 47 },
  { number: 27, name: "An-Naml", arabicName: "النمل", englishName: "The Ant", verses: 93, juz: 19, type: "Meccan", revelationOrder: 48 },
  { number: 28, name: "Al-Qasas", arabicName: "القصص", englishName: "The Stories", verses: 88, juz: 20, type: "Meccan", revelationOrder: 49 },
  { number: 29, name: "Al-Ankabut", arabicName: "العنكبوت", englishName: "The Spider", verses: 69, juz: 20, type: "Meccan", revelationOrder: 85 },
  { number: 30, name: "Ar-Rum", arabicName: "الروم", englishName: "The Romans", verses: 60, juz: 21, type: "Meccan", revelationOrder: 84 },
  { number: 31, name: "Luqman", arabicName: "لقمان", englishName: "Luqman", verses: 34, juz: 21, type: "Meccan", revelationOrder: 57 },
  { number: 32, name: "As-Sajdah", arabicName: "السجدة", englishName: "The Prostration", verses: 30, juz: 21, type: "Meccan", revelationOrder: 75 },
  { number: 33, name: "Al-Ahzab", arabicName: "الأحزاب", englishName: "The Combined Forces", verses: 73, juz: 21, type: "Medinan", revelationOrder: 90 },
  { number: 34, name: "Saba", arabicName: "سبإ", englishName: "Sheba", verses: 54, juz: 22, type: "Meccan", revelationOrder: 58 },
  { number: 35, name: "Fatir", arabicName: "فاطر", englishName: "Originator", verses: 45, juz: 22, type: "Meccan", revelationOrder: 43 },
  { number: 36, name: "Ya-Sin", arabicName: "يس", englishName: "Ya-Sin", verses: 83, juz: 22, type: "Meccan", revelationOrder: 41 },
  { number: 37, name: "As-Saffat", arabicName: "الصافات", englishName: "Those who set the Ranks", verses: 182, juz: 23, type: "Meccan", revelationOrder: 56 },
  { number: 38, name: "Sad", arabicName: "ص", englishName: "The Letter Saad", verses: 88, juz: 23, type: "Meccan", revelationOrder: 38 },
  { number: 39, name: "Az-Zumar", arabicName: "الزمر", englishName: "The Troops", verses: 75, juz: 23, type: "Meccan", revelationOrder: 59 },
  { number: 40, name: "Ghafir", arabicName: "غافر", englishName: "The Forgiver", verses: 85, juz: 24, type: "Meccan", revelationOrder: 60 },
  { number: 41, name: "Fussilat", arabicName: "فصلت", englishName: "Explained in Detail", verses: 54, juz: 24, type: "Meccan", revelationOrder: 61 },
  { number: 42, name: "Ash-Shuraa", arabicName: "الشورى", englishName: "The Consultation", verses: 53, juz: 25, type: "Meccan", revelationOrder: 62 },
  { number: 43, name: "Az-Zukhruf", arabicName: "الزخرف", englishName: "The Ornaments of Gold", verses: 89, juz: 25, type: "Meccan", revelationOrder: 63 },
  { number: 44, name: "Ad-Dukhan", arabicName: "الدخان", englishName: "The Smoke", verses: 59, juz: 25, type: "Meccan", revelationOrder: 64 },
  { number: 45, name: "Al-Jathiyah", arabicName: "الجاثية", englishName: "The Kneeling", verses: 37, juz: 25, type: "Meccan", revelationOrder: 65 },
  { number: 46, name: "Al-Ahqaf", arabicName: "الأحقاف", englishName: "The Wind-Curved Sandhills", verses: 35, juz: 26, type: "Meccan", revelationOrder: 66 },
  { number: 47, name: "Muhammad", arabicName: "محمد", englishName: "Muhammad", verses: 38, juz: 26, type: "Medinan", revelationOrder: 95 },
  { number: 48, name: "Al-Fath", arabicName: "الفتح", englishName: "The Victory", verses: 29, juz: 26, type: "Medinan", revelationOrder: 111 },
  { number: 49, name: "Al-Hujurat", arabicName: "الحجرات", englishName: "The Private Apartments", verses: 18, juz: 26, type: "Medinan", revelationOrder: 106 },
  { number: 50, name: "Qaf", arabicName: "ق", englishName: "The Letter Qaf", verses: 45, juz: 26, type: "Meccan", revelationOrder: 34 },
  { number: 51, name: "Adh-Dhariyat", arabicName: "الذاريات", englishName: "The Winnowing Winds", verses: 60, juz: 26, type: "Meccan", revelationOrder: 67 },
  { number: 52, name: "At-Tur", arabicName: "الطور", englishName: "The Mount", verses: 49, juz: 27, type: "Meccan", revelationOrder: 76 },
  { number: 53, name: "An-Najm", arabicName: "النجم", englishName: "The Star", verses: 62, juz: 27, type: "Meccan", revelationOrder: 23 },
  { number: 54, name: "Al-Qamar", arabicName: "القمر", englishName: "The Moon", verses: 55, juz: 27, type: "Meccan", revelationOrder: 37 },
  { number: 55, name: "Ar-Rahman", arabicName: "الرحمن", englishName: "The Beneficent", verses: 78, juz: 27, type: "Medinan", revelationOrder: 97 },
  { number: 56, name: "Al-Waqi'ah", arabicName: "الواقعة", englishName: "The Inevitable", verses: 96, juz: 27, type: "Meccan", revelationOrder: 46 },
  { number: 57, name: "Al-Hadid", arabicName: "الحديد", englishName: "The Iron", verses: 29, juz: 27, type: "Medinan", revelationOrder: 94 },
  { number: 58, name: "Al-Mujadila", arabicName: "المجادلة", englishName: "The Pleading Woman", verses: 22, juz: 28, type: "Medinan", revelationOrder: 105 },
  { number: 59, name: "Al-Hashr", arabicName: "الحشر", englishName: "The Exile", verses: 24, juz: 28, type: "Medinan", revelationOrder: 101 },
  { number: 60, name: "Al-Mumtahanah", arabicName: "الممتحنة", englishName: "The Woman to be Examined", verses: 13, juz: 28, type: "Medinan", revelationOrder: 91 },
  { number: 61, name: "As-Saf", arabicName: "الصف", englishName: "The Ranks", verses: 14, juz: 28, type: "Medinan", revelationOrder: 109 },
  { number: 62, name: "Al-Jumu'ah", arabicName: "الجمعة", englishName: "The Congregation", verses: 11, juz: 28, type: "Medinan", revelationOrder: 110 },
  { number: 63, name: "Al-Munafiqun", arabicName: "المنافقون", englishName: "The Hypocrites", verses: 11, juz: 28, type: "Medinan", revelationOrder: 104 },
  { number: 64, name: "At-Taghabun", arabicName: "التغابن", englishName: "The Mutual Disillusion", verses: 18, juz: 28, type: "Medinan", revelationOrder: 108 },
  { number: 65, name: "At-Talaq", arabicName: "الطلاق", englishName: "Divorce", verses: 12, juz: 28, type: "Medinan", revelationOrder: 99 },
  { number: 66, name: "At-Tahrim", arabicName: "التحريم", englishName: "The Prohibition", verses: 12, juz: 28, type: "Medinan", revelationOrder: 107 },
  { number: 67, name: "Al-Mulk", arabicName: "الملك", englishName: "The Sovereignty", verses: 30, juz: 29, type: "Meccan", revelationOrder: 77 },
  { number: 68, name: "Al-Qalam", arabicName: "القلم", englishName: "The Pen", verses: 52, juz: 29, type: "Meccan", revelationOrder: 2 },
  { number: 69, name: "Al-Haqqah", arabicName: "الحاقة", englishName: "The Reality", verses: 52, juz: 29, type: "Meccan", revelationOrder: 78 },
  { number: 70, name: "Al-Ma'arij", arabicName: "المعارج", englishName: "The Ascending Stairways", verses: 44, juz: 29, type: "Meccan", revelationOrder: 79 },
  { number: 71, name: "Nuh", arabicName: "نوح", englishName: "Noah", verses: 28, juz: 29, type: "Meccan", revelationOrder: 71 },
  { number: 72, name: "Al-Jinn", arabicName: "الجن", englishName: "The Jinn", verses: 28, juz: 29, type: "Meccan", revelationOrder: 40 },
  { number: 73, name: "Al-Muzzammil", arabicName: "المزمل", englishName: "The Enshrouded One", verses: 20, juz: 29, type: "Meccan", revelationOrder: 3 },
  { number: 74, name: "Al-Muddathir", arabicName: "المدثر", englishName: "The Cloaked One", verses: 56, juz: 29, type: "Meccan", revelationOrder: 4 },
  { number: 75, name: "Al-Qiyamah", arabicName: "القيامة", englishName: "The Resurrection", verses: 40, juz: 29, type: "Meccan", revelationOrder: 31 },
  { number: 76, name: "Al-Insan", arabicName: "الإنسان", englishName: "Man", verses: 31, juz: 29, type: "Medinan", revelationOrder: 98 },
  { number: 77, name: "Al-Mursalat", arabicName: "المرسلات", englishName: "The Emissaries", verses: 50, juz: 29, type: "Meccan", revelationOrder: 33 },
  { number: 78, name: "An-Naba", arabicName: "النبإ", englishName: "The Tidings", verses: 40, juz: 30, type: "Meccan", revelationOrder: 80 },
  { number: 79, name: "An-Nazi'at", arabicName: "النازعات", englishName: "Those who drag forth", verses: 46, juz: 30, type: "Meccan", revelationOrder: 81 },
  { number: 80, name: "Abasa", arabicName: "عبس", englishName: "He frowned", verses: 42, juz: 30, type: "Meccan", revelationOrder: 24 },
  { number: 81, name: "At-Takwir", arabicName: "التكوير", englishName: "The Overthrowing", verses: 29, juz: 30, type: "Meccan", revelationOrder: 7 },
  { number: 82, name: "Al-Infitar", arabicName: "الإنفطار", englishName: "The Cleaving", verses: 19, juz: 30, type: "Meccan", revelationOrder: 82 },
  { number: 83, name: "Al-Mutaffifin", arabicName: "المطففين", englishName: "The Defrauding", verses: 36, juz: 30, type: "Meccan", revelationOrder: 86 },
  { number: 84, name: "Al-Inshiqaq", arabicName: "الإنشقاق", englishName: "The Splitting Open", verses: 25, juz: 30, type: "Meccan", revelationOrder: 83 },
  { number: 85, name: "Al-Buruj", arabicName: "البروج", englishName: "The Mansions of the Stars", verses: 22, juz: 30, type: "Meccan", revelationOrder: 27 },
  { number: 86, name: "At-Tariq", arabicName: "الطارق", englishName: "The Morning Star", verses: 17, juz: 30, type: "Meccan", revelationOrder: 36 },
  { number: 87, name: "Al-A'la", arabicName: "الأعلى", englishName: "The Most High", verses: 19, juz: 30, type: "Meccan", revelationOrder: 8 },
  { number: 88, name: "Al-Ghashiyah", arabicName: "الغاشية", englishName: "The Overwhelming", verses: 26, juz: 30, type: "Meccan", revelationOrder: 68 },
  { number: 89, name: "Al-Fajr", arabicName: "الفجر", englishName: "The Dawn", verses: 30, juz: 30, type: "Meccan", revelationOrder: 10 },
  { number: 90, name: "Al-Balad", arabicName: "البلد", englishName: "The City", verses: 20, juz: 30, type: "Meccan", revelationOrder: 35 },
  { number: 91, name: "Ash-Shams", arabicName: "الشمس", englishName: "The Sun", verses: 15, juz: 30, type: "Meccan", revelationOrder: 26 },
  { number: 92, name: "Al-Layl", arabicName: "الليل", englishName: "The Night", verses: 21, juz: 30, type: "Meccan", revelationOrder: 9 },
  { number: 93, name: "Ad-Duha", arabicName: "الضحى", englishName: "The Morning Light", verses: 11, juz: 30, type: "Meccan", revelationOrder: 11 },
  { number: 94, name: "Ash-Sharh", arabicName: "الشرح", englishName: "The Relief", verses: 8, juz: 30, type: "Meccan", revelationOrder: 12 },
  { number: 95, name: "At-Tin", arabicName: "التين", englishName: "The Fig", verses: 8, juz: 30, type: "Meccan", revelationOrder: 28 },
  { number: 96, name: "Al-Alaq", arabicName: "العلق", englishName: "The Clinging Clot", verses: 19, juz: 30, type: "Meccan", revelationOrder: 1 },
  { number: 97, name: "Al-Qadr", arabicName: "القدر", englishName: "The Power", verses: 5, juz: 30, type: "Meccan", revelationOrder: 25 },
  { number: 98, name: "Al-Bayyinah", arabicName: "البينة", englishName: "The Clear Proof", verses: 8, juz: 30, type: "Medinan", revelationOrder: 100 },
  { number: 99, name: "Az-Zalzalah", arabicName: "الزلزلة", englishName: "The Earthquake", verses: 8, juz: 30, type: "Medinan", revelationOrder: 93 },
  { number: 100, name: "Al-Adiyat", arabicName: "العاديات", englishName: "The Coursers", verses: 11, juz: 30, type: "Meccan", revelationOrder: 14 },
  { number: 101, name: "Al-Qari'ah", arabicName: "القارعة", englishName: "The Calamity", verses: 11, juz: 30, type: "Meccan", revelationOrder: 30 },
  { number: 102, name: "At-Takathur", arabicName: "التكاثر", englishName: "The Rivalry in world increase", verses: 8, juz: 30, type: "Meccan", revelationOrder: 16 },
  { number: 103, name: "Al-Asr", arabicName: "العصر", englishName: "The Declining Day", verses: 3, juz: 30, type: "Meccan", revelationOrder: 13 },
  { number: 104, name: "Al-Humazah", arabicName: "الهمزة", englishName: "The Traducer", verses: 9, juz: 30, type: "Meccan", revelationOrder: 32 },
  { number: 105, name: "Al-Fil", arabicName: "الفيل", englishName: "The Elephant", verses: 5, juz: 30, type: "Meccan", revelationOrder: 19 },
  { number: 106, name: "Quraish", arabicName: "قريش", englishName: "Quraish", verses: 4, juz: 30, type: "Meccan", revelationOrder: 29 },
  { number: 107, name: "Al-Ma'un", arabicName: "الماعون", englishName: "The Small kindnesses", verses: 7, juz: 30, type: "Meccan", revelationOrder: 17 },
  { number: 108, name: "Al-Kawthar", arabicName: "الكوثر", englishName: "The Abundance", verses: 3, juz: 30, type: "Meccan", revelationOrder: 15 },
  { number: 109, name: "Al-Kafirun", arabicName: "الكافرون", englishName: "The Disbelievers", verses: 6, juz: 30, type: "Meccan", revelationOrder: 18 },
  { number: 110, name: "An-Nasr", arabicName: "النصر", englishName: "The Divine Support", verses: 3, juz: 30, type: "Medinan", revelationOrder: 114 },
  { number: 111, name: "Al-Masad", arabicName: "المسد", englishName: "The Palm Fiber", verses: 5, juz: 30, type: "Meccan", revelationOrder: 6 },
  { number: 112, name: "Al-Ikhlas", arabicName: "الإخلاص", englishName: "The Sincerity", verses: 4, juz: 30, type: "Meccan", revelationOrder: 22 },
  { number: 113, name: "Al-Falaq", arabicName: "الفلق", englishName: "The Daybreak", verses: 5, juz: 30, type: "Meccan", revelationOrder: 20 },
  { number: 114, name: "An-Nas", arabicName: "الناس", englishName: "The Mankind", verses: 6, juz: 30, type: "Meccan", revelationOrder: 21 }
];

// Function to generate surah key from surah name
function generateSurahKey(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/al-|an-|at-|az-/g, '')
    .replace(/^the/, '');
}

// Function to create placeholder verse
function createPlaceholderVerse(verseNumber, surahNumber) {
  return {
    number: verseNumber,
    arabic: `[Arabic text for verse ${verseNumber} of surah ${surahNumber}]`,
    translation: `[English translation for verse ${verseNumber} of surah ${surahNumber}]`,
    transliteration: `[Transliteration for verse ${verseNumber} of surah ${surahNumber}]`,
    juz: surahMetadata[surahNumber - 1]?.juz || 1,
    page: Math.ceil((surahNumber * 10 + verseNumber) / 10),
    ruku: Math.ceil(verseNumber / 10),
    sajda: false
  };
}

// Function to generate surah JSON file
function generateSurahFile(surah) {
  const surahKey = generateSurahKey(surah.name);
  const verses = [];
  
  for (let i = 1; i <= surah.verses; i++) {
    verses.push(createPlaceholderVerse(i, surah.number));
  }
  
  return {
    surahKey,
    fileName: `${surahKey}.json`,
    content: JSON.stringify(verses, null, 2)
  };
}

// Main function to generate all surah files
function generateAllSurahFiles() {
  const outputDir = path.join(__dirname, '../app/constants/quran-data');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log('Generating all 114 surah JSON files...');
  
  surahMetadata.forEach((surah, index) => {
    const { surahKey, fileName, content } = generateSurahFile(surah);
    
    // Skip if file already exists (to preserve existing content)
    const filePath = path.join(outputDir, fileName);
    if (fs.existsSync(filePath)) {
      console.log(`Skipping ${fileName} (already exists)`);
      return;
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Generated ${fileName} (${surah.verses} verses)`);
  });
  
  console.log('\n✅ All surah files generated successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Update loadSurahVerses.ts to include all surah keys');
  console.log('2. Update quran-constants.ts to include all surah metadata');
  console.log('3. Replace placeholder content with actual Quranic text');
}

// Run the script
generateAllSurahFiles(); 