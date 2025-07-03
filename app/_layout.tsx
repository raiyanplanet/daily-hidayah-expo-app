import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { ThemeContext, ThemeProvider } from "./theme/ThemeContext";

export default function RootLayout() {
  const { theme, colors } = useContext(ThemeContext);
  return (
    <ThemeProvider>
      <StatusBar 
        style={theme === "dark" ? "light" : "dark"}
        backgroundColor={colors.accent}
        translucent={false}
      />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.card,
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 18,
          },
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="screens/tasbih" 
          options={{ 
            title: "Tasbih Counter",
            headerTitle: "Tasbih Counter"
          }} 
        />
        <Stack.Screen 
          name="screens/quran" 
          options={{ 
            title: "Quran",
            headerTitle: "Holy Quran"
          }} 
        />
        <Stack.Screen 
          name="screens/duas" 
          options={{ 
            title: "Duas",
            headerTitle: "Daily Duas"
          }} 
        />
        <Stack.Screen 
          name="screens/adzan" 
          options={{ 
            title: "Adzan",
            headerTitle: "Adzan Times"
          }} 
        />
        <Stack.Screen 
          name="screens/dhikr" 
          options={{ 
            title: "Dhikr",
            headerTitle: "Dhikr & Remembrance"
          }} 
        />
      </Stack>
    </ThemeProvider>
  );
}
