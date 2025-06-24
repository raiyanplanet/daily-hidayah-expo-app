import React, { useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

const Qibla = () => {
  const [currentDirection, setCurrentDirection] = useState(294);
  const [isCalibrated, setIsCalibrated] = useState(false);
  const [distance] = useState("7,823");
  const [location] = useState("Jakarta, Indonesia");

  // Simulate compass rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDirection((prev) => (prev + 1) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getDirectionText = (degrees: number) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-emerald-500 px-4 pt-12 pb-6">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl font-bold">Qibla Direction</Text>
          <TouchableOpacity>
            <Text className="text-white text-lg">📍</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-white text-sm opacity-80 mt-2">{location}</Text>
      </View>

      <View className="flex-1 px-4">
        {/* Compass Container */}
        <View className="bg-white rounded-t-3xl -mt-4 pt-8 pb-6 items-center">
          {/* Status Indicator */}
          <View
            className={`px-4 py-2 rounded-full mb-6 ${
              isCalibrated ? "bg-emerald-100" : "bg-orange-100"
            }`}>
            <Text
              className={`text-sm font-medium ${
                isCalibrated ? "text-emerald-600" : "text-orange-600"
              }`}>
              {isCalibrated ? "✓ Compass Calibrated" : "⚠ Calibration Needed"}
            </Text>
          </View>

          {/* Main Compass */}
          <View className="relative items-center justify-center mb-8">
            {/* Outer Circle */}
            <View
              className="w-80 h-80 rounded-full border-4 border-emerald-200 items-center justify-center relative"
              style={{
                transform: `rotate(${currentDirection}deg)`,
              }}>
              {/* Compass Markings */}
              <View className="absolute w-full h-full">
                {[...Array(36)].map((_, i) => (
                  <View
                    key={i}
                    className="absolute w-1 bg-gray-300"
                    style={{
                      height: i % 9 === 0 ? 20 : i % 3 === 0 ? 12 : 8,
                      top: i % 9 === 0 ? -10 : i % 3 === 0 ? -6 : -4,
                      left: "50%",
                      transformOrigin: "bottom",
                      transform: `translateX(-50%) rotate(${i * 10}deg)`,
                    }}
                  />
                ))}
              </View>

              {/* Direction Labels */}
              <Text className="absolute -top-8 text-lg font-bold text-gray-800">
                N
              </Text>
              <Text className="absolute -bottom-8 text-lg font-bold text-gray-800">
                S
              </Text>
              <Text className="absolute -right-8 top-1/2 text-lg font-bold text-gray-800">
                E
              </Text>
              <Text className="absolute -left-8 top-1/2 text-lg font-bold text-gray-800">
                W
              </Text>

              {/* Qibla Indicator */}
              <View
                className="absolute w-6 h-6 bg-emerald-500 rounded-full items-center justify-center"
                style={{
                  top: -12,
                  transform: "translateX(-50%)",
                  left: "50%",
                }}>
                <Text className="text-white text-xs font-bold">🕋</Text>
              </View>

              {/* Center Circle */}
              <View className="w-16 h-16 bg-emerald-500 rounded-full items-center justify-center">
                <Text className="text-white text-2xl">🧭</Text>
              </View>
            </View>

            {/* Phone Direction Indicator */}
            <View
              className="absolute w-1 h-20 bg-red-500 rounded-full"
              style={{ top: 20 }}
            />
          </View>

          {/* Direction Info */}
          <View className="items-center mb-6">
            <Text className="text-4xl font-bold text-emerald-600 mb-2">
              {currentDirection}°
            </Text>
            <Text className="text-lg text-gray-600 mb-1">
              {getDirectionText(currentDirection)}
            </Text>
            <Text className="text-sm text-gray-500">Direction to Kaaba</Text>
          </View>

          {/* Distance Info */}
          <View className="bg-emerald-50 rounded-xl p-4 w-full">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-emerald-600 font-semibold text-lg">
                  Distance to Makkah
                </Text>
                <Text className="text-gray-600 text-sm">
                  From your current location
                </Text>
              </View>
              <Text className="text-2xl font-bold text-emerald-600">
                {distance} km
              </Text>
            </View>
          </View>
        </View>

        {/* Calibration Instructions */}
        {!isCalibrated && (
          <View className="bg-orange-50 rounded-2xl p-4 mb-4">
            <Text className="text-orange-800 font-semibold text-lg mb-2">
              📱 Calibration Required
            </Text>
            <Text className="text-orange-700 text-sm mb-3">
              For accurate Qibla direction, please calibrate your device
              compass:
            </Text>
            <Text className="text-orange-600 text-sm">
              • Move your phone in a figure-8 motion{"\n"}• Keep away from metal
              objects{"\n"}• Ensure location services are enabled
            </Text>

            <TouchableOpacity
              className="bg-orange-500 rounded-xl p-3 mt-4"
              onPress={() => setIsCalibrated(true)}>
              <Text className="text-white text-center font-semibold">
                Start Calibration
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Prayer Time Integration */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <Text className="text-gray-800 font-semibold text-lg mb-3">
            Next Prayer
          </Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-emerald-100 rounded-full items-center justify-center mr-3">
                <Text className="text-2xl">🌅</Text>
              </View>
              <View>
                <Text className="text-gray-800 font-semibold">Fajr</Text>
                <Text className="text-gray-500 text-sm">
                  In 3 hours 9 minutes
                </Text>
              </View>
            </View>
            <Text className="text-emerald-600 font-bold text-xl">04:41</Text>
          </View>
        </View>

        {/* Islamic Information */}
        <View className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 mb-6">
          <Text className="text-white font-semibold text-lg mb-2">
            💫 Did You Know?
          </Text>
          <Text className="text-white text-sm opacity-90">
            The Kaaba is located at coordinates 21.4225° N, 39.8262° E in
            Makkah, Saudi Arabia. Muslims around the world face this direction
            during their five daily prayers.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Qibla;
