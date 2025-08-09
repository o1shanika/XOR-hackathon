import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Tab = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
  path: string;
};

const BottomNavBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs: Tab[] = [
    { label: "Home", icon: "home-outline", activeIcon: "home", path: "/Home_2" },
    {
      label: "Report Emergency",
      icon: "alert-circle-outline",
      activeIcon: "alert-circle",
      path: "/Emergencies",
    },
    {
      label: "Community",
      icon: "people-outline",
      activeIcon: "people",
      path: "/Community",
    },
    {
      label: "Profile",
      icon: "person-outline",
      activeIcon: "person",
      path: "/profile",
    },
  ];

  

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <TouchableOpacity
            key={tab.label}
            style={styles.tab}
            onPress={() => {
              // console.log("Navigating to:", tab.path);  // ✅ Add this line
              router.push(tab.path);
            }}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={24}
              color={isActive ? "#00BFFF" : "#888"}
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
          </TouchableOpacity>
          
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    backgroundColor: "#FFFF",
    borderTopWidth: 1,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    borderTopColor: "#00BFFF",
    zIndex: 999, // Add this line
  
  },
  tab: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  activeLabel: {
    color: "#00BFFF",
  },
});

export default BottomNavBar;
