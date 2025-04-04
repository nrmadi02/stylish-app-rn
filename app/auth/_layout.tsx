import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "sign-in",
};

export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      animation: "fade_from_bottom",
      animationDuration: 500,
    }}>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
}
