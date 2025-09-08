import { ShadowProperties, useThemeColors } from "@/constants/Theme";
import React from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import ThemedText from "./ThemedText";

type Props = {
  title?: string;
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
  children: React.ReactNode;
};
export default function Popup({
  title,
  isVisible,
  setIsVisible,
  children,
}: Props) {
  const colors = useThemeColors();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setIsVisible(!isVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            ShadowProperties,
            { backgroundColor: colors.tabBarBackground },
          ]}
        >
          {title && <ThemedText text={title} style={styles.title} />}
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    minHeight: 150,
    borderRadius: 10,
    padding: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
  },
});
