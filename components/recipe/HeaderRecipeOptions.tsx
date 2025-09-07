import { useThemeColors } from "@/constants/Theme";
import { AntDesign, Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../IconButton";

type Props = {
  recipeId: number;
  onEdit: (recipeId: number) => void;
  onDelete: (recipeId: number) => void;
};
export default function HeaderRecipeOptions({
  recipeId,
  onEdit,
  onDelete,
}: Props) {
  const colors = useThemeColors();
  return (
    <View style={styles.buttonsContainer}>
      <IconButton
        icon={<AntDesign name="delete" size={20} color="red" />}
        onPress={() => onDelete(recipeId)}
      />
      <IconButton
        icon={<Feather name="edit" size={20} color={colors.text} />}
        onPress={() => onEdit(recipeId)}
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
