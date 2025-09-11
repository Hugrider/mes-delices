import { useThemeColors } from "@/constants/Theme";
import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import ThemedText from "../ThemedText";

type Props = {
  title: string;
  children: ReactNode;
};
export default function Section({ title, children }: Props) {
  const colors = useThemeColors();

  return (
    <View style={styles.section}>
      <ThemedText text={title} style={styles.sectionTitle} />
      <View
        style={[
          styles.items,
          {
            borderColor: colors.border,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: 10,
  },
  items: {
    borderRadius: 10,
    overflow: "hidden",
  },
});
