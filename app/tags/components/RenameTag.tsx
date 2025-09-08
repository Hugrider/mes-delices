import Input from "@/components/Input";
import Popup from "@/components/Popup";
import ThemedButton from "@/components/ThemedButton";
import useTagStore from "@/store/useTagStore";
import { Tag } from "@/types/Tag";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  tag: Tag | null;
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
};
export default function RenameTag({ tag, isVisible, setIsVisible }: Props) {
  const { updateTag } = useTagStore();
  const [tagName, setTagName] = useState<string>("");

  useEffect(() => {
    if (tag?.name) {
      setTagName(tag.name);
    }
  }, [tag]);
  function closePopup() {
    setIsVisible(false);
    setTagName("");
  }

  async function handleSaveTag() {
    if (tagName && tag) {
      const updatedTag: Tag = { id: tag.id, name: tagName };
      await updateTag(updatedTag);
    }
    closePopup();
  }

  return (
    <Popup
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      title={"Modifier le Tag"}
    >
      <Input
        value={tagName}
        onChangeText={setTagName}
        placeholder="Nom du tag"
        wrapperStyle={{ width: "100%" }}
      />
      <View style={styles.buttonsPopupContainer}>
        <ThemedButton text="Annuler" onPress={closePopup} />

        <ThemedButton
          text="Enregistrer"
          type="primary"
          onPress={handleSaveTag}
        />
      </View>
    </Popup>
  );
}

const styles = StyleSheet.create({
  buttonsPopupContainer: {
    flexDirection: "row",
  },
});
