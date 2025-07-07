import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeContext } from "../theme/ThemeContext";

const { width, height } = Dimensions.get("window");

interface PrayerStep {
  step: string;
  title: string;
  description: string;
  arabic?: string;
  transliteration?: string;
}

interface Prayer {
  name: string;
  arabic: string;
  transliteration: string;
  description: string;
  rakats: string;
  time: string;
  icon: string;
  color: string;
  gradient: readonly [string, string, ...string[]];
  type: string;
  steps: PrayerStep[];
}

interface SalatModalProps {
  visible: boolean;
  onClose: () => void;
  prayer: Prayer | null;
}

const SalatModal = ({ visible, onClose, prayer }: SalatModalProps) => {
  const { theme, colors } = useContext(ThemeContext);

  if (!prayer) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Header */}
        <LinearGradient
          colors={prayer.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingTop: 50,
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 28,
                  fontWeight: "bold",
                  marginBottom: 4,
                }}>
                {prayer.name}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  opacity: 0.9,
                  marginBottom: 2,
                }}>
                {prayer.arabic}
              </Text>
              <Text style={{ color: "white", fontSize: 14, opacity: 0.8 }}>
                {prayer.transliteration}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 20,
                padding: 8,
                marginLeft: 16,
              }}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Prayer Info Cards */}
          <View style={{ flexDirection: "row", marginTop: 20, gap: 12 }}>
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 12,
                padding: 12,
                flex: 1,
                alignItems: "center",
              }}>
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
                {prayer.rakats}
              </Text>
              <Text style={{ color: "white", fontSize: 12, opacity: 0.9 }}>
                Rakats
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 12,
                padding: 12,
                flex: 1,
                alignItems: "center",
              }}>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
                {prayer.icon}
              </Text>
              <Text style={{ color: "white", fontSize: 12, opacity: 0.9 }}>
                {prayer.time}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Content */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}>
          {/* Description */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 20,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: colors.accent + "10",
            }}>
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 8,
              }}>
              About {prayer.name}
            </Text>
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 16,
                lineHeight: 24,
              }}>
              {prayer.description}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 12,
                backgroundColor: prayer.color + "15",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
              }}>
              <Text
                style={{
                  color: prayer.color,
                  fontSize: 14,
                  fontWeight: "600",
                }}>
                {prayer.type}
              </Text>
            </View>
          </View>

          {/* Steps */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                color: colors.text,
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 16,
              }}>
              Prayer Steps
            </Text>

            {prayer.steps.map((step, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: colors.card,
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 16,
                  borderLeftWidth: 4,
                  borderLeftColor: prayer.color,
                  elevation: 2,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 12,
                  }}>
                  <View
                    style={{
                      backgroundColor: prayer.color,
                      borderRadius: 12,
                      width: 24,
                      height: 24,
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 12,
                    }}>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}>
                      {step.step}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 18,
                      fontWeight: "600",
                      flex: 1,
                    }}>
                    {step.title}
                  </Text>
                </View>

                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 15,
                    lineHeight: 22,
                    marginBottom: step.arabic ? 12 : 0,
                  }}>
                  {step.description}
                </Text>

                {step.arabic && (
                  <View
                    style={{
                      backgroundColor: colors.background,
                      borderRadius: 12,
                      padding: 16,
                      marginTop: 8,
                    }}>
                    <Text
                      style={{
                        color: colors.text,
                        fontSize: 18,
                        textAlign: "right",
                        fontWeight: "500",
                        marginBottom: 8,
                      }}>
                      {step.arabic}
                    </Text>
                    <Text
                      style={{
                        color: colors.textSecondary,
                        fontSize: 14,
                        fontStyle: "italic",
                      }}>
                      {step.transliteration}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Tips */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 20,
              marginBottom: 40,
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}>
              <Ionicons
                name="bulb"
                size={20}
                color={colors.accent}
                style={{ marginRight: 8 }}
              />
              <Text
                style={{ color: colors.text, fontSize: 18, fontWeight: "600" }}>
                Important Tips
              </Text>
            </View>

            <View style={{ gap: 12 }}>
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <View
                  style={{
                    backgroundColor: colors.accent,
                    borderRadius: 4,
                    width: 8,
                    height: 8,
                    marginTop: 6,
                    marginRight: 12,
                  }}
                />
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 15,
                    flex: 1,
                  }}>
                  Maintain focus and avoid distractions during prayer
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <View
                  style={{
                    backgroundColor: colors.accent,
                    borderRadius: 4,
                    width: 8,
                    height: 8,
                    marginTop: 6,
                    marginRight: 12,
                  }}
                />
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 15,
                    flex: 1,
                  }}>
                  Perform ablution (Wudu) before starting the prayer
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <View
                  style={{
                    backgroundColor: colors.accent,
                    borderRadius: 4,
                    width: 8,
                    height: 8,
                    marginTop: 6,
                    marginRight: 12,
                  }}
                />
                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 15,
                    flex: 1,
                  }}>
                  Face the Qibla (direction of Kaaba) throughout the prayer
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SalatModal;
