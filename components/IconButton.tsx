import { useThemeColors } from "@/constants/Theme";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

type Props = {
  icon: React.ReactNode;
  onPress: () => void;
};

export default function IconButton({ icon, onPress }: Props) {
  const colors = useThemeColors();
  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: colors.background, opacity: pressed ? 0.5 : 1 },
        styles.iconButton,
      ]}
      onPress={onPress}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    padding: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
  },
});
