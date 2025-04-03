import { TouchableOpacity } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import styled from "styled-components/native";

export default function PrevButton({
  x,
  screenWidth,
  onClick,
}: {
  x: SharedValue<number>;
  screenWidth: number;
  onClick: () => void;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      x.value,
      [0, screenWidth * 0.8],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: 0
        },
        animatedStyle,
      ]}
    >
      <Button onPress={onClick}>
        <ButtonText>Prev</ButtonText>
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
  color: #c4c4c4;
  font-size: 16px;
  text-align: center;
  font-family: "Poppins-SemiBold";
`;
