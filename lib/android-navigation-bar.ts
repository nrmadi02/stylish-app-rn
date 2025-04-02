import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";

export async function setAndroidNavigationBar() {
  if (Platform.OS !== "android") return;
  await NavigationBar.setButtonStyleAsync('dark');
  await NavigationBar.setBackgroundColorAsync("hsl(0 0% 100%)");
}
