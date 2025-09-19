import { useThemeColors } from "@/constants/Theme";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  const colors = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inactive,
        tabBarStyle: [
          styles.tabBarStyle,
          {
            backgroundColor: colors.tabBarBackground,
            borderTopColor: colors.border,
          },
        ],
        tabBarLabelStyle: [styles.tabBarLabelStyle, { color: colors.text }],
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Mes recettes",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={24} name="bowl-food" color={color} />
          ),
          headerStyle: {
            height: 110,
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            marginTop: -8,
          },
          headerLeftContainerStyle: {
            marginTop: -8,
          },
          headerRightContainerStyle: {
            marginTop: -8,
          },
        }}
      />

      <Tabs.Screen
        name="menus"
        options={{
          title: "Menus",
          tabBarIcon: ({ color }) => (
            <Feather name="list" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Réglages",
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    paddingTop: 15,
  },
  tabBarLabelStyle: {
    marginTop: 5,
    fontSize: 11,
  },
});
