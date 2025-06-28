import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";

const _layout = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme, colors } = useContext(ThemeContext);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0,

          height: 85,
          paddingBottom: 20,
          paddingTop: 10,
          shadowColor: theme === "dark" ? "#000" : "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: colors.accent,

          shadowColor: "transparent",
        },
        headerTintColor: colors.card,
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 18,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "Daily Hidayah",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="prayer"
        options={{
          title: "Prayer",
          headerTitle: "Prayer Times",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "moon" : "moon-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="calander"
        options={{
          title: "Calander",
          headerTitle: "Islamic Calander",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitle: "My Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
