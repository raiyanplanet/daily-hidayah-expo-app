const fs = require('fs');
const path = require('path');

// Simplified surah metadata (just the essential info)
const surahs = [
  { number: 1, name: "Al-Fatihah", verses: 7, juz: 1 },
  { number: 2, name: "Al-Baqarah", verses: 286, juz: 1 },
  { number: 3, name: "Al-Imran", verses: 200, juz: 3 },
  { number: 4, name: "An-Nisa", verses: 176, juz: 4 },
  { number: 5, name: "Al-Ma'idah", verses: 120, juz: 6 },
  { number: 6, name: "Al-An'am", verses: 165, juz: 7 },
  { number: 7, name: "Al-A'raf", verses: 206, juz: 8 },
  { number: 8, name: "Al-Anfal", verses: 75, juz: 9 },
  { number: 9, name: "At-Tawbah", verses: 129, juz: 10 },
  { number: 10, name: "Yunus", verses: 109, juz: 11 },
  { number: 11, name: "Hud", verses: 123, juz: 11 },
  { number: 12, name: "Yusuf", verses: 111, juz: 12 },
  { number: 13, name: "Ar-Ra'd", verses: 43, juz: 13 },
  { number: 14, name: "Ibrahim", verses: 52, juz: 13 },
  { number: 15, name: "Al-Hijr", verses: 99, juz: 14 },
  { number: 16, name: "An-Nahl", verses: 128, juz: 14 },
  { number: 17, name: "Al-Isra", verses: 111, juz: 15 },
  { number: 18, name: "Al-Kahf", verses: 110, juz: 15 },
  { number: 19, name: "Maryam", verses: 98, juz: 16 },
  { number: 20, name: "Ta-Ha", verses: 135, juz: 16 },
  { number: 21, name: "Al-Anbya", verses: 112, juz: 17 },
  { number: 22, name: "Al-Hajj", verses: 78, juz: 17 },
  { number: 23, name: "Al-Mu'minun", verses: 118, juz: 18 },
  { number: 24, name: "An-Nur", verses: 64, juz: 18 },
  { number: 25, name: "Al-Furqan", verses: 77, juz: 19 },
  { number: 26, name: "Ash-Shu'ara", verses: 227, juz: 19 },
  { number: 27, name: "An-Naml", verses: 93, juz: 19 },
  { number: 28, name: "Al-Qasas", verses: 88, juz: 20 },
  { number: 29, name: "Al-Ankabut", verses: 69, juz: 20 },
  { number: 30, name: "Ar-Rum", verses: 60, juz: 21 },
  { number: 31, name: "Luqman", verses: 34, juz: 21 },
  { number: 32, name: "As-Sajdah", verses: 30, juz: 21 },
  { number: 33, name: "Al-Ahzab", verses: 73, juz: 21 },
  { number: 34, name: "Saba", verses: 54, juz: 22 },
  { number: 35, name: "Fatir", verses: 45, juz: 22 },
  { number: 36, name: "Ya-Sin", verses: 83, juz: 22 },
  { number: 37, name: "As-Saffat", verses: 182, juz: 23 },
  { number: 38, name: "Sad", verses: 88, juz: 23 },
  { number: 39, name: "Az-Zumar", verses: 75, juz: 23 },
  { number: 40, name: "Ghafir", verses: 85, juz: 24 },
  { number: 41, name: "Fussilat", verses: 54, juz: 24 },
  { number: 42, name: "Ash-Shuraa", verses: 53, juz: 25 },
  { number: 43, name: "Az-Zukhruf", verses: 89, juz: 25 },
  { number: 44, name: "Ad-Dukhan", verses: 59, juz: 25 },
  { number: 45, name: "Al-Jathiyah", verses: 37, juz: 25 },
  { number: 46, name: "Al-Ahqaf", verses: 35, juz: 26 },
  { number: 47, name: "Muhammad", verses: 38, juz: 26 },
  { number: 48, name: "Al-Fath", verses: 29, juz: 26 },
  { number: 49, name: "Al-Hujurat", verses: 18, juz: 26 },
  { number: 50, name: "Qaf", verses: 45, juz: 26 },
  { number: 51, name: "Adh-Dhariyat", verses: 60, juz: 26 },
  { number: 52, name: "At-Tur", verses: 49, juz: 27 },
  { number: 53, name: "An-Najm", verses: 62, juz: 27 },
  { number: 54, name: "Al-Qamar", verses: 55, juz: 27 },
  { number: 55, name: "Ar-Rahman", verses: 78, juz: 27 },
  { number: 56, name: "Al-Waqi'ah", verses: 96, juz: 27 },
  { number: 57, name: "Al-Hadid", verses: 29, juz: 27 },
  { number: 58, name: "Al-Mujadila", verses: 22, juz: 28 },
  { number: 59, name: "Al-Hashr", verses: 24, juz: 28 },
  { number: 60, name: "Al-Mumtahanah", verses: 13, juz: 28 },
  { number: 61, name: "As-Saf", verses: 14, juz: 28 },
  { number: 62, name: "Al-Jumu'ah", verses: 11, juz: 28 },
  { number: 63, name: "Al-Munafiqun", verses: 11, juz: 28 },
  { number: 64, name: "At-Taghabun", verses: 18, juz: 28 },
  { number: 65, name: "At-Talaq", verses: 12, juz: 28 },
  { number: 66, name: "At-Tahrim", verses: 12, juz: 28 },
  { number: 67, name: "Al-Mulk", verses: 30, juz: 29 },
  { number: 68, name: "Al-Qalam", verses: 52, juz: 29 },
  { number: 69, name: "Al-Haqqah", verses: 52, juz: 29 },
  { number: 70, name: "Al-Ma'arij", verses: 44, juz: 29 },
  { number: 71, name: "Nuh", verses: 28, juz: 29 },
  { number: 72, name: "Al-Jinn", verses: 28, juz: 29 },
  { number: 73, name: "Al-Muzzammil", verses: 20, juz: 29 },
  { number: 74, name: "Al-Muddathir", verses: 56, juz: 29 },
  { number: 75, name: "Al-Qiyamah", verses: 40, juz: 29 },
  { number: 76, name: "Al-Insan", verses: 31, juz: 29 },
  { number: 77, name: "Al-Mursalat", verses: 50, juz: 29 },
  { number: 78, name: "An-Naba", verses: 40, juz: 30 },
  { number: 79, name: "An-Nazi'at", verses: 46, juz: 30 },
  { number: 80, name: "Abasa", verses: 42, juz: 30 },
  { number: 81, name: "At-Takwir", verses: 29, juz: 30 },
  { number: 82, name: "Al-Infitar", verses: 19, juz: 30 },
  { number: 83, name: "Al-Mutaffifin", verses: 36, juz: 30 },
  { number: 84, name: "Al-Inshiqaq", verses: 25, juz: 30 },
  { number: 85, name: "Al-Buruj", verses: 22, juz: 30 },
  { number: 86, name: "At-Tariq", verses: 17, juz: 30 },
  { number: 87, name: "Al-A'la", verses: 19, juz: 30 },
  { number: 88, name: "Al-Ghashiyah", verses: 26, juz: 30 },
  { number: 89, name: "Al-Fajr", verses: 30, juz: 30 },
  { number: 90, name: "Al-Balad", verses: 20, juz: 30 },
  { number: 91, name: "Ash-Shams", verses: 15, juz: 30 },
  { number: 92, name: "Al-Layl", verses: 21, juz: 30 },
  { number: 93, name: "Ad-Duha", verses: 11, juz: 30 },
  { number: 94, name: "Ash-Sharh", verses: 8, juz: 30 },
  { number: 95, name: "At-Tin", verses: 8, juz: 30 },
  { number: 96, name: "Al-Alaq", verses: 19, juz: 30 },
  { number: 97, name: "Al-Qadr", verses: 5, juz: 30 },
  { number: 98, name: "Al-Bayyinah", verses: 8, juz: 30 },
  { number: 99, name: "Az-Zalzalah", verses: 8, juz: 30 },
  { number: 100, name: "Al-Adiyat", verses: 11, juz: 30 },
  { number: 101, name: "Al-Qari'ah", verses: 11, juz: 30 },
  { number: 102, name: "At-Takathur", verses: 8, juz: 30 },
  { number: 103, name: "Al-Asr", verses: 3, juz: 30 },
  { number: 104, name: "Al-Humazah", verses: 9, juz: 30 },
  { number: 105, name: "Al-Fil", verses: 5, juz: 30 },
  { number: 106, name: "Quraish", verses: 4, juz: 30 },
  { number: 107, name: "Al-Ma'un", verses: 7, juz: 30 },
  { number: 108, name: "Al-Kawthar", verses: 3, juz: 30 },
  { number: 109, name: "Al-Kafirun", verses: 6, juz: 30 },
  { number: 110, name: "An-Nasr", verses: 3, juz: 30 },
  { number: 111, name: "Al-Masad", verses: 5, juz: 30 },
  { number: 112, name: "Al-Ikhlas", verses: 4, juz: 30 },
  { number: 113, name: "Al-Falaq", verses: 5, juz: 30 },
  { number: 114, name: "An-Nas", verses: 6, juz: 30 }
];

