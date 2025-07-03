import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import {
  Alert,
  Clipboard,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Dua, DUAS_BY_CATEGORY, DUAS_CATEGORIES } from "../constants/duas";
import { ThemeContext } from "../theme/ThemeContext";

export default function DuasScreen() {
  const { theme, colors } = useContext(ThemeContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [duas, setDuas] = useState<Dua[]>([]);

  const categories = DUAS_CATEGORIES.filter(cat => cat !== "All");

  // Category icons mapping
  const categoryIcons = {
    "Morning & Evening": "sunny",
    "Food & Drink": "restaurant",
    "Travel": "airplane",
    "Home": "home",
    "Knowledge": "school",
    "Marriage": "heart",
  };

  const toggleFavorite = (id: string) => {
    setDuas((prev) =>
      prev.map((dua) =>
        dua.id === id ? { ...dua, favorite: !dua.favorite } : dua
      )
    );
  };

  const openCategoryModal = (category: string) => {
    const categoryDuas = DUAS_BY_CATEGORY[category as keyof typeof DUAS_BY_CATEGORY] || [];
    setDuas(categoryDuas);
    setSelectedCategory(category);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedCategory("");
  };

  const renderDua = ({ item }: { item: Dua }) => (
    <View style={{ 
      backgroundColor: colors.card, 
      borderRadius: 16, 
      padding: 20, 
      marginBottom: 16, 
      shadowColor: colors.border, 
      shadowOpacity: 0.05, 
      shadowRadius: 8,
      elevation: 2,
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
            {item.title}
          </Text>
          <View style={{ 
            backgroundColor: colors.accent + '15', 
            borderRadius: 8, 
            paddingHorizontal: 8, 
            paddingVertical: 4, 
            alignSelf: 'flex-start'
          }}>
            <Text style={{ color: colors.accent, fontSize: 12, fontWeight: '500' }}>
              {item.category}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => toggleFavorite(item.id)}
          style={{ padding: 4 }}>
          <Ionicons
            name={item.favorite ? "heart" : "heart-outline"}
            size={20}
            color={item.favorite ? "#EF4444" : colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ 
          color: colors.text, 
          fontSize: 20, 
          fontWeight: '300', 
          marginBottom: 16, 
          textAlign: 'right', 
          lineHeight: 32,
          backgroundColor: colors.background,
          padding: 16,
          borderRadius: 12,
        }}>
          {item.arabic}
        </Text>
        <Text style={{ 
          color: colors.textSecondary, 
          fontSize: 14, 
          fontStyle: 'italic', 
          marginBottom: 12,
        }}>
          {item.transliteration}
        </Text>
        <Text style={{ 
          color: colors.textSecondary, 
          fontSize: 12, 
          fontStyle: 'italic', 
          marginBottom: 16,
        }}>
          {item.banglaPronunciation}
        </Text>
        <Text style={{ 
          color: colors.text, 
          fontSize: 15, 
          lineHeight: 22, 
          marginBottom: 12,
        }}>
          {item.translation}
        </Text>
        <Text style={{ 
          color: colors.textSecondary, 
          fontSize: 14, 
          lineHeight: 20,
        }}>
          {item.banglaTranslation}
        </Text>
      </View>

      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingTop: 16, 
        borderTopWidth: 1, 
        borderTopColor: colors.border + '30'
      }}>
        <Text style={{ color: colors.textSecondary, fontSize: 12, fontWeight: '500' }}>
          {item.reference}
        </Text>
        <TouchableOpacity
          onPress={() => {
            const duaText = `${item.title}\n\n${item.arabic}\n\n${item.transliteration}\n\n${item.translation}\n\n${item.banglaTranslation}\n\nReference: ${item.reference}`;
            Clipboard.setString(duaText);
            Alert.alert("Copied!", "Dua copied to clipboard");
          }}
          style={{ 
            padding: 8, 
            backgroundColor: colors.accent, 
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <Ionicons name="copy-outline" size={14} color="#fff" style={{ marginRight: 4 }} />
          <Text style={{ color: "#fff", fontSize: 12, fontWeight: '500' }}>
            Copy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCategoryButton = (category: string) => {
    const duaCount = DUAS_BY_CATEGORY[category as keyof typeof DUAS_BY_CATEGORY]?.length || 0;
    const iconName = categoryIcons[category as keyof typeof categoryIcons] || "book";
    
    return (
      <TouchableOpacity
        key={category}
        onPress={() => openCategoryModal(category)}
        style={{ 
          backgroundColor: colors.card, 
          padding: 20, 
          marginBottom: 12,
          borderRadius: 16, 
          shadowColor: colors.border, 
          shadowOpacity: 0.05, 
          shadowRadius: 8,
          elevation: 2,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ 
            backgroundColor: colors.accent + '15', 
            borderRadius: 12, 
            padding: 10, 
            marginRight: 16 
          }}>
            <Ionicons name={iconName as any} size={24} color={colors.accent} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ 
              color: colors.text, 
              fontSize: 16, 
              fontWeight: '600',
              marginBottom: 4,
            }}>
              {category}
            </Text>
            <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
              {duaCount} duas
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.accent} />
      
      {/* Header */}
      <View style={{ 
        paddingHorizontal: 24, 
        paddingTop: 24, 
        paddingBottom: 20,
        backgroundColor: colors.background,
      }}>
        <Text style={{ color: colors.text, fontSize: 32, fontWeight: '700', marginBottom: 8 }}>
          Duas
        </Text>
        <Text style={{ color: colors.textSecondary, fontSize: 16 }}>
          Daily prayers and supplications
        </Text>
      </View>

      {/* Category Buttons with ScrollView */}
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {categories.map(renderCategoryButton)}
      </ScrollView>

      {/* Modal for Duas */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeModal}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.accent} />
          
          {/* Modal Header */}
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            paddingHorizontal: 24, 
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.border + '30',
            backgroundColor: colors.background
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={{ 
                backgroundColor: colors.accent + '15', 
                borderRadius: 10, 
                padding: 8, 
                marginRight: 12 
              }}>
                <Ionicons 
                  name={categoryIcons[selectedCategory as keyof typeof categoryIcons] as any || "book"} 
                  size={18} 
                  color={colors.accent} 
                />
              </View>
              <Text style={{ color: colors.text, fontSize: 18, fontWeight: '600', flex: 1 }}>
                {selectedCategory}
              </Text>
            </View>
            <TouchableOpacity 
              onPress={closeModal} 
              style={{ 
                padding: 8, 
                backgroundColor: colors.border + '30', 
                borderRadius: 12 
              }}
            >
              <Ionicons name="close" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Duas List in Modal */}
          <FlatList
            data={duas}
            renderItem={renderDua}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
} 