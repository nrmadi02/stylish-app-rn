import {
  FlatList,
  useWindowDimensions,
  ViewToken,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import styled from "styled-components/native";
import { dataOnboarding, IOnboardingData } from "./data/onboarding.data";
import { OnboardingPagination } from "./components/onboarding.pagination";
import PrevButton from "./components/prev.button";
import NextButton from "./components/next.button";
import { router } from "expo-router";

export default function OnboardingScreen() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const flatListRef = useAnimatedRef<FlatList>();

  const flatListIndex = useSharedValue(0);
  const x = useSharedValue(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    flatListIndex.value = viewableItems[0].index ?? 0;
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <OnboardingContainer>
      <Animated.FlatList
        ref={flatListRef as any}
        data={dataOnboarding}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => (
          <RenderItem index={index} item={item} x={x} />
        )}
        onScroll={onScroll}
        scrollEventThrottle={16}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <FooterOnboarding width={SCREEN_WIDTH - 40}>
        <PrevButton
          onClick={() => {
            if (flatListIndex.value === 0) {
              console.log("Prev");
            } else {
              flatListRef.current?.scrollToIndex({
                index: flatListIndex.value - 1,
                animated: true,
              });
            }
          }}
          x={x}
          screenWidth={SCREEN_WIDTH}
        />
        <OnboardingPagination
          data={dataOnboarding}
          x={x}
          screenWidth={SCREEN_WIDTH}
        />
        <NextButton
          onClick={() => {
            if (flatListIndex.value === dataOnboarding.length - 1) {
              router.push('/auth/sign-in')
            } else {
              flatListRef.current?.scrollToIndex({
                index: flatListIndex.value + 1,
                animated: true,
              });
            }
          }}
          x={x}
          screenWidth={SCREEN_WIDTH}
          dataLength={dataOnboarding.length}
        />
      </FooterOnboarding>
    </OnboardingContainer>
  );
}

const RenderItem = ({
  item,
  index,
  x,
}: {
  item: IOnboardingData;
  index: number;
  x: SharedValue<number>;
}) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolation.CLAMP
    );

    return {
      width: SCREEN_WIDTH * 0.8,
      height: SCREEN_WIDTH * 0.8,
      opacity: opacityAnimation,
      transform: [{ translateY: translateYAnimation }],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolation.CLAMP
    );

    return {
      opacity: opacityAnimation,
      transform: [{ translateY: translateYAnimation }],
    };
  });

  return (
    <ItemOnboarding width={SCREEN_WIDTH}>
      <Animated.Image source={item.image} style={imageAnimatedStyle} />

      <Animated.View style={textAnimatedStyle}>
        <ItemTitle>{item.title}</ItemTitle>
        <ItemText>{item.text}</ItemText>
      </Animated.View>
    </ItemOnboarding>
  );
};

const OnboardingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ItemOnboarding = styled.View<{ width: number }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width}px;
`;

const ItemTitle = styled.Text`
  font-size: 24px;
  color: #000;
  text-align: center;
  margin-bottom: 10px;
  font-family: "Poppins-Bold";
`;

const ItemText = styled.Text`
  color: #a8a8a9;
  text-align: center;
  line-height: 20px;
  margin-inline: 30px;
  font-size: 14px;
  font-family: "Poppins-Medium";
`;

const FooterOnboarding = styled.View<{ width: number }>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width}px;
  position: relative;
`;
