import FloatingButton from "@/components/FloatingButton";
import { useThemeColors } from "@/constants/Theme";
import useRecipeStore from "@/store/useRecipeStore";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function Recipes() {
  const router = useRouter();
  const colors = useThemeColors();
  const { recipes, removeRecipe } = useRecipeStore();
  // const [recipes, setRecipes] = useState<Recipe[]>([]);

  // const loadRecipes = async () => {
  //   const all = await RecipesDb.getAll();
  //   setRecipes(all);
  // };

  // useEffect(() => {
  //   loadRecipes();
  // }, []);

  const handleDelete = async (id: number) => {
    await removeRecipe(id);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Mes Recettes 🍲
      </Text>
      <FlatList
        data={recipes}
        numColumns={2}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            {item.photoUri && (
              <Image
                source={{ uri: item.photoUri }}
                style={{ width: 200, height: 200, borderRadius: 8 }}
              />
            )}
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text>{item.category}</Text>
            <Text>{item.tags.join(", ")}</Text>
            <Button title="Supprimer" onPress={() => handleDelete(item.id!)} />
          </View>
        )}
      />
      <FloatingButton
        icon={<AntDesign name="plus" size={28} color="#fff" />}
        onPress={() => router.push("/add-recipe")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  list: {
    width: "100%",
    justifyContent: "space-between",
  },
});
