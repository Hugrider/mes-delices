import { ConfirmPopupHandler } from "@/components/ConfirmPopupHandler";
import SlideTabs, { SlideTabsType } from "@/components/SlideTabs";
import { useThemeColors } from "@/constants/Theme";
import useRecipeStore from "@/store/useRecipeStore";
import type { Recipe as RecipeType } from "@/types/Recipe";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HeaderRecipeOptions from "../_components/HeaderRecipeOptions";
import RecipeDetails from "../_components/RecipeDetails";
import RecipeIngredients from "../_components/RecipeIngredients";
import RecipeInstructions from "../_components/RecipeInstructions";

export default function Recipe() {
  const { id } = useLocalSearchParams();
  const { getRecipeById, removeRecipe } = useRecipeStore();
  const colors = useThemeColors();
  const [recipe, setRecipe] = useState<RecipeType>();
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const IMAGE_HEIGHT = 400;

  useEffect(() => {
    (async () => {
      const result = await getRecipeById(Number(id));
      if (result) {
        setRecipe(result);
      }
    })();
  }, [id, getRecipeById]);

  const TABS: SlideTabsType[] = [
    { key: 0, value: "Ingrédients" },
    { key: 1, value: "Instructions" },
  ];

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
              onEdit={() => router.push(`/recipe/${id}/edit`)}
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
          <RecipeDetails recipe={recipe} />
          <SlideTabs
            tabs={TABS}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            wrapperStyle={styles.tabsWrapper}
          />

          <View style={styles.tabsContent}>
            {selectedTab === 0 && <RecipeIngredients recipe={recipe} />}
            {selectedTab === 1 && <RecipeInstructions recipe={recipe} />}
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
  tabsWrapper: {
    marginTop: 20,
  },
  tabsContent: {
    marginTop: 20,
  },
});
