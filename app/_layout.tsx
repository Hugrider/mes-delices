import IconButton from "@/components/IconButton";
import { initDb } from "@/config/db";
import { useThemeColors } from "@/constants/Theme";
import useRecipeStore from "@/store/useRecipeStore";
import useTagStore from "@/store/useTagStore";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Entypo } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    InterRegular: Inter_400Regular,
    InterSemiBold: Inter_600SemiBold,
  });

  const colors = useThemeColors();
  const { loadRecipes } = useRecipeStore();
  const { loadTags } = useTagStore();

  useEffect(() => {
    (async () => {
      await initDb();
      await loadRecipes();
      await loadTags();
    })();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hide();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.tabBarBackground },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-recipe/index"
          options={{
            headerTitle: "Nouvelle recette",
            presentation: "modal",
            headerShown: true,
            headerBackTitle: "Recettes",
            headerTintColor: colors.accent,
            // headerLargeTitle: true,
          }}
        />
        <Stack.Screen
          name="recipe/[id]/index"
          options={{
            headerTitle: "",
            presentation: "card",
            headerShown: true,
            headerTransparent: true,
            headerBackButtonDisplayMode: "minimal",
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerLeft: () => (
              <IconButton
                icon={
                  <Entypo name="chevron-left" size={20} color={colors.text} />
                }
                backgroundColor={"transparent"}
                onPress={router.back}
              />
            ),
          }}
        />
        <Stack.Screen
          name="recipe/[id]/edit/index"
          options={{
            headerTitle: "Mettre à jour",
            presentation: "modal",
            headerShown: true,
            headerTintColor: colors.accent,
          }}
        />
        <Stack.Screen
          name="tags/index"
          options={{
            headerTitle: "Tags",
            headerTitleStyle: {
              color: colors.text,
            },
            headerStyle: {
              backgroundColor:
                Platform.OS === "ios" ? "transparent" : colors.background,
            },
            presentation: "card",
            headerShown: true,
            headerBackButtonDisplayMode: "minimal",
            headerLargeTitle: true,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
