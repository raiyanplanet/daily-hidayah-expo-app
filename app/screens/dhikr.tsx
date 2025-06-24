import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

export default function DhikrScreen() {
  const { colors } = useContext(ThemeContext);
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.text, fontSize: 24, fontWeight: 'bold' }}>Dhikr</Text>
      <Text style={{ color: colors.textSecondary, fontSize: 16, marginTop: 12 }}>This is the Dhikr screen. More features coming soon!</Text>
    </View>
  );
} 