import { PaddingContainer, useThemeColors } from "@/constants/Theme";
import { StyleSheet, Text, View } from "react-native";

export default function Menus() {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text>Créer des menus</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PaddingContainer,
  },
});
