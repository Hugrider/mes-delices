import Item from "@/components/settings/Item";
import Section from "@/components/settings/Section";
import { resetDb } from "@/config/db";
import { PaddingContainer, useThemeColors } from "@/constants/Theme";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { BackHandler, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Settings() {
  const colors = useThemeColors();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Section title="Tags">
        <Item
          title="Gérer les Tags"
          icon={
            <Feather name="chevron-right" size={20} color={colors.inactive} />
          }
          onPress={() => router.push("/tags")}
        />
      </Section>
      <Section title="Données">
        <Item
          title="Rénitialiser les données"
          icon={
            <Feather name="chevron-right" size={20} color={colors.inactive} />
          }
          onPress={async () => {
            resetDb();
            BackHandler.exitApp();
          }}
        />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PaddingContainer,
  },
});
