import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import { ShadowProperties, useThemeColors } from "@/constants/Theme";
import useTagStore from "@/store/useTagStore";
import { CATEGORIES } from "@/types/Category";
import { RecipeForm } from "@/types/Recipe";
import { getCategoryLabel } from "@/utils/category-utils";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GradeInput from "./GradeInput";
import PhotoPicker from "./PhotoPicker";

type Props = {
  form: RecipeForm;
  setForm: (value: React.SetStateAction<RecipeForm>) => void;
};
export default function FormDetails({ form, setForm }: Props) {
  const colors = useThemeColors();
  const { tags } = useTagStore();

  const handleEditvalue = (key: keyof RecipeForm, value: any) => {
    setForm((prevValues) => ({ ...prevValues, [key]: value }));
  };

  return (
    <View>
      <PhotoPicker
        photoUri={form.photoUri}
        onChange={(val) => handleEditvalue("photoUri", val)}
      />
      <Input
        value={form.name}
        onChangeText={(val) => handleEditvalue("name", val)}
        label="Nom de la recette"
        wrapperStyle={styles.name}
      />
      <Dropdown
        items={tags}
        keyExtractor={(tag) => tag.id.toString()}
        title="Ajouter des Tags"
        renderLabel={(tag) => tag.name}
        onChange={(selected) =>
          handleEditvalue(
            "tagIds",
            selected.map((tag) => tag.id)
          )
        }
        noItem={() => {
          router.back();
          router.push("/tags");
        }}
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
      <GradeInput
        grade={form.grade}
        setGrade={(val) => handleEditvalue("grade", val)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    marginTop: 20,
  },
  categoriesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    justifyContent: "center",
    marginHorizontal: 40,
    marginTop: 15,
  },
});
