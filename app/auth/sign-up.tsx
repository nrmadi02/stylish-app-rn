import SignUpScreen from "@/screens/auth/sign-up/sign-up.screen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function SignUpPage() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <SignUpScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
