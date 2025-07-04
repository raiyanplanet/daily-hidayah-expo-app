export interface Dua {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  banglaTranslation: string;
  banglaPronunciation: string;
  category: string;
  reference: string;
  favorite: boolean;
}

// Morning & Evening Duas
export const MORNING_EVENING_DUAS: Dua[] = [
  {
    id: "1",
    title: "Dua for Morning",
    arabic:
      "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
    transliteration:
      "Asbahna wa asbahal mulku lillah, walhamdu lillah, la ilaha illallah wahdahu la shareeka lah",
    translation:
      "We have reached the morning and at this very time all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone, without any partner",
    banglaTranslation:
      "আমরা সকালে পৌঁছেছি এবং এই মুহূর্তে সকল সার্বভৌমত্ব আল্লাহর। সকল প্রশংসা আল্লাহর জন্য। আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি একক, তাঁর কোন শরীক নেই",
    banglaPronunciation:
      "আসবাহনা ওয়া আসবাহাল মুলকু লিল্লাহ, ওয়ালহামদু লিল্লাহ, লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকালাহু",
    category: "Morning & Evening",
    reference: "Muslim 4/2088",
    favorite: false,
  },
  {
    id: "2",
    title: "Dua for Evening",
    arabic:
      "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
    transliteration:
      "Amsayna wa amsal mulku lillah, walhamdu lillah, la ilaha illallah wahdahu la shareeka lah",
    translation:
      "We have reached the evening and at this very time all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone, without any partner",
    banglaTranslation:
      "আমরা সন্ধ্যায় পৌঁছেছি এবং এই মুহূর্তে সকল সার্বভৌমত্ব আল্লাহর। সকল প্রশংসা আল্লাহর জন্য। আল্লাহ ছাড়া কোন ইলাহ নেই, তিনি একক, তাঁর কোন শরীক নেই",
    banglaPronunciation:
      "আমসায়না ওয়া আমসাল মুলকু লিল্লাহ, ওয়ালহামদু লিল্লাহ, লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকালাহু",
    category: "Morning & Evening",
    reference: "Muslim 4/2088",
    favorite: false,
  },
];

// Food & Drink Duas
export const FOOD_DRINK_DUAS: Dua[] = [
  {
    id: "3",
    title: "Dua Before Eating",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah",
    translation: "In the name of Allah",
    banglaTranslation: "আল্লাহর নামে",
    banglaPronunciation: "বিসমিল্লাহ",
    category: "Food & Drink",
    reference: "Bukhari 7/88",
    favorite: false,
  },
  {
    id: "4",
    title: "Dua After Eating",
    arabic:
      "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلاَ قُوَّةٍ",
    transliteration:
      "Alhamdu lillahil lathee at'amani haatha wa razaqaneehi min ghayri hawlin minnee wa la quwwatin",
    translation:
      "Praise be to Allah Who has fed me this food and provided it for me, without any strength or power on my part",
    banglaTranslation:
      "সকল প্রশংসা আল্লাহর জন্য যিনি আমাকে এটা খাওয়ালেন এবং আমার জন্য এর ব্যবস্থা করলেন, আমার কোন ক্ষমতা বা শক্তি ছাড়াই",
    banglaPronunciation:
      "আলহামদু লিল্লাহিল্লাজি আতআমানি হাজা ওয়া রাজাকানিহি মিন গাইরি হাওলিন মিন্নি ওয়া লা কুওয়াতিন",
    category: "Food & Drink",
    reference: "Abu Dawud 3/3859",
    favorite: false,
  },
];

