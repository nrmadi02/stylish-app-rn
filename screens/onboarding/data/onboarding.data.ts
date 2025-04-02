import { ImageSourcePropType } from "react-native";

export type IOnboardingData = {
  id: number;
  image: ImageSourcePropType;
  title: string;
  text: string;
};

export const dataOnboarding: IOnboardingData[] = [
  {
    id: 1,
    image: require("../../../assets/images/onboard-1.png"),
    title: "Choose Products",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    image: require("../../../assets/images/onboard-2.png"),
    title: "Make Payment",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    image: require("../../../assets/images/onboard-3.png"),
    title: "Get Your Order",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
