import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from "react-native";
import i18n from "./i18/i18next";
import { SafeAreaView } from "react-native-safe-area-context";




const CommunityScreen = () => {
  const navigation = useNavigation();

  const [allUsers, setAllUsers] = useState([]);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState("");
  const [selectedTab, setSelectedTab] = useState<"nearby" | "all">("nearby");

  const fetchCommunityData = async () => {
  try {
    setLoading(true);

    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      setLoading(false);
      return;
    }


   const userResponse = await axios.get(`http://192.168.43.135:5000/api/auth/user/${userId}`);


    const userData = userResponse.data;

    const { country, location } = userData;

    setCurrentLocation(location || "");

    const [nearbyResponse, allResponse] = await Promise.all([



      axios.post(`http://192.168.43.135:5000/api/community/nearby`, {


        country,
        location,
        userId,
      }),


      axios.post(`http://192.168.43.135:5000/api/community/all`, {



        country,
      }),
    ]);

    setNearbyUsers(nearbyResponse.data);
    setAllUsers(allResponse.data);
  } catch (error) {
    console.error("Error fetching community data:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchCommunityData();
  }, []);

  const renderUser = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.one}>
        {/* <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
          style={styles.profile}
        />  */}
        <Image
          source={
            item.profilePic
              ? { uri: item.profilePic }
              : require("../assets/images/avator.jpg") // Your local default avatar
          }
          style={[styles.profile, { width: 50, height: 50, borderRadius: 25 }]}
        />
      </View>
      <View style={styles.two}>
        <View style={styles.frow}>
          <Text style={styles.name} numberOfLines={1}>
            {item.fullName}
          </Text>
          <View style={styles.lrow}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
              }}
              style={styles.inputIcon}
            />
            <Text style={styles.details} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
        </View>
        <View style={styles.erow}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
            }}
            style={styles.inputIcon}
          />
          <Text style={styles.details}>{item.email}</Text>
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    const data = selectedTab === "nearby" ? nearbyUsers : allUsers;
    const emptyMessage =
      selectedTab === "nearby"
        ? "No nearby users found."
        : "No users found in your country.";

    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderUser}
        ListEmptyComponent={<Text style={styles.empty}>{emptyMessage}</Text>}
      />
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topcontainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home_2")}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#ffff" />
        </TouchableOpacity>
        <Text style={styles.title}>Community</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "nearby" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("nearby")}
        >
          <Text
            style={[
              styles.tabText,
              { color: selectedTab === "nearby" ? "#00BFFF" : "#888888" },
            ]}
          >
            {i18n.t("community.nearbyUsers")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === "all" && styles.activeTab]}
          onPress={() => setSelectedTab("all")}
        >
          <Text
            style={[
              styles.tabText,
              { color: selectedTab === "all" ? "#00BFFF" : "#888888" },
            ]}
          >
            {i18n.t("community.allCountryUsers")}
          </Text>
        </TouchableOpacity>
      </View>
      <ImageBackground
      source={require('../assets/images/back1.jpg')} // or use { uri: 'https://...' }
      style={styles.Background}
      resizeMode="stretch" // or "contain", "stretch", "repeat", "center"
      >
        <View style={styles.overlay} />
        <View style={{ flex: 1, zIndex: 8 }}>{renderContent()}</View>
      </ImageBackground>
      
    </SafeAreaView>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    //paddingTop: 40,
    backgroundColor: "#ffff",
    marginBottom: 45,
    paddingBottom: 55,
  },
  topcontainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#00bfff",
    marginBottom: 20,
    borderBottomLeftRadius: 45,
  },
  backButton: {
    paddingRight: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#ffff'
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
    paddingHorizontal: 10,
    boxShadow:"0 2px 2px #d6d6d6",
    //backgroundColor: "#000",
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    width: "42%",
    borderTopColor: "#888888",
    borderTopWidth: 2,
  },
  activeTab: {
    borderTopColor: "#00BFFF",
    borderTopWidth: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#ffff",
    marginBottom: 15,
    marginHorizontal: 20,
    boxShadow: "0 2px 2px #00bfff",
    gap: 25,
    zIndex: 2,
  },
  profile: {
    margin: "auto",
    borderWidth: 1,
    borderColor: "#00BFFF",
    borderRadius: 45,
    padding: 22,
    marginRight: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    width: "65%",
    overflow: "hidden",
  },
  details: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
  empty: {
    textAlign: "center",
    color: "#999",
    marginVertical: 20,
    marginLeft: 20,
  },
  inputIcon: {
    width: 15,
    height: 15,
    tintColor: "#00BFFF",
    marginVertical: "auto",
    marginRight: 6,
  },
  frow: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
    marginBottom: 5,
  },
  lrow: {
    width: "35%",
    display: "flex",
    flexDirection: "row",
    gap: 0,
    overflow: "hidden",
    //backgroundColor:'#000'
  },
  erow: {
    flexDirection: "row",
    gap: 4,
    maxWidth: "100%",
    marginTop: 4,
    marginLeft: 2,
  },
  one: {
    width: "10%",
  },
  two: {
    width: "90%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Fills the entire parent
    backgroundColor: 'rgba(255,255,255, 0.8)', // Change opacity & color as needed
    zIndex: 1,
  },
  Background: {
    position: 'relative',
    width: '100%',
    height: '100%',
    paddingTop:10,
    padding: 0, // adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:1,
    // borderColor:'#000'
    //opacity: 0.5
  },
  
});