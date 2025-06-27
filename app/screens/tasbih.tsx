import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import Svg, { Circle, Defs, Stop, LinearGradient as SvgLinearGradient } from "react-native-svg";
import { ThemeContext } from "../theme/ThemeContext";

interface TasbihItem {
  id: string;
  name: string;
  arabic: string;
  target: number;
  current: number;
  color: string;
  gradientColors: string[];
  streak: number;
  totalCompleted: number;
  allTimeCount: number; // Total count across all days
  lastCompletedDate?: string;
}

interface TasbihStats {
  totalToday: number;
  completedToday: number;
  currentStreak: number;
  totalAllTime: number;
  averageDaily: number;
}

const TASBIH_STORAGE_KEY = "tasbih_data_v3";
const TASBIH_SETTINGS_KEY = "tasbih_settings_v3";
const TASBIH_HISTORY_KEY = "tasbih_history_v3";

const { width } = Dimensions.get("window");

export default function TasbihScreen() {
  const { theme, colors } = useContext(ThemeContext);
  const [tasbihItems, setTasbihItems] = useState<TasbihItem[]>([
    {
      id: "1",
      name: "Subhanallah",
      arabic: "سُبْحَانَ اللَّهِ",
      target: 33,
      current: 0,
      color: "bg-emerald-500",
      gradientColors: ["#10B981", "#059669"],
      streak: 0,
      totalCompleted: 0,
      allTimeCount: 0,
    },
    {
      id: "2",
      name: "Alhamdulillah",
      arabic: "الْحَمْدُ لِلَّهِ",
      target: 33,
      current: 0,
      color: "bg-blue-500",
      gradientColors: ["#3B82F6", "#1D4ED8"],
      streak: 0,
      totalCompleted: 0,
      allTimeCount: 0,
    },
    {
      id: "3",
      name: "Allahu Akbar",
      arabic: "اللَّهُ أَكْبَرُ",
      target: 33,
      current: 0,
      color: "bg-purple-500",
      gradientColors: ["#8B5CF6", "#7C3AED"],
      streak: 0,
      totalCompleted: 0,
      allTimeCount: 0,
    },
    {
      id: "4",
      name: "La ilaha illallah",
      arabic: "لَا إِلَهَ إِلَّا اللَّهُ",
      target: 100,
      current: 0,
      color: "bg-orange-500",
      gradientColors: ["#F97316", "#EA580C"],
      streak: 0,
      totalCompleted: 0,
      allTimeCount: 0,
    },
    {
      id: "5",
      name: "Astaghfirullah",
      arabic: "أَسْتَغْفِرُ اللَّهَ",
      target: 100,
      current: 0,
      color: "bg-pink-500",
      gradientColors: ["#EC4899", "#DB2777"],
      streak: 0,
      totalCompleted: 0,
      allTimeCount: 0,
    },
  ]);

  const [lastResetDate, setLastResetDate] = useState<string>("");
  const [dailyHistory, setDailyHistory] = useState<Record<string, number>>({});
  const [animatedValues] = useState(() =>
    tasbihItems.map(() => new Animated.Value(1))
  );
  const [pulseAnimation] = useState(new Animated.Value(1));
  const [sparkleAnimation] = useState(new Animated.Value(0));

  // Load saved data on component mount
  useEffect(() => {
    loadTasbihData();
    startSparkleAnimation();
  }, []);

  // Save data whenever tasbihItems changes
  useEffect(() => {
    if (tasbihItems.length > 0) {
      saveTasbihData();
    }
  }, [tasbihItems]);

  // Check for daily reset every time the component mounts or when date changes
  useEffect(() => {
    checkAndResetDaily();
  }, [lastResetDate]);

  const startSparkleAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const loadTasbihData = async () => {
    try {
      const savedData = await SecureStore.getItemAsync(TASBIH_STORAGE_KEY);
      const savedSettings = await SecureStore.getItemAsync(TASBIH_SETTINGS_KEY);
      const savedHistory = await SecureStore.getItemAsync(TASBIH_HISTORY_KEY);

      if (savedData) {
        const parsedData = JSON.parse(savedData);
        const mergedData = parsedData.map((item: any, index: number) => ({
          ...tasbihItems[index],
          ...item,
          gradientColors:
            item.gradientColors || tasbihItems[index].gradientColors,
          streak: item.streak || 0,
          totalCompleted: item.totalCompleted || 0,
          allTimeCount: item.allTimeCount || 0,
        }));
        setTasbihItems(mergedData);
      }

      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setLastResetDate(parsedSettings.lastResetDate || "");
      }

      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        setDailyHistory(parsedHistory);
      }

      // Clear old data versions to prevent conflicts
      await clearOldTasbihData();
    } catch (error) {
      console.log("Error loading tasbih data:", error);
    }
  };

  const clearOldTasbihData = async () => {
    try {
      // Clear old version data
      await SecureStore.deleteItemAsync("tasbih_data_v2");
      await SecureStore.deleteItemAsync("tasbih_settings_v2");
      await SecureStore.deleteItemAsync("tasbih_history_v2");
    } catch (error) {
      console.log("Error clearing old tasbih data:", error);
    }
  };

  const saveTasbihData = async () => {
    try {
      await SecureStore.setItemAsync(
        TASBIH_STORAGE_KEY,
        JSON.stringify(tasbihItems)
      );
    } catch (error) {
      console.log("Error saving tasbih data:", error);
    }
  };

  const saveSettings = async () => {
    try {
      const today = new Date().toDateString();
      const settings = {
        lastResetDate: today,
      };
      await SecureStore.setItemAsync(
        TASBIH_SETTINGS_KEY,
        JSON.stringify(settings)
      );
      setLastResetDate(settings.lastResetDate);

      // Save today's total to history
      const todayTotal = tasbihItems.reduce(
        (sum, item) => sum + item.current,
        0
      );
      const newHistory = { ...dailyHistory, [today]: todayTotal };
      setDailyHistory(newHistory);
      await SecureStore.setItemAsync(
        TASBIH_HISTORY_KEY,
        JSON.stringify(newHistory)
      );
    } catch (error) {
      console.log("Error saving settings:", error);
    }
  };

  const checkAndResetDaily = () => {
    const today = new Date().toDateString();
    
    // If this is the first time or if it's a new day
    if (lastResetDate === "" || lastResetDate !== today) {
      // If it's not the first time, save yesterday's data before resetting
      if (lastResetDate !== "") {
        // Save yesterday's progress to history
        const yesterdayTotal = tasbihItems.reduce(
          (sum, item) => sum + item.current,
          0
        );
        const newHistory = { ...dailyHistory, [lastResetDate]: yesterdayTotal };
        setDailyHistory(newHistory);
        
        // Update all-time counts and streaks
        setTasbihItems((prev) =>
          prev.map((item) => {
            const wasCompleted = item.current >= item.target;
            const yesterdayCount = item.current;
            
            return {
              ...item,
              current: 0, // Reset daily count
              allTimeCount: item.allTimeCount + yesterdayCount, // Add to all-time
              streak: wasCompleted ? item.streak + 1 : 0, // Update streak
              totalCompleted: wasCompleted
                ? item.totalCompleted + 1
                : item.totalCompleted,
              lastCompletedDate: wasCompleted
                ? lastResetDate
                : item.lastCompletedDate,
            };
          })
        );
      }
      
      // Save new settings
      saveSettings();
    }
  };

  const animateButton = (index: number) => {
    // Button press animation
    Animated.sequence([
      Animated.timing(animatedValues[index], {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues[index], {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for completion
    const item = tasbihItems[index];
    if (item.current + 1 >= item.target) {
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const incrementCount = (id: string) => {
    const itemIndex = tasbihItems.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      animateButton(itemIndex);
    }

    setTasbihItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newCount = item.current + 1;
          // Increment allTimeCount in real-time
          const newAllTimeCount = item.allTimeCount + 1;
          if (newCount === item.target) {
            Vibration.vibrate([200, 100, 200]);
          } else if (newCount % 10 === 0) {
            Vibration.vibrate(50);
          }
          return { ...item, current: newCount, allTimeCount: newAllTimeCount };
        }
        return item;
      })
    );
  };

  const resetCount = (id: string) => {
    Alert.alert(
      "Reset Counter",
      "Are you sure you want to reset this counter?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            setTasbihItems((prev) =>
              prev.map((item) =>
                item.id === id ? { ...item, current: 0 } : item
              )
            );
          },
        },
      ]
    );
  };

  const resetAllCounts = () => {
    Alert.alert(
      "Reset All Counters",
      "Are you sure you want to reset all counters?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset All",
          style: "destructive",
          onPress: () => {
            setTasbihItems((prev) =>
              prev.map((item) => ({ ...item, current: 0 }))
            );
          },
        },
      ]
    );
  };

  const calculateStats = (): TasbihStats => {
    const totalToday = tasbihItems.reduce((sum, item) => sum + item.current, 0);
    const completedToday = tasbihItems.filter(
      (item) => item.current >= item.target
    ).length;
    
    // Calculate streak - find the minimum streak among all tasbih items
    const streaks = tasbihItems.map((item) => item.streak);
    const currentStreak = streaks.length > 0 ? Math.min(...streaks) : 0;
    
    // Calculate all-time total - sum of all allTimeCount values
    const totalAllTime = tasbihItems.reduce(
      (sum, item) => sum + item.allTimeCount,
      0
    );

    const historyValues = Object.values(dailyHistory);
    const averageDaily =
      historyValues.length > 0
        ? historyValues.reduce((sum, val) => sum + val, 0) /
          historyValues.length
        : 0;

    return {
      totalToday,
      completedToday,
      currentStreak,
      totalAllTime,
      averageDaily: Math.round(averageDaily),
    };
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const stats = calculateStats();

  const renderCircularProgress = (percentage: number, size: number = 120) => {
    const radius = (size - 12) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <View style={{ width: size, height: size, position: "relative" }}>
        <Svg width={size} height={size} style={{ position: "absolute" }}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={theme === "dark" ? "#374151" : "#E5E7EB"}
            strokeWidth="6"
            fill="transparent"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
          <Defs>
            <SvgLinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#10B981" />
              <Stop offset="100%" stopColor="#059669" />
            </SvgLinearGradient>
          </Defs>
        </Svg>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text
            style={{
              color: colors.text,
              fontSize: 24,
              fontWeight: "bold",
            }}>
            {stats.totalToday}
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 12,
              marginTop: 4,
            }}>
            Total Count
          </Text>
        </View>
      </View>
    );
  };

  const renderProgressHeader = () => (
    <View className={` p-3 ${theme === 'dark' ? 'bg-gray-900' : 'bg-emerald-100'}`}>
      {/* Main Stats Card */}
      <View
        className="bg-teal-400 rounded-2xl p-6 mb-5 shadow-lg shadow-black/10">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 8,
          }}>
          <Animated.View style={{ opacity: sparkleAnimation, marginRight: 8 }}>
            <Text style={{ fontSize: 16 }}>✨</Text>
          </Animated.View>
          <Text
            style={{
              color: colors.text,
              fontSize: 22,
              fontWeight: "bold",
            }}>
            Todays Progress
          </Text>
          <Animated.View style={{ opacity: sparkleAnimation, marginLeft: 8 }}>
            <Text style={{ fontSize: 16 }}>✨</Text>
          </Animated.View>
        </View>

        {/* Circular Progress */}
        <View style={{ alignItems: "center", marginBottom: 24 }}>
          <Animated.View style={{ transform: [{ scale: pulseAnimation }] }}>
            {renderCircularProgress(
              Math.round(
                (stats.totalToday /
                  tasbihItems.reduce((sum, item) => sum + item.target, 0)) *
                  100
              )
            )}
          </Animated.View>
        </View>

        {/* Enhanced Stats Grid */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
          <LinearGradient
            colors={["#ECFDF5", "#D1FAE5"]}
            style={{
              flex: 1,
              minWidth: "45%",
              borderRadius: 16,
              padding: 16,
              shadowColor: "#10B981",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}>
              <View
                style={{
                  backgroundColor: "#10B981",
                  borderRadius: 8,
                  padding: 6,
                  marginRight: 8,
                }}>
                <Ionicons name="checkmark-circle" size={16} color="white" />
              </View>
              <Text
                style={{ color: "#065F46", fontWeight: "600", fontSize: 12 }}>
                Completed
              </Text>
            </View>
            <Text
              style={{ color: "#047857", fontSize: 20, fontWeight: "bold" }}>
              {stats.completedToday}/{tasbihItems.length}
            </Text>
          </LinearGradient>

          <LinearGradient
            colors={["#FEF3C7", "#FDE68A"]}
            style={{
              flex: 1,
              minWidth: "45%",
              borderRadius: 16,
              padding: 16,
              shadowColor: "#F59E0B",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}>
              <View
                style={{
                  backgroundColor: "#F59E0B",
                  borderRadius: 8,
                  padding: 6,
                  marginRight: 8,
                }}>
                <Ionicons name="flame" size={16} color="white" />
              </View>
              <Text
                style={{ color: "#92400E", fontWeight: "600", fontSize: 12 }}>
                Streak
              </Text>
            </View>
            <Text
              style={{ color: "#B45309", fontSize: 20, fontWeight: "bold" }}>
              {stats.currentStreak} days
            </Text>
          </LinearGradient>

          <LinearGradient
            colors={["#DBEAFE", "#BFDBFE"]}
            style={{
              flex: 1,
              minWidth: "45%",
              borderRadius: 16,
              padding: 16,
              shadowColor: "#3B82F6",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}>
              <View
                style={{
                  backgroundColor: "#3B82F6",
                  borderRadius: 8,
                  padding: 6,
                  marginRight: 8,
                }}>
                <Ionicons name="trending-up" size={16} color="white" />
              </View>
              <Text
                style={{ color: "#1E40AF", fontWeight: "600", fontSize: 12 }}>
                All Time
              </Text>
            </View>
            <Text
              style={{ color: "#1D4ED8", fontSize: 20, fontWeight: "bold" }}>
              {stats.totalAllTime.toLocaleString()}
            </Text>
          </LinearGradient>

          <LinearGradient
            colors={["#F3E8FF", "#E9D5FF"]}
            style={{
              flex: 1,
              minWidth: "45%",
              borderRadius: 16,
              padding: 16,
              shadowColor: "#8B5CF6",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}>
              <View
                style={{
                  backgroundColor: "#8B5CF6",
                  borderRadius: 8,
                  padding: 6,
                  marginRight: 8,
                }}>
                <Ionicons name="bar-chart" size={16} color="white" />
              </View>
              <Text
                style={{ color: "#6B21A8", fontWeight: "600", fontSize: 12 }}>
                Average
              </Text>
            </View>
            <Text
              style={{ color: "#7C2D92", fontSize: 20, fontWeight: "bold" }}>
              {stats.averageDaily}/day
            </Text>
          </LinearGradient>
        </View>
      </View>
    </View>
  );

  const renderTasbihItem = (item: TasbihItem, index: number) => {
    const isCompleted = item.current >= item.target;
    const progressPercentage = getProgressPercentage(item.current, item.target);

    return (
      <Animated.View
        key={item.id}
        style={{
          transform: [{ scale: animatedValues[index] }],
          marginHorizontal: 20,
          marginBottom: 20,
        }}>
        <LinearGradient
          colors={
            isCompleted
              ? [item.gradientColors[0] + "20", item.gradientColors[1] + "20"]
              : [colors.card, colors.card]
          }
          style={{
            borderRadius: 24,
            padding: 20,
            shadowColor: isCompleted ? item.gradientColors[0] : "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: isCompleted ? 0.3 : 0.1,
            shadowRadius: 16,
            elevation: 12,
          }}>
          {/* Header Section */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 20,
            }}>
            <View style={{ flex: 1, marginRight: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}>
                  {item.name}
                </Text>
                {isCompleted && (
                  <View
                    style={{
                      backgroundColor: item.gradientColors[0],
                      borderRadius: 12,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      marginLeft: 8,
                    }}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}>
                      ✓ DONE
                    </Text>
                  </View>
                )}
              </View>

              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                  fontWeight: "500",
                  lineHeight: 28,
                  marginBottom: 12,
                }}>
                {item.arabic}
              </Text>

              {/* Enhanced Progress Section */}
              <View style={{ marginBottom: 12 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}>
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 14,
                      fontWeight: "600",
                    }}>
                    {item.current}/{item.target}
                  </Text>
                  <Text
                    style={{
                      color: colors.textSecondary,
                      fontSize: 12,
                      fontWeight: "500",
                    }}>
                    {Math.round(progressPercentage)}%
                  </Text>
                </View>

                {/* Animated Progress Bar */}
                <View
                  style={{
                    backgroundColor: theme === "dark" ? "#374151" : "#F3F4F6",
                    borderRadius: 12,
                    height: 8,
                    overflow: "hidden",
                  }}>
                  <Animated.View
                    style={{
                      backgroundColor: item.gradientColors[0],
                      borderRadius: 12,
                      height: 8,
                      width: `${progressPercentage}%`,
                      shadowColor: item.gradientColors[0],
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.5,
                      shadowRadius: 4,
                    }}
                  />
                </View>
              </View>

              {/* Stats Row */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12,
                }}>
                {item.streak > 0 && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#FEF3C7",
                      borderRadius: 8,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                    }}>
                    <Ionicons name="flame" size={14} color="#F59E0B" />
                    <Text
                      style={{
                        color: "#B45309",
                        fontSize: 12,
                        fontWeight: "600",
                        marginLeft: 4,
                      }}>
                      {item.streak} day streak
                    </Text>
                  </View>
                )}
                {item.totalCompleted > 0 && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#ECFDF5",
                      borderRadius: 8,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                    }}>
                    <Ionicons name="trophy" size={14} color="#10B981" />
                    <Text
                      style={{
                        color: "#047857",
                        fontSize: 12,
                        fontWeight: "600",
                        marginLeft: 4,
                      }}>
                      {item.totalCompleted} completed
                    </Text>
                  </View>
                )}
                {item.allTimeCount > 0 && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#DBEAFE",
                      borderRadius: 8,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                    }}>
                    <Ionicons name="time" size={14} color="#3B82F6" />
                    <Text
                      style={{
                        color: "#1D4ED8",
                        fontSize: 12,
                        fontWeight: "600",
                        marginLeft: 4,
                      }}>
                      {item.allTimeCount.toLocaleString()} total
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Reset Button */}
            <TouchableOpacity
              onPress={() => resetCount(item.id)}
              style={{
                backgroundColor: theme === "dark" ? "#374151" : "#F3F4F6",
                borderRadius: 12,
                padding: 12,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}>
              <Ionicons name="refresh" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Enhanced Counter Button */}
          <TouchableOpacity
            onPress={() => incrementCount(item.id)}
            style={{ borderRadius: 20 }}>
            <LinearGradient
              colors={item.gradientColors as [string, string]}
              style={{
                borderRadius: 20,
                padding: 24,
                shadowColor: item.gradientColors[0],
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 8,
                position: "relative",
                overflow: "hidden",
              }}>
              {/* Ripple Effect Background */}
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 20,
                }}
              />

              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 32,
                    fontWeight: "bold",
                    marginBottom: 8,
                    textShadowColor: "rgba(0,0,0,0.3)",
                    textShadowOffset: { width: 0, height: 2 },
                    textShadowRadius: 4,
                  }}>
                  {item.current}
                </Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="hand-left"
                    size={16}
                    color="rgba(255,255,255,0.8)"
                  />
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: 14,
                      fontWeight: "600",
                      marginLeft: 8,
                    }}>
                    Tap to count
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      {/* Enhanced Header */}
      <LinearGradient
        colors={
          theme === "dark" ? ["#1F2937", "#111827"] : ["#FFFFFF", "#F8FAFC"]
        }
        style={{
          paddingHorizontal: 20,
          paddingVertical: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 12,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 4,
            }}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                color: colors.text,
                fontSize: 24,
                fontWeight: "bold",
                textShadowColor: "rgba(0,0,0,0.1)",
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }}>
              Tasbih Counter
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 12,
                fontWeight: "500",
                marginTop: 2,
              }}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>

          <TouchableOpacity
            onPress={resetAllCounts}
            style={{
              backgroundColor: "#FEE2E2",
              borderRadius: 16,
              padding: 12,
              shadowColor: "#EF4444",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}>
            <Ionicons name="refresh" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Progress Header */}
        {renderProgressHeader()}

        {/* Tasbih Items */}
        <View style={{ paddingBottom: 20 }}>
          {tasbihItems.map((item, index) => renderTasbihItem(item, index))}
        </View>

        {/* Enhanced Quick Actions */}
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: colors.card,
            borderRadius: 24,
            padding: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 16,
            elevation: 12,
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}>
            <View
              style={{
                backgroundColor: colors.accent,
                borderRadius: 12,
                padding: 8,
                marginRight: 12,
              }}>
              <Ionicons name="flash" size={20} color="white" />
            </View>
            <Text
              style={{
                color: colors.text,
                fontSize: 20,
                fontWeight: "bold",
              }}>
              Quick Actions
            </Text>
          </View>

          <View style={{ gap: 16 }}>
            {/* First Row */}
            <View style={{ flexDirection: "row", gap: 16 }}>
              <TouchableOpacity
                onPress={() => {
                  const totalTarget = tasbihItems.reduce(
                    (sum, item) => sum + item.target,
                    0
                  );
                  const completionPercentage = Math.round(
                    (stats.totalToday / totalTarget) * 100
                  );
                  Alert.alert(
                    "🎯 Daily Target",
                    `Target: ${totalTarget} dhikr\nCompleted: ${stats.totalToday} (${completionPercentage}%)\n\nKeep going! 💪`,
                    [{ text: "OK", style: "default" }]
                  );
                }}
                style={{ flex: 1 }}>
                <LinearGradient
                  colors={["#DBEAFE", "#BFDBFE"]}
                  style={{
                    borderRadius: 20,
                    padding: 20,
                    alignItems: "center",
                    shadowColor: "#3B82F6",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 6,
                  }}>
                  <View
                    style={{
                      backgroundColor: "#3B82F6",
                      borderRadius: 16,
                      padding: 12,
                      marginBottom: 12,
                    }}>
                    <Ionicons name="stats-chart" size={28} color="white" />
                  </View>
                  <Text
                    style={{
                      color: "#1E40AF",
                      fontSize: 16,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}>
                    Daily Target
                  </Text>
                  <Text
                    style={{
                      color: "#1D4ED8",
                      fontSize: 12,
                      marginTop: 4,
                      textAlign: "center",
                    }}>
                    View progress
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  const progress = `🏆 ${stats.completedToday}/${tasbihItems.length} tasbih completed!\n\n🔥 Streak: ${stats.currentStreak} days\n📊 Total today: ${stats.totalToday}\n\nMay Allah accept your dhikr! 🤲`;
                  Alert.alert("Progress Report", progress);
                }}
                style={{ flex: 1 }}>
                <LinearGradient
                  colors={["#ECFDF5", "#D1FAE5"]}
                  style={{
                    borderRadius: 20,
                    padding: 20,
                    alignItems: "center",
                    shadowColor: "#10B981",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 6,
                  }}>
                  <View
                    style={{
                      backgroundColor: "#10B981",
                      borderRadius: 16,
                      padding: 12,
                      marginBottom: 12,
                    }}>
                    <Ionicons name="checkmark-circle" size={28} color="white" />
                  </View>
                  <Text
                    style={{
                      color: "#065F46",
                      fontSize: 16,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}>
                    Progress
                  </Text>
                  <Text
                    style={{
                      color: "#047857",
                      fontSize: 12,
                      marginTop: 4,
                      textAlign: "center",
                    }}>
                    View details
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Second Row */}
            <TouchableOpacity
              onPress={() => {
                const exportData = {
                  date: new Date().toLocaleDateString(),
                  todayTotal: stats.totalToday,
                  completed: stats.completedToday,
                  streak: stats.currentStreak,
                  allTime: stats.totalAllTime,
                  details: tasbihItems.map((item) => ({
                    name: item.name,
                    current: item.current,
                    target: item.target,
                    completed: item.current >= item.target,
                    streak: item.streak,
                  })),
                };
                Alert.alert(
                  "📊 Tasbih Report",
                  `📅 ${exportData.date}\n\n` +
                    `📱 Today: ${exportData.todayTotal} total\n` +
                    `✅ Completed: ${exportData.completed}/${tasbihItems.length}\n` +
                    `🔥 Streak: ${exportData.streak} days\n` +
                    `🏆 All-time: ${exportData.allTime.toLocaleString()}\n\n` +
                    `Keep up the amazing work! 🌟\nBarakallahu feeki! 🤲`,
                  [{ text: "Close", style: "default" }]
                );
              }}>
              <LinearGradient
                colors={["#F3E8FF", "#E9D5FF"]}
                style={{
                  borderRadius: 20,
                  padding: 20,
                  alignItems: "center",
                  shadowColor: "#8B5CF6",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 6,
                }}>
                <View
                  style={{
                    backgroundColor: "#8B5CF6",
                    borderRadius: 16,
                    padding: 12,
                    marginBottom: 12,
                  }}>
                  <Ionicons name="share" size={28} color="white" />
                </View>
                <Text
                  style={{
                    color: "#6B21A8",
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}>
                  Share Progress
                </Text>
                <Text
                  style={{
                    color: "#7C2D92",
                    fontSize: 12,
                    marginTop: 4,
                    textAlign: "center",
                  }}>
                  Export your achievements
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}