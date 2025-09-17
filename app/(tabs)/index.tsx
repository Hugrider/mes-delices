import HeaderRecipesOptions from "@/components/allRecipe/HeaderRecipesOptions";
import FloatingButton from "@/components/FloatingButton";
import RecipeList from "@/components/recipe/RecipeList";
import { PaddingContainer, useThemeColors } from "@/constants/Theme";
import useRecipeStore from "@/store/useRecipeStore";
import { Recipe } from "@/types/Recipe";
import { AntDesign } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Recipes() {
  const router = useRouter();
  const colors = useThemeColors();
  const { recipes } = useRecipeStore();

  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState<Recipe[]>(recipes);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.trim() === "") {
        setFilteredItems(recipes);
      } else {
        setFilteredItems(
          recipes.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
        );
      }
    }, 300); // délai 300ms

    return () => clearTimeout(timeout);
  }, [search, recipes]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <HeaderRecipesOptions
              onDisplayPress={() => alert("Affichage")}
              onFilterPress={() => setIsFilterVisible((state) => !state)}
            />
          ),
        }}
      />
      <RecipeList
        recipes={filteredItems}
        search={search}
        setSearch={setSearch}
      />
      <FloatingButton
        icon={<AntDesign name="plus" size={28} color="#fff" />}
        onPress={() => router.push("/add-recipe")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: PaddingContainer,
  },
  search: {
    marginBottom: 30,
  },
});
