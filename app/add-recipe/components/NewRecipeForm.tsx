import IconButton from "@/components/IconButton";
import SlideTabs, { SlideTabsType } from "@/components/SlideTabs";
import { useThemeColors } from "@/constants/Theme";
import useRecipeStore from "@/store/useRecipeStore";
import { RecipeForm } from "@/types/Recipe";
import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormDetails from "../../../components/recipeForm/FormDetails";
import FormIngredients from "../../../components/recipeForm/FormIngredients";
import FormInstructions from "../../../components/recipeForm/FormInstructions";

export default function NewRecipeForm() {
  const colors = useThemeColors();
  const { addRecipe } = useRecipeStore();

  const [form, setForm] = useState<RecipeForm>({
    name: "",
    photoUri: null,
    category: "",
    grade: 0,
    ingredients: [],
    servings: 2,
    cookingTime: 10,
    tagIds: [],
    description: "",
    link: "",
  });
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const tabs: SlideTabsType[] = [
    { key: 0, value: "Détails" },
    { key: 1, value: "Ingrédients" },
    { key: 2, value: "Instructions" },
  ];

  const handleSubmit = async () => {
    await addRecipe(form);
    router.back();
  };

  return (
    <View>
      <Stack.Screen
        options={{
          headerRight: () => (
            <IconButton
              icon={<Feather name="check" size={24} color={colors.accent} />}
              backgroundColor={"transparent"}
              onPress={handleSubmit}
            />
          ),
        }}
      />
      <SlideTabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        extraScrollHeight={30} // décale le scroll quand le clavier sort
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tabContent}>
          {selectedTab === 0 && <FormDetails form={form} setForm={setForm} />}
          {selectedTab === 1 && (
            <FormIngredients form={form} setForm={setForm} />
          )}
          {selectedTab === 2 && (
            <FormInstructions form={form} setForm={setForm} />
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  tabContent: {
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 40,
  },
});
