import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SalatModal from "../components/SalatModel";
import {
  PRAYER_STEPS,
  PRAYER_TUTORIALS,
  PrayerTutorial,
} from "../constants/salat";
import { ThemeContext } from "../theme/ThemeContext";

const { width } = Dimensions.get("window");

const SalatScreen = () => {
  const { theme, colors } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [selectedPrayer, setSelectedPrayer] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openPrayerModal = (prayer: PrayerTutorial) => {
    // Add steps data to the prayer object
    const prayerWithSteps = {
      ...prayer,
      steps: PRAYER_STEPS,
      description: prayer.tutorial,
      type: `${prayer.rakats} Rak'ah Prayer`,
      transliteration: prayer.name,
    };
    setSelectedPrayer(prayerWithSteps);
    setModalVisible(true);
  };

  const closePrayerModal = () => {
    setModalVisible(false);
    setSelectedPrayer(null);
  };

  const PrayerCard = ({
    prayer,
    index,
  }: {
    prayer: PrayerTutorial;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        className=" bg-emerald-500 "
        style={{
          marginBottom: 16,
          marginRight: index % 2 === 0 ? 16 : 0,

          borderRadius: 24,
          padding: 20,

          justifyContent: "space-between",
          width: "100%",
        }}
        onPress={() => openPrayerModal(prayer)}
        activeOpacity={0.8}>
        {/* Icon */}
        <View
          style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: 16,
            width: 48,
            height: 48,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 12,
          }}>
          <Text style={{ fontSize: 24 }}>{prayer.icon}</Text>
        </View>

        {/* Prayer Info */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 4,
            }}>
            {prayer.name}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              opacity: 0.9,
              marginBottom: 8,
            }}>
            {prayer.arabic}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 12,
              opacity: 0.8,
            }}>
            {prayer.rakats} Rakats • {prayer.time}
          </Text>
        </View>

        {/* Arrow */}
        <View style={{ alignItems: "flex-end" }}>
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 12,
              padding: 6,
            }}>
            <Ionicons name="arrow-forward" size={16} color="white" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 24,
            padding: 24,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: colors.border,
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}>
            <View
              style={{
                backgroundColor: colors.accent + "15",
                borderRadius: 12,
                padding: 8,
                marginRight: 12,
              }}>
              <Ionicons name="book" size={24} color={colors.accent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 4,
                }}>
                Daily Prayers
              </Text>
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: 14,
                }}>
                Tap on any prayer to learn its steps and details
              </Text>
            </View>
          </View>
        </View>

        {/* Prayer Cards Grid */}
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {PRAYER_TUTORIALS.map((prayer, index) => (
            <PrayerCard key={prayer.name} prayer={prayer} index={index} />
          ))}
        </View>
      </ScrollView>

      {/* Salat Modal */}
      <SalatModal
        visible={modalVisible}
        onClose={closePrayerModal}
        prayer={selectedPrayer}
      />
    </SafeAreaView>
  );
};

export default SalatScreen;
