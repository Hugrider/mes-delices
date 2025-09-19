import { ConfirmPopupHandler } from "@/components/ConfirmPopupHandler";
import HeaderRecipeOptions from "@/components/recipe/HeaderRecipeOptions";
import RecipeGrade from "@/components/recipe/RecipeGrade";
import RecipeTags from "@/components/recipe/RecipeTags";
import ThemedText from "@/components/ThemedText";
import { useThemeColors } from "@/constants/Theme";
import useRecipeStore from "@/store/useRecipeStore";
import { Recipe } from "@/types/Recipe";
import { getCategoryLabel } from "@/utils/category-utils";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function RecipeDetail() {
  const { id } = useLocalSearchParams();
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
      }
    })();
  }, [id, getRecipeById]);

  const deleteRecipe = async (id: number) => {
    await removeRecipe(id);
    router.back();
  };

  const requestDelete = async (recipe: Recipe) => {
    const message = `Vous êtes sur le point de supprimer définitivement "${recipe.name}".`;
    const androidTitle = "Suppression recette";
    const iosBtnDeleteMessage = "Supprimer la recette";
    ConfirmPopupHandler(message, iosBtnDeleteMessage, androidTitle, () =>
      deleteRecipe(recipe.id)
    );
  };

  if (!recipe) return;
  return (
    <View style={styles.container}>
      {/* Header navigation */}
      <Stack.Screen
        options={{
          headerRight: () => (
            <HeaderRecipeOptions
              onDelete={() => requestDelete(recipe)}
              onEdit={() => alert("edition de " + recipe.id)}
            />
          ),
        }}
      />

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
        contentContainerStyle={{ paddingTop: IMAGE_HEIGHT - 30 }}
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
          <RecipeGrade grade={recipe.grade} style={{ margin: 10 }} />
          <RecipeTags tags={recipe.tags} />
          <View style={styles.cookingTime}>
            <AntDesign name="clock-circle" size={20} color={colors.inactive} />
            <ThemedText text={`${recipe.cookingTime ?? "--"} min`} />
          </View>

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
  cookingTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  ingredientsLabel: {
    fontWeight: "bold",
    marginTop: 20,
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
});
