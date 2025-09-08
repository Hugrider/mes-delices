import Input from "@/components/Input";
import Popup from "@/components/Popup";
import ThemedButton from "@/components/ThemedButton";
import useTagStore from "@/store/useTagStore";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
};
export default function AddTag({ isVisible, setIsVisible }: Props) {
  const { addTag } = useTagStore();
  const [tagName, setTagName] = useState<string>("");

  function closePopup() {
    setTagName("");
    setIsVisible(false);
  }

  async function handleAddTag() {
    if (tagName) {
      await addTag(tagName);
    }
    closePopup();
  }

  return (
    <Popup
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      title={"Nouveau Tag"}
    >
      <Input
        value={tagName}
        onChangeText={setTagName}
        placeholder="Nom du tag"
        wrapperStyle={{ width: "100%" }}
      />
      <View style={styles.buttonsPopupContainer}>
        <ThemedButton text="Annuler" onPress={closePopup} />

        <ThemedButton text="Ajouter" type="primary" onPress={handleAddTag} />
      </View>
    </Popup>
  );
}

const styles = StyleSheet.create({
  buttonsPopupContainer: {
    flexDirection: "row",
  },
});
