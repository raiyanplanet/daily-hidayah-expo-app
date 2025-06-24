import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { ThemeContext } from "../theme/ThemeContext";

interface Dua {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  category: string;
  reference: string;
  favorite: boolean;
}

export default function DuasScreen() {
  const { theme, colors } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [duas, setDuas] = useState<Dua[]>([
    {
      id: "1",
      title: "Dua for Morning",
      arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
      transliteration: "Asbahna wa asbahal mulku lillah, walhamdu lillah, la ilaha illallah wahdahu la shareeka lah",
      translation: "We have reached the morning and at this very time all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone, without any partner",
      category: "Morning & Evening",
      reference: "Muslim 4/2088",
      favorite: false,
    },
    {
      id: "2",
      title: "Dua for Evening",
      arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ",
      transliteration: "Amsayna wa amsal mulku lillah, walhamdu lillah, la ilaha illallah wahdahu la shareeka lah",
      translation: "We have reached the evening and at this very time all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone, without any partner",
      category: "Morning & Evening",
      reference: "Muslim 4/2088",
      favorite: false,
    },
    {
      id: "3",
      title: "Dua Before Eating",
      arabic: "بِسْمِ اللَّهِ",
      transliteration: "Bismillah",
      translation: "In the name of Allah",
      category: "Food & Drink",
      reference: "Bukhari 7/88",
      favorite: false,
    },
    {
      id: "4",
      title: "Dua After Eating",
      arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلاَ قُوَّةٍ",
      transliteration: "Alhamdu lillahil lathee at'amani haatha wa razaqaneehi min ghayri hawlin minnee wa la quwwatin",
      translation: "Praise be to Allah Who has fed me this food and provided it for me, without any strength or power on my part",
      category: "Food & Drink",
      reference: "Abu Dawud 3/3859",
      favorite: false,
    },
    {
      id: "5",
      title: "Dua for Travel",
      arabic: "اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ",
      transliteration: "Allahumma inna nas'aluka fee safarina haatha al-birra wat-taqwa, wa minal 'amali ma tardha, Allahumma hawwin 'alayna safarana haatha watwi 'anna bu'dahu",
      translation: "O Allah, we ask You on this journey of ours for righteousness, piety, and such deeds as are pleasing to You. O Allah, make this journey easy for us and fold up for us its distance",
      category: "Travel",
      reference: "Muslim 2/1342",
      favorite: false,
    },
    {
      id: "6",
      title: "Dua for Entering Home",
      arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
      transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Allahi rabbina tawakkalna",
      translation: "In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we place our trust",
      category: "Home",
      reference: "Abu Dawud 4/5096",
      favorite: false,
    },
    {
      id: "7",
      title: "Dua for Leaving Home",
      arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ",
      transliteration: "Bismillahi, tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah",
      translation: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah",
      category: "Home",
      reference: "Abu Dawud 4/5095",
      favorite: false,
    },
    {
      id: "8",
      title: "Dua for Seeking Knowledge",
      arabic: "رَبِّ زِدْنِي عِلْمًا",
      transliteration: "Rabbi zidni 'ilma",
      translation: "My Lord, increase me in knowledge",
      category: "Knowledge",
      reference: "Quran 20:114",
      favorite: false,
    },
  ]);

  const categories = ["All", "Morning & Evening", "Food & Drink", "Travel", "Home", "Knowledge"];

  const toggleFavorite = (id: string) => {
    setDuas((prev) =>
      prev.map((dua) =>
        dua.id === id ? { ...dua, favorite: !dua.favorite } : dua
      )
    );
  };

  const filteredDuas = duas.filter((dua) => {
    const matchesSearch = dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dua.translation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || dua.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderDua = ({ item }: { item: Dua }) => (
    <View style={{ backgroundColor: colors.card, borderRadius: 32, padding: 24, marginBottom: 16, shadowColor: colors.border, shadowOpacity: 0.1, shadowRadius: 4 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
            {item.title}
          </Text>
          <View style={{ backgroundColor: colors.border, borderRadius: 999, paddingHorizontal: 3, paddingVertical: 1, alignSelf: 'flex-start', marginBottom: 3 }}>
            <Text style={{ color: colors.textSecondary, fontSize: 12, fontWeight: '600' }}>
              {item.category}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => toggleFavorite(item.id)}
          style={{ padding: 8 }}>
          <Ionicons
            name={item.favorite ? "heart" : "heart-outline"}
            size={24}
            color={item.favorite ? "#EF4444" : "#9CA3AF"}
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ color: colors.text, fontSize: 20, fontWeight: '300', marginBottom: 12, textAlign: 'right', lineHeight: 28 }}>
          {item.arabic}
        </Text>
        <Text style={{ color: colors.textSecondary, fontSize: 14, fontStyle: 'italic', marginBottom: 8 }}>
          {item.transliteration}
        </Text>
        <Text style={{ color: colors.text, fontSize: 16, lineHeight: 24 }}>
          {item.translation}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border }}>
        <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
          {item.reference}
        </Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "Copy Dua",
              "Would you like to copy this dua to clipboard?",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Copy", onPress: () => Alert.alert("Copied!", "Dua copied to clipboard") }
              ]
            );
          }}
          style={{ padding: 8, backgroundColor: colors.border, borderRadius: 8 }}>
          <Text style={{ color: colors.textSecondary, fontSize: 14, fontWeight: '600' }}>
            Copy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item)}
      style={{ backgroundColor: colors.card, padding: 16, marginRight: 8, borderRadius: 8 }}>
      <Text
        style={{ color: colors.textSecondary, fontSize: 14, fontWeight: 'semibold' }}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.accent} />
      {/* Header */}
      <View style={{ backgroundColor: colors.card, paddingHorizontal: 24, paddingVertical: 16, shadowColor: colors.border, shadowOpacity: 0.1, shadowRadius: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, backgroundColor: colors.border, borderRadius: 999 }}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>Daily Duas</Text>
          <TouchableOpacity
            onPress={() => {
              const favorites = duas.filter(dua => dua.favorite);
              Alert.alert('Favorites', `You have ${favorites.length} favorite duas`);
            }}
            style={{ padding: 8, backgroundColor: '#FEE2E2', borderRadius: 999 }}>
            <Ionicons name="heart" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 24 }}>
        {/* Search Bar */}
        <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 24, shadowColor: colors.border, shadowOpacity: 0.1, shadowRadius: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="search" size={20} color={colors.textSecondary} />
            <TextInput
              placeholder="Search duas..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{ flex: 1, marginLeft: 12, color: colors.text }}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>
        {/* Categories */}
        <View style={{ marginBottom: 24 }}>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* Duas List */}
        <FlatList
          data={filteredDuas}
          renderItem={renderDua}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
} 