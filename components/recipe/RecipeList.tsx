import { Recipe } from "@/types/Recipe";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import RecipeCard from "./RecipeCard";
import SearchRecipe from "./SearchRecipe";

type Props = {
  recipes: Recipe[];
  search: string;
  setSearch: (text: string) => void;
};
export default function RecipeList({ recipes, search, setSearch }: Props) {
  return (
    <FlatList
      data={recipes}
      numColumns={2}
      keyExtractor={(item) => item.id!.toString()}
      renderItem={({ item }) => <RecipeCard recipe={item} />}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.row}
      ListHeaderComponent={
        <SearchRecipe search={search} setSearch={setSearch} />
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    // padding: 10,
  },
  row: {
    justifyContent: "space-between",
    gap: 12,
  },
});
