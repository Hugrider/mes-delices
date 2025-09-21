import Input from "@/components/Input";
import { RecipeForm } from "@/types/Recipe";
import React from "react";
import { StyleSheet, View } from "react-native";
import IngredientsInput from "./IngredientsInput";

type Props = {
  form: RecipeForm;
  setForm: (value: React.SetStateAction<RecipeForm>) => void;
};

export default function FormIngredients({ form, setForm }: Props) {
  const handleEditvalue = (key: keyof RecipeForm, value: any) => {
    setForm((prevValues) => ({ ...prevValues, [key]: value }));
  };

  return (
    <View>
      <Input
        value={form.servings.toString()}
        onChangeText={(val) => handleEditvalue("servings", val)}
        label="Nombre de portions"
        type="number"
      />

      <IngredientsInput
        ingredients={form.ingredients}
        onChange={(val) => handleEditvalue("ingredients", val)}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
