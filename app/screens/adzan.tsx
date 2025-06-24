import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { ThemeContext } from '../theme/ThemeContext';

export default function AdzanScreen() {
  const { colors } = useContext(ThemeContext);
  return (
    <View className=' flex items-center justify-center flex-1'>
      <Text style={{ color: colors.text, fontSize: 24, fontWeight: 'bold' }}>Adhan</Text>
      <Text style={{ color: colors.textSecondary, fontSize: 16, marginTop: 12 }}>This is the Adhan screen. More features coming soon!</Text>
    </View>
  );
} 