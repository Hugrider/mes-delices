import { useThemeColors } from "@/constants/Theme";
import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

type Props = {
  text: string | number;
  style?: StyleProp<TextStyle>;
} & Omit<TextProps, "style" | "children">;

export default function ThemedText({ text, style, ...rest }: Props) {
  const colors = useThemeColors();

  return (
    <Text style={[{ color: colors.text }, style]} {...rest}>
      {text}
    </Text>
  );
}
