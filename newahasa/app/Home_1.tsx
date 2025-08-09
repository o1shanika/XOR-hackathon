import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { router } from "expo-router";
import * as SystemUI from "expo-system-ui";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Linking,
  Image,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Constants from 'expo-constants';
import BNB from "../components/BottomNavBar";
import SOSModal from "../components/SOSModal";
import { StringConstants } from "../constants/string_constants";
import i18n from "./i18/i18next";
import ChatBotIcon3 from "../components/ChatBotIcon3";

const API_BASE_URL="http://192.168.43.135:5000"

const HomeScreen = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);


const fetchDocuments = async () => {
    setLoadingDocs(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin-documents/fetch`);
      setDocuments(res.data);
    } catch (error) {
      alert("Failed to fetch documents");
    } finally {
      setLoadingDocs(false);
    }
  };

useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) return;

        const response = await axios.get(`${API_BASE_URL}/api/auth/user/${userId}`);
        const userData = response.data;

        setUser(userData);
        setProfilePic(userData.profilePic);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchDocuments(); // Fetch documents here

    const loadLanguage = async () => {
      const savedLang = await AsyncStorage.getItem("appLanguage");
      if (savedLang) await i18n.changeLanguage(savedLang);
    };

    loadLanguage();
    //fetchDocuments(); // your existing fetchDocuments() if needed
  }, []);

  if (loading) {
    return <ActivityIndicator size="small" style={{ marginTop: 20 }} />;
  }

  const handleCancel = () => setModalVisible(false);
  const handleSend = () => {
    setModalVisible(false);
    console.log("SOS sent!");
  };

  const changeLanguage = async (language: string) => {
    try {
      await i18n.changeLanguage(language);
      await AsyncStorage.setItem("appLanguage", language);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  const handleChatBotPress = () => {
    console.log("Chatbot icon pressed!");
  };

  return (
    <>
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image
                        source={
                        profilePic
                            ? { uri: profilePic }
                            : require("../assets/images/avator.jpg") // your default avatar
                        }
                        style={styles.profile}
                    />
                    <View>
                        <Text style={styles.greeting}>{t(StringConstants.greeting)},</Text>
                        <Text style={styles.username}>{user?.fullName}</Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    {/* Language Dropdown */}
                    <View style={styles.dropdownWrapper}>
                    <RNPickerSelect
                        onValueChange={(value) => changeLanguage(value)}
                        placeholder={{ label: "Language", value: null }}
                        items={[
                        { label: "English", value: "en" },
                        { label: "සිංහල", value: "si" },
                        { label: "தமிழ்", value: "ta" },
                        ]}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => (
                        <View style={{ paddingRight: 10, paddingTop: 4 }}>
                            <Ionicons name="chevron-down" size={18} color="#00bfff" />
                        </View>
                        )}
                    />
                    </View>

                    {/* Notification Icon */}
                    <TouchableOpacity
                    onPress={() => router.push("/NotificationScreen")}
                    >
                    <Ionicons name="notifications-outline" size={24} color="#ffff" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.legaldoc}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.docSlider}
                    >
                    {loadingDocs ? (
                        <Text style={{ color: "gray" }}>Loading documents...</Text>
                    ) : (
                        documents.map((doc) => (
                        <TouchableOpacity
                            key={doc.id}
                            style={styles.docItem}
                            onPress={() => Linking.openURL(doc.url)}
                        >
                            <Text style={styles.docText} numberOfLines={1} ellipsizeMode="tail">
                        📄 {doc.name}
                        </Text>

                        </TouchableOpacity>
                        ))
                    )}
                </ScrollView>
            </View>
            <View style={styles.sos}> 
                <Text style={styles.helpText}>
                    {t(StringConstants.help_text)}
                    {"\n"}
                    <Text style={styles.sosHighlight}>
                        {t(StringConstants.sos_highlight)}
                    </Text>
                </Text> 
            </View>
            <ImageBackground
            source={require('../assets/images/back1.jpg')} // or use { uri: 'https://...' }
            style={styles.sosBackground}
            resizeMode="stretch" // or "contain", "stretch", "repeat", "center"
            >
                <View style={styles.sosWrapper}>
                    <TouchableOpacity
                        style={styles.sosOuter}
                        onPress={() => setModalVisible(true)}
                    >
                        <SOSModal
                        visible={modalVisible}
                        onCancel={handleCancel}
                        onSend={handleSend}
                        />
                        <View style={styles.sosMiddle}>
                        <View style={styles.sosInner}>
                            <Text style={styles.sosText}>SOS</Text>
                        </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            {/* ChatBot Icon */}
            <ChatBotIcon3 onPress={handleChatBotPress} />
        </View>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    //position: "relative",
    flex: 1,
    backgroundColor: "#ffff",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 0,
    alignItems: "center",
    marginBottom: 45,
  },
  header: {
    //paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    //borderBottomWidth: 1,
    paddingVertical: 10,
    //paddingBottom: 10,
    paddingHorizontal: 12,
    backgroundColor: "#00BFFF",
    borderBottomLeftRadius:45
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profile: {
    width: 55,
    height: 55,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#00BFFF",
  },
  greeting: {
    fontSize: 14,
    color: "#ffff",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffff",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  dropdownWrapper: {
    marginLeft: 10,
    width: 100,
  },
  legaldoc: {
    width: '100%',
    height: 90,
    paddingHorizontal:20
  },
  sosBackground: {
    width: '100%',
    height: 300,
    paddingTop:50,
    padding: 0, // adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:1,
    // borderColor:'#000'
  },
  sos: {
    width: '100%',
    height: 80,
    paddingHorizontal:20,
    paddingVertical:20,
  },
  helpText: {
    marginTop: 0, // ⬅️ A positive margin adds breathing room
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    marginBottom: 0,
    paddingTop:0
  },
  sosHighlight: {
    fontWeight: "bold",
    color: "red",  
  },
  sosWrapper: {
    marginTop: -100,
    marginBottom: 0,
  },
  sosOuter: {
    backgroundColor: "#FFb3b3", //"#FFB1B1
    padding: 30,
    borderRadius: 120,
  },
  sosMiddle: {
    backgroundColor: "#FF6666", //#F35252
    padding: 30,
    borderRadius: 85,
    
  },
  sosInner: {
    backgroundColor: "red",
    padding: 30,
    paddingVertical: 38,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  sosText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  docSlider: {
  width: "100%",
 // height: 20, // 👈 Add this to limit height
  marginTop: 15, // reduced top space
  marginBottom: 0, // remove negative margin
},
  docItem: {
  backgroundColor: "#e0f7fa",
  paddingVertical: 4,  // less height
  paddingHorizontal: 8,
  borderRadius: 6,
  marginRight: 8,
  width:'23%',
  //maxWidth: 120,
  maxHeight: 100, // limit height
  borderColor: "#00BFFF",
  borderWidth: 1,
},
docText: {
  fontSize: 12, // smaller font
  color: "#007AFF",
  maxWidth: 110,
},

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 4,
    color: "#007AFF",
    paddingRight: 30,
    textAlign: "center",
  },
  inputAndroid: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 4,
    color: "#00BFFF",
    backgroundColor: '#ffff',
    paddingRight: 30,
  },
  placeholder: {
    color: "#00bfff",
  },
});

export default HomeScreen;