function generateSurahKey(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/al-|an-|at-|az-/g, '')
    .replace(/^the/, '');
}

function createPlaceholderVerse(verseNumber, surahNumber) {
  return {
    number: verseNumber,
    arabic: `[Arabic text for verse ${verseNumber} of surah ${surahNumber}]`,
    translation: `[English translation for verse ${verseNumber} of surah ${surahNumber}]`,
    transliteration: `[Transliteration for verse ${verseNumber} of surah ${surahNumber}]`,
    juz: surahs[surahNumber - 1]?.juz || 1,
    page: Math.ceil((surahNumber * 10 + verseNumber) / 10),
    ruku: Math.ceil(verseNumber / 10),
    sajda: false
  };
}

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

function generateAllSurahFiles() {
  const outputDir = path.join(__dirname, 'app/constants/quran-data');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log('Generating all 114 surah JSON files...');
  
  surahs.forEach((surah) => {
    const { surahKey, fileName, content } = generateSurahFile(surah);
    
    const filePath = path.join(outputDir, fileName);
    if (fs.existsSync(filePath)) {
      console.log(`Skipping ${fileName} (already exists)`);
      return;
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Generated ${fileName} (${surah.verses} verses)`);
  });
  
  console.log('\n✅ All surah files generated successfully!');
}

generateAllSurahFiles(); 