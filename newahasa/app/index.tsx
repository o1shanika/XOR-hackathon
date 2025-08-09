import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import i18n from './i18/i18next';



const { width, height } = Dimensions.get("window");



const AhasaStartScreen = () => {
  const { t } = useTranslation();
  const handleStartPress = () => {
    const router = useRouter();
    router.push("/login");
  };

  const changeLanguage = async (language) => {
  try {
    await i18n.changeLanguage(language);
    await AsyncStorage.setItem('appLanguage', language);
  } catch (error) {
    console.error('Language change error:', error);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Logo Image from Assets */}
        <Image
          source={require("../assets/images/rlogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Brand Name Image from Assets */}
        <Image
          source={require("../assets/images/rlogo-name.png")}
          style={styles.brandName}
          resizeMode="contain"
        />

        {/* Tagline */}
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline}>
            <Text style={styles.beSafe}>Be Safe, </Text>
            <Text style={styles.stayConnected}>Stay Connected, </Text>
            <Text style={styles.strongTogether}>Strong Together</Text>
          </Text>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartPress}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>{t('start')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.languagePicker}>
  <RNPickerSelect
    onValueChange={(value) => changeLanguage(value)}
    placeholder={{ label: 'Language', value: null }} //label: '🌐'
    items={[
      { label: 'English', value: 'en' },
      { label: 'සිංහල', value: 'si' },
      { label: 'தமிழ்', value: 'ta' },
    ]}
    style={pickerSelectStyles}
    useNativeAndroidPickerStyle={false}
    Icon={() => (
      <View style={{ paddingRight: 10, paddingTop: 4 }}>
        <Ionicons name="chevron-down" size={18} color="#00BFFF" />
      </View>
    )}
  />
</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },

  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  logo: {
    width: 300,
    height: 300,
    marginTop:100,
  },
  brandName: {
    width: 200,
    height: 200,
    top:-100,
  },
  taglineContainer: {
    alignItems: "center",
    marginHorizontal: 20,
    top:-30,
  },
  tagline: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
  beSafe: {
    color: "#FF9500", // Orange color
    fontWeight: "500",
  },
  stayConnected: {
    color: "#FF3B30", // Red color
    fontWeight: "500",
  },
  strongTogether: {
    color: "#00BFFF", // Blue color
    fontWeight: "500",
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  startButton: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: "#00BFFF",
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 40,
    elevation: 2, // Android shadow
    // shadowColor: "#000", // iOS shadow
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: "#333",
    borderRadius: 2.5,
  },
  languagePicker: {
  position: 'absolute',
  top: 50,
  right: 20,
  width: 100,
  //zIndex: 10,
},


});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 4,
    color: '#007AFF',
    paddingRight: 30,
    textAlign: "center",
  },
  inputAndroid: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    color: '#00BFFF',
    backgroundColor: '#ffff',
    paddingRight: 30,
  },
  placeholder: {
    color: "#00bfff",
  },
  });

export default AhasaStartScreen;