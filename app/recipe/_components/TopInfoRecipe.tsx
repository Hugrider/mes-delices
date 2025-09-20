import RecipeGrade from "@/components/recipe/RecipeGrade";
import ThemedText from "@/components/ThemedText";
import { useThemeColors } from "@/constants/Theme";
import { Recipe } from "@/types/Recipe";
import { getCategoryLabel } from "@/utils/category-utils";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import RecipeTags from "./RecipeTags";

type Props = {
  recipe: Recipe;
};
export default function TopInfoRecipe({ recipe }: Props) {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <ThemedText
        text={recipe.name}
        style={[styles.title, { color: colors.accent }]}
      />
      <ThemedText
        text={getCategoryLabel(recipe.category)}
        style={[styles.category, { color: colors.inactive }]}
      />
      <RecipeGrade grade={recipe.grade} style={styles.grade} />
      {recipe.tags.length !== 0 && (
        <RecipeTags tags={recipe.tags} style={styles.tags} />
      )}
      <View style={styles.cookingTime}>
        <AntDesign name="clock-circle" size={20} color={colors.inactive} />
        <ThemedText text={`${recipe.cookingTime ?? "--"} min`} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 700,
  },
  category: {
    textAlign: "center",
    marginTop: 4,
  },
  grade: {
    marginTop: 15,
  },
  tags: {
    marginTop: 15,
  },
  cookingTime: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: 10,
  },
});
