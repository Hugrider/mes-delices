import { ConfirmPopupHandler } from "@/components/ConfirmPopupHandler";
import ThemedButton from "@/components/ThemedButton";
import ThemedText from "@/components/ThemedText";
import { PaddingContainer, useThemeColors } from "@/constants/Theme";
import useTagStore from "@/store/useTagStore";
import { Tag } from "@/types/Tag";
import { Feather, Octicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Button, Pressable, ScrollView, StyleSheet, View } from "react-native";
import AddTag from "./components/AddTag";
import HeaderTagOptions from "./components/HeaderTagsOptions";
import RenameTag from "./components/RenameTag";

export default function Tags() {
  const colors = useThemeColors();
  const { tags, removeTag } = useTagStore();

  const [isRenaming, setIsRenaming] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  function handleRename(tag: Tag) {
    setIsRenaming(true);
    setEditingTag(tag);
  }

  function isTagSelected(tagId: number): boolean {
    return selectedTagIds.includes(tagId);
  }

  function clearSelect() {
    setIsSelecting(false);
    setSelectedTagIds([]);
  }

  function toggleSelectTag(tag: Tag) {
    setSelectedTagIds((prev) =>
      prev.includes(tag.id)
        ? prev.filter((id) => id !== tag.id)
        : [...prev, tag.id]
    );
  }

  function handleTagLongPress(tag: Tag) {
    setIsSelecting(true);
    if (isSelecting) {
      toggleSelectTag(tag);
    } else {
      setSelectedTagIds([tag.id]);
    }
  }

  function handleTagPress(tag: Tag) {
    if (isSelecting) {
      toggleSelectTag(tag);
    } else {
      handleRename(tag);
    }
  }

  async function deleteTag(id: number) {
    await removeTag(id);
    clearSelect();
  }

  const requestDelete = async () => {
    const message = `Vous êtes sur le point de supprimer ${selectedTagIds.length} Tag(s).`;
    const androidTitle = "Suppression Tags";
    const iosBtnDeleteMessage = "Supprimer les Tags";
    ConfirmPopupHandler(message, iosBtnDeleteMessage, androidTitle, () =>
      selectedTagIds.forEach((tagId) => deleteTag(tagId))
    );
  };

  return (
    <>
      {/* Header navigation */}
      <Stack.Screen
        options={{
          headerRight: () =>
            isSelecting ? (
              <Button title="Annuler" onPress={clearSelect} />
            ) : (
              <HeaderTagOptions
                onAddPress={() => setIsAdding(true)}
                onEditPress={() => setIsSelecting(true)}
              />
            ),
          headerLargeTitle: true,
        }}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        {tags.length === 0 && (
          <ThemedButton
            text="Ajouter un Tag"
            type="primary"
            onPress={() => setIsAdding(true)}
          />
        )}

        {tags.map((tag) => (
          <Pressable
            key={tag.id}
            style={({ pressed }) => [
              {
                backgroundColor: colors.onBackground,
                borderColor: isTagSelected(tag.id)
                  ? colors.primary
                  : colors.border,
                opacity: pressed ? 0.5 : 1,
              },
              styles.tag,
            ]}
            onPress={() => handleTagPress(tag)}
            onLongPress={() => handleTagLongPress(tag)}
          >
            <ThemedText text={tag.name} />
            {isSelecting &&
              (isTagSelected(tag.id) ? (
                <Octicons
                  name="check-circle-fill"
                  size={20}
                  color={colors.primary}
                />
              ) : (
                <Feather name="circle" size={20} color={colors.primary} />
              ))}
          </Pressable>
        ))}
      </ScrollView>
      {isSelecting && (
        <View
          style={[styles.deleteButton, { backgroundColor: colors.background }]}
        >
          <ThemedButton
            text="Supprimer"
            onPress={requestDelete}
            type="delete"
            disable={selectedTagIds.length < 1}
          />
        </View>
      )}
      <AddTag isVisible={isAdding} setIsVisible={setIsAdding} />
      <RenameTag
        tag={editingTag}
        isVisible={isRenaming}
        setIsVisible={setIsRenaming}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PaddingContainer,
  },
  tag: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteButton: {
    // bottom: 30,
    height: 100,
  },
});
