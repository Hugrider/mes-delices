import { PaddingContainer, useThemeColors } from "@/constants/Theme";
import { StyleSheet, View } from "react-native";
import NewRecipeForm from "./components/NewRecipeForm";

export default function AddRecipeScreen() {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <NewRecipeForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: PaddingContainer },
});
