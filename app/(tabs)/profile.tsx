import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from "react";
import { Image, Modal, Pressable, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import appConfig from '../../app.json';
import { ThemeContext } from "../theme/ThemeContext";

const PROFILE_NAME_KEY = 'profile_name';
const PROFILE_MEMBER_SINCE_KEY = 'profile_member_since';

const AVATAR_OPTIONS = [
  require('../../assets/images/avater1.jpg'),
  require('../../assets/images/avater2.jpg'),
  require('../../assets/images/avater3.jpg'),
  require('../../assets/images/avater4.jpg'),
];

const AVATAR_KEY = 'profile_avatar';

const Profile = () => {
  const [notifications, setNotifications] = useState(true);
  const { theme, colors, toggleTheme } = useContext(ThemeContext);
  const [arabicText, setArabicText] = useState(true);
  const [profileName, setProfileName] = useState('Tawsiful Alam Raiyan');
  const [editingName, setEditingName] = useState(false);
  const [memberSince, setMemberSince] = useState('');
  const [avatar, setAvatar] = useState(AVATAR_OPTIONS[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempName, setTempName] = useState(profileName);
  const [tempAvatar, setTempAvatar] = useState(avatar);

  useEffect(() => {
    // Load profile name and member since date
    (async () => {
      const savedName = await AsyncStorage.getItem(PROFILE_NAME_KEY);
      if (savedName) setProfileName(savedName);
      let since = await AsyncStorage.getItem(PROFILE_MEMBER_SINCE_KEY);
      if (!since) {
        since = new Date().toISOString();
        await AsyncStorage.setItem(PROFILE_MEMBER_SINCE_KEY, since);
      }
      setMemberSince(since);
      const savedAvatarIdx = await AsyncStorage.getItem(AVATAR_KEY);
      if (savedAvatarIdx && !isNaN(Number(savedAvatarIdx)) && AVATAR_OPTIONS[Number(savedAvatarIdx)]) {
        setAvatar(AVATAR_OPTIONS[Number(savedAvatarIdx)]);
      }
    })();
  }, []);

  const saveProfileName = async (name: string) => {
    setProfileName(name);
    setEditingName(false);
    await AsyncStorage.setItem(PROFILE_NAME_KEY, name);
  };

  const formatMemberSince = (iso: string) => {
    if (!iso) return '';
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const profileStats = [
    {
      label: "Prayers Completed",
      value: "1,247",
      icon: "🤲",
      color: "text-emerald-600",
    },
    { label: "Quran Read", value: "45%", icon: "📖", color: "text-blue-600" },
    { label: "Day Streak", value: "23", icon: "🔥", color: "text-orange-600" },
    {
      label: "Dhikr Count",
      value: "5,430",
      icon: "📿",
      color: "text-purple-600",
    },
  ];

  const menuItems = [
    { title: "Prayer Settings", icon: "🕌", arrow: true },
    { title: "Quran Settings", icon: "📖", arrow: true },
    { title: "Notification Settings", icon: "🔔", arrow: true },
    { title: "Location Settings", icon: "📍", arrow: true },
    { title: "Language", icon: "🌐", arrow: true, subtitle: "English" },
    { title: "Islamic Calendar", icon: "📅", arrow: true },
    { title: "Donate", icon: "💝", arrow: true },
    { title: "Share App", icon: "📤", arrow: true },
    { title: "Rate Us", icon: "⭐", arrow: true },
    { title: "Help & Support", icon: "❓", arrow: true },
    { title: "About", icon: "ℹ️", arrow: true },
  ];

  const openEditModal = () => {
    setTempName(profileName);
    setTempAvatar(avatar);
    setModalVisible(true);
  };

  const saveProfile = async () => {
    setProfileName(tempName);
    setAvatar(tempAvatar);
    await AsyncStorage.setItem(PROFILE_NAME_KEY, tempName);
    const idx = AVATAR_OPTIONS.findIndex(a => a === tempAvatar);
    await AsyncStorage.setItem(AVATAR_KEY, idx.toString());
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Profile Header - Modern Centered Card */}
      <View className='flex px-5 py-10 flex-row items-center gap-3'>
        <View style={{ position: 'relative' }}>
          <View style={{ backgroundColor: colors.card, borderRadius: 48, width: 70, height: 70, alignItems: 'center', justifyContent: 'center', elevation: 6, shadowColor: colors.accent, shadowOpacity: 0.12, shadowRadius: 12, marginBottom: 12, overflow: 'hidden' }}>
            <Image source={avatar} style={{ width: 70, height: 70, borderRadius: 48 }} resizeMode="cover" />
          </View>
          <Pressable
            onPress={openEditModal}
            style={{ position: 'absolute', bottom: 8, right: 8, backgroundColor: colors.accent, borderRadius: 16, padding: 4, elevation: 2 }}>
            <Text style={{ color: colors.card, fontSize: 14 }}>✏️</Text>
          </Pressable>
        </View>
        <View>
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: 'bold', marginBottom: 4 }}>{profileName}</Text>
        <Text style={{ color: colors.textSecondary, fontSize: 14, marginBottom: 2 }}>Member since {formatMemberSince(memberSince)}</Text>
        <Text style={{ color: colors.textSecondary, fontSize: 14 }}>📍 Jakarta, Indonesia</Text>
        </View>
      </View>

      {/* Edit Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: colors.background + 'CC', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 24, width: 320, alignItems: 'center', shadowColor: colors.accent, shadowOpacity: 0.15, shadowRadius: 12 }}>
            <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Edit Profile</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
              {AVATAR_OPTIONS.map((a, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => setTempAvatar(a)}
                  style={{ marginHorizontal: 8, borderWidth: tempAvatar === a ? 2 : 0, borderColor: colors.accent, borderRadius: 48, padding: 2, backgroundColor: tempAvatar === a ? colors.accent + '22' : 'transparent', overflow: 'hidden' }}
                >
                  <Image source={a} style={{ width: 56, height: 56, borderRadius: 28 }} resizeMode="cover" />
                </Pressable>
              ))}
            </View>
            <TextInput
              value={tempName}
              onChangeText={setTempName}
              style={{ color: colors.text, fontSize: 18, backgroundColor: colors.input, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, width: '100%', marginBottom: 20 }}
              placeholder="Enter your name"
              placeholderTextColor={colors.textSecondary}
              returnKeyType="done"
              onSubmitEditing={saveProfile}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ flex: 1, marginRight: 8, backgroundColor: colors.input, borderRadius: 8, paddingVertical: 10, alignItems: 'center' }}>
                <Text style={{ color: colors.text }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveProfile} style={{ flex: 1, marginLeft: 8, backgroundColor: colors.accent, borderRadius: 8, paddingVertical: 10, alignItems: 'center' }}>
                <Text style={{ color: colors.card, fontWeight: 'bold' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Stats Section */}
        <View style={{ backgroundColor: colors.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -16, paddingTop: 24, paddingBottom: 16 }}>
          <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 18, paddingHorizontal: 16, marginBottom: 16 }}>
            Your Progress
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, marginBottom: 16 }}>
            {profileStats.map((stat, index) => (
              <View key={index} style={{ width: '50%', marginBottom: 16 }}>
                <View style={{ backgroundColor: colors.background, borderRadius: 16, padding: 16, marginRight: 8 }}>
                  <Text style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</Text>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.accent, marginBottom: 4 }}>{stat.value}</Text>
                  <Text style={{ color: colors.textSecondary, fontSize: 14 }}>{stat.label}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Settings */}
        <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginHorizontal: 16, marginBottom: 16, shadowColor: colors.border, shadowOpacity: 0.1, shadowRadius: 4 }}>
          <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>
            Quick Settings
          </Text>

          <View>
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Text className="text-xl mr-3">🔔</Text>
                <Text style={{ color: colors.text, fontWeight: '500', fontSize: 16 }}>Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={notifications ? "#ffffff" : "#f9fafb"}
              />
            </View>

            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Text className="text-xl mr-3">🌙</Text>
                <Text style={{ color: colors.text, fontWeight: '500', fontSize: 16 }}>Dark Mode</Text>
              </View>
              <Switch
                value={theme === "dark"}
                onValueChange={toggleTheme}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={theme === "dark" ? "#ffffff" : "#f9fafb"}
              />
            </View>

            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Text className="text-xl mr-3">🕋</Text>
                <Text style={{ color: colors.text, fontWeight: '500', fontSize: 16 }}>Arabic Text</Text>
              </View>
              <Switch
                value={arabicText}
                onValueChange={setArabicText}
                trackColor={{ false: "#e5e7eb", true: "#10b981" }}
                thumbColor={arabicText ? "#ffffff" : "#f9fafb"}
              />
            </View>
          </View>
        </View>

        {/* Achievement Section */}
        <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginHorizontal: 16, marginBottom: 16, shadowColor: colors.border, shadowOpacity: 0.1, shadowRadius: 4 }}>
          <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>
            Recent Achievements
          </Text>

          <View>
            <View className="flex-row items-center p-3 bg-emerald-50 rounded-xl">
              <View style={{ width: 48, height: 48, backgroundColor: colors.accent, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <Text style={{ color: colors.card, fontSize: 18 }}>🏆</Text>
              </View>
              <View className="flex-1">
                <Text style={{ color: colors.text, fontWeight: '500', fontSize: 16 }}>
                  Prayer Streak Master
                </Text>
                <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
                  Completed 30 days of regular prayers
                </Text>
              </View>
              <Text style={{ color: colors.accent, fontSize: 12, fontWeight: '500' }}>Today</Text>
            </View>

            <View className="flex-row items-center p-3 bg-blue-50 rounded-xl">
              <View style={{ width: 48, height: 48, backgroundColor: '#3B82F6', borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <Text style={{ color: colors.card, fontSize: 18 }}>📚</Text>
              </View>
              <View className="flex-1">
                <Text style={{ color: colors.text, fontWeight: '500', fontSize: 16 }}>Quran Reader</Text>
                <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
                  Read 10 complete Surahs
                </Text>
              </View>
              <Text style={{ color: '#3B82F6', fontSize: 12, fontWeight: '500' }}>2 days ago</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={{ backgroundColor: colors.card, borderRadius: 16, marginHorizontal: 16, marginBottom: 16, shadowColor: colors.border, shadowOpacity: 0.1, shadowRadius: 4, overflow: 'hidden' }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: index !== menuItems.length - 1 ? 1 : 0, borderBottomColor: colors.border }}>
              <Text style={{ fontSize: 20, marginRight: 16 }}>{item.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.text, fontWeight: '500', fontSize: 16 }}>{item.title}</Text>
                {item.subtitle && (
                  <Text style={{ color: colors.textSecondary, fontSize: 14 }}>{item.subtitle}</Text>
                )}
              </View>
              {item.arrow && <Text style={{ color: colors.textSecondary, fontSize: 18 }}>›</Text>}
            </TouchableOpacity>
          ))}
        </View>

        {/* Islamic Quote */}
        <View style={{ backgroundColor: colors.accent, borderRadius: 16, padding: 16, marginHorizontal: 16, marginBottom: 16 }}>
          <Text style={{ color: colors.card, textAlign: 'center', fontSize: 18, fontWeight: '300', lineHeight: 28, marginBottom: 12 }}>
            And whoever relies upon Allah - then He is sufficient for him.
            Indeed, Allah will accomplish His purpose.
          </Text>
          <Text style={{ color: colors.card, textAlign: 'center', fontSize: 14, opacity: 0.8 }}>- Quran 65:3</Text>
        </View>

        {/* App Info */}
        <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginHorizontal: 16, marginBottom: 24, shadowColor: colors.border, shadowOpacity: 0.1, shadowRadius: 4 }}>
          <View style={{ alignItems: 'center' }}>
            <Image source={require('../../assets/images/logo.png')} className='w-20 h-20 rounded-xl' />
            <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 18 }}>{appConfig.expo.name}</Text>
            <Text style={{ color: colors.textSecondary, fontSize: 14, marginBottom: 8 }}>Version {appConfig.expo.version}</Text>
            <Text style={{ color: colors.textSecondary, fontSize: 12, textAlign: 'center', marginBottom: 4 }}>{appConfig.expo.slug}</Text>
            <Text style={{ color: colors.textSecondary, fontSize: 12, textAlign: 'center' }}>Made with ❤️ by Raiyan Software</Text>
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
};

export default Profile;
