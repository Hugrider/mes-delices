import { Recipe } from "@/types/Recipe";
import { router } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";
import ThemedText from "../ThemedText";

type Props = {
  recipe: Recipe;
};
export default function RecipeCard({ recipe }: Props) {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 36) / 2; // 2 colonnes + marges

  return (
    <TouchableOpacity
      style={[styles.card, { maxWidth: cardWidth }]}
      onPress={() => router.push(`/recipe/${recipe.id}`)}
      activeOpacity={0.6}
    >
      <Image
        source={
          recipe.photoUri
            ? { uri: recipe.photoUri }
            : require("@/assets/images/icon.png")
        }
        style={styles.image}
      />
      <ThemedText text={recipe.name} style={styles.title} />
      {/* <Button title="Supprimer" onPress={() => handleDelete(recipe.id!)} /> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginBottom: 0,
    overflow: "hidden",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  title: {
    marginTop: 5,
    textAlign: "center",
    fontWeight: "bold",
    height: 40,
  },
});
