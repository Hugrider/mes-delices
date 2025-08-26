import { useThemeColors } from "@/constants/Theme";
import { initDb } from "@/services/recipesDb";
import useRecipeStore from "@/store/useRecipeStore";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    InterRegular: Inter_400Regular,
    InterSemiBold: Inter_600SemiBold,
  });

  const colors = useThemeColors();

  useEffect(() => {
    (async () => {
      await initDb();
      await useRecipeStore.getState().loadRecipes();
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
            headerLargeTitle: true,
          }}
        />
        <Stack.Screen
          name="recipe/[id]"
          options={{
            headerTitle: "",
            presentation: "card",
            headerShown: true,
            headerTransparent: true,
            headerBackButtonDisplayMode: "minimal",
            headerStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
