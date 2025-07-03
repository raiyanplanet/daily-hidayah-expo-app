import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as Location from 'expo-location';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
    CITY_PRAYER_TIMES,
    DEFAULT_PRAYER_TIMES,
    getPrayerTimesForCity,
    getTimeUntilNextPrayer,
    LocationData,
    PrayerTime,
    updatePrayerTimesWithNext
} from '../constants/adhan-constants';
import { ThemeContext } from '../theme/ThemeContext';

export default function AdzanScreen() {
  const { colors, theme } = useContext(ThemeContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPrayer, setCurrentPrayer] = useState('Fajr');
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Initialize prayer times and location
  useEffect(() => {
    initializePrayerTimes();
  }, []);

  // Update prayer times with next prayer indicator when current time changes
  useEffect(() => {
    if (prayerTimes.length > 0) {
      const updatedPrayerTimes = updatePrayerTimesWithNext(prayerTimes);
      setPrayerTimes(updatedPrayerTimes);
    }
  }, [currentTime]);

  const initializePrayerTimes = async () => {
    try {
      setLoading(true);
      
      // Try to get location for more accurate prayer times
      await getLocationAndUpdatePrayerTimes();
      
    } catch (error) {
      console.error('Error initializing prayer times:', error);
      // Use default prayer times as fallback
      const defaultTimes = updatePrayerTimesWithNext(DEFAULT_PRAYER_TIMES);
      setPrayerTimes(defaultTimes);
    } finally {
      setLoading(false);
    }
  };

  const getLocationAndUpdatePrayerTimes = async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied, using default times');
        const defaultTimes = updatePrayerTimesWithNext(DEFAULT_PRAYER_TIMES);
        setPrayerTimes(defaultTimes);
        return;
      }

      // Get current location
      const locationResult = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = locationResult.coords;

      // Get address from coordinates
      const addressResult = await Location.reverseGeocodeAsync({ latitude, longitude });
      const address = addressResult[0];
      
      const cityName = address?.city || 'Unknown City';
      const countryName = address?.country || 'Unknown Country';
      
      setLocation({
        latitude,
        longitude,
        city: cityName,
        country: countryName
      });

      // Get prayer times for the city
      const cityPrayerTimes = getPrayerTimesForCity(cityName);
      const updatedPrayerTimes = updatePrayerTimesWithNext(cityPrayerTimes);
      setPrayerTimes(updatedPrayerTimes);
      
    } catch (error) {
      console.error('Error getting location:', error);
      // Use default prayer times as fallback
      const defaultTimes = updatePrayerTimesWithNext(DEFAULT_PRAYER_TIMES);
      setPrayerTimes(defaultTimes);
    }
  };

  const handlePlayAdhan = async () => {
    try {
      if (isPlaying && sound) {
        await sound.stopAsync();
        setIsPlaying(false);
        return;
      }

      // Load and play adhan audio
      const { sound: audioSound } = await Audio.Sound.createAsync(
        require('../assets/audio/adhan.mp3'), // You'll need to add this audio file
        { shouldPlay: true }
      );

      setSound(audioSound);
      setIsPlaying(true);

      // Stop playing when audio finishes
      audioSound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });

    } catch (error) {
      console.error('Error playing adhan:', error);
      Alert.alert('Error', 'Failed to play adhan audio.');
    }
  };

  const handlePrayerPress = (prayer: PrayerTime) => {
    setCurrentPrayer(prayer.name);
    Alert.alert(
      prayer.name,
      `${prayer.englishName}\n\n${prayer.description}\n\nPrayer time: ${prayer.time}\n\nWould you like to set a reminder for this prayer?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Set Reminder', onPress: () => setPrayerReminder(prayer) }
      ]
    );
  };

  const setPrayerReminder = (prayer: PrayerTime) => {
    // Here you would implement local notification scheduling
    Alert.alert('Reminder Set', `Reminder set for ${prayer.name} at ${prayer.time}`);
  };

  const handleRefreshLocation = async () => {
    setLoading(true);
    await getLocationAndUpdatePrayerTimes();
    setLoading(false);
  };

  const handleCitySelection = (cityName: string) => {
    const cityPrayerTimes = getPrayerTimesForCity(cityName);
    const updatedPrayerTimes = updatePrayerTimesWithNext(cityPrayerTimes);
    setPrayerTimes(updatedPrayerTimes);
    
    setLocation(prev => ({
      ...prev!,
      city: cityName
    }));
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background }}>
        <View className="items-center">
          <View className="w-16 h-16 rounded-full items-center justify-center mb-4" style={{ backgroundColor: colors.accent + '15' }}>
            <Ionicons name="location" size={32} color={colors.accent} />
          </View>
          <Text className="text-lg font-semibold" style={{ color: colors.text }}>
            Getting Prayer Times...
          </Text>
          <Text className="text-sm mt-2" style={{ color: colors.textSecondary }}>
            Please allow location access
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const nextPrayer = prayerTimes.find(p => p.isNext);
  const timeUntilNext = getTimeUntilNextPrayer(prayerTimes);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-6 pb-8">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-3xl font-bold" style={{ color: colors.text }}>
                Adhan
              </Text>
              <Text className="text-base mt-1" style={{ color: colors.textSecondary }}>
                {location ? `${location.city}, ${location.country}` : 'Location not available'}
              </Text>
            </View>
            <View className="w-12 h-12 rounded-full items-center justify-center" 
                  style={{ backgroundColor: colors.accent + '15' }}>
              <Ionicons name="home-outline" size={24} color={colors.accent} />
            </View>
          </View>

          {/* Current Time & Next Prayer */}
          <View className="bg-white rounded-3xl p-6 mb-6" 
                style={{ backgroundColor: colors.card, shadowColor: colors.text, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 }}>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold" style={{ color: colors.text }}>
                Next Prayer
              </Text>
              <View className="px-3 py-1 rounded-full" style={{ backgroundColor: colors.accent + '15' }}>
                <Text className="text-sm font-medium" style={{ color: colors.accent }}>
                  {nextPrayer?.name || 'No prayers today'}
                </Text>
              </View>
            </View>
            
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-4xl font-bold" style={{ color: colors.accent }}>
                  {nextPrayer?.time || '--:--'}
                </Text>
                <Text className="text-base mt-1" style={{ color: colors.textSecondary }}>
                  {timeUntilNext} until {nextPrayer?.name} Adhan
                </Text>
              </View>
              
              <TouchableOpacity
                onPress={handlePlayAdhan}
                className="w-16 h-16 rounded-full items-center justify-center"
                style={{ backgroundColor: colors.accent }}
              >
                <Ionicons 
                  name={isPlaying ? "pause" : "play"} 
                  size={28} 
                  color="white" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Prayer Times List */}
          <View className="space-y-3">
            {prayerTimes.map((prayer, index) => (
              <TouchableOpacity
                key={prayer.name}
                onPress={() => handlePrayerPress(prayer)}
                className={`flex-row items-center justify-between p-4 rounded-2xl ${
                  prayer.isNext ? 'border-2' : ''
                }`}
                style={{ 
                  backgroundColor: colors.card,
                  borderColor: prayer.isNext ? colors.accent : 'transparent',
                  shadowColor: colors.text,
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <View className="flex-row items-center flex-1">
                  <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
                    prayer.isNext ? 'bg-accent' : ''
                  }`} style={{ backgroundColor: prayer.isNext ? colors.accent : colors.accent + '15' }}>
                    <Ionicons 
                      name={prayer.icon as any} 
                      size={20} 
                      color={prayer.isNext ? 'white' : colors.accent} 
                    />
                  </View>
                  
                  <View className="flex-1">
                    <Text className="text-lg font-semibold" style={{ color: colors.text }}>
                      {prayer.name}
                    </Text>
                    <Text className="text-sm" style={{ color: colors.textSecondary }}>
                      {prayer.arabicName} • {prayer.englishName}
                    </Text>
                  </View>
                </View>
                
                <View className="items-end">
                  <Text className="text-xl font-bold" style={{ color: colors.text }}>
                    {prayer.time}
                  </Text>
                  {prayer.isNext && (
                    <View className="mt-1 px-2 py-1 rounded-full" style={{ backgroundColor: colors.accent + '15' }}>
                      <Text className="text-xs font-medium" style={{ color: colors.accent }}>
                        Next
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* City Selection */}
          <View className="mt-8">
            <Text className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
              Select City
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-3">
              {Object.keys(CITY_PRAYER_TIMES).map((cityName) => (
                <TouchableOpacity
                  key={cityName}
                  onPress={() => handleCitySelection(cityName)}
                  className={`px-4 py-2 rounded-full ${
                    location?.city === cityName ? 'bg-accent' : ''
                  }`}
                  style={{ 
                    backgroundColor: location?.city === cityName ? colors.accent : colors.card,
                    borderWidth: 1,
                    borderColor: colors.border
                  }}
                >
                  <Text 
                    className="text-sm font-medium"
                    style={{ color: location?.city === cityName ? 'white' : colors.text }}
                  >
                    {cityName}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Quick Actions */}
          <View className="mt-8 space-y-3">
            <Text className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
              Quick Actions
            </Text>
            
            <View className="flex-row space-x-3">
              <TouchableOpacity 
                onPress={() => Alert.alert('Settings', 'Prayer time settings coming soon!')}
                className="flex-1 bg-white rounded-2xl p-4 items-center"
                style={{ backgroundColor: colors.card, shadowColor: colors.text, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}
              >
                <View className="w-12 h-12 rounded-full items-center justify-center mb-3" style={{ backgroundColor: colors.accent + '15' }}>
                  <Ionicons name="settings-outline" size={24} color={colors.accent} />
                </View>
                <Text className="text-sm font-medium" style={{ color: colors.text }}>
                  Settings
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={handleRefreshLocation}
                className="flex-1 bg-white rounded-2xl p-4 items-center"
                style={{ backgroundColor: colors.card, shadowColor: colors.text, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}
              >
                <View className="w-12 h-12 rounded-full items-center justify-center mb-3" style={{ backgroundColor: colors.accent + '15' }}>
                  <Ionicons name="refresh-outline" size={24} color={colors.accent} />
                </View>
                <Text className="text-sm font-medium" style={{ color: colors.text }}>
                  Refresh
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => Alert.alert('Notifications', 'Prayer notifications coming soon!')}
                className="flex-1 bg-white rounded-2xl p-4 items-center"
                style={{ backgroundColor: colors.card, shadowColor: colors.text, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 }}
              >
                <View className="w-12 h-12 rounded-full items-center justify-center mb-3" style={{ backgroundColor: colors.accent + '15' }}>
                  <Ionicons name="notifications-outline" size={24} color={colors.accent} />
                </View>
                <Text className="text-sm font-medium" style={{ color: colors.text }}>
                  Notifications
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Spacing */}
          <View className="h-8" />
    </View>
      </ScrollView>
    </SafeAreaView>
  );
} 