import { useThemeColors } from "@/constants/Theme";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  label?: string;
  icon?: React.ReactNode;
  wrapperStyle?: ViewStyle;
} & TextInputProps;

export default function Input({
  label,
  value,
  onChange,
  icon,
  wrapperStyle,
  ...rest
}: Props) {
  const colors = useThemeColors();
  const [isFocused, setIsFocused] = useState(false);

  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const animatedLabelStyle = {
    position: "absolute" as const,
    left: 15,
    top: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -8],
    }),
    fontSize: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: labelAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["#aaa", colors.primary],
    }),
    backgroundColor: colors.background,
    paddingHorizontal: 4,
  };

  return (
    <View
      style={[
        styles.container,
        wrapperStyle,
        { borderColor: isFocused ? colors.primary : colors.border },
      ]}
    >
      <Animated.Text style={animatedLabelStyle}>{label}</Animated.Text>
      <TextInput
        {...rest}
        value={value}
        style={[styles.input, { color: colors.text }]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="sentences"
      />
      <View style={styles.icon}>{icon}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    paddingVertical: 14, // centré verticalement
    fontSize: 16,
    maxWidth: "90%",
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 14,
  },
});
