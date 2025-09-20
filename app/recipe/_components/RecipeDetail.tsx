import ThemedText from "@/components/ThemedText";
import { useThemeColors } from "@/constants/Theme";
import { Recipe } from "@/types/Recipe";
import { formatDateLong } from "@/utils/date-utils";
import React from "react";
import { Linking, StyleSheet, View } from "react-native";

type Props = {
  recipe: Recipe;
};

export default function RecipeDetail({ recipe }: Props) {
  const colors = useThemeColors();

  return (
    <View>
      {recipe.link && (
        <View>
          <ThemedText
            text={`Lien externe : ${recipe.link}`}
            style={[{ color: colors.primary }]}
            onPress={() => Linking.openURL(recipe.link)}
          />
        </View>
      )}
      <ThemedText
        text={`Créée le ${formatDateLong(recipe.createdAt)}`}
        style={[{ color: colors.primary }]}
        onPress={() => Linking.openURL(recipe.link)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    marginTop: 30,
  },
});
