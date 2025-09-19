import { useThemeColors } from "@/constants/Theme";
import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../IconButton";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};
export default function HeaderRecipeOptions({ onEdit, onDelete }: Props) {
  const colors = useThemeColors();
  return (
    <View style={styles.buttonsContainer}>
      <IconButton
        icon={<AntDesign name="delete" size={20} color="red" />}
        backgroundColor={"transparent"}
        onPress={onDelete}
      />
      <IconButton
        icon={<Feather name="edit" size={20} color={colors.text} />}
        backgroundColor={"transparent"}
        onPress={onEdit}
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
