import React from "react";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { IOnboardingData } from "../data/onboarding.data";
import styled from "styled-components/native";

type PaginationDotProps = {
  index: number;
  x: SharedValue<number>;
  screenWidth: number;
};

const PaginationDot = ({ index, x, screenWidth }: PaginationDotProps) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [
        (index - 1) * screenWidth,
        index * screenWidth,
        (index + 1) * screenWidth,
      ],
      [10, 40, 10],
      Extrapolation.CLAMP
    );

    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * screenWidth,
        index * screenWidth,
        (index + 1) * screenWidth,
      ],
      [0.2, 1, 0.2],
      Extrapolation.CLAMP
    );

    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  return <OnboardingPaginationDot style={[animatedDotStyle]} />;
};

type PaginationProps = {
  data: IOnboardingData[];
  x: SharedValue<number>;
  screenWidth: number;
};

export function OnboardingPagination({ data, screenWidth, x }: PaginationProps) {
  return (
    <OnboardingPaginationContainer>
      {data.map((item, index) => (
        <PaginationDot
          key={item.id}
          index={index}
          x={x}
          screenWidth={screenWidth}
        />
      ))}
    </OnboardingPaginationContainer>
  );
}


const OnboardingPaginationContainer = styled.View`
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const OnboardingPaginationDot = styled(Animated.View)`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #17223b;
  margin-inline: 5px;
`;