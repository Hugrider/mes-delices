import ThemedText from "@/components/ThemedText";
import { resetDb } from "@/config/db";
import { PaddingContainer, useThemeColors } from "@/constants/Theme";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { BackHandler, Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Settings() {
  const colors = useThemeColors();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.section}>
        <ThemedText text="Tags" style={styles.sectionTitle} />
        <View
          style={[
            styles.items,
            {
              borderColor: colors.border,
            },
          ]}
        >
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: colors.onBackground,
                opacity: pressed ? 0.5 : 1,
                borderBottomColor: colors.background,
                borderBottomWidth: 1,
              },
              styles.item,
            ]}
            onPress={() => router.push("/tags")}
          >
            <ThemedText text="Gérer les Tags" />
            <Feather name="chevron-right" size={20} color={colors.text} />
          </Pressable>
        </View>
      </View>
      <View style={styles.section}>
        <ThemedText text="Données" style={styles.sectionTitle} />
        <View
          style={[
            styles.items,
            {
              borderColor: colors.border,
            },
          ]}
        >
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: colors.onBackground,
                opacity: pressed ? 0.5 : 1,
                borderBottomColor: colors.background,
                borderBottomWidth: 1,
              },
              styles.item,
            ]}
            onPress={async () => {
              resetDb();
              BackHandler.exitApp();
            }}
          >
            <ThemedText text="Rénitialiser les données" />
            <Feather name="chevron-right" size={20} color={colors.text} />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PaddingContainer,
  },
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
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
});
