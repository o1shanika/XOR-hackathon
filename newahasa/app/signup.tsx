import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import * as Location from 'expo-location';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const API_BASE_URL="http://192.168.43.135:5000"

// Get screen dimensions for responsive sizing
const { height, width } = Dimensions.get("window");

const SignUpScreen = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [number0, setNumber0] = useState(""); //
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [location2, setLocation2] = useState(""); // For current location

  
  const [isFullnameFocused, setIsFullnameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isCountryFocused, setIsCountryFocused] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [isNumber0Focused, setIsNumber0Focused] = useState(false);
  const [isNumber1Focused, setIsNumber1Focused] = useState(false);
  const [isNumber2Focused, setIsNumber2Focused] = useState(false);
  const [isLocation2Focused, setIsLocation2Focused] = useState(false);

  useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission denied", "Allow location access to continue.");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // Optionally reverse geocode to get readable address
    let address = await Location.reverseGeocodeAsync({
      latitude,
      longitude
    });

    if (address.length > 0) {
      const { city, region, country } = address[0];
      setLocation2(`${city}, ${region}, ${country}`);
    } else {
      setLocation2(`${latitude}, ${longitude}`);
    }
  })();
}, []);

  const validateForm = () => {

    if (!fullName.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return false;
    }
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return false;
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }
    if (!password || password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return false;
    }
    if (!country.trim()) {
      Alert.alert("Error", "Please enter your country");
      return false;
    }
    if (!location.trim()) {
      Alert.alert("Error", "Please enter your location");
      return false;
    }
    if (!number1.trim()) {
      Alert.alert("Error", "Please enter your primary mobile number");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {

      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {

        fullName,
        email,
        password,
        country,
        location,
        location2,
        number0, //
        number1,
        number2,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 seconds timeout
      });

      // Store user details in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user)); // Store the full user object
      await AsyncStorage.setItem('userId', response.data.user.id); // Store userId separately if needed

      // Axios automatically parses JSON, so response.data contains the parsed data
      Alert.alert(t('signup.successTitle'), t('signup.successMsg'),
      [
        {
          text: "OK",
          onPress: () => router.push("/Home_2"), // Navigate to the next screen

        },
      ]);

      console.log('userId:',response.data.user.id);
    } catch (error) {
      console.error("Signup error:", error);

      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.msg || "Something went wrong";
        Alert.alert("Error", errorMessage);
      } else if (error.request) {
        // Network error
        Alert.alert("Error", "Network error. Please check your connection.");
      } else {
        // Other error
        Alert.alert("Error", "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        style={styles.keyboardAvoidView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentContainer}>
              {/* Header Section */}
              <View style={styles.headerSection}>
               <Text style={styles.title}>{t('signup.title')}</Text>
                <Text style={styles.subtitle}>{t('signup.subtitle')}</Text>
              </View>

              {/* Form Section */}
              <View style={styles.formSection}>
                <Text style={styles.inputLabel}>{t('signup.fullName')}</Text>
                <View 
                  style={[
                    styles.inputWrapper,
                    isFullnameFocused && { borderColor: "#00BFFF", boxShadow: '0 2px 2px #00BFFF' }, // Highlight on focus
                  ]}
                >
                  <Ionicons style={styles.inputIcon} name="person" size={20} color="#FFB50B" />
                  <TextInput
                    //style={styles.input}
                    placeholder={t('signup.yourName')}
                    value={fullName}
                    onChangeText={setFullName}
                    onFocus={() => setIsFullnameFocused(true)}
                    onBlur={() => setIsFullnameFocused(false)}
                  />
                </View>

               <Text style={styles.inputLabel}>{t('signup.email')}</Text>
                <View 
                  style={[
                    styles.inputWrapper,
                    isEmailFocused && { borderColor: "#00BFFF", boxShadow: '0 2px 2px #00BFFF' }, // Highlight on focus
                  ]}
                >
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/561/561127.png",
                    }}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    //style={styles.input}
                    placeholder={t('signup.yourEmail')}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                  />
                </View>

                <Text style={styles.inputLabel}>{t('signup.password')}</Text>
                <View 
                  style={[
                    styles.inputWrapper,
                    isPasswordFocused && { borderColor: "#00BFFF", boxShadow: '0 2px 2px #00BFFF' }, // Highlight on focus
                  ]}
                >
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/2889/2889676.png",
                    }}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    //style={styles.input}
                    placeholder={t('signup.enterPassword')}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                  />
                </View>

               <Text style={styles.inputLabel}>{t('signup.country')}</Text>
                <View 
                  style={[
                    styles.inputWrapper,
                    isCountryFocused && { borderColor: "#00BFFF", boxShadow: '0 2px 2px #00BFFF' }, // Highlight on focus
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder={t('signup.yourCountry')}
                    value={country}
                    onChangeText={setCountry}
                    onFocus={() => setIsCountryFocused(true)}
                    onBlur={() => setIsCountryFocused(false)}
                  />
                </View>

                <Text style={styles.inputLabel}>{t('signup.location')}</Text>
                <View 
                  style={[
                    styles.inputWrapper,
                    isLocationFocused && { borderColor: "#00BFFF", boxShadow: '0 2px 2px #00BFFF' }, // Highlight on focus
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder={t('signup.yourLocation')}
                    value={location}
                    onChangeText={setLocation}
                    onFocus={() => setIsLocationFocused(true)}
                    onBlur={() => setIsLocationFocused(false)}
                  />
                </View>

                {/* 📍 Current Location (read-only) */}
                <Text style={styles.inputLabel}>{t('signup.currentLocation') || "Current Location"}</Text>
                <View 
                  style={[
                    styles.inputWrapper,
                    isLocation2Focused && { borderColor: "#00BFFF", boxShadow: '0 2px 2px #00BFFF' }, // Highlight on focus
                  ]}
                >
                  <Image
                    source={{ uri: "https://cdn-icons-png.flaticon.com/512/64/64113.png" }}
                    style={styles.inputIcon}
                  />
                  <Text style={[styles.input, { paddingTop: 8 }]}>
                    {location2 ? ` ${location2}` : t('signup.fetchingLocation') || "Fetching current location..."}
                  </Text>
                </View>

                <Text style={styles.inputLabel}>{t('signup.mobileNumber')}</Text>
                <View 
                  style={[
                    styles.inputWrapper,
                    isNumber0Focused && { borderColor: "#00BFFF", boxShadow: '0 2px 2px #00BFFF' }, // Highlight on focus
                  ]}
                >
                  <Ionicons style={styles.inputIcon} name="call-outline" size={20} color="#FFB50B" />
                  {/* <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/2889/2889676.png",
                    }}
                    style={styles.inputIcon}
                  /> */}
                  <TextInput
                    //style={styles.input}
                    placeholder={t('signup.requiredMobile')}
                    value={number0}
                    onChangeText={setNumber0}
                    keyboardType="phone-pad"
                    onFocus={() => setIsNumber0Focused(true)}
                    onBlur={() => setIsNumber0Focused(false)}
                  />
                </View>

                <Text style={styles.inputLabel}>{t('signup.emergency')}</Text>
                <View 
                  style={[
                    styles.inputWrapper,
                    isNumber1Focused && { borderColor: "#00BFFF", boxShadow: '0 2px 2px #00BFFF' }, // Highlight on focus
                  ]}
                >
                  <Ionicons style={styles.inputIcon} name="call-outline" size={20} color="#FFB50B" />
                  {/* <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/2889/2889676.png",
                    }}
                    style={styles.inputIcon}
                  /> */}
                  <TextInput
                    //style={styles.input}
                    placeholder={t('signup.number1')}
                    value={number1}
                    onChangeText={setNumber1}
                    keyboardType="phone-pad"
                    onFocus={() => setIsNumber1Focused(true)}
                    onBlur={() => setIsNumber1Focused(false)}
                  />
                </View>

                <View 
                  style={[
                    styles.inputWrapper,
                    isNumber2Focused && { borderColor: "#00BFFF", boxShadow: '0 2px 2px #00BFFF' }, // Highlight on focus
                  ]}
                >
                  <Ionicons style={styles.inputIcon} name="call-outline" size={20} color="#FFB50B" />
                  {/* <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/2889/2889676.png",
                    }}
                    style={styles.inputIcon}
                  /> */}
                  <TextInput
                    //style={styles.input}
                    placeholder={t('signup.number2')}
                    value={number2}
                    onChangeText={setNumber2}
                    keyboardType="phone-pad"
                    onFocus={() => setIsNumber2Focused(true)}
                    onBlur={() => setIsNumber2Focused(false)}
                  />
                </View>

                <Text style={styles.hintText}>{t('signup.hint')}</Text>
              </View>

              {/* Bottom Section */}
              <View style={styles.bottomSection}>
                <TouchableOpacity
                  style={[
                    styles.signupButton,
                    loading && styles.disabledButton,
                  ]}
                  onPress={handleSignUp}
                  disabled={loading}
                >
                 <Text style={styles.buttonText}>{loading ? t('signup.creating') : t('signup.signupButton')}</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>{t('signup.already')}</Text>
                  <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.loginLink}> {t('signup.login')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fFFF",
    marginBottom:40,
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    minHeight: height - 100,
    justifyContent: "space-between",
  },
  headerSection: {
    marginBottom: 15,
    marginTop: 25,
  },
  formSection: {
    flex: 1,
    marginBottom: 0,
  },
  bottomSection: {
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00B0FF",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: "#666666",
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 10,
    marginTop: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00BFFF",
    borderRadius: 12,
    height: 54,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#FFB50B",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333333",
  },
  hintText: {
    fontSize: 14,
    color: "#999999",
    marginTop: 5,
    marginBottom: 20,
  },
  signupButton: {
    backgroundColor: "#00B0FF",
    borderRadius: 25,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: "#B0BEC5",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    color: "#666666",
  },
  loginLink: {
    fontSize: 16,
    color: "#00B0FF",
    fontWeight: "600",
  },
});

export default SignUpScreen;