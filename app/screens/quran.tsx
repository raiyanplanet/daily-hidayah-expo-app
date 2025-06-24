import React, { useContext, useState } from "react";
import {
    Dimensions,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { ThemeContext } from "../theme/ThemeContext";

const { width } = Dimensions.get("window");

const Quran = () => {
  const { theme, colors } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState("");
  const [selectedJuz, setSelectedJuz] = useState("All");

  // Sample Quran data
  const surahs = [
    {
      number: 1,
      name: "Al-Fatihah",
      arabicName: "الفاتحة",
      verses: 7,
      juz: 1,
      type: "Meccan",
    },
    {
      number: 2,
      name: "Al-Baqarah",
      arabicName: "البقرة",
      verses: 286,
      juz: 1,
      type: "Medinan",
    },
    {
      number: 3,
      name: "Ali 'Imran",
      arabicName: "آل عمران",
      verses: 200,
      juz: 3,
      type: "Medinan",
    },
    {
      number: 4,
      name: "An-Nisa",
      arabicName: "النساء",
      verses: 176,
      juz: 4,
      type: "Medinan",
    },
    {
      number: 5,
      name: "Al-Ma'idah",
      arabicName: "المائدة",
      verses: 120,
      juz: 6,
      type: "Medinan",
    },
    {
      number: 6,
      name: "Al-An'am",
      arabicName: "الأنعام",
      verses: 165,
      juz: 7,
      type: "Meccan",
    },
    {
      number: 7,
      name: "Al-A'raf",
      arabicName: "الأعراف",
      verses: 206,
      juz: 8,
      type: "Meccan",
    },
    {
      number: 8,
      name: "Al-Anfal",
      arabicName: "الأنفال",
      verses: 75,
      juz: 9,
      type: "Medinan",
    },
    {
      number: 9,
      name: "At-Tawbah",
      arabicName: "التوبة",
      verses: 129,
      juz: 10,
      type: "Medinan",
    },
    {
      number: 10,
      name: "Yunus",
      arabicName: "يونس",
      verses: 109,
      juz: 11,
      type: "Meccan",
    },
  ];

  const juzOptions = ["All", "1", "2", "3", "4", "5"];

  const filteredSurahs = surahs.filter((surah) => {
    const matchesSearch =
      surah.name.toLowerCase().includes(searchText.toLowerCase()) ||
      surah.arabicName.includes(searchText);
    const matchesJuz =
      selectedJuz === "All" || surah.juz.toString() === selectedJuz;
    return matchesSearch && matchesJuz;
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View style={{ backgroundColor: colors.accent, paddingHorizontal: 16, paddingTop: 48, paddingBottom: 24 }}>
        <Text style={{ color: colors.card, fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Holy Quran</Text>

        {/* Search Bar */}
        <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 12, marginBottom: 16, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: colors.textSecondary, fontSize: 18, marginRight: 12 }}>🔍</Text>
          <TextInput
            placeholder="Search Surah..."
            placeholderTextColor={colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
            style={{ flex: 1, color: colors.text }}
          />
        </View>

        {/* Juz Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {juzOptions.map((juz) => (
              <TouchableOpacity
                key={juz}
                onPress={() => setSelectedJuz(juz)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 999,
                  backgroundColor: selectedJuz === juz ? colors.card : colors.accent + '99',
                  marginRight: 8,
                }}>
                <Text style={{ color: selectedJuz === juz ? colors.accent : colors.card, fontSize: 14, fontWeight: '500' }}>
                  {juz === 'All' ? 'All Juz' : `Juz ${juz}`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Surah List */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: colors.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -16, paddingTop: 16 }}>
          {filteredSurahs.map((surah, index) => (
            <TouchableOpacity
              key={surah.number}
              style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border }}>
              {/* Surah Number */}
              <View style={{ width: 48, height: 48, backgroundColor: colors.accent + '22', borderRadius: 999, alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                <Text style={{ color: colors.accent, fontWeight: 'bold', fontSize: 16 }}>{surah.number}</Text>
              </View>
              {/* Surah Info */}
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <Text style={{ color: colors.text, fontWeight: '600', fontSize: 16 }}>{surah.name}</Text>
                  <Text style={{ color: colors.text, fontSize: 18, fontWeight: '300' }}>{surah.arabicName}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ color: colors.textSecondary, fontSize: 14 }}>{surah.type} • {surah.verses} verses</Text>
                  <View style={{ backgroundColor: colors.accent + '11', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                    <Text style={{ color: colors.accent, fontSize: 12, fontWeight: '500' }}>Juz {surah.juz}</Text>
                  </View>
                </View>
              </View>
              {/* Arrow */}
              <View style={{ marginLeft: 12 }}>
                <Text style={{ color: colors.textSecondary, fontSize: 18 }}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Last Read Section */}
        <View style={{ backgroundColor: colors.accent + '11', borderRadius: 16, padding: 16, marginHorizontal: 16, marginVertical: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ color: colors.textSecondary, fontSize: 14, marginBottom: 4 }}>Last Read</Text>
              <Text style={{ color: colors.accent, fontSize: 18, fontWeight: 'bold' }}>Al-Kahf</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 14 }}>Verse 1-10</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: colors.accent, fontSize: 28, marginBottom: 8 }}>📖</Text>
              <TouchableOpacity style={{ backgroundColor: colors.card, opacity: 0.8, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999 }}>
                <Text style={{ color: colors.accent, fontSize: 14, fontWeight: '500' }}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Reading Stats */}
        <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginHorizontal: 16, marginBottom: 24 }}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Reading Progress</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 24, marginBottom: 8 }}>📊</Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.accent }}>15</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 14 }}>Surahs Read</Text>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 24, marginBottom: 8 }}>⏱️</Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#3B82F6' }}>2h 30m</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 14 }}>Reading Time</Text>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 24, marginBottom: 8 }}>🔥</Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#F97316' }}>7</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 14 }}>Day Streak</Text>
            </View>
          </View>
          <View style={{ backgroundColor: colors.border, borderRadius: 999, height: 8, marginBottom: 8 }}>
            <View style={{ backgroundColor: colors.accent, borderRadius: 999, height: 8, width: '25%' }} />
          </View>
          <Text style={{ color: colors.textSecondary, fontSize: 14, textAlign: 'center' }}>25% of Quran completed</Text>
        </View>

        <View className="h-6" />
      </ScrollView>
    </View>
  );
};

export default Quran;
