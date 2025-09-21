import Input from "@/components/Input";
import ThemedText from "@/components/ThemedText";
import { useThemeColors } from "@/constants/Theme";
import { RecipeForm } from "@/types/Recipe";
import React, { useState } from "react";
import { StyleSheet, Switch, View } from "react-native";

type Props = {
  form: RecipeForm;
  setForm: (value: React.SetStateAction<RecipeForm>) => void;
};

export default function FormInstructions({ form, setForm }: Props) {
  const colors = useThemeColors();

  const [isStepsEnabled, setIsStepsEnabled] = useState(false);

  const handleEditvalue = (key: keyof RecipeForm, value: any) => {
    setForm((prevValues) => ({ ...prevValues, [key]: value }));
  };
  return (
    <View>
      <Input
        value={form.cookingTime.toString()}
        onChangeText={(val) => handleEditvalue("cookingTime", val)}
        label="Temps de préparation"
        icon={<ThemedText text="min" style={{ color: colors.inactive }} />}
        type="number"
      />

      <Input
        value={form.link}
        onChangeText={(val) => handleEditvalue("link", val)}
        label="Lien externe"
      />
      <View style={[styles.isStepsEnabled, { borderColor: colors.border }]}>
        <ThemedText text="Ajouter des étapes" />
        <Switch
          value={isStepsEnabled}
          onChange={() => setIsStepsEnabled(!isStepsEnabled)}
        />
      </View>
      {isStepsEnabled && (
        <Input
          value={form.description}
          onChangeText={(val) => handleEditvalue("description", val)}
          label="Description"
          multiline
          numberOfLines={8}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  isStepsEnabled: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
