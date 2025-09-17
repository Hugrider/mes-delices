import { useThemeColors } from "@/constants/Theme";
import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../IconButton";

type Props = {
  onDisplayPress: () => void;
  onFilterPress: () => void;
};
export default function HeaderRecipesOptions({
  onDisplayPress,
  onFilterPress,
}: Props) {
  const colors = useThemeColors();
  return (
    <View style={styles.buttonsContainer}>
      <IconButton
        icon={<Feather name="grid" size={20} color={colors.text} />}
        onPress={onDisplayPress}
      />
      <IconButton
        icon={<AntDesign name="filter" size={20} color={colors.accent} />}
        onPress={onFilterPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    marginRight: 10,
  },
});
