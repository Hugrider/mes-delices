import Input from "@/components/Input";
import { useThemeColors } from "@/constants/Theme";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type Props = {
  ingredients: string[];
  onChange: (values: string[]) => void;
};

export default function IngredientsInput({ ingredients, onChange }: Props) {
  const colors = useThemeColors();
  const [current, setCurrent] = useState("");

  const addIngredient = () => {
    if (!current.trim()) return;
    onChange([...ingredients, current.trim()]);
    setCurrent("");
  };

  const removeIngredient = (index: number) => {
    onChange(ingredients.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingrédients</Text>

      <View style={styles.row}>
        <Input
          value={current}
          onChangeText={setCurrent}
          label="Ex: 2 tomates"
          wrapperStyle={{ flex: 1 }}
        />

        <Button title="+" onPress={addIngredient} />
      </View>

      {/* Liste des ingrédients déjà ajoutés */}
      {ingredients.map((ing, index) => (
        <View key={index} style={styles.ingredientRow}>
          <Text style={styles.ingredientText}>{ing}</Text>
          <Button title="✕" onPress={() => removeIngredient(index)} />
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
  },
  ingredientText: {
    fontSize: 16,
  },
  label: {
    fontWeight: "600",
    marginBottom: 8,
  },
});
