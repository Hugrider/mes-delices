import { ShadowProperties, useThemeColors } from "@/constants/Theme";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  text: string;
  type?: "primary" | "default" | "delete";
  loading?: boolean;
  onPress: () => void;
};
export default function ThemedButton({ text, type, loading, onPress }: Props) {
  const colors = useThemeColors();

  function getBackgroundColor() {
    if (type === "primary") return colors.primary;
    if (type === "delete") return "red";
    else return colors.onBackground;
  }
  function getTexteColor() {
    if (type === "primary") return "#fff";
    if (type === "delete") return "#fff";
    else return colors.text;
  }
  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: getBackgroundColor(), opacity: pressed ? 0.5 : 1 },
        ShadowProperties,
        styles.button,
      ]}
      onPress={onPress}
      disabled={loading}
    >
      <Text style={[styles.text, { color: getTexteColor() }]}>
        {loading ? "Chargement..." : text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    margin: 10,
  },
  text: {
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontWeight: "500",
  },
});
