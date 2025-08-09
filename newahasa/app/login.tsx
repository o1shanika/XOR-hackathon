import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
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



const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/signup");
  };

  const handleLogin = async () => {
    try {

      const response = await fetch(`http://192.168.43.135:5000/api/auth/login`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
      
        await AsyncStorage.setItem("userId", data.user.id); // Replace `data.userId` with the actual key from your response
        console.log("User ID saved:", data.user.id);

        // Navigate to profile or home
        router.push("/Home_2");
      } else {
        console.log("Login failed:", data.message);
        // Show error message to user (optional)
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.loginContainer}>
              <Text style={styles.title}>{t("login.title")}</Text>
              <Text style={styles.subtitle}>{t("login.subtitle")}</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{t("login.email")}</Text>
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
                    style={styles.input}
                    placeholder={t("login.yourEmail")}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                  />
                </View>

                <Text style={styles.inputLabel}>{t("login.password")}</Text>
                <View 
                  style={[
                    styles.inputWrapper,
                    isPasswordFocused && { borderColor: "#00BFFF", boxShadow: '0 2px 2px #00BFFF'}, // Highlight on focus //borderWidth:1.5, borderLeftWidth:8
                  ]}
                >
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/2889/2889676.png",
                    }}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder={t("login.enterPassword")}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                  />
                </View>

                <TouchableOpacity style={styles.forgotPasswordContainer}>
                  <Text style={styles.forgotPassword}>
                    {t("login.forgotPassword")}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.buttonText}>{t("login.loginButton")}</Text>
              </TouchableOpacity>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>{t("login.newHere")} </Text>
                <TouchableOpacity onPress={handleSignUp}>
                  <Text style={styles.signupLink}>{t("login.signupLink")}</Text>
                </TouchableOpacity>
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
    backgroundColor: "#f7f7f7",
    marginBottom: 40,
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  loginContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    minHeight: 600, // Ensures there's enough space for scrolling
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00B0FF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#666666",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00BFFF",
    borderRadius: 12,
    height: 56,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#ffb50b",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333333",
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
  },
  forgotPassword: {
    color: "#FFB50B",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#00B0FF",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  signupText: {
    fontSize: 16,
    color: "#666666",
  },
  signupLink: {
    fontSize: 16,
    color: "#00B0FF",
    fontWeight: "600",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  orText: {
    marginHorizontal: 10,
    color: "#666666",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
});

export default LoginScreen;