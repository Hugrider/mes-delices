import ThemedText from "@/components/ThemedText";
import { Recipe } from "@/types/Recipe";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  recipe: Recipe;
};

export default function RecipeInstructions({ recipe }: Props) {
  return (
    <View>
      <Text>Instructions</Text>
      <ThemedText text={recipe.description} style={styles.description} />
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    marginTop: 30,
  },
});
