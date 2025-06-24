import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import {
  APP_FEATURES,
  BASE_PRAYER_TIMES,
  calculateTimeDifferenceWithSeconds,
  DAILY_INSPIRATIONS,
  FEATURED_AYAT,
  getCurrentTimeInSeconds,
  TASBIH_STORAGE_KEY,
  timeToSeconds,
  type AppFeature,
  type PrayerTime,
  type TasbihData
} from "../constants/index";
import { ThemeContext } from "../theme/ThemeContext";

const { width, height } = Dimensions.get("window");

export default function IslamicAppHome() {
  const { theme, colors } = useContext(ThemeContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<PrayerTime | null>(null);
  const [nextPrayerCountdown, setNextPrayerCountdown] = useState("");
  const [tasbihData, setTasbihData] = useState<TasbihData>({
    totalToday: 0,
    completedToday: 0,
    currentStreak: 0,
    isActive: false,
  });
  const [tasbihTotalTarget, setTasbihTotalTarget] = useState(299);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [profileName, setProfileName] = useState('Tawsiful Alam Raiyan');

  // --- PRAYER STATE ---
  const [prayerTimes, setPrayerTimes] = useState<any[]>([]);
  const [currentPrayer, setCurrentPrayer] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      updatePrayerTimes();
    }, 1000);
    loadTasbihData();
    loadProfileName();
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
    return () => clearInterval(timer);
  }, []);

  // Reload profile name when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadProfileName();
    }, [])
  );

  const loadProfileName = async () => {
    try {
      const savedName = await AsyncStorage.getItem('profile_name');
      console.log("Loaded profile name:", savedName);
      if (savedName && savedName.trim() !== '') {
        setProfileName(savedName);
      }
    } catch (error) {
      console.log("Error loading profile name:", error);
    }
  };

  // --- PRAYER LOGIC ---
  function updatePrayerTimes() {
    const currentSeconds = getCurrentTimeInSeconds();
    const updatedTimes = BASE_PRAYER_TIMES.map((prayer) => ({
      ...prayer,
      timeInSeconds: timeToSeconds(prayer.time),
      active: false,
      isNext: false,
    }));
    let current = null;
    let next = null;
    let nextTime = 0;
    for (let i = 0; i < updatedTimes.length; i++) {
      const prayer = updatedTimes[i];
      const nextIndex = (i + 1) % updatedTimes.length;
      const nextPrayerData = updatedTimes[nextIndex];
      if (i === updatedTimes.length - 1) {
        if (
          currentSeconds >= prayer.timeInSeconds ||
          currentSeconds < updatedTimes[0].timeInSeconds
        ) {
          current = prayer;
          next = updatedTimes[0];
          nextTime = updatedTimes[0].timeInSeconds;
          prayer.active = true;
          updatedTimes[0].isNext = true;
          break;
        }
      } else {
        if (
          currentSeconds >= prayer.timeInSeconds &&
          currentSeconds < nextPrayerData.timeInSeconds
        ) {
          current = prayer;
          next = nextPrayerData;
          nextTime = nextPrayerData.timeInSeconds;
          prayer.active = true;
          nextPrayerData.isNext = true;
          break;
        }
      }
    }
    if (!current) {
      next = updatedTimes[0];
      nextTime = updatedTimes[0].timeInSeconds;
      updatedTimes[0].isNext = true;
    }
    setCurrentPrayer(current);
    setNextPrayer(next);
    setPrayerTimes(updatedTimes);
    if (nextTime > 0) setNextPrayerCountdown(calculateTimeDifferenceWithSeconds(nextTime));
  }

  const loadTasbihData = async () => {
    try {
      const savedData = await SecureStore.getItemAsync(TASBIH_STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        const totalToday = parsedData.reduce(
          (sum: number, item: any) => sum + item.current,
          0
        );
        const completedToday = parsedData.filter(
          (item: any) => item.current >= item.target
        ).length;
        const currentStreak = Math.min(
          ...parsedData.map((item: any) => item.streak || 0)
        );
        const totalTarget = parsedData.reduce(
          (sum: number, item: any) => sum + (item.target || 0),
          0
        );
        setTasbihTotalTarget(totalTarget > 0 ? totalTarget : 299);
        setTasbihData({
          totalToday,
          completedToday,
          currentStreak,
          isActive: totalToday > 0,
        });
      }
    } catch (error) {
      console.log("Error loading tasbih data:", error);
    }
  };

  const handleFeaturePress = (route: string, name: string) => {
    try {
      router.push(route as any);
    } catch (error) {
      console.log("Navigation error:", error);
      Alert.alert("Navigation", `Opening ${name}...`, [{ text: "OK" }]);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
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

  const getHijriDate = () => {
    return "9 Ramadhan 1446 H";
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    let greeting = "";
    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";
    else greeting = "Good Evening";
    
    return profileName ? `${greeting}, ${profileName}` : greeting;
  };

  // Render Components
  const renderPrayerTime = ({ item }: { item: PrayerTime }) => (
    <View className={`items-center mx-2 ${theme === 'dark' ? 'bg-gray-900' : 'bg-emerald-500'}`}>
      <View
        className={`p-4 rounded-3xl mb-3 shadow-lg ${
          item.nextPrayer
            ? "bg-white shadow-xl"
            : item.active
              ? "bg-white/90"
              : "bg-white/20"
        }`}
        style={{
          shadowColor: item.nextPrayer ? "#10B981" : "#000",
          shadowOffset: { width: 0, height: item.nextPrayer ? 6 : 3 },
          shadowOpacity: item.nextPrayer ? 0.3 : 0.1,
          shadowRadius: item.nextPrayer ? 8 : 4,
          elevation: item.nextPrayer ? 8 : 4,
        }}>
        <Ionicons
          name={item.icon as any}
          size={22}
          color={
            item.nextPrayer ? "#10B981" : item.active ? "#059669" : "white"
          }
        />
        {item.nextPrayer && (
          <View className="absolute -top-2 -right-2 bg-emerald-500 rounded-full w-6 h-6 items-center justify-center">
            <Text className="text-white text-xs font-bold">●</Text>
          </View>
        )}
      </View>
      <Text
        className={`text-xs mb-1 font-semibold ${
          item.nextPrayer || item.active ? "text-white" : "text-white/80"
        }`}>
        {item.name}
      </Text>
      <Text
        className={`text-xs font-medium ${
          item.nextPrayer
            ? "text-white font-bold"
            : item.active
              ? "text-white"
              : "text-white/70"
        }`}>
        {item.time}
      </Text>
    </View>
  );

  const renderFeature = ({
    item,
    index,
  }: {
    item: AppFeature;
    index: number;
  }) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }} className={`flex-1  items-center `}>
      <TouchableOpacity
        className={`items-center mx-2 mb-6 border border-emerald-200/40 rounded-3xl py-3 ${theme === 'dark' ? 'bg-emerald-200/10' : 'bg-emerald-100'}`}
        onPress={() => handleFeaturePress(item.route, item.name)}
        activeOpacity={0.7}
        style={{ width: (width - 80) / 3 }}>
        <View
          className="w-18 h-18 rounded-3xl items-center justify-center mb-3 shadow-lg p-2"
          style={{
            backgroundColor: item.gradient[0],
            shadowColor: item.gradient[0],
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 8,
          }}>
          <Ionicons name={item.icon as any} size={28} color="white" />
        </View>
        <Text className={`text-sm text-gray-800 text-center font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderTasbihProgress = () => {
    // Circular progress bar values
    const size = 64;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(tasbihTotalTarget > 0 ? tasbihData.totalToday / tasbihTotalTarget : 0, 1);
    const progressStroke = circumference * (1 - progress);

    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
        className={`mx-6 mb-6 ${theme === 'dark' ? 'bg-transparent' : 'bg-transparent'}`}>
        <TouchableOpacity
          onPress={() => handleFeaturePress("/screens/tasbih", "Tasbih")}
          className={` rounded-3xl p-6 shadow-lg border border-emerald-200/40 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
          
          activeOpacity={0.9}>
          <View className="flex-row items-center mb-4">
            {/* Circular Progress Bar */}
            <View className="mr-4">
              <Svg width={size} height={size}>
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#e5e7eb"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#10B981"
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={progressStroke}
                  strokeLinecap="round"
                  rotation="-90"
                  origin={`${size / 2}, ${size / 2}`}
                />
                <Text
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: size / 2 - 12,
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "#10B981",
                  }}>
                  {Math.round(progress * 100)}%
                </Text>
              </Svg>
            </View>
            <View className="flex-1">
              <View className="flex-row items-center">
                <View className="bg-emerald-100 rounded-full p-3 mr-3">
                  <Ionicons name="repeat" size={20} color="#10B981" />
                </View>
                <View>
                  <Text className={` text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Tasbih Progress
                  </Text>
                  <Text className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Todays dhikr count</Text>
                </View>
              </View>
              {tasbihData.isActive ? (
                <View>
                  <View className="flex-row items-center justify-between mb-4 mt-2">
                    <View className="flex-1 mr-4">
                      <View className="flex-row items-center mb-2">
                        <Text className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mr-2`}>
                          {tasbihData.totalToday}
                        </Text>
                        <Text className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                          / {tasbihTotalTarget} today
                        </Text>
                      </View>
                    </View>
                    <View className="items-center">
                      <Text className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        {tasbihData.completedToday}/5
                      </Text>
                      <Text className={`text-xs text-gray-500 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>completed</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center space-x-4">
                    {tasbihData.currentStreak > 0 && (
                      <View className="flex-row items-center bg-orange-50 rounded-full px-3 py-1">
                        <Ionicons name="flame" size={16} color="#F97316" />
                        <Text className={`text-orange-600 text-sm font-semibold ml-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                          {tasbihData.currentStreak} day streak
                        </Text>
                      </View>
                    )}
                    <View className="flex-row items-center bg-emerald-50 rounded-full px-3 py-1">
                      <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                      <Text className={` text-sm font-semibold ml-1 ${theme === 'dark' ? 'text-emerald-500' : 'text-emerald-800'}`}>
                        Active today
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View className="items-center py-4">
                  <Text className={`text-gray-500 text-base mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Start your dhikr journey
                  </Text>
                  <View className="bg-emerald-50 rounded-full px-4 py-2">
                    <Text className={`text-emerald-600 text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      Tap to begin counting
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.accent} />
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
        {/* Enhanced Header */}
        <Animated.View style={{ opacity: fadeAnim, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <View>
              <Text style={{ color: colors.text, fontSize: 20, fontWeight: '600' }}>{getGreeting()}</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 14, fontWeight: '500' }}>{getHijriDate()}</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{formatDate(currentTime)}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity style={{ padding: 12, backgroundColor: colors.accent + '33', borderRadius: 16, marginBottom: 8 }}>
                <Ionicons name="notifications" size={24} color={colors.text} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="location" size={14} color={colors.accent} />
                <Text style={{ color: colors.textSecondary, fontSize: 12, marginLeft: 4 }}>Chittagong, BD</Text>
              </View>
            </View>
          </View>
          {/* Enhanced Current Time Display */}
          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 24, marginBottom: 24 }}>
            <Text style={{ color: colors.text, fontSize: 48, fontWeight: '300', marginBottom: 8, textAlign: 'center' }}>{formatTime(currentTime)}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="time" size={16} color={colors.accent} />
              <Text style={{ color: colors.textSecondary, fontSize: 16, marginLeft: 8 }}>Next: {nextPrayer?.name} • {nextPrayerCountdown}</Text>
            </View>
          </View>
          {/* Prayer Times */}
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
            {/* Current Prayer */}
            <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Ionicons name="checkmark-circle" size={16} color={colors.accent} />
                <Text style={{ color: colors.textSecondary, fontSize: 12, marginLeft: 4, fontWeight: '500' }}>CURRENT PERIOD</Text>
              </View>
              <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>{currentPrayer?.name || "Before Fajr"}</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 14 }}>{currentPrayer?.time}</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{currentPrayer?.arabicName}</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{currentPrayer?.description}</Text>
            </View>
            {/* Next Prayer */}
            <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, flex: 1, borderWidth: 1, borderColor: colors.accent + '55' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Ionicons name="alarm-outline" size={16} color={colors.accent} />
                <Text style={{ color: colors.textSecondary, fontSize: 12, marginLeft: 4, fontWeight: '500' }}>NEXT PRAYER</Text>
              </View>
              <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>{nextPrayer?.name}</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 14 }}>in {nextPrayerCountdown}</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{nextPrayer?.arabicName}</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{nextPrayer?.description}</Text>
            </View>
          </View>
        </Animated.View>
        {/* Enhanced White Content Section */}
        <View style={{ backgroundColor: colors.card, borderTopLeftRadius: 32, borderTopRightRadius: 32, flex: 1, minHeight: '100%' }}>
          {/* Features Section */}
          <View style={{ paddingHorizontal: 24, paddingTop: 32 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>Islamic Features</Text>
              <TouchableOpacity style={{ backgroundColor: colors.accent + '11', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 }}>
                <Text style={{ color: colors.accent, fontSize: 14, fontWeight: '600' }}>Explore All</Text>
              </TouchableOpacity>
            </View>
            {/* Features Grid */}
            <FlatList
              data={APP_FEATURES}
              renderItem={renderFeature}
              keyExtractor={(item) => item.id}
              numColumns={3}
              scrollEnabled={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
          {/* Tasbih Progress Section */}
          {renderTasbihProgress()}
          {/* Enhanced Quran/Dua/Ayah Section */}
          <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
            <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>Continue Reading & Reflection</Text>
            <TouchableOpacity
            className="border border-emerald-200/40"
              style={{
                backgroundColor: colors.accent + '11',
                borderRadius: 24,
                padding: 24,
               
              }}
              activeOpacity={0.9}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  {/* Show a different ayah/dua each hour, deterministic by hour */}
                  {(() => {
                    const hour = new Date().getHours();
                    const ayah = FEATURED_AYAT[hour % FEATURED_AYAT.length];
                    return (
                      <>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                          <View style={{ backgroundColor: colors.accent, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4, marginRight: 12 }}>
                            <Text style={{ color: colors.card, fontSize: 12, fontWeight: 'bold' }}>{ayah.surah}</Text>
                          </View>
                          <View style={{ backgroundColor: colors.accent + '22', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4 }}>
                            <Text style={{ color: colors.accent, fontSize: 12, fontWeight: '600' }}>{ayah.reference}</Text>
                          </View>
                        </View>
                        <Text style={{ color: colors.accent, fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'right' }}>{ayah.arabic}</Text>
                        <Text style={{ color: colors.text, fontSize: 16, fontWeight: '400', marginBottom: 12 }}>{ayah.translation}</Text>
                      </>
                    );
                  })()}
                </View>
                <View style={{ backgroundColor: colors.accent, borderRadius: 999, padding: 16, marginLeft: 24, shadowColor: colors.accent, shadowOpacity: 0.15, shadowRadius: 8 }}>
                  <Ionicons name="book" size={28} color={colors.card} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/* Daily Motivation */}
          <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
            <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold', marginBottom: 24 }}>Daily Inspiration</Text>
            {(() => {
              const today = new Date();
              const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
              const inspiration = DAILY_INSPIRATIONS[dayOfYear % DAILY_INSPIRATIONS.length];
              return (
                <View style={{ backgroundColor: inspiration.color + '15', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: inspiration.color + '30' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={{ backgroundColor: inspiration.color, borderRadius: 999, padding: 12, marginRight: 16 }}>
                      <Text style={{ fontSize: 24 }}>{inspiration.emoji}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                        <View style={{ backgroundColor: inspiration.color + '20', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4, marginRight: 8 }}>
                          <Text style={{ color: inspiration.color, fontSize: 12, fontWeight: 'bold' }}>{inspiration.category}</Text>
                        </View>
                        <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Daily</Text>
                      </View>
                      <Text style={{ color: colors.text, fontSize: 16, fontWeight: '500', marginBottom: 12, lineHeight: 24 }}>{inspiration.quote}</Text>
                      <Text style={{ color: inspiration.color, fontSize: 14, fontWeight: '600' }}>{inspiration.reference}</Text>
                    </View>
                  </View>
                </View>
              );
            })()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
