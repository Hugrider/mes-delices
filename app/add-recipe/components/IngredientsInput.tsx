import IconButton from "@/components/IconButton";
import Input from "@/components/Input";
import ThemedText from "@/components/ThemedText";
import { useThemeColors } from "@/constants/Theme";
import {
  getIngredientName,
  getIngredientQuantity,
} from "@/utils/ingredients-utils";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  ingredients: string[];
  onChange: (values: string[]) => void;
};

export default function IngredientsInput({ ingredients, onChange }: Props) {
  const colors = useThemeColors();
  const [currentName, setCurrentName] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState("");

  const addIngredient = () => {
    if (!currentName.trim()) return;
    onChange([
      ...ingredients,
      currentName.trim() + ";" + currentQuantity.trim(),
    ]);
    setCurrentName("");
    setCurrentQuantity("");
  };

  const removeIngredient = (index: number) => {
    onChange(ingredients.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <ThemedText text="Ingrédients :" />

      <View style={styles.row}>
        <Input
          value={currentName}
          onChangeText={setCurrentName}
          label="Ex: Crème fraiche"
          wrapperStyle={{ flex: 1 }}
        />
        <Input
          value={currentQuantity}
          onChangeText={setCurrentQuantity}
          label="Ex: 250g"
          wrapperStyle={{ width: 100 }}
        />

        <IconButton
          icon={<Feather name="plus" size={22} color={colors.primary} />}
          onPress={addIngredient}
        />
      </View>

      {/* Liste des ingrédients déjà ajoutés */}
      {[...ingredients].reverse().map((ing, index) => (
        <View key={index} style={styles.ingredientRow}>
          <ThemedText text={getIngredientName(ing)} style={styles.name} />
          <ThemedText
            text={getIngredientQuantity(ing)}
            style={styles.quantity}
          />
          <IconButton
            icon={<AntDesign name="close" size={18} color="red" />}
            onPress={() => removeIngredient(ingredients.length - 1 - index)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 12,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    paddingLeft: 10,
  },
  name: {
    flex: 1,
  },
  quantity: {
    fontWeight: "600",
    width: 100,
  },
});
