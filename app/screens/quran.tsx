import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { QURAN_SURAHS, getSurahByNumber } from "../constants/quran-constants";
import { ThemeContext } from "../theme/ThemeContext";

const { width } = Dimensions.get("window");

// Real Quran data structure
interface Surah {
  number: number;
  name: string;
  arabicName: string;
  englishName: string;
  verses: number;
  juz: number;
  type: "Meccan" | "Medinan";
  revelationOrder: number;
  description: string;
}

interface ReadingProgress {
  surahNumber: number;
  verseNumber: number;
  page: number;
  timestamp: string;
  readingTime: number;
}

interface QuranStats {
  surahsRead: number;
  versesRead: number;
  pagesRead: number;
  totalReadingTime: number;
  currentStreak: number;
  lastReadDate: string;
  bookmarks: number[];
}

const QURAN_STORAGE_KEY = "quran_progress_v1";
const QURAN_BOOKMARKS_KEY = "quran_bookmarks_v1";
const QURAN_STATS_KEY = "quran_stats_v1";

const Quran = () => {
  const { theme, colors } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState("");
  const [selectedJuz, setSelectedJuz] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [showReadingModal, setShowReadingModal] = useState(false);
  const [selectedSurah, setSelectedSurah] = useState<any>(null);
  const [currentVerse, setCurrentVerse] = useState(1);
  const [readingProgress, setReadingProgress] = useState<ReadingProgress | null>(null);
  const [quranStats, setQuranStats] = useState<QuranStats>({
    surahsRead: 0,
    versesRead: 0,
    pagesRead: 0,
    totalReadingTime: 0,
    currentStreak: 0,
    lastReadDate: "",
    bookmarks: []
  });
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

  useEffect(() => {
    loadQuranData();
  }, []);

  const loadQuranData = async () => {
    try {
      const savedProgress = await SecureStore.getItemAsync(QURAN_STORAGE_KEY);
      const savedBookmarks = await SecureStore.getItemAsync(QURAN_BOOKMARKS_KEY);
      const savedStats = await SecureStore.getItemAsync(QURAN_STATS_KEY);

      if (savedProgress) {
        setReadingProgress(JSON.parse(savedProgress));
      }
      if (savedBookmarks) {
        const bookmarksData = JSON.parse(savedBookmarks);
        setBookmarks(bookmarksData);
        setQuranStats(prev => ({ ...prev, bookmarks: bookmarksData }));
      }
      if (savedStats) {
        setQuranStats(JSON.parse(savedStats));
      }
    } catch (error) {
      console.log("Error loading Quran data:", error);
    }
  };

  const saveQuranData = async () => {
    try {
      if (readingProgress) {
        await SecureStore.setItemAsync(QURAN_STORAGE_KEY, JSON.stringify(readingProgress));
      }
      await SecureStore.setItemAsync(QURAN_BOOKMARKS_KEY, JSON.stringify(bookmarks));
      await SecureStore.setItemAsync(QURAN_STATS_KEY, JSON.stringify(quranStats));
    } catch (error) {
      console.log("Error saving Quran data:", error);
    }
  };

  const filteredSurahs = QURAN_SURAHS.filter((surah) => {
    const matchesSearch =
      surah.name.toLowerCase().includes(searchText.toLowerCase()) ||
      surah.arabicName.includes(searchText) ||
      surah.englishName.toLowerCase().includes(searchText.toLowerCase());
    const matchesJuz =
      selectedJuz === "All" || surah.juz.toString() === selectedJuz;
    const matchesType =
      selectedType === "All" || surah.type === selectedType;
    return matchesSearch && matchesJuz && matchesType;
  });

  const juzOptions = ["All", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];
  const typeOptions = ["All", "Meccan", "Medinan"];

  const handleSurahPress = (surah: any) => {
    setSelectedSurah(surah);
    setCurrentVerse(1);
    setShowReadingModal(true);
  };

  const handleBookmark = (surahNumber: number) => {
    const newBookmarks = bookmarks.includes(surahNumber)
      ? bookmarks.filter(b => b !== surahNumber)
      : [...bookmarks, surahNumber];
    
    setBookmarks(newBookmarks);
    setQuranStats(prev => ({ ...prev, bookmarks: newBookmarks }));
    saveQuranData();
  };

  const handleVerseChange = (direction: 'next' | 'prev') => {
    if (!selectedSurah) return;

    if (direction === 'next' && currentVerse < selectedSurah.versesData.length) {
      setCurrentVerse(currentVerse + 1);
    } else if (direction === 'prev' && currentVerse > 1) {
      setCurrentVerse(currentVerse - 1);
    }
  };

  const handleReadingComplete = () => {
    if (!selectedSurah) return;

    const newProgress: ReadingProgress = {
      surahNumber: selectedSurah.number,
      verseNumber: currentVerse,
      page: Math.ceil(currentVerse / 10),
      timestamp: new Date().toISOString(),
      readingTime: 300
    };

    setReadingProgress(newProgress);
    
    const today = new Date().toDateString();
    const lastReadDate = quranStats.lastReadDate;
    const currentStreak = lastReadDate === today ? quranStats.currentStreak : 
                         lastReadDate === new Date(Date.now() - 86400000).toDateString() ? quranStats.currentStreak + 1 : 1;

    setQuranStats(prev => ({
      ...prev,
      surahsRead: prev.surahsRead + 1,
      versesRead: prev.versesRead + currentVerse,
      pagesRead: prev.pagesRead + newProgress.page,
      totalReadingTime: prev.totalReadingTime + newProgress.readingTime,
      currentStreak,
      lastReadDate: today
    }));

    saveQuranData();
    setShowReadingModal(false);
    
    Alert.alert(
      "Reading Complete! 📖",
      `You've completed ${selectedSurah.name} up to verse ${currentVerse}. Keep up the great work! 🌟`,
      [{ text: "Continue", style: "default" }]
    );
  };

  const formatReadingTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getProgressPercentage = () => {
    const totalVerses = QURAN_SURAHS.reduce((sum, surah) => sum + surah.versesData.length, 0);
    return Math.round((quranStats.versesRead / totalVerses) * 100);
  };

  const getCurrentVerseData = () => {
    if (!selectedSurah) return null;
    return selectedSurah.versesData.find((verse: any) => verse.number === currentVerse);
  };

  const renderSurahItem = (surah: any) => {
    const isBookmarked = bookmarks.includes(surah.number);
    
    return (
      <TouchableOpacity
        key={surah.number}
        onPress={() => handleSurahPress(surah)}
        style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          padding: 16, 
          borderBottomWidth: 1, 
          borderBottomColor: colors.border,
          backgroundColor: colors.card,
          marginHorizontal: 16,
          marginBottom: 8,
          borderRadius: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
        <View style={{ 
          width: 48, 
          height: 48, 
          backgroundColor: colors.accent + '22', 
          borderRadius: 999, 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginRight: 16 
        }}>
          <Text style={{ color: colors.accent, fontWeight: 'bold', fontSize: 16 }}>
            {surah.number}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
            <Text style={{ color: colors.text, fontWeight: '600', fontSize: 16 }}>
              {surah.name}
            </Text>
            <Text style={{ color: colors.text, fontSize: 18, fontWeight: '300' }}>
              {surah.arabicName}
            </Text>
          </View>
          
          <Text style={{ color: colors.textSecondary, fontSize: 14, marginBottom: 4 }}>
            {surah.englishName}
          </Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
              {surah.type} • {surah.versesData.length} verses
            </Text>
            <View style={{ 
              backgroundColor: colors.accent + '11', 
              paddingHorizontal: 8, 
              paddingVertical: 4, 
              borderRadius: 8 
            }}>
              <Text style={{ color: colors.accent, fontSize: 12, fontWeight: '500' }}>
                Juz {surah.juz}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 12 }}>
          <TouchableOpacity
            onPress={() => handleBookmark(surah.number)}
            style={{ marginRight: 8 }}
          >
            <Ionicons 
              name={isBookmarked ? "bookmark" : "bookmark-outline"} 
              size={20} 
              color={isBookmarked ? colors.accent : colors.textSecondary} 
            />
          </TouchableOpacity>
          <Text style={{ color: colors.textSecondary, fontSize: 18 }}>›</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />
      
      <LinearGradient
        colors={[colors.accent, colors.accent + 'DD']}
        style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Holy Quran</Text>
          <TouchableOpacity
            onPress={() => setShowBookmarks(!showBookmarks)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 20,
              padding: 8,
            }}
          >
            <Ionicons name="bookmark" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={{ 
          backgroundColor: 'rgba(255,255,255,0.9)', 
          borderRadius: 16, 
          padding: 12, 
          marginBottom: 16, 
          flexDirection: 'row', 
          alignItems: 'center' 
        }}>
          <Ionicons name="search" size={20} color={colors.textSecondary} style={{ marginRight: 12 }} />
          <TextInput
            placeholder="Search Surah..."
            placeholderTextColor={colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
            style={{ flex: 1, color: colors.text }}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {juzOptions.slice(0, 8).map((juz) => (
              <TouchableOpacity
                key={juz}
                onPress={() => setSelectedJuz(juz)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 999,
                  backgroundColor: selectedJuz === juz ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)',
                  marginRight: 8,
                }}>
                <Text style={{ 
                  color: selectedJuz === juz ? colors.accent : 'white', 
                  fontSize: 14, 
                  fontWeight: '500' 
                }}>
                  {juz === 'All' ? 'All Juz' : `Juz ${juz}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {typeOptions.map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => setSelectedType(type)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 999,
                  backgroundColor: selectedType === type ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)',
                  marginRight: 8,
                }}>
                <Text style={{ 
                  color: selectedType === type ? colors.accent : 'white', 
                  fontSize: 14, 
                  fontWeight: '500' 
                }}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {readingProgress && (
          <View style={{ 
            backgroundColor: colors.accent + '11', 
            borderRadius: 16, 
            padding: 16, 
            marginHorizontal: 16, 
            marginVertical: 16 
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ color: colors.textSecondary, fontSize: 14, marginBottom: 4 }}>Last Read</Text>
                <Text style={{ color: colors.accent, fontSize: 18, fontWeight: 'bold' }}>
                  {getSurahByNumber(readingProgress.surahNumber)?.name || 'Unknown'}
                </Text>
                <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
                  Verse {readingProgress.verseNumber}
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: colors.accent, fontSize: 28, marginBottom: 8 }}>📖</Text>
                <TouchableOpacity 
                  onPress={() => {
                    const surah = getSurahByNumber(readingProgress.surahNumber);
                    if (surah) {
                      setSelectedSurah(surah);
                      setCurrentVerse(readingProgress.verseNumber);
                      setShowReadingModal(true);
                    }
                  }}
                  style={{ 
                    backgroundColor: colors.accent, 
                    paddingHorizontal: 16, 
                    paddingVertical: 8, 
                    borderRadius: 999 
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        <View style={{ 
          backgroundColor: colors.card, 
          borderRadius: 16, 
          padding: 16, 
          marginHorizontal: 16, 
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Reading Progress</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 24, marginBottom: 8 }}>📊</Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.accent }}>{quranStats.surahsRead}</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 14 }}>Surahs Read</Text>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 24, marginBottom: 8 }}>⏱️</Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#3B82F6' }}>
                {formatReadingTime(quranStats.totalReadingTime)}
              </Text>
              <Text style={{ color: colors.textSecondary, fontSize: 14 }}>Reading Time</Text>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 24, marginBottom: 8 }}>🔥</Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#F97316' }}>{quranStats.currentStreak}</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 14 }}>Day Streak</Text>
            </View>
          </View>
          <View style={{ backgroundColor: colors.border, borderRadius: 999, height: 8, marginBottom: 8 }}>
            <View style={{ 
              backgroundColor: colors.accent, 
              borderRadius: 999, 
              height: 8, 
              width: `${getProgressPercentage()}%` 
            }} />
          </View>
          <Text style={{ color: colors.textSecondary, fontSize: 14, textAlign: 'center' }}>
            {getProgressPercentage()}% of Quran completed
          </Text>
        </View>

        <View style={{ paddingBottom: 20 }}>
          {showBookmarks ? (
            bookmarks.length > 0 ? (
              bookmarks.map(surahNumber => {
                const surah = getSurahByNumber(surahNumber);
                return surah ? renderSurahItem(surah) : null;
              })
            ) : (
              <View style={{ 
                alignItems: 'center', 
                padding: 40,
                backgroundColor: colors.card,
                marginHorizontal: 16,
                borderRadius: 16,
              }}>
                <Text style={{ fontSize: 48, marginBottom: 16 }}>🔖</Text>
                <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
                  No Bookmarks Yet
                </Text>
                <Text style={{ color: colors.textSecondary, fontSize: 14, textAlign: 'center' }}>
                  Bookmark your favorite surahs to access them quickly
                </Text>
              </View>
            )
          ) : (
            filteredSurahs.map(renderSurahItem)
          )}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <Modal
        visible={showReadingModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <StatusBar barStyle={theme === "dark" ? "light-content" : "dark-content"} />
          
          <LinearGradient
            colors={[colors.accent, colors.accent + 'DD']}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={() => setShowReadingModal(false)}
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 20,
                padding: 8,
              }}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                {selectedSurah?.name}
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
                Verse {currentVerse} of {selectedSurah?.versesData.length}
              </Text>
            </View>
            
            <TouchableOpacity
              onPress={() => handleBookmark(selectedSurah?.number || 0)}
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 20,
                padding: 8,
              }}
            >
              <Ionicons 
                name={bookmarks.includes(selectedSurah?.number || 0) ? "bookmark" : "bookmark-outline"} 
                size={24} 
                color="white" 
              />
            </TouchableOpacity>
          </LinearGradient>

          <ScrollView style={{ flex: 1, padding: 20 }}>
            <View style={{ 
              backgroundColor: colors.card, 
              borderRadius: 20, 
              padding: 24, 
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 5,
            }}>
              {/* Bismillah */}
              <Text style={{ 
                color: colors.text, 
                fontSize: 24, 
                lineHeight: 40, 
                textAlign: 'right',
                marginBottom: 20,
                fontFamily: 'System',
              }}>
                {selectedSurah?.bismillah}
              </Text>
              
              {/* Current Verse */}
              {(() => {
                const verseData = getCurrentVerseData();
                if (!verseData) return null;
                
                return (
                  <>
                    <Text style={{ 
                      color: colors.text, 
                      fontSize: 24, 
                      lineHeight: 40, 
                      textAlign: 'right',
                      marginBottom: 20,
                      fontFamily: 'System',
                    }}>
                      {verseData.arabic}
                    </Text>
                    
                    <Text style={{ 
                      color: colors.text, 
                      fontSize: 16, 
                      lineHeight: 24, 
                      marginBottom: 16,
                    }}>
                      {verseData.translation}
                    </Text>
                    
                    <Text style={{ 
                      color: colors.textSecondary, 
                      fontSize: 14, 
                      lineHeight: 20, 
                      marginBottom: 20,
                      fontStyle: 'italic',
                    }}>
                      {verseData.transliteration}
                    </Text>
                  </>
                );
              })()}
              
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingTop: 16,
                borderTopWidth: 1,
                borderTopColor: colors.border,
              }}>
                <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
                  Verse {currentVerse} • Page {Math.ceil(currentVerse / 10)}
                </Text>
                <Text style={{ color: colors.accent, fontSize: 14, fontWeight: '600' }}>
                  {selectedSurah?.type}
                </Text>
              </View>
            </View>

            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: 20,
            }}>
              <TouchableOpacity
                onPress={() => handleVerseChange('prev')}
                disabled={currentVerse <= 1}
                style={{
                  backgroundColor: currentVerse <= 1 ? colors.border : colors.accent,
                  borderRadius: 25,
                  padding: 16,
                  opacity: currentVerse <= 1 ? 0.5 : 1,
                }}
              >
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
              
              <Text style={{ color: colors.text, fontSize: 16, fontWeight: '600' }}>
                {currentVerse} / {selectedSurah?.versesData.length}
              </Text>
              
              <TouchableOpacity
                onPress={() => handleVerseChange('next')}
                disabled={currentVerse >= (selectedSurah?.versesData.length || 1)}
                style={{
                  backgroundColor: currentVerse >= (selectedSurah?.versesData.length || 1) ? colors.border : colors.accent,
                  borderRadius: 25,
                  padding: 16,
                  opacity: currentVerse >= (selectedSurah?.versesData.length || 1) ? 0.5 : 1,
                }}
              >
                <Ionicons name="chevron-forward" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View style={{ gap: 12 }}>
              <TouchableOpacity
                onPress={handleReadingComplete}
                style={{
                  backgroundColor: colors.accent,
                  borderRadius: 16,
                  padding: 16,
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                  Mark as Read 📖
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Share", "Share this verse with others");
                }}
                style={{
                  backgroundColor: colors.card,
                  borderRadius: 16,
                  padding: 16,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Text style={{ color: colors.text, fontSize: 16, fontWeight: '600' }}>
                  Share Verse 📤
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default Quran;
