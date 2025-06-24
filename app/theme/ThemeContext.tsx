import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

interface ThemeColors {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  accent: string;
  border: string;
  input: string;
  // Add more as needed
}

const lightColors: ThemeColors = {
  background: "#F0FDF4",
  card: "#FFFFFF",
  text: "#1E293B",
  textSecondary: "#64748B",
  accent: "#10B981",
  border: "#E5E7EB",
  input: "#F3F4F6",
};

const darkColors: ThemeColors = {
  background: "#0F172A",
  card: "#1E293B",
  text: "#F1F5F9",
  textSecondary: "#94A3B8",
  accent: "#10B981",
  border: "#334155",
  input: "#1E293B",
};

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colors: lightColors,
  toggleTheme: () => {},
});

const STORAGE_KEY = "app_theme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const colors = theme === "dark" ? darkColors : lightColors;

  // Load theme from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === "dark" || saved === "light") {
          setTheme(saved);
        }
      } catch {}
    })();
  }, []);

  // Save theme to storage when changed
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, theme).catch(() => {});
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 