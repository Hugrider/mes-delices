import { useThemeColors } from "@/constants/Theme";
import React, { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";
import ThemedText from "../ThemedText";

type Props = {
  title: string;
  icon: ReactNode;
  onPress: () => void;
};
export default function Item({ title, icon, onPress }: Props) {
  const colors = useThemeColors();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: colors.onBackground,
          opacity: pressed ? 0.5 : 1,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
        },
        styles.item,
      ]}
      onPress={onPress}
    >
      <ThemedText text={title} />
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
});
