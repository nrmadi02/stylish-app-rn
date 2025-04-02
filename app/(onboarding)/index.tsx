import OnboardingScreen from "@/screens/onboarding/onboarding.screen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingPage() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <OnboardingScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
