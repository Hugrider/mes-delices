import ThemedText from "@/components/ThemedText";
import { useThemeColors } from "@/constants/Theme";
import { Recipe } from "@/types/Recipe";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  recipe: Recipe;
};
export default function RecipeIngredients({ recipe }: Props) {
  const colors = useThemeColors();
  return (
    <View>
      <ThemedText
        text="Ingrédients"
        style={[styles.ingredientsLabel, { color: colors.primary }]}
      />
      <ThemedText text={`Pour ${recipe.servings} portions`} />
      <View style={styles.ingredientList}>
        {recipe.ingredients.map((ingredient, index) => (
          <ThemedText
            key={index}
            text={`• ${ingredient}`}
            style={styles.ingredient}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ingredientsLabel: {
    fontWeight: "bold",
  },
  ingredientList: {
    marginTop: 5,
    marginLeft: 10,
  },
  ingredient: {
    marginTop: 4,
  },
});
