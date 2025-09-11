import { useThemeColors } from "@/constants/Theme";
import { Entypo, Feather } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ThemedButton from "./ThemedButton";
import ThemedText from "./ThemedText";

type DropdownProps<T> = {
  items: T[];
  keyExtractor: (item: T) => string;
  title: string;
  renderLabel: (item: T) => string;
  onChange?: (selected: T[]) => void;
  noItem: () => void;
};

export default function Dropdown<T>({
  items,
  keyExtractor,
  title,
  renderLabel,
  onChange,
  noItem,
}: DropdownProps<T>) {
  const colors = useThemeColors();
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [isExpended, setIsExpended] = useState(false);

  function toggleSelect(item: T) {
    const exists = selectedItems.some(
      (s) => keyExtractor(s) === keyExtractor(item)
    );

    let updated: T[];
    if (exists) {
      updated = selectedItems.filter(
        (s) => keyExtractor(s) !== keyExtractor(item)
      );
    } else {
      updated = [...selectedItems, item];
    }

    setSelectedItems(updated);
    onChange?.(updated);
  }

  function isSelected(item: T) {
    return selectedItems.some((s) => keyExtractor(s) === keyExtractor(item));
  }

  const selectedList = useMemo(
    () => selectedItems.map(renderLabel).join(", "),
    [selectedItems, renderLabel]
  );

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setIsExpended(!isExpended)}
        style={[
          styles.trigger,
          { borderColor: isExpended ? colors.primary : colors.border },
        ]}
      >
        <ThemedText text={selectedItems.length ? selectedList : title} />
        <Entypo name="chevron-small-down" size={20} color={colors.text} />
      </Pressable>
      {isExpended && (
        <ScrollView style={[styles.scrollView, { borderColor: colors.border }]}>
          {items.map((item) => (
            <TouchableOpacity
              key={keyExtractor(item)}
              style={[
                styles.item,
                {
                  borderBottomColor: colors.border,
                },
              ]}
              onPress={() => toggleSelect(item)}
            >
              <ThemedText
                text={renderLabel(item)}
                style={{
                  color: isSelected(item) ? colors.primary : colors.text,
                }}
              />
              {isSelected(item) && (
                <Feather name="check" size={18} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
          {items.length === 0 && (
            <ThemedButton text="Ajouter" onPress={noItem} />
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
  },
  trigger: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scrollView: {
    maxHeight: 150,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    position: "sticky",
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
