import Input from "@/components/Input";
import { useThemeColors } from "@/constants/Theme";
import { Octicons } from "@expo/vector-icons";
import React from "react";

type Props = {
  search: string;
  setSearch: (text: string) => void;
};

export default function SearchRecipe({ search, setSearch }: Props) {
  const colors = useThemeColors();

  return (
    <Input
      value={search}
      onChangeText={setSearch}
      label="Rechercher"
      wrapperStyle={{ marginBottom: 20 }}
      icon={<Octicons name="search" size={24} color={colors.border} />}
      returnKeyType="search"
    />
  );
}
