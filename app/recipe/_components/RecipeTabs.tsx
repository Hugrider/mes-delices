import ThemedText from "@/components/ThemedText";
import { useThemeColors } from "@/constants/Theme";
import React, { useEffect, useState } from "react";
import { LayoutChangeEvent, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export type RecipeTab = {
  key: number;
  value: string;
};

type Props = {
  tabs: RecipeTab[];
  selectedTab: number;
  setSelectedTab: (index: number) => void;
};

export default function RecipeTabs({
  tabs,
  selectedTab,
  setSelectedTab,
}: Props) {
  const colors = useThemeColors();

  const [innerWidth, setInnerWidth] = useState(0);
  const translateX = useSharedValue(0);
  const tabWidth = innerWidth / tabs.length;

  useEffect(() => {
    translateX.value = withSpring(selectedTab * tabWidth);
  }, [selectedTab]);

  const sliderTranslate = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    setInnerWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={[styles.wrapper, { borderColor: colors.border }]}>
      <View style={styles.tabs} onLayout={handleLayout}>
        {/* Slider */}
        <Animated.View
          style={[
            styles.slider,
            { width: tabWidth, backgroundColor: colors.onBackground },
            sliderTranslate,
          ]}
        />
        {tabs.map((tab) => (
          <Pressable
            style={({ pressed }) => [
              styles.tab,
              {
                width: tabWidth,
                opacity: pressed ? 0.5 : 1,
              },
            ]}
            key={tab.key}
            onPress={() => setSelectedTab(tab.key)}
          >
            <ThemedText text={tab.value} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 20,
    padding: 4,
    overflow: "hidden",
  },
  tabs: {
    flexDirection: "row",
    position: "relative",
    gap: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 20,
    alignItems: "center",
  },
  slider: {
    position: "absolute",
    top: 0,
    bottom: 0,
    borderRadius: 20,
  },
});
