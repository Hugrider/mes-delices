import { useThemeColors } from "@/constants/Theme";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  icon: React.ReactNode;
  onPress: () => void;
};

export default function FloatingButton({ onPress, icon }: Props) {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      style={[styles.fab, { backgroundColor: colors.primary }]}
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5, // Android
  },
});
