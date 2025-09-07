import { useColorScheme } from "react-native";

const LightColors = {
  primary: "#3ABEFF", // turquoise
  primaryDark: "#008FB3",
  accent: "#FF8C42",
  background: "#F9FAFB",
  onBackground: "#E5E7EB",
  tabBarBackground: "#FFFFFF",
  border: "#E5E7EB",
  text: "#111827",
  inactive: "#9CA3AF",
};

const DarkColors = {
  primary: "#3ABEFF",
  primaryDark: "#008FB3",
  accent: "#FF8C42",
  background: "#0D1117",
  onBackground: "#30363D",
  tabBarBackground: "#161B22",
  border: "#30363D",
  text: "#E5E7EB",
  inactive: "#6B7280",
};

export function useThemeColors() {
  const scheme = useColorScheme();
  return scheme === "dark" ? DarkColors : LightColors;
}

export const ShadowProperties = {
  shadowColor: "#9c9c9c",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.3,
  shadowRadius: 2,
  elevation: 3,
};

export const PaddingContainer = 12;
