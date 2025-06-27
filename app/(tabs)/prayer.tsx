import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeContext } from "../theme/ThemeContext";

import { basePrayerTimes } from "../constants/index";

const { width } = Dimensions.get("window");

interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
  icon: string;
  active: boolean;
  isNext: boolean;
  description: string;
  timeInMinutes: number;
}

const Prayer = () => {
  const { theme, colors } = useContext(ThemeContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayerCountdown, setNextPrayerCountdown] = useState("");
  const [currentPrayerName, setCurrentPrayerName] = useState("");
  const [nextPrayerName, setNextPrayerName] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  const [notifications, setNotifications] = useState({
    fajr: true,
    dhuhr: true,
    asr: false,
    maghrib: true,
    isha: true,
  });

  // Convert time string to minutes for easy comparison
  const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Get current time in minutes
  const getCurrentTimeInMinutes = (): number => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  // Calculate time difference for countdown
  const calculateTimeDifference = (targetTimeInMinutes: number): string => {
    const currentMinutes = getCurrentTimeInMinutes();
    let diffMinutes = targetTimeInMinutes - currentMinutes;

    // If prayer time has passed today, calculate for tomorrow
    if (diffMinutes <= 0) {
      diffMinutes += 24 * 60; // Add 24 hours
    }

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);

  // Update prayer times with current/next status
  const updatePrayerTimes = () => {
    const currentMinutes = getCurrentTimeInMinutes();

    const updatedTimes = basePrayerTimes.map((prayer) => ({
      ...prayer,
      timeInMinutes: timeToMinutes(prayer.time),
      active: false,
      isNext: false,
    }));

    // Find current and next prayer
    let currentPrayer = "";
    let nextPrayer = "";
    let nextPrayerTime = 0;

    // Check which prayer period we're in
    for (let i = 0; i < updatedTimes.length; i++) {
      const prayer = updatedTimes[i];
      const nextIndex = (i + 1) % updatedTimes.length;
      const nextPrayerData = updatedTimes[nextIndex];

      if (i === updatedTimes.length - 1) {
        // Last prayer (Isha) - check if current time is after Isha or before Fajr
        if (
          currentMinutes >= prayer.timeInMinutes ||
          currentMinutes < updatedTimes[0].timeInMinutes
        ) {
          currentPrayer = prayer.name;
          nextPrayer = updatedTimes[0].name;
          nextPrayerTime = updatedTimes[0].timeInMinutes;
          prayer.active = true;
          updatedTimes[0].isNext = true;
          break;
        }
      } else {
        // Check if current time is between this prayer and next prayer
        if (
          currentMinutes >= prayer.timeInMinutes &&
          currentMinutes < nextPrayerData.timeInMinutes
        ) {
          currentPrayer = prayer.name;
          nextPrayer = nextPrayerData.name;
          nextPrayerTime = nextPrayerData.timeInMinutes;
          prayer.active = true;
          nextPrayerData.isNext = true;
          break;
        }
      }
    }

    // If no current prayer found, we're before Fajr
    if (!currentPrayer) {
      nextPrayer = updatedTimes[0].name;
      nextPrayerTime = updatedTimes[0].timeInMinutes;
      updatedTimes[0].isNext = true;
    }

    setCurrentPrayerName(currentPrayer);
    setNextPrayerName(nextPrayer);
    setPrayerTimes(updatedTimes);

    // Calculate countdown
    if (nextPrayerTime > 0) {
      setNextPrayerCountdown(calculateTimeDifference(nextPrayerTime));
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      updatePrayerTimes();
    }, 1000);

    // Initial animation
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
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

  const toggleNotification = (prayer: string) => {
    setNotifications((prev) => ({
      ...prev,
      [prayer]: !prev[prayer as keyof typeof prev],
    }));
  };

  const getNextPrayerData = () => {
    return prayerTimes.find((prayer) => prayer.isNext);
  };

  const getCurrentPrayerData = () => {
    return prayerTimes.find((prayer) => prayer.active);
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.accent}
      />

      {/* Enhanced Header */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          backgroundColor: colors.card,
          paddingHorizontal: 24,
          paddingTop: 20,
          paddingBottom: 20,
        }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}>
          <View>
            <Text
              style={{ color: colors.text, fontSize: 24, fontWeight: "bold" }}>
              Prayer Times
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 14,
                fontWeight: "500",
              }}>
              {getHijriDate()}
            </Text>
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
              {formatDate(currentTime)}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity
              style={{
                padding: 12,
                backgroundColor: colors.accent + "33",
                borderRadius: 16,
                marginBottom: 8,
              }}>
              <Ionicons name="settings-outline" size={24} color={colors.text} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="location-outline"
                size={14}
                color={colors.accent}
              />
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 12,
                  marginLeft: 4,
                }}>
                Chittagong, BD
              </Text>
            </View>
          </View>
        </View>

        {/* Enhanced Current Time Display */}
        {/* <View className="flex flex-col items-center justify-center">
          <Text style={{ color: colors.text, fontSize: 40, fontWeight: '300', marginBottom: 8, textAlign: 'center' }}>{formatTime(currentTime)}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="time-outline" size={16} color={colors.accent} />
            <Text style={{ color: colors.textSecondary, fontSize: 16, marginLeft: 8 }}>Current Local Time</Text>
          </View>
        </View> */}

        {/* Current & Next Prayer Status */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
          {/* Current Prayer */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 16,
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={colors.accent}
              />
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 12,
                  marginLeft: 4,
                  fontWeight: "500",
                }}>
                CURRENT PERIOD
              </Text>
            </View>
            <Text
              style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}>
              {currentPrayerName || "Before Fajr"}
            </Text>
            {getCurrentPrayerData() && (
              <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
                {getCurrentPrayerData()?.time}
              </Text>
            )}
          </View>

          {/* Next Prayer */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 16,
              flex: 1,
              borderWidth: 1,
              borderColor: colors.accent + "55",
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}>
              <Ionicons name="alarm-outline" size={16} color={colors.accent} />
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 12,
                  marginLeft: 4,
                  fontWeight: "500",
                }}>
                NEXT PRAYER
              </Text>
            </View>
            <Text
              style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}>
              {nextPrayerName}
            </Text>
            <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
              in {nextPrayerCountdown}
            </Text>
          </View>
        </View>
      </Animated.View>

      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}>
        {/* Next Prayer Highlight Card */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingHorizontal: 24,
            paddingTop: 32,
            paddingBottom: 24,
          }}>
          {getNextPrayerData() && (
            <View
              style={{
                backgroundColor: colors.accent,
                borderRadius: 24,
                padding: 24,
                marginBottom: 24,
                shadowColor: colors.accent,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8,
              }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 8,
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.card,
                        borderRadius: 999,
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                      }}>
                      <Text
                        style={{
                          color: colors.accent,
                          fontSize: 12,
                          fontWeight: "bold",
                        }}>
                        NEXT
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: colors.card,
                      fontSize: 24,
                      fontWeight: "bold",
                      marginBottom: 4,
                    }}>
                    {getNextPrayerData()?.name}
                  </Text>
                  <Text
                    style={{
                      color: colors.card,
                      fontSize: 20,
                      fontWeight: "300",
                      marginBottom: 4,
                    }}>
                    {getNextPrayerData()?.arabicName}
                  </Text>
                  <Text style={{ color: colors.card, fontSize: 14 }}>
                    {getNextPrayerData()?.description}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 8,
                    }}>
                    <Ionicons
                      name="time-outline"
                      size={16}
                      color={colors.card}
                    />
                    <Text
                      style={{
                        color: colors.card,
                        fontSize: 14,
                        marginLeft: 4,
                        fontWeight: "500",
                      }}>
                      in {nextPrayerCountdown}
                    </Text>
                  </View>
                </View>
                <View style={{ alignItems: "center" }}>
                  <View
                    style={{
                      backgroundColor: colors.card,
                      borderRadius: 999,
                      padding: 16,
                      marginBottom: 12,
                    }}>
                    <Ionicons
                      name={getNextPrayerData()?.icon as any}
                      size={32}
                      color={colors.accent}
                    />
                  </View>
                  <Text
                    style={{
                      color: colors.card,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}>
                    {getNextPrayerData()?.time}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </Animated.View>

        {/* Prayer Times List */}
        <View style={{ paddingHorizontal: 24 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}>
            <Text
              style={{ color: colors.text, fontSize: 20, fontWeight: "bold" }}>
              Todays Prayers
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.accent + "11",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 16,
              }}>
              <Text
                style={{
                  color: colors.accent,
                  fontSize: 14,
                  fontWeight: "600",
                }}>
                Customize
              </Text>
            </TouchableOpacity>
          </View>

          {prayerTimes.map((prayer, index) => (
            <Animated.View
              key={index}
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
                backgroundColor: colors.card,
                borderRadius: 24,
                padding: 20,
                marginBottom: 16,
                shadowColor: colors.accent,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 2,
                borderWidth: prayer.isNext ? 2 : prayer.active ? 2 : 0,
                borderColor: prayer.isNext
                  ? colors.accent
                  : prayer.active
                    ? colors.accent + "66"
                    : "transparent",
              }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}>
                  <View
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 16,
                      backgroundColor: prayer.isNext
                        ? colors.accent
                        : prayer.active
                          ? colors.accent + "22"
                          : colors.border,
                    }}>
                    <Ionicons
                      name={prayer.icon as any}
                      size={24}
                      color={
                        prayer.isNext
                          ? colors.card
                          : prayer.active
                            ? colors.accent
                            : colors.textSecondary
                      }
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 4,
                      }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 18,
                          color: prayer.isNext
                            ? colors.accent
                            : prayer.active
                              ? colors.accent
                              : colors.text,
                        }}>
                        {prayer.name}
                      </Text>
                      {prayer.isNext && (
                        <View
                          style={{
                            backgroundColor: colors.accent,
                            borderRadius: 999,
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            marginLeft: 8,
                          }}>
                          <Text
                            style={{
                              color: colors.card,
                              fontSize: 12,
                              fontWeight: "bold",
                            }}>
                            NEXT
                          </Text>
                        </View>
                      )}
                      {prayer.active && !prayer.isNext && (
                        <View
                          style={{
                            backgroundColor: colors.accent + "22",
                            borderRadius: 999,
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            marginLeft: 8,
                          }}>
                          <Text
                            style={{
                              color: colors.accent,
                              fontSize: 12,
                              fontWeight: "bold",
                            }}>
                            NOW
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text style={{ color: colors.textSecondary, fontSize: 16 }}>
                      {prayer.arabicName}
                    </Text>
                    <Text
                      style={{
                        color: colors.textSecondary,
                        fontSize: 14,
                        marginBottom: 4,
                      }}>
                      {prayer.description}
                    </Text>
                    {prayer.isNext && (
                      <Text
                        style={{
                          color: colors.accent,
                          fontSize: 14,
                          fontWeight: "500",
                        }}>
                        in {nextPrayerCountdown}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={{ alignItems: "flex-end", marginLeft: 16 }}>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      marginBottom: 12,
                      color: prayer.isNext
                        ? colors.accent
                        : prayer.active
                          ? colors.accent
                          : colors.text,
                    }}>
                    {prayer.time}
                  </Text>
                  <Switch
                    value={
                      notifications[
                        prayer.name.toLowerCase() as keyof typeof notifications
                      ]
                    }
                    onValueChange={() =>
                      toggleNotification(prayer.name.toLowerCase())
                    }
                    trackColor={{ false: colors.border, true: colors.accent }}
                    thumbColor={
                      notifications[
                        prayer.name.toLowerCase() as keyof typeof notifications
                      ]
                        ? colors.card
                        : colors.background
                    }
                    style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                  />
                </View>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Enhanced Qibla Direction Card */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 24,
              padding: 24,
              shadowColor: colors.text,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 6,
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}>
              <Text
                style={{
                  color: colors.text,
                  fontWeight: "bold",
                  fontSize: 18,
                }}>
                Qibla Direction
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.accent + "11",
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 16,
                }}>
                <Text
                  style={{
                    color: colors.accent,
                    fontSize: 14,
                    fontWeight: "600",
                  }}>
                  Open Compass
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", paddingVertical: 16 }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: colors.accent + "22",
                  borderRadius: 999,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  shadowColor: colors.accent,
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                }}>
                <Ionicons
                  name="compass-outline"
                  size={36}
                  color={colors.accent}
                />
              </View>
              <Text
                style={{
                  color: colors.accent,
                  fontWeight: "bold",
                  fontSize: 24,
                }}>
                294°
              </Text>
              <Text
                style={{ color: colors.text, fontSize: 16, fontWeight: "500" }}>
                West-Northwest
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 8,
                }}>
                <Ionicons
                  name="location-outline"
                  size={14}
                  color={colors.accent}
                />
                <Text
                  style={{
                    color: colors.accent,
                    fontSize: 14,
                    marginLeft: 4,
                    fontWeight: "500",
                  }}>
                  Kaaba, Makkah • 7,823 km
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Enhanced Prayer Statistics */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 24,
              padding: 24,
              shadowColor: colors.text,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 6,
            }}>
            <Text
              style={{
                color: colors.text,
                fontWeight: "bold",
                fontSize: 18,
                marginBottom: 24,
              }}>
              This Months Progress
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 24,
              }}>
              <View style={{ alignItems: "center", flex: 1 }}>
                <View
                  style={{
                    backgroundColor: colors.accent + "22",
                    borderRadius: 999,
                    padding: 12,
                    marginBottom: 8,
                  }}>
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color={colors.accent}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: colors.accent,
                  }}>
                  127
                </Text>
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 14,
                    textAlign: "center",
                  }}>
                  Prayers Completed
                </Text>
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <View
                  style={{
                    backgroundColor: "#FDBA74",
                    borderRadius: 999,
                    padding: 12,
                    marginBottom: 8,
                  }}>
                  <Ionicons name="flame" size={24} color="#F97316" />
                </View>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#F97316",
                  }}>
                  15
                </Text>
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 14,
                    textAlign: "center",
                  }}>
                  Day Streak
                </Text>
              </View>
              <View style={{ alignItems: "center", flex: 1 }}>
                <View
                  style={{
                    backgroundColor: "#93C5FD",
                    borderRadius: 999,
                    padding: 12,
                    marginBottom: 8,
                  }}>
                  <Ionicons name="time" size={24} color="#3B82F6" />
                </View>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#3B82F6",
                  }}>
                  89%
                </Text>
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 14,
                    textAlign: "center",
                  }}>
                  On Time
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: colors.border,
                borderRadius: 999,
                height: 12,
                marginBottom: 8,
              }}>
              <View
                style={{
                  backgroundColor: colors.accent,
                  borderRadius: 999,
                  height: 12,
                  width: "85%",
                }}
              />
            </View>
            <Text
              style={{
                color: colors.text,
                fontSize: 14,
                textAlign: "center",
                fontWeight: "500",
              }}>
              85% prayer completion this month
            </Text>
          </View>
        </View>

        {/* Enhanced Daily Reminder */}
        <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
          <View
            style={{
              backgroundColor: colors.accent,
              borderRadius: 24,
              padding: 24,
              shadowColor: "#8B5CF6",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.25,
              shadowRadius: 12,
              elevation: 8,
            }}>
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <View
                style={{
                  backgroundColor: colors.card,
                  borderRadius: 999,
                  padding: 12,
                  marginRight: 16,
                }}>
                <Ionicons name="heart" size={24} color={colors.accent} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: colors.card,
                    fontSize: 16,
                    fontWeight: "500",
                    marginBottom: 12,
                    lineHeight: 24,
                  }}>
                  And establish prayer and give zakah and bow with those who
                  bow.
                </Text>
                <Text style={{ color: colors.card, fontSize: 14 }}>
                  - Quran 2:43
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Prayer;
