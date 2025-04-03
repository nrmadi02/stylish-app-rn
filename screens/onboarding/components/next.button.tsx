import { useState } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import styled from "styled-components/native";

export default function NextButton({
  x,
  screenWidth,
  dataLength,
  onClick,
}: {
  x: SharedValue<number>;
  screenWidth: number;
  dataLength: number;
  onClick: () => void;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const startFade = (dataLength - 1) * screenWidth - screenWidth * 0.5;
    const opacity = interpolate(
      x.value,
      [startFade, (dataLength - 1) * screenWidth],
      [1, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const [buttonText, setButtonText] = useState("Next");

  useDerivedValue(() => {
    const value = Math.floor(x.value);
    const screenWidthFlow = Math.floor((dataLength - 1) * screenWidth);

    const textValue = value < screenWidthFlow ? "Next" : "Get Started";
    runOnJS(setButtonText)(textValue);
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          right: 0,
        },
        animatedStyle,
      ]}
    >
      <Button onPress={onClick}>
        <ButtonText>{buttonText}</ButtonText>
      </Button>
    </Animated.View>
  );
}

const Button = styled(TouchableOpacity)`
  padding: 3px 1px;
  border-radius: 5px;
  width: auto;
`;

const ButtonText = styled.Text`
  color: #f83758;
  font-size: 16px;
  text-align: center;
  font-family: "Poppins-SemiBold";
`;
