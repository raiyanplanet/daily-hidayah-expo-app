import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import {
  Alert,
  Clipboard,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Dua, DUAS_CATEGORIES, DUAS_DATA } from "../constants/duas";
import { ThemeContext } from "../theme/ThemeContext";

export default function DuasScreen() {
  const { theme, colors } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [duas, setDuas] = useState<Dua[]>(DUAS_DATA);

  const categories = DUAS_CATEGORIES;

  const toggleFavorite = (id: string) => {
    setDuas((prev) =>
      prev.map((dua) =>
        dua.id === id ? { ...dua, favorite: !dua.favorite } : dua
      )
    );
  };

  const filteredDuas = duas.filter((dua) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      dua.title.toLowerCase().includes(searchLower) ||
      dua.translation.toLowerCase().includes(searchLower) ||
      dua.banglaTranslation.toLowerCase().includes(searchLower) ||
      dua.transliteration.toLowerCase().includes(searchLower) ||
      dua.category.toLowerCase().includes(searchLower) ||
      dua.reference.toLowerCase().includes(searchLower);
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
          <View style={{ backgroundColor: colors.accent, borderRadius: 999, paddingHorizontal: 5, paddingVertical: 2, alignSelf: 'flex-start', marginBottom: 3 }}>
            <Text style={{ color: "#fff", fontSize: 12, fontWeight: '600' }}>
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
        <Text style={{ color: colors.textSecondary, fontSize: 12, fontStyle: 'italic', marginBottom: 8 }}>
          {item.banglaPronunciation}
        </Text>
        <Text style={{ color: colors.text, fontSize: 16, lineHeight: 24, marginBottom: 8 }}>
          {item.translation}
        </Text>
        <Text style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 20 }}>
          {item.banglaTranslation}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border }}>
        <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
          {item.reference}
        </Text>
        <TouchableOpacity
          onPress={() => {
            const duaText = `${item.title}\n\n${item.arabic}\n\n${item.transliteration}\n\n${item.translation}\n\n${item.banglaTranslation}\n\nReference: ${item.reference}`;
            Clipboard.setString(duaText);
            Alert.alert("Copied!", "Dua copied to clipboard");
          }}
          style={{ padding: 8, backgroundColor: colors.border, borderRadius: 8 }}>
          <Text style={{ color: colors.textSecondary, fontSize: 14, fontWeight: '600' }}>
            Copy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.accent} />
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 24 }}>
        {/* Search Bar */}
        <View style={{ 
          backgroundColor: colors.card, 
          borderRadius: 10, 
          paddingHorizontal: 10, 
          paddingVertical: 10, 
          marginBottom: 10, 
          
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="search" size={22} color={colors.textSecondary} />
            <TextInput
              placeholder="Search duas by title, meaning, or category..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{ 
                flex: 1, 
                marginLeft: 15, 
                color: colors.text, 
                fontSize: 16,
                fontWeight: '400'
              }}
              placeholderTextColor={colors.textSecondary}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")} style={{ padding: 4 }}>
                <Ionicons name="close-circle" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* Categories */}
        <View style={{ marginBottom: 20, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setSelectedCategory(item)}
              style={{ 
                backgroundColor: selectedCategory === item ? colors.accent : colors.card, 
                padding: 10, 
                marginRight: 5, 
                marginBottom: 5,
                borderRadius: 8, 
                alignItems: 'center', 
                justifyContent: 'center'
              }}>
              <Text
                style={{ 
                  color: selectedCategory === item ? "#fff" : colors.textSecondary, 
                  fontSize: 14, 
                  fontWeight: 'semibold'
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
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