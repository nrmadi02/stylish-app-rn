import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Platform } from "react-native";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const hasMounted = useRef(false);
  const [loaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/poppins/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
    "Poppins-Light": require("../assets/fonts/poppins/Poppins-Light.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/poppins/Poppins-ExtraLight.ttf"),
    "Poppins-Thin": require("../assets/fonts/poppins/Poppins-Thin.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/poppins/Poppins-ExtraBold.ttf"),
    "Poppins-Black": require("../assets/fonts/poppins/Poppins-Black.ttf"),
    "Poppins-Italic": require("../assets/fonts/poppins/Poppins-Italic.ttf"),
    "Poppins-MediumItalic": require("../assets/fonts/poppins/Poppins-MediumItalic.ttf"),
    "Poppins-BoldItalic": require("../assets/fonts/poppins/Poppins-BoldItalic.ttf"),
    "Poppins-SemiBoldItalic": require("../assets/fonts/poppins/Poppins-SemiBoldItalic.ttf"),
    "Poppins-LightItalic": require("../assets/fonts/poppins/Poppins-LightItalic.ttf"),
    "Poppins-ExtraLightItalic": require("../assets/fonts/poppins/Poppins-ExtraLightItalic.ttf"),
    "Poppins-ThinItalic": require("../assets/fonts/poppins/Poppins-ThinItalic.ttf"),
    "Poppins-ExtraBoldItalic": require("../assets/fonts/poppins/Poppins-ExtraBoldItalic.ttf"),
    "Poppins-BlackItalic": require("../assets/fonts/poppins/Poppins-BlackItalic.ttf"),
  });

  useIsomorphicLayoutEffect(() => {
    if (loaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 2000);
    }
  }, [loaded]);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    setAndroidNavigationBar();
    hasMounted.current = true;
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? useEffect
    : useLayoutEffect;