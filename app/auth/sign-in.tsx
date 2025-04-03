import SignInScreen from "@/screens/auth/sign-in/sign-in.screen";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function SignInPage() {
  const navigation = useNavigation();

  useEffect(() => {
    const listener = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();

      BackHandler.exitApp();
    });

    return () => {
      navigation.removeListener("beforeRemove", listener);
    };
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <SignInScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