// Travel Duas
export const TRAVEL_DUAS: Dua[] = [
  {
    id: "5",
    title: "Dua for Travel",
    arabic:
      "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ",
    transliteration:
      "Allahumma inna nas'aluka fee safarina haatha al-birra wat-taqwa, wa minal 'amali ma tardha, Allahumma hawwin 'alayna safarana haatha watwi 'anna bu'dahu",
    translation:
      "O Allah, we ask You on this journey of ours for righteousness, piety, and such deeds as are pleasing to You. O Allah, make this journey easy for us and fold up for us its distance",
    banglaTranslation:
      "হে আল্লাহ, আমরা আপনার কাছে আমাদের এই সফরে সততা, তাকওয়া এবং এমন কাজ চাই যা আপনার পছন্দ। হে আল্লাহ, আমাদের এই সফর সহজ করুন এবং এর দূরত্ব সংকুচিত করুন",
    banglaPronunciation:
      "আল্লাহুম্মা ইন্না নাসআলুকা ফি সাফারিনা হাজাল বিররা ওয়াততাকওয়া, ওয়া মিনাল আমালি মা তারদা, আল্লাহুম্মা হাওয়িন আলাইনা সাফারানা হাজা ওয়াতুই আন্না বুদাহু",
    category: "Travel",
    reference: "Muslim 2/1342",
    favorite: false,
  },
];

// Home Duas
export const HOME_DUAS: Dua[] = [
  {
    id: "6",
    title: "Dua for Entering Home",
    arabic:
      "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    transliteration:
      "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Allahi rabbina tawakkalna",
    translation:
      "In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we place our trust",
    banglaTranslation:
      "আল্লাহর নামে আমরা প্রবেশ করছি, আল্লাহর নামে আমরা বের হচ্ছি, এবং আমাদের রবের উপর আমরা ভরসা রাখছি",
    banglaPronunciation:
      "বিসমিল্লাহি ওয়ালাজনা, ওয়া বিসমিল্লাহি খারাজনা, ওয়া আলা আল্লাহি রাব্বিনা তাওয়াককালনা",
    category: "Home",
    reference: "Abu Dawud 4/5096",
    favorite: false,
  },
  {
    id: "7",
    title: "Dua for Leaving Home",
    arabic:
      "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ",
    transliteration:
      "Bismillahi, tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah",
    translation:
      "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah",
    banglaTranslation:
      "আল্লাহর নামে, আমি আল্লাহর উপর ভরসা রাখছি, এবং আল্লাহ ছাড়া কোন ক্ষমতা বা শক্তি নেই",
    banglaPronunciation:
      "বিসমিল্লাহি, তাওয়াককালতু আলাল্লাহ, ওয়া লা হাওলা ওয়া লা কুওয়াতা ইল্লা বিল্লাহ",
    category: "Home",
    reference: "Abu Dawud 4/5095",
    favorite: false,
  },
];

// Knowledge Duas
export const KNOWLEDGE_DUAS: Dua[] = [
  {
    id: "8",
    title: "Dua for Seeking Knowledge",
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma",
    translation: "My Lord, increase me in knowledge",
    banglaTranslation: "হে আমার রব, আমাকে জ্ঞানে বাড়িয়ে দিন",
    banglaPronunciation: "রাব্বি জিদনি ইলমা",
    category: "Knowledge",
    reference: "Quran 20:114",
    favorite: false,
  },
];

