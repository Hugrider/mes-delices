import { useThemeColors } from "@/constants/Theme";
import { Tag } from "@/types/Tag";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import ThemedText from "../../../components/ThemedText";

type Props = {
  tags: Tag[];
  style?: ViewStyle;
};
export default function RecipeTags({ tags, style }: Props) {
  const colors = useThemeColors();

  return (
    <View style={[styles.container, style]}>
      {tags.map((tag) => (
        <View
          key={tag.id}
          style={[styles.tag, { backgroundColor: colors.onBackground }]}
        >
          <AntDesign name="tag" size={16} color={colors.primary} />
          <ThemedText
            text={tag.name}
            style={{ fontSize: 12, fontWeight: 300 }}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 5,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 6,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 10,
  },
});
