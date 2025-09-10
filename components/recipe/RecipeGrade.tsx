import { useThemeColors } from "@/constants/Theme";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import ThemedText from "../ThemedText";

type Props = {
  grade: number;
  compact?: boolean;
};
export default function RecipeGrade({ grade, compact }: Props) {
  const colors = useThemeColors();

  function renderStars() {
    if (compact) {
      return (
        <View style={styles.compact}>
          <ThemedText text={grade} />
          <AntDesign name="star" size={16} color={colors.accent} />
        </View>
      );
    } else {
      return Array.from({ length: 5 }, (_, i) => {
        const isFilled = i < Math.round(Math.min(Math.max(grade, 0), 5));
        return (
          <AntDesign
            key={i}
            name={isFilled ? "star" : "staro"}
            size={16}
            color={colors.accent}
          />
        );
      });
    }
  }

  return <View style={styles.container}>{renderStars()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 3,
    margin: 10,
  },
  compact: {
    flexDirection: "row",
    gap: 2,
  },
});
