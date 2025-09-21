import Filters from "@/components/allRecipe/Filters";
import HeaderRecipesOptions from "@/components/allRecipe/HeaderRecipesOptions";
import FloatingButton from "@/components/FloatingButton";
import RecipeList from "@/components/recipe/RecipeList";
import { PaddingContainer, useThemeColors } from "@/constants/Theme";
import useRecipeStore from "@/store/useRecipeStore";
import { Recipe } from "@/types/Recipe";
import { AntDesign } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { Tabs, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Recipes() {
  const router = useRouter();
  const colors = useThemeColors();
  const { recipes } = useRecipeStore();

  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState<Recipe[]>(recipes);

  const filterRef = useRef<BottomSheet>(null);

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
      <Tabs.Screen
        options={{
          headerRight: () => (
            <HeaderRecipesOptions
              onDisplayPress={() => alert("Bientôt disponible !")}
              onFilterPress={() => filterRef.current?.expand()}
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
      <Filters
        ref={filterRef}
        items={recipes}
        filteredItems={filteredItems}
        setFilteredItems={setFilteredItems}
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
    paddingBottom: 0,
  },
});
