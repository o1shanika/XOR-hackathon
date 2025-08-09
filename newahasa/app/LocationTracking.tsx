import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function LocationTracking() {
  const [myUserId, setMyUserId] = useState("");
  const [targetUserId, setTargetUserId] = useState("");
  const [targetLocation, setTargetLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const watchRef = useRef<Location.LocationSubscription | null>(null);

  // Step 1: Get my user ID from AsyncStorage
  useEffect(() => {
    (async () => {
      const storedId = await AsyncStorage.getItem("userId");
      if (storedId) {
        setMyUserId(storedId);
        startLocationTracking(storedId); // Start sharing location
      }
    })();
  }, []);

  // Step 2: Start watching my location and send to backend
  const startLocationTracking = async (userId: string) => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Location permission denied");
      return;
    }

    watchRef.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 5000,
        distanceInterval: 10,
      },
      async (location) => {
        try {
          await axios.post("http://192.168.39.20:5000/api/location", {
            userId,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        } catch (error) {
          console.log("Error sending location:", error);
        }
      }
    );
  };

  // Step 3: Poll target user's location
  useEffect(() => {
    if (!targetUserId) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `http://192.168.39.20:5000/api/location/${targetUserId}`
        );
        if (res.data) {
          setTargetLocation({
            latitude: res.data.latitude,
            longitude: res.data.longitude,
          });
        }
      } catch (error) {
        console.log("Error fetching target location:", error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [targetUserId]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📍 Location Tracking</Text>

      <Text style={styles.label}>Your ID: {myUserId}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Target User ID"
        value={targetUserId}
        onChangeText={setTargetUserId}
      />

      {targetUserId ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Tracking User: {targetUserId}</Text>
          <Text style={styles.resultText}>
            Latitude: {targetLocation.latitude.toFixed(5)}
          </Text>
          <Text style={styles.resultText}>
            Longitude: {targetLocation.longitude.toFixed(5)}
          </Text>
        </View>
      ) : (
        <Text style={styles.note}>🔍 Enter a user ID to track</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: { fontSize: 16, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  resultBox: { padding: 15, backgroundColor: "#e6f7ff", borderRadius: 8 },
  resultText: { fontSize: 16, marginBottom: 5 },
  note: { textAlign: "center", color: "#999" },
});
