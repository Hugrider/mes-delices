import { PaddingContainer, useThemeColors } from "@/constants/Theme";
import useRecipeStore from "@/store/useRecipeStore";
import { Recipe as RecipeType } from "@/types/Recipe";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import EditRecipeForm from "./_components/EditRecipeForm";

export default function EditRecipe() {
  const { id } = useLocalSearchParams();
  const colors = useThemeColors();
  const { getRecipeById } = useRecipeStore();

  const [recipe, setRecipe] = useState<RecipeType>();

  useEffect(() => {
    (async () => {
      const result = await getRecipeById(Number(id));
      if (result) {
        setRecipe(result);
      }
    })();
  }, [id, getRecipeById]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {recipe && <EditRecipeForm recipe={recipe} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PaddingContainer,
  },
});
