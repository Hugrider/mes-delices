import { ConfirmPopupHandler } from "@/components/ConfirmPopupHandler";
import ThemedButton from "@/components/ThemedButton";
import ThemedText from "@/components/ThemedText";
import { useThemeColors } from "@/constants/Theme";
import useRecipeStore from "@/store/useRecipeStore";
import { Recipe } from "@/types/Recipe";
import { getCategoryLabel } from "@/utils/category-utils";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { getRecipeById, removeRecipe } = useRecipeStore();
  const colors = useThemeColors();
  const [recipe, setRecipe] = useState<Recipe>();
  const [editing, setEditing] = useState(false);

  const IMAGE_HEIGHT = 400;

  useEffect(() => {
    (async () => {
      const result = await getRecipeById(Number(id));
      if (result) {
        setRecipe(result);
        // navigation.setOptions({ title: result.name });
      }
    })();
  }, [id, getRecipeById, navigation]);

  const deleteRecipe = async (id: number) => {
    await removeRecipe(id);
    router.back();
  };

  const requestDelete = async (id: number) => {
    const message = `Vous êtes sur le point de supprimer définitivement "${recipe?.name}".`;
    const androidTitle = "Suppression recette";
    const iosBtnDeleteMessage = "Supprimer la recette";
    ConfirmPopupHandler(message, iosBtnDeleteMessage, androidTitle, () =>
      deleteRecipe(id)
    );
  };

  if (!recipe) return;
  return (
    <View style={styles.container}>
      <Image
        source={
          recipe.photoUri
            ? { uri: recipe.photoUri }
            : require("@/assets/images/icon.png")
        }
        style={{ height: IMAGE_HEIGHT }}
      />
      <ScrollView
        style={StyleSheet.absoluteFill}
        contentContainerStyle={{ paddingTop: IMAGE_HEIGHT - 50 }}
      >
        <View style={[styles.content, { backgroundColor: colors.background }]}>
          <ThemedText
            text={recipe.name}
            style={[styles.title, { color: colors.accent }]}
          />
          <ThemedText
            text={getCategoryLabel(recipe.category)}
            style={[styles.category, { color: colors.inactive }]}
          />
          <ThemedText
            text="Ingrédients"
            style={[styles.ingredientsLabel, { color: colors.primary }]}
          />
          <View style={styles.ingredientList}>
            {recipe.ingredients.map((ingredient, index) => (
              <ThemedText
                key={index}
                text={`• ${ingredient}`}
                style={styles.ingredient}
              />
            ))}
          </View>
          <ThemedText text={recipe.description} style={styles.description} />
          <View style={styles.buttonsContainer}>
            <ThemedButton
              text="Supprimer"
              type="delete"
              onPress={() => requestDelete(recipe.id)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    minHeight: Dimensions.get("window").height,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 5,
  },
  category: {
    textAlign: "center",
  },
  ingredientsLabel: {
    fontWeight: "bold",
    marginTop: 30,
  },
  ingredientList: {
    marginTop: 5,
    marginLeft: 10,
  },
  ingredient: {
    marginTop: 4,
  },
  description: {
    marginTop: 30,
  },
  buttonsContainer: {
    marginTop: 30,
  },
});
