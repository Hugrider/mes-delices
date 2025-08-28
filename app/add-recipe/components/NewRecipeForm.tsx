import Input from "@/components/Input";
import ThemedButton from "@/components/ThemedButton";
import ThemedText from "@/components/ThemedText";
import { ShadowProperties, useThemeColors } from "@/constants/Theme";
import useRecipeStore from "@/store/useRecipeStore";
import { CATEGORIES } from "@/types/Category";
import { Recipe } from "@/types/Recipe";
import { getCategoryLabel } from "@/utils/category-utils";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import IngredientsInput from "./IngredientsInput";
import PhotoPicker from "./PhotoPicker";

export default function NewRecipeForm() {
  const colors = useThemeColors();
  const { addRecipe } = useRecipeStore();

  const [form, setForm] = useState<Recipe>({
    name: "",
    photoUri: null,
    category: "",
    ingredients: [],
    servings: 0,
    tags: [],
    description: "",
    createdAt: "",
  });
  const [isStepsEnabled, setIsStepsEnabled] = useState(false);

  const handleEditvalue = (key: keyof Recipe, value: any) => {
    setForm((prevValues) => ({ ...prevValues, [key]: value }));
  };

  const handleSubmit = async () => {
    await addRecipe(form);
    alert("Enregistré !");
    router.back();
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ paddingTop: 14 }}
    >
      <PhotoPicker
        photoUri={form.photoUri}
        onChange={(val) => handleEditvalue("photoUri", val)}
      />
      <Input
        value={form.name}
        onChangeText={(val) => handleEditvalue("name", val)}
        label="Nom de la recette"
      />
      <View style={styles.categoriesWrapper}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => handleEditvalue("category", category)}
            style={[
              {
                padding: 10,
                borderRadius: 20,
                backgroundColor:
                  form.category === category
                    ? colors.primary
                    : colors.onBackground,
              },
              ShadowProperties,
            ]}
          >
            <Text
              style={{
                color: form.category === category ? "#fff" : colors.text,
              }}
            >
              {getCategoryLabel(category)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <IngredientsInput
        ingredients={form.ingredients}
        onChange={(val) => handleEditvalue("ingredients", val)}
      />
      <View style={[styles.isStepsEnabled, { borderColor: colors.border }]}>
        <ThemedText text="Ajouter des instructions" />
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
      <View style={styles.buttonContainer}>
        <ThemedButton
          text="Enregistrer"
          type="primary"
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoriesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  isStepsEnabled: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 40,
  },
});
