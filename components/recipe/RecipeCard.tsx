import { useThemeColors } from "@/constants/Theme";
import { Recipe } from "@/types/Recipe";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ThemedText from "../ThemedText";
import RecipeGrade from "./RecipeGrade";

type Props = {
  recipe: Recipe;
};
export default function RecipeCard({ recipe }: Props) {
  const colors = useThemeColors();
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
      <View style={[styles.grade, { backgroundColor: colors.background }]}>
        <RecipeGrade grade={recipe.grade} compact />
      </View>
      <ThemedText text={recipe.name} style={styles.title} />
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
  grade: {
    position: "absolute",
    top: 6,
    right: 6,
    borderRadius: 10,
    padding: 3,
    paddingRight: 6,
    paddingLeft: 6,
  },
  title: {
    marginTop: 5,
    textAlign: "center",
    fontWeight: "bold",
    height: 40,
  },
});
