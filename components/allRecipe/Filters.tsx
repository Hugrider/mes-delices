import { useThemeColors } from "@/constants/Theme";
import useTagStore from "@/store/useTagStore";
import { CATEGORIES } from "@/types/Category";
import { Recipe } from "@/types/Recipe";
import { Tag } from "@/types/Tag";
import { getCategoryLabel } from "@/utils/category-utils";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { forwardRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomBottomSheet from "../CustomBottomSheet";
import Dropdown from "../Dropdown";
import ThemedButton from "../ThemedButton";
import ThemedText from "../ThemedText";

type Props = {
  items: Recipe[];
  setFilteredItems: (recipes: Recipe[]) => void;
};
export default forwardRef<BottomSheet, Props>(function Filters(
  { items, setFilteredItems }: Props,
  ref
) {
  const colors = useThemeColors();
  const { tags } = useTagStore();

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  function handleApplyFilters() {
    let filtered = items;

    // Filtre par tags si au moins un tag sélectionné
    if (selectedTags.length > 0) {
      filtered = filtered.filter((item) =>
        item.tags.some((tag) =>
          selectedTags.map((tag) => tag.id).includes(tag.id)
        )
      );
    }

    // Filtre par catégories si au moins une catégorie sélectionnée
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    setFilteredItems(filtered);
  }

  function handleClear() {
    setSelectedCategories([]);
    setSelectedTags([]);
    setFilteredItems(items);
  }

  return (
    <CustomBottomSheet ref={ref} points={["25%", "50%"]}>
      <View style={styles.container}>
        <ThemedText
          text="Filtrer les recettes"
          style={[styles.title, { color: colors.accent }]}
        />
        <Dropdown
          items={CATEGORIES.map((cat) => cat)}
          keyExtractor={(cat) => cat}
          renderLabel={(cat) => getCategoryLabel(cat)}
          title="Filtrer par Catégories"
          selectedItems={selectedCategories}
          onChange={(selected) => setSelectedCategories(selected)}
          noItem={() => {
            router.back();
            router.push("/tags");
          }}
        />
        <Dropdown
          items={tags}
          keyExtractor={(tag) => tag.id.toString()}
          renderLabel={(tag) => tag.name}
          title="Filtrer par Tags"
          selectedItems={selectedTags}
          onChange={(selected) => setSelectedTags(selected)}
          noItem={() => {
            router.back();
            router.push("/tags");
          }}
        />
        <ThemedButton text="Réinitialiser" onPress={handleClear} />
        <ThemedButton
          text="Appliquer"
          type="primary"
          onPress={handleApplyFilters}
        />
      </View>
    </CustomBottomSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
