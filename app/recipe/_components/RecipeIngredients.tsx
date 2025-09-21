import IconButton from "@/components/IconButton";
import ThemedText from "@/components/ThemedText";
import { useThemeColors } from "@/constants/Theme";
import { Recipe } from "@/types/Recipe";
import {
  getIngredientName,
  getIngredientQuantity,
} from "@/utils/ingredients-utils";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  recipe: Recipe;
};
export default function RecipeIngredients({ recipe }: Props) {
  const colors = useThemeColors();

  function handleIncreaseServings() {}
  function handleDecreaseServings() {}

  return (
    <View style={styles.container}>
      <View style={styles.servings}>
        <ThemedText text="Ingrédients pour" />
        <ThemedText
          text={` ${recipe.servings} portions`}
          style={[styles.servingsValue, { color: colors.primary }]}
        />
        <View style={styles.servingsButtons}>
          <IconButton
            icon={<Feather name="minus" size={22} color={colors.text} />}
            onPress={handleDecreaseServings}
          />
          <IconButton
            icon={<Feather name="plus" size={22} color={colors.primary} />}
            onPress={handleIncreaseServings}
          />
        </View>
      </View>

      <View style={styles.ingredientList}>
        {recipe.ingredients.map((ingredient, index) => (
          <View style={styles.ingredientRow} key={index}>
            <ThemedText
              text={getIngredientName(ingredient)}
              style={styles.ingredient}
            />
            <ThemedText
              text={getIngredientQuantity(ingredient)}
              style={styles.ingredient}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  servings: {
    flexDirection: "row",
    alignItems: "center",
  },
  servingsValue: {
    fontWeight: "bold",
  },
  servingsButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    position: "absolute",
    right: 0,
  },
  ingredientList: {
    marginTop: 20,
    marginLeft: 10,
  },
  ingredientRow: {
    flexDirection: "row",
    paddingHorizontal: 10,
    flex: 1,
    marginBottom: 10,
  },
  ingredient: {
    flex: 1,
  },
});
