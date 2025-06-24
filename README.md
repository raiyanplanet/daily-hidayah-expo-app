# Daily Hidayah - Islamic App 📱🕌

<div align="center">
  <img src="./assets/images/logo.png" alt="Daily Hidayah Logo" width="200" height="200">
  <br>
  <h3>Your Daily Companion for Islamic Practices</h3>
</div>

---

## 🌟 About Daily Hidayah

Daily Hidayah is a comprehensive Islamic mobile application built with React Native and Expo, designed to help Muslims maintain their daily spiritual practices. The app provides prayer times, Quran reading, tasbih counter, duas, and more in a beautiful, user-friendly interface with both light and dark themes.

## ✨ Features

### 🕌 Prayer Times & Qibla
- **Real-time Prayer Times**: Accurate prayer times with countdown timers
- **Prayer Notifications**: Never miss a prayer with timely reminders
- **Qibla Direction**: Find the direction of the Kaaba from anywhere
- **Arabic Names**: All prayers displayed with their Arabic names and descriptions

### 📿 Tasbih Counter
- **Digital Tasbih**: Count your dhikr with a beautiful circular progress indicator
- **Progress Tracking**: Visual progress bar showing your daily tasbih goals
- **Haptic Feedback**: Tactile feedback for each count
- **Reset Functionality**: Easy reset to start fresh

### 📖 Quran & Islamic Content
- **Quran Reading**: Access to the Holy Quran with beautiful typography
- **Daily Duas**: Curated collection of authentic duas for daily use
- **Dhikr Collection**: Comprehensive collection of Islamic remembrances
- **Reflection Section**: Daily Islamic content that changes hourly

### 🎨 User Experience
- **Dark/Light Theme**: Toggle between themes for comfortable reading
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Responsive Design**: Optimized for all screen sizes
- **Offline Support**: Core features work without internet connection

### 👤 Profile & Settings
- **Personal Dashboard**: Track your daily Islamic activities
- **Theme Preferences**: Customize your app appearance
- **Settings Management**: Easy access to app configurations

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd islamic-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your preferred platform**
   ```bash
   # For iOS
   npx expo run:ios
   
   # For Android
   npx expo run:android
   
   # For web
   npx expo run:web
   ```

## 📱 App Structure

```
app/
├── (tabs)/                 # Main tab navigation
│   ├── index.tsx          # Home screen with prayer times & tasbih
│   ├── prayer.tsx         # Detailed prayer times screen
│   ├── qibla.tsx          # Qibla direction finder
│   └── profile.tsx        # User profile & settings
├── screens/               # Additional screens
│   ├── tasbih.tsx         # Full tasbih counter
│   ├── quran.tsx          # Quran reading interface
│   ├── duas.tsx           # Duas collection
│   ├── dhikr.tsx          # Dhikr collection
│   └── adzan.tsx          # Adhan player
├── constants/             # App constants and data
├── theme/                 # Theme context and styling
└── _layout.tsx           # Root layout configuration
```

## 🛠️ Built With

- **[React Native](https://reactnative.dev/)** - Mobile app framework
- **[Expo](https://expo.dev/)** - Development platform and tools
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[NativeWind](https://www.nativewind.dev/)** - Tailwind CSS for React Native
- **[React Navigation](https://reactnavigation.org/)** - Navigation library
- **[Expo Router](https://docs.expo.dev/router/introduction/)** - File-based routing
- **[React Native SVG](https://github.com/react-native-svg/react-native-svg)** - SVG support
- **[Expo Vector Icons](https://docs.expo.dev/guides/icons/)** - Icon library

## 🎯 Key Features Implementation

### Prayer Times System
- Real-time prayer time calculations
- Countdown timers with seconds precision
- Arabic prayer names and descriptions
- Automatic timezone detection

### Theme System
- Context-based theme management
- Smooth theme transitions
- Persistent theme preferences
- Consistent styling across all screens

### Tasbih Counter
- Circular progress visualization
- Haptic feedback integration
- Progress persistence
- Beautiful animations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need support, please open an issue on GitHub or contact the development team.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped make this app better
- Special thanks to the Islamic community for feedback and suggestions
- Built with love for the Muslim ummah

---

<div align="center">
  <p>Made with ❤️ for the Muslim Community</p>
  <p>Daily Hidayah - Your Daily Islamic Companion</p>
</div>
