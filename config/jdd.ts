import useRecipeStore from "@/store/useRecipeStore";
import useTagStore from "@/store/useTagStore";
import { RecipeForm } from "@/types/Recipe";
import { Tag } from "@/types/Tag";

const IMG_PATH =
  "file:///Users/hugo/Library/Developer/CoreSimulator/Devices/4FC207C4-8778-45C9-9981-16E0A5DCEA5A/data/Containers/Data/Application/FF9D2FCE-6BAB-4F5C-8A7F-886061F4EB26/Library/Caches/ExponentExperienceData/@hugrider/mes-delices/ImagePicker/1DE1E56B-8580-4A06-8605-380E1FE6F492.jpg";

// Tags exemples
const TAGS: Tag[] = [
  { id: 1, name: "Rapide" },
  { id: 2, name: "Healthy" },
  { id: 3, name: "Famille" },
  { id: 4, name: "Snack" },
  { id: 5, name: "Dessert" },
];

const DATA: RecipeForm[] = [
  {
    photoUri: "https://picsum.photos/seed/spaghetti/400/300",
    name: "Spaghetti Bolognaise",
    category: "beef",
    grade: 4,
    tagIds: [1, 3],
    ingredients: ["spaghetti", "tomate", "viande hachée", "oignon", "ail"],
    servings: 4,
    cookingTime: 30,
    description: "Un classique italien savoureux et rapide à préparer.",
    link: "https://example.com/spaghetti-bolognaise",
  },
  {
    photoUri: "https://picsum.photos/seed/poulet/400/300",
    name: "Poulet rôti",
    category: "chicken",
    grade: 5,
    tagIds: [3],
    ingredients: [
      "poulet entier",
      "huile d'olive",
      "herbes de Provence",
      "sel",
      "poivre",
    ],
    servings: 4,
    cookingTime: 90,
    description: "Poulet rôti doré et juteux, parfait pour le dîner.",
    link: "https://example.com/poulet-roti",
  },
  {
    photoUri: "https://picsum.photos/seed/salade/400/300",
    name: "Salade César",
    category: "chicken",
    grade: 5,
    tagIds: [2],
    ingredients: ["laitue", "poulet", "parmesan", "croutons", "sauce César"],
    servings: 2,
    cookingTime: 15,
    description: "Salade fraîche et croustillante avec une sauce savoureuse.",
    link: "https://example.com/salade-cesar",
  },
  {
    photoUri: "https://picsum.photos/seed/omelette/400/300",
    name: "Omelette aux fines herbes",
    category: "vegetarian",
    grade: 4,
    tagIds: [4],
    ingredients: ["œufs", "ciboulette", "persil", "sel", "poivre"],
    servings: 1,
    cookingTime: 10,
    description: "Rapide, simple et délicieux pour le petit-déjeuner.",
    link: "https://example.com/omelette-fines-herbes",
  },
  {
    photoUri: "https://picsum.photos/seed/tartelegumes/400/300",
    name: "Tarte aux légumes",
    category: "vegetarian",
    grade: 4,
    tagIds: [2, 4],
    ingredients: [
      "pâte brisée",
      "courgette",
      "poivron",
      "tomate",
      "fromage râpé",
    ],
    servings: 4,
    cookingTime: 40,
    description: "Tarte légère et savoureuse pour un repas végétarien.",
    link: "https://example.com/tarte-legumes",
  },
  {
    photoUri: "https://picsum.photos/seed/saumon/400/300",
    name: "Filet de saumon au four",
    category: "fish",
    grade: 5,
    tagIds: [2, 3],
    ingredients: ["saumon", "citron", "aneth", "huile d'olive", "sel"],
    servings: 2,
    cookingTime: 25,
    description: "Saumon tendre et parfumé, cuit à la perfection.",
    link: "https://example.com/saumon-four",
  },
  {
    photoUri: "https://picsum.photos/seed/burger/400/300",
    name: "Burger végétarien",
    category: "vegetarian",
    grade: 4,
    tagIds: [1, 3],
    ingredients: [
      "pain à burger",
      "galette de légumes",
      "salade",
      "tomate",
      "fromage",
    ],
    servings: 2,
    cookingTime: 20,
    description: "Burger savoureux et healthy pour tous.",
    link: "https://example.com/burger-vegetarien",
  },
  {
    photoUri: "https://picsum.photos/seed/tacos/400/300",
    name: "Tacos au poulet",
    category: "chicken",
    grade: 5,
    tagIds: [1, 3],
    ingredients: ["tortillas", "poulet", "salade", "tomate", "sauce salsa"],
    servings: 3,
    cookingTime: 20,
    description: "Tacos simples et délicieux pour un repas rapide.",
    link: "https://example.com/tacos-poulet",
  },
  {
    photoUri: "https://picsum.photos/seed/ratatouille/400/300",
    name: "Ratatouille",
    category: "vegetarian",
    grade: 5,
    tagIds: [2, 4],
    ingredients: ["aubergine", "courgette", "poivron", "tomate", "oignon"],
    servings: 4,
    cookingTime: 50,
    description: "Plat provençal riche en légumes et en saveurs.",
    link: "https://example.com/ratatouille",
  },
  {
    photoUri: "https://picsum.photos/seed/steak/400/300",
    name: "Steak grillé",
    category: "beef",
    grade: 5,
    tagIds: [3],
    ingredients: ["steak", "sel", "poivre", "huile d'olive"],
    servings: 2,
    cookingTime: 15,
    description: "Steak tendre et juteux, parfait pour les amateurs de viande.",
    link: "https://example.com/steak-grille",
  },
];

export async function insertJdd() {
  const tagStore = useTagStore.getState();
  const recipeStore = useRecipeStore.getState();
  console.log("💾 Ajout du jeu de données");
  await Promise.all(TAGS.map((tag) => tagStore.addTag(tag.name)));
  await Promise.all(DATA.map((recipe) => recipeStore.addRecipe(recipe)));
}
