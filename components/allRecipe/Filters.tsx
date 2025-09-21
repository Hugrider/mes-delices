import { useThemeColors } from "@/constants/Theme";
import useTagStore from "@/store/useTagStore";
import { Recipe } from "@/types/Recipe";
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
  filteredItems: Recipe[];
  setFilteredItems: (recipes: Recipe[]) => void;
};
export default forwardRef<BottomSheet, Props>(function Filters(
  { items, filteredItems, setFilteredItems }: Props,
  ref
) {
  const colors = useThemeColors();
  const { tags } = useTagStore();

  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  function handleApplyFilters() {
    if (!selectedTagIds.length) {
      setFilteredItems(items);
      return;
    }

    const newFilteredItems = items.filter((item) =>
      item.tags.some((tag) => selectedTagIds.includes(tag.id))
    );
    setFilteredItems(newFilteredItems);
  }

  return (
    <CustomBottomSheet ref={ref} points={["25%", "50%"]}>
      <View style={styles.container}>
        <ThemedText
          text="Filtrer les recettes"
          style={[styles.title, { color: colors.accent }]}
        />
        <Dropdown
          items={tags}
          keyExtractor={(tag) => tag.id.toString()}
          renderLabel={(tag) => tag.name}
          title="Filtrer par Tags"
          onChange={(selected) =>
            setSelectedTagIds(selected.map((tag) => tag.id))
          }
          noItem={() => {
            router.back();
            router.push("/tags");
          }}
        />
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
