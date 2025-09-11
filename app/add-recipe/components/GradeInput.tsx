import ThemedText from "@/components/ThemedText";
import { useThemeColors } from "@/constants/Theme";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  grade: number;
  setGrade: (grade: number) => void;
};
export default function GradeInput({ grade, setGrade }: Props) {
  const colors = useThemeColors();

  function toggleClick(starIndex: number) {
    const newGrade = starIndex + 1;
    setGrade(newGrade === grade ? 0 : newGrade);
  }
  return (
    <View style={styles.container}>
      <ThemedText text="Une petite note ?" style={styles.text} />
      <View style={styles.stars}>
        {Array.from({ length: 5 }, (_, i) => {
          const isFilled = i < Math.round(Math.min(Math.max(grade, 0), 5));
          return (
            <Pressable key={i} onPress={() => toggleClick(i)}>
              <AntDesign
                name={isFilled ? "star" : "staro"}
                size={22}
                color={colors.accent}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  text: {
    textAlign: "center",
    marginBottom: 10,
  },
  stars: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
});
