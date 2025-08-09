import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import * as SystemUI from "expo-system-ui";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import i18n from "./i18/i18next";
import { SafeAreaView } from "react-native-safe-area-context";





export default function AccountDetails() {
  const router = useRouter();
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //new
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedCountry, setUpdatedCountry] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [updatedContact, setUpdatedContact] = useState("");
  const [updatedEmergency1, setUpdatedEmergency1] = useState("");
  const [updatedEmergency2, setUpdatedEmergency2] = useState("");
  //new

  const [focusedInput, setFocusedInput] = useState(null);

  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const loadProfilePic = async () => {
      const uri = await AsyncStorage.getItem("profilePic");
      if (uri) setProfilePic(uri);
    };
    loadProfilePic();
  }, []);

  useEffect(() => {
    // Set dark color for system navigation bar
    SystemUI.setBackgroundColorAsync("#000"); // or any dark color like '#111111'
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: false, // You can remove this if using FormData
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setProfilePic(imageUri);

      const userId = await AsyncStorage.getItem("userId");

      const formData = new FormData();
      formData.append("profilePic", {
        uri: imageUri,
        name: "profile.jpg",
        type: "image/jpeg",
      });

      await axios.put(
        `http://192.168.43.135:5000/api/auth/user/${userId}/profile-pic`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const res = await axios.get(
        `http://192.168.43.135:5000/api/auth/user/${userId}`
      );
      setUser(res.data);
      setProfilePic(res.data.profilePic);
    }
  };

  const onSave = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return;

      const updatedUser = {
        fullName: updatedName,
        email: updatedEmail,
        country: updatedCountry,
        location: updatedLocation,
        number0: updatedContact,
        number1: updatedEmergency1,
        number2: updatedEmergency2,
        //profilePic: profilePic, // <== include this
      };

      await axios.put(
        `http://192.168.43.135:5000/api/auth/user/${userId}`,
        updatedUser
      );
      alert(i18n.t("accountDetails.saved"));

      // Refetch updated user data from server
      const response = await axios.get(
        `http://192.168.43.135:5000/api/auth/user/${userId}`
      );
      setUser(response.data);
      setProfilePic(response.data.profilePic); // Update profilePic state
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert(i18n.t("accountDetails.saveFailed"));
    }
  };

  const onCancel = () => {
    setIsEditMode(false);
  };

  const handleLogout = () => {
    router.push("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const res = await axios.get(
          `http://192.168.43.135:5000/api/auth/user/${userId}`
        );
        setUser(res.data);
        setProfilePic(res.data.profilePic || null); // Load profile picture
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topcontainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#ffff" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {i18n.t("accountDetails.profileDetails")}
        </Text>
        {!isEditMode && (
          <TouchableOpacity
            onPress={() => {
              setIsEditMode(true);
              setUpdatedName(user?.fullName || "");
              setUpdatedEmail(user?.email || "");
              setUpdatedCountry(user?.country || "");
              setUpdatedLocation(user?.location || "");
              setUpdatedContact(user?.number0 || "");
              setUpdatedEmergency1(user?.number1 || "");
              setUpdatedEmergency2(user?.number2 || "");
            }}
            style={styles.editButton}
          >
            <MaterialIcons name="edit" size={24} color="#fFFF" />
          </TouchableOpacity>
        )}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        style={styles.containerm}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            // style={styles.scrollView}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {!isEditMode && (
              <TouchableOpacity
                onPress={pickImage}
                style={{ alignItems: "center", marginBottom: 20 }}
              >
                <Image
                  source={
                    profilePic
                      ? { uri: profilePic }
                      : require("../assets/images/avator.jpg")
                  }
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    borderWidth: 3,
                    borderColor: "#00bfff",
                  }}
                />
              </TouchableOpacity>
            )}


            <View style={styles.field}>
              <Text style={styles.label}>{i18n.t("accountDetails.name")}</Text>
              {isEditMode ? (
                <TextInput
                  style={[
                    styles.input,
                    focusedInput === 'name' && { borderColor: '#00BFFF', boxShadow: '0 2px 2px #00BFFF', paddingBlockStart:12},
                  ]}
                  onFocus={() => setFocusedInput('name')}
                  onBlur={() => setFocusedInput(null)}
                  value={updatedName}
                  onChangeText={setUpdatedName}
                />
              ) : (
                <Text style={styles.input}>{user?.fullName}</Text>
              )}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>{i18n.t("accountDetails.email")}</Text>
              {isEditMode ? (
                <TextInput
                  style={[
                    styles.input,
                    focusedInput === 'email' && { borderColor: '#00BFFF', boxShadow: '0 2px 2px #00BFFF', paddingBlockStart:12},
                  ]}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  value={updatedEmail}
                  onChangeText={setUpdatedEmail}
                />
              ) : (
                <Text style={styles.input}>{user?.email}</Text>
              )}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>
                {i18n.t("accountDetails.country")}
              </Text>
              {isEditMode ? (
                <TextInput
                  style={[
                    styles.input,
                    focusedInput === 'country' && { borderColor: '#00BFFF', boxShadow: '0 2px 2px #00BFFF', paddingBlockStart:12},
                  ]}
                  onFocus={() => setFocusedInput('country')}
                  onBlur={() => setFocusedInput(null)}
                  value={updatedCountry}
                  onChangeText={setUpdatedCountry}
                />
              ) : (
                <Text style={styles.input}>{user?.country}</Text>
              )}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>
                {i18n.t("accountDetails.location")}
              </Text>
              {isEditMode ? (
                <TextInput
                  style={[
                    styles.input,
                    focusedInput === 'location' && { borderColor: '#00BFFF', boxShadow: '0 2px 2px #00BFFF', paddingBlockStart:12},
                  ]}
                  onFocus={() => setFocusedInput('location')}
                  onBlur={() => setFocusedInput(null)}
                  value={updatedLocation}
                  onChangeText={setUpdatedLocation}
                />
              ) : (
                <Text style={styles.input}>{user?.location}</Text>
              )}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>
                {i18n.t("accountDetails.mobileNumber")}
              </Text>
              {isEditMode ? (
                <TextInput
                  style={[
                    styles.input,
                    focusedInput === 'mobileNumber' && { borderColor: '#00BFFF', boxShadow: '0 2px 2px #00BFFF', paddingBlockStart:12},
                  ]}
                  onFocus={() => setFocusedInput('mobileNumber')}
                  onBlur={() => setFocusedInput(null)}
                  value={updatedContact}
                  onChangeText={setUpdatedContact}
                />
              ) : (
                <Text style={styles.input}>{user?.number0}</Text>
              )}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>
                {i18n.t("accountDetails.emergencyContact")}
              </Text>

              {isEditMode ? (
                <TextInput
                  style={[
                    styles.input,
                    focusedInput === 'number1' && { borderColor: '#00BFFF', boxShadow: '0 2px 2px #00BFFF', paddingBlockStart:12},
                  ]}
                  onFocus={() => setFocusedInput('number1')}
                  onBlur={() => setFocusedInput(null)}
                  value={updatedEmergency1}
                  onChangeText={setUpdatedEmergency1}
                />
              ) : (
                <Text style={styles.input}>{user?.number1}</Text>
              )}
              
              {isEditMode ? (
                <TextInput
                  style={[
                    styles.input,
                    focusedInput === 'number2' && { borderColor: '#00BFFF', boxShadow: '0 2px 2px #00BFFF', paddingBlockStart:12},
                  ]}
                  onFocus={() => setFocusedInput('number2')}
                  onBlur={() => setFocusedInput(null)}
                  value={updatedEmergency2}
                  onChangeText={setUpdatedEmergency2}
                />
              ) : (
                <Text style={styles.input}>{user?.number2}</Text>
              )}
            </View>

            {isEditMode ? (
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  onPress={onCancel}
                  style={[styles.button, styles.cancelButton]}
                >
                  <Text style={[styles.buttonText, styles.cancelText]}>
                    {i18n.t("common.cancel")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onSave}
                  style={[styles.button, styles.saveButton]}
                >
                  <Text style={[styles.buttonText, styles.saveText]}>
                    {i18n.t("common.save")}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText1}>
                  {i18n.t("common.logout")}
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* <BNB /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#ffff",
    //paddingTop: 40,
    marginBottom: 0,
  },
  topcontainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#00bfff",
    marginBottom: 0,
    borderBottomLeftRadius:45,
  },
  backButton: {
    paddingRight: 16,
    paddingVertical: 8,
  },
  editButton: {
    paddingRight: 6,
    paddingVertical: 8,
    marginLeft: 140,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#ffff'
  },
  containerm: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 0,
    paddingTop: 10,
    backgroundColor: "#ffff",
  },
  field: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#00BFFF",
    position: "relative",
    marginBottom: 2,
  },
  input1: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#00BFFF",
    position: "relative",
    width: "100%",
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: "#00B0FF",
    backgroundColor:'#00BFFF',
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 0,
  },
  buttonText1: {
    color: "#ffff",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonsRow: {
    //position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    //paddingTop: 700,
    gap:20
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    //marginHorizontal: 8,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cancelText: {
    color: "#888",
  },
  saveButton: {
    backgroundColor: "#00B0FF",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
  buttonText: {
    fontSize: 16,
  },
});