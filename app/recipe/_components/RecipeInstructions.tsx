import ThemedText from "@/components/ThemedText";
import { useThemeColors } from "@/constants/Theme";
import { Recipe } from "@/types/Recipe";
import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";

type Props = {
  recipe: Recipe;
};

export default function RecipeInstructions({ recipe }: Props) {
  const colors = useThemeColors();
  return (
    <View>
      {recipe.link && (
        <View style={styles.linkContainer}>
          <ThemedText text="Lien :" />
          <ThemedText
            text={recipe.link}
            style={[styles.link, { color: colors.primary }]}
            numberOfLines={1}
            ellipsizeMode="tail"
            onPress={() => Linking.openURL(recipe.link)}
          />
        </View>
      )}
      <View style={styles.stepsContainer}>
        <Text>Instructions :</Text>
        <ThemedText text={recipe.description} style={styles.description} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linkContainer: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
  },
  link: {
    flex: 1,
  },
  stepsContainer: {
    marginTop: 20,
  },
  description: {
    marginTop: 10,
  },
});
