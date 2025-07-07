import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { Animated, Dimensions, Modal, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { PRAYER_TUTORIALS } from "../constants/salat";
import { ThemeContext } from "../theme/ThemeContext";

const { width } = Dimensions.get("window");

const IslamicCalendar = () => {
  const { theme, colors } = useContext(ThemeContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hijriDate, setHijriDate] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [salatModalVisible, setSalatModalVisible] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState(0);

  // Convert Gregorian to Hijri date
  const getHijriDate = (date: Date) => {
    try {
      // Format as Hijri date in Arabic locale
      const hijriDateArabic = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long'
      }).format(date);
      
      return hijriDateArabic;
    } catch (error) {
      // Fallback to English format if Arabic locale is not supported
      const hijriDateEnglish = new Intl.DateTimeFormat('en-SA-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long'
      }).format(date);
      
      return hijriDateEnglish;
    }
  };

  // Get Arabic Gregorian date
  const getArabicGregorianDate = (date: Date) => {
    try {
      // Format as Gregorian date in Arabic locale with Arabic numerals
      const gregorianDateArabic = new Intl.DateTimeFormat('ar-SA-u-ca-gregory', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long'
      }).format(date);
      
      return gregorianDateArabic;
    } catch (error) {
      // Fallback to English format
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  // Get English Hijri date
  const getEnglishHijriDate = (date: Date) => {
    try {
      // Format as Hijri date in English
      const hijriDateEnglish = new Intl.DateTimeFormat('en-SA-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
      
      return hijriDateEnglish;
    } catch (error) {
      // Fallback calculation
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      const hijriYear = Math.floor((year - 622) * 1.0307);
      const hijriMonth = Math.floor((month + 2) % 12) + 1;
      const hijriDay = Math.floor(day * 1.0307) % 30;
      
      const hijriMonths = [
        "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
        "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
        "Ramadan", "Shawwal", "Dhu al-Qadah", "Dhu al-Hijjah"
      ];
      
      return `${hijriDay} ${hijriMonths[hijriMonth - 1]} ${hijriYear}`;
    }
  };

  // Get English Hijri date (full, with day, month, year)
  const getFullEnglishHijriDate = (date: Date) => {
    try {
      return new Intl.DateTimeFormat('en-SA-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long'
      }).format(date);
    } catch (error) {
      // Fallback calculation (simple)
      return getEnglishHijriDate(date);
    }
  };

  useEffect(() => {
    setHijriDate(getHijriDate(currentDate));
    
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentDate]);

  const importantDates = [
    {
      title: "Laylat al-Qadr",
      date: "27 Ramadan",
      description: "Night of Power - The holiest night in Islam",
      icon: "🌙",
      color: "#8B5CF6"
    },
    {
      title: "Eid al-Fitr",
      date: "1 Shawwal",
      description: "Festival of Breaking the Fast",
      icon: "🕌",
      color: "#10B981"
    },
    {
      title: "Eid al-Adha",
      date: "10 Dhu al-Hijjah",
      description: "Festival of Sacrifice",
      icon: "🐑",
      color: "#F59E0B"
    },
    {
      title: "Mawlid al-Nabi",
      date: "12 Rabi' al-Awwal",
      description: "Birth of Prophet Muhammad ﷺ",
      icon: "📖",
      color: "#EF4444"
    },
    {
      title: "Laylat al-Miraj",
      date: "27 Rajab",
      description: "Night of Ascension",
      icon: "⭐",
      color: "#3B82F6"
    },
    {
      title: "Laylat al-Bara'ah",
      date: "15 Sha'ban",
      description: "Night of Forgiveness",
      icon: "🙏",
      color: "#06B6D4"
    }
  ];

  // Returns both Arabic and English Hijri month names
  const getCurrentIslamicMonth = () => {
    let arabic = '';
    let english = '';
    try {
      arabic = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', { month: 'long' }).format(currentDate);
      english = new Intl.DateTimeFormat('en-SA-u-ca-islamic', { month: 'long' }).format(currentDate);
    } catch (error) {
      // Fallback to manual mapping if Intl is not supported
      const hijriMonthsArabic = [
        "محرم", "صفر", "ربيع الأول", "ربيع الآخر",
        "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان",
        "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
      ];
      const hijriMonthsEnglish = [
        "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
        "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
        "Ramadan", "Shawwal", "Dhu al-Qadah", "Dhu al-Hijjah"
      ];
      const month = Math.floor((currentDate.getMonth() + 2) % 12);
      arabic = hijriMonthsArabic[month];
      english = hijriMonthsEnglish[month];
    }
    return { arabic, english };
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.accent} />
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
        {/* Minimalistic Modern Header */}
        <Animated.View style={{ opacity: fadeAnim, paddingHorizontal: 0, paddingTop: 0, paddingBottom: 0 }}>
          <View
            style={{
              backgroundColor: colors.card,
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 24,
            }}>
            {/* Top Row: Title and Icon */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.text, fontSize: 20, fontWeight: '700', marginBottom: 4 }}>
                  Islamic Calendar
                </Text>
                <Text style={{ color: colors.textSecondary, fontSize: 14, fontWeight: '400' }}>
                  {formatDate(currentDate)}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity 
                  style={{ 
                    backgroundColor: colors.accent + '15', 
                    borderRadius: 12, 
                    padding: 10,
                    marginRight: 8,
                  }}
                  onPress={() => setSalatModalVisible(true)}
                >
                  <Ionicons name="hand-left-outline" size={20} color={colors.accent} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{ 
                    backgroundColor: colors.accent + '15', 
                    borderRadius: 12, 
                    padding: 10,
                  }}>
                  <Ionicons name="calendar-outline" size={20} color={colors.accent} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Current Date and Hijri Date */}
            <View style={{ 
              backgroundColor: theme === 'dark' ? colors.background : '#F8FAFC', 
              borderRadius: 16, 
              padding: 20, 
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.accent + '10',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.text, fontSize: 32, fontWeight: '300', letterSpacing: 1, marginBottom: 4 }}>
                    📅
                  </Text>
                  <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600', marginBottom: 4 }}>
                    Current Islamic Date
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <View style={{ 
                    backgroundColor: colors.accent + '15', 
                    borderRadius: 8, 
                    paddingHorizontal: 12, 
                    paddingVertical: 6,
                    marginBottom: 4,
                  }}>
                    <Text style={{ color: colors.accent, fontSize: 12, fontWeight: '600' }}>
                      {hijriDate}
                    </Text>
                  </View>
                  <Text style={{ color: colors.textSecondary, fontSize: 10, fontWeight: '500' }}>
                    {/* Show English Hijri date below Arabic */}
                    {getFullEnglishHijriDate(currentDate)}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                  <Text style={{ color: colors.textSecondary, fontSize: 14, marginLeft: 6, fontWeight: '500' }}>
                    Gregorian: {currentDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Text>
                </View>
              </View>
            </View>

            {/* Current Month Status */}
            <View style={{ 
              backgroundColor: colors.accent + '08', 
              borderRadius: 16, 
              padding: 18, 
              borderWidth: 1,
              borderColor: colors.accent + '25',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <View style={{ 
                  backgroundColor: colors.accent, 
                  borderRadius: 8, 
                  padding: 6, 
                  marginRight: 10 
                }}>
                  <Ionicons name="moon-outline" size={14} color={colors.card} />
                </View>
                <Text style={{ color: colors.accent, fontSize: 12, fontWeight: '700' }}>
                  CURRENT MONTH
                </Text>
              </View>
              {/* Show Arabic and English Hijri month */}
              {(() => {
                const month = getCurrentIslamicMonth();
                return (
                  <View>
                    <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700', marginBottom: 2 }}>
                      {month.arabic}
                    </Text>
                    <Text style={{ color: colors.textSecondary, fontSize: 14, fontWeight: '600', marginBottom: 6 }}>
                      {month.english}
                    </Text>
                  </View>
                );
              })()}
            </View>
          </View>
        </Animated.View>

        {/* Enhanced White Content Section */}
        <View style={{ backgroundColor: colors.card, borderTopLeftRadius: 32, borderTopRightRadius: 32, flex: 1, minHeight: '100%' }}>
          {/* Important Dates Section */}
          <View style={{ paddingHorizontal: 24, paddingTop: 32 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>Important Islamic Dates</Text>
              <TouchableOpacity style={{ backgroundColor: colors.accent + '11', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 }}>
                <Text style={{ color: colors.accent, fontSize: 14, fontWeight: '600' }}>View All</Text>
              </TouchableOpacity>
            </View>
            
            {/* Important Dates Grid */}
            {importantDates.map((item, index) => (
              <Animated.View
                key={index}
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }}
                className={`mb-4 border border-emerald-200/40 rounded-3xl py-4 ${theme === 'dark' ? 'bg-emerald-200/10' : 'bg-emerald-100'}`}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                  <View style={{ 
                    backgroundColor: item.color + '15', 
                    borderRadius: 12, 
                    padding: 12, 
                    marginRight: 16 
                  }}>
                    <Text style={{ fontSize: 24 }}>{item.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                      <View style={{ 
                        backgroundColor: item.color + '20', 
                        borderRadius: 999, 
                        paddingHorizontal: 12, 
                        paddingVertical: 4, 
                        marginRight: 8 
                      }}>
                        <Text style={{ color: item.color, fontSize: 12, fontWeight: 'bold' }}>{item.date}</Text>
                      </View>
                      <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Islamic</Text>
                    </View>
                    <Text style={{ color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: 6 }}>
                      {item.title}
                    </Text>
                    <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </Animated.View>
            ))}
          </View>

          {/* Calendar Info Section */}
          <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
            <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>About Islamic Calendar</Text>
            <View style={{ 
              backgroundColor: colors.accent + '11', 
              borderRadius: 24, 
              padding: 24,
              borderWidth: 1,
              borderColor: colors.accent + '20',
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <View style={{ backgroundColor: colors.accent, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4, marginRight: 12 }}>
                      <Text style={{ color: colors.card, fontSize: 12, fontWeight: 'bold' }}>📚</Text>
                    </View>
                    <View style={{ backgroundColor: colors.accent + '22', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4 }}>
                      <Text style={{ color: colors.accent, fontSize: 12, fontWeight: '600' }}>Educational</Text>
                    </View>
                  </View>
                  <Text style={{ color: colors.text, fontSize: 16, fontWeight: '500', marginBottom: 12, lineHeight: 24 }}>
                    The Islamic calendar (Hijri calendar) is a lunar calendar consisting of 12 months in a year of 354 or 355 days.
                  </Text>
                  <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>
                    It is used to determine the proper days of Islamic holidays and rituals, such as the annual period of fasting and the proper time for the Hajj. Each Islamic month begins with the sighting of the new moon.
                  </Text>
                </View>
                <View style={{ backgroundColor: colors.accent, borderRadius: 999, padding: 16, marginLeft: 24, shadowColor: colors.accent, shadowOpacity: 0.15, shadowRadius: 8 }}>
                  <Ionicons name="information-circle" size={28} color={colors.card} />
                </View>
              </View>
            </View>
          </View>

          {/* Calendar Features */}
          <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
            <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>Calendar Features</Text>
            <View style={{ 
              backgroundColor: '#FEF3C7', 
              borderRadius: 24, 
              padding: 24,
              borderWidth: 1,
              borderColor: '#F59E0B' + '30',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ backgroundColor: '#F59E0B', borderRadius: 999, padding: 12, marginRight: 16 }}>
                  <Text style={{ fontSize: 24 }}>🌙</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <View style={{ backgroundColor: '#F59E0B' + '20', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4, marginRight: 8 }}>
                      <Text style={{ color: '#F59E0B', fontSize: 12, fontWeight: 'bold' }}>Lunar</Text>
                    </View>
                    <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Calendar</Text>
                  </View>
                  <Text style={{ color: colors.text, fontSize: 16, fontWeight: '500', marginBottom: 12, lineHeight: 24 }}>
                    The Islamic calendar is approximately 11 days shorter than the Gregorian calendar, which is why Islamic dates shift earlier each year.
                  </Text>
                  <Text style={{ color: '#F59E0B', fontSize: 14, fontWeight: '600' }}>Based on lunar cycles</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Salat Modal */}
        <Modal
          visible={salatModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSalatModalVisible(false)}
        >
          <View style={{ flex: 1, backgroundColor: '#0008', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 24, width: '90%', maxWidth: 400 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>Salat Tutorial</Text>
                <TouchableOpacity onPress={() => setSalatModalVisible(false)}>
                  <Ionicons name="close" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
              {/* Prayer Tabs */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                {PRAYER_TUTORIALS.map((prayer, idx) => (
                  <TouchableOpacity
                    key={prayer.name}
                    onPress={() => setSelectedPrayer(idx)}
                    style={{
                      paddingVertical: 6,
                      paddingHorizontal: 10,
                      borderRadius: 8,
                      backgroundColor: selectedPrayer === idx ? colors.accent + '22' : 'transparent',
                      marginHorizontal: 2,
                    }}
                  >
                    <Text style={{ color: selectedPrayer === idx ? colors.accent : colors.textSecondary, fontWeight: '600', fontSize: 13 }}>
                      {prayer.icon} {prayer.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {/* Tutorial Content */}
              <View style={{ marginBottom: 12 }}>
                <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700', marginBottom: 4 }}>
                  {PRAYER_TUTORIALS[selectedPrayer].name} <Text style={{ color: colors.textSecondary, fontSize: 16 }}>{PRAYER_TUTORIALS[selectedPrayer].arabic}</Text>
                </Text>
                <Text style={{ color: colors.textSecondary, fontSize: 15, lineHeight: 22 }}>
                  {PRAYER_TUTORIALS[selectedPrayer].tutorial}
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IslamicCalendar;
