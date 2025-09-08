import IconButton from "@/components/IconButton";
import { useThemeColors } from "@/constants/Theme";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  onAddPress: () => void;
  onEditPress: () => void;
};
export default function HeaderTagOptions({ onAddPress, onEditPress }: Props) {
  const colors = useThemeColors();
  return (
    <View style={styles.buttonsContainer}>
      <IconButton
        icon={<AntDesign name="edit" size={20} color={colors.text} />}
        onPress={onEditPress}
      />
      <IconButton
        icon={<AntDesign name="plus" size={20} color={colors.primary} />}
        onPress={onAddPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
