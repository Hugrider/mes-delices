import { ConfirmPopupHandler } from "@/components/ConfirmPopupHandler";
import { useThemeColors } from "@/constants/Theme";
import useRecipeStore from "@/store/useRecipeStore";
import type { Recipe as RecipeType } from "@/types/Recipe";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HeaderRecipeOptions from "./_components/HeaderRecipeOptions";
import RecipeDetail from "./_components/RecipeDetail";
import RecipeIngredients from "./_components/RecipeIngredients";
import RecipeInstructions from "./_components/RecipeInstructions";
import RecipeTabs, { RecipeTab } from "./_components/RecipeTabs";
import TopInfoRecipe from "./_components/TopInfoRecipe";

export default function Recipe() {
  const { id } = useLocalSearchParams();
  const { getRecipeById, removeRecipe } = useRecipeStore();
  const colors = useThemeColors();
  const [recipe, setRecipe] = useState<RecipeType>();
  const [selectedTab, setSelectedTab] = useState<number>(0);
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

  function getTabs(recipe?: RecipeType): RecipeTab[] {
    const baseTabs: RecipeTab[] = [
      { key: 0, value: "Ingrédients" },
      { key: 1, value: "Détails" },
    ];

    if (recipe?.description) {
      baseTabs.push({ key: 2, value: "Instructions" });
    }

    return baseTabs;
  }

  const deleteRecipe = async (id: number) => {
    await removeRecipe(id);
    router.back();
  };

  const requestDelete = async (recipe: RecipeType) => {
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
          <TopInfoRecipe recipe={recipe} />
          <RecipeTabs
            tabs={getTabs(recipe)}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />

          <View style={styles.tabsContent}>
            {selectedTab === 0 ? (
              <RecipeIngredients recipe={recipe} />
            ) : selectedTab === 1 ? (
              <RecipeDetail recipe={recipe} />
            ) : (
              <RecipeInstructions recipe={recipe} />
            )}
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
  tabsContent: {
    marginTop: 20,
  },
});