// Marriage Duas
export const MARRIAGE_DUAS: Dua[] = [
  {
    id: "9",
    title: "Dua for Marriage Proposal",
    arabic: "اللَّهُمَّ خِرْ لِي وَاخْتَرْ لِي",
    transliteration: "Allahumma khir li wakhtar li",
    translation:
      "O Allah, choose what is best for me and select what is good for me",
    banglaTranslation:
      "হে আল্লাহ, আমার জন্য যা উত্তম তা নির্বাচন করুন এবং আমার জন্য যা ভাল তা বেছে নিন",
    banglaPronunciation: "আল্লাহুম্মা খির লি ওয়াখতার লি",
    category: "Marriage",
    reference: "Tirmidhi 3516",
    favorite: false,
  },
  {
    id: "10",
    title: "Dua for Newlyweds",
    arabic:
      "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    transliteration:
      "Barakallahu laka wa baraka 'alayka wa jama'a baynakuma fi khayr",
    translation:
      "May Allah bless you and shower His blessings upon you, and may He join you together in goodness",
    banglaTranslation:
      "আল্লাহ আপনাকে বরকত দিন এবং আপনার উপর বরকত বর্ষণ করুন, এবং তিনি আপনাদের উভয়কে কল্যাণে একত্র করুন",
    banglaPronunciation:
      "বারাকাল্লাহু লাকা ওয়া বারাকা আলাইকা ওয়া জামাআ বাইনাকুমা ফি খায়র",
    category: "Marriage",
    reference: "Abu Dawud 2130",
    favorite: false,
  },
  {
    id: "11",
    title: "Dua for Wedding Night",
    arabic:
      "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ، وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا جَبَلْتَهَا عَلَيْهِ",
    transliteration:
      "Allahumma inni as'aluka khayraha wa khayra ma jabaltaha 'alayh, wa a'udhu bika min sharriha wa sharri ma jabaltaha 'alayh",
    translation:
      "O Allah, I ask You for the best in her and the best of that which You have made her inclined towards, and I seek refuge with You from the evil in her and the evil of that which You have made her inclined towards",
    banglaTranslation:
      "হে আল্লাহ, আমি আপনার কাছে তার মধ্যে যা উত্তম এবং আপনি তাকে যে দিকে প্রবণ করেছেন তার মধ্যে যা উত্তম তা চাই, এবং আমি আপনার কাছে তার মধ্যে যা মন্দ এবং আপনি তাকে যে দিকে প্রবণ করেছেন তার মধ্যে যা মন্দ তা থেকে আশ্রয় চাই",
    banglaPronunciation:
      "আল্লাহুম্মা ইন্নি আসআলুকা খায়রাহা ওয়া খায়রা মা জাবালতাহা আলাইহ, ওয়া আউজু বিকা মিন শাররিহা ওয়া শাররি মা জাবালতাহা আলাইহ",
    category: "Marriage",
    reference: "Abu Dawud 2160",
    favorite: false,
  },
  {
    id: "12",
    title: "Dua for Family Harmony",
    arabic:
      "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    transliteration:
      "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama",
    translation:
      "Our Lord, grant us from among our spouses and offspring comfort to our eyes and make us an example for the righteous",
    banglaTranslation:
      "হে আমাদের রব, আমাদের জন্য এমন স্ত্রী ও সন্তান-সন্ততি দান করুন, যারা আমাদের চোখ শীতলকারী হবে। আমাদের আল্লাহভীরুদের জন্য আদর্শ করুন",
    banglaPronunciation:
      "রাব্বানা হাব লানা মিন আজওয়াজিনা ওয়া যুররিয়্যাতিনা কুররাতা আইয়ুনিন ওয়াজআলনা লিলমুত্তাকিনা ইমামা",
    category: "Marriage",
    reference: "(সুরা: ফুরকান, আয়াত: ৭৪)",
    favorite: false,
  },
];

// Combined all duas for backward compatibility
export const DUAS_DATA: Dua[] = [
  ...MORNING_EVENING_DUAS,
  ...FOOD_DRINK_DUAS,
  ...TRAVEL_DUAS,
  ...HOME_DUAS,
  ...KNOWLEDGE_DUAS,
  ...MARRIAGE_DUAS,
];

export const DUAS_CATEGORIES = [
  "All",
  "Morning & Evening",
  "Food & Drink",
  "Travel",
  "Home",
  "Knowledge",
  "Marriage",
];

// Category mapping for easy access
export const DUAS_BY_CATEGORY = {
  "Morning & Evening": MORNING_EVENING_DUAS,
  "Food & Drink": FOOD_DRINK_DUAS,
  "Travel": TRAVEL_DUAS,
  "Home": HOME_DUAS,
  "Knowledge": KNOWLEDGE_DUAS,
  "Marriage": MARRIAGE_DUAS,
}; 