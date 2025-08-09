import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import BottomNavBar from "../components/BottomNavBar";
import "./i18/i18next"; // Ensure i18n is initialized

export default function RootLayout() {
  const pathname = usePathname();

  // Hide BottomNavBar only on these routes
  const hideNavBarRoutes = [
    "/",
    "/signup",
    "/login",
    "/NotificationScreen",
    "/currencyconverter",
    "/ReportEmergencies, ",
  ];
  const showNavBar = !hideNavBarRoutes.includes(pathname);

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fff" },
          animation: "fade",
        }}
      />
      {showNavBar && <BottomNavBar />}
    </>
  );
}
