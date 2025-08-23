import { RecipesDb } from "@/services/recipesDb";
import { Recipe } from "@/types/Recipe";
import { create } from "zustand";

type RecipeStore = {
  recipes: Recipe[];
  loadRecipes: () => Promise<void>;
  addRecipe: (recipe: Recipe) => Promise<void>;
  removeRecipe: (id: number) => Promise<void>;
};

const useRecipeStore = create<RecipeStore>((set) => ({
  recipes: [],
  loadRecipes: async () => {
    const results = await RecipesDb.getAll();
    set({ recipes: results });
  },
  addRecipe: async (recipe: Recipe) => {
    await RecipesDb.add(recipe);
    await useRecipeStore.getState().loadRecipes();
  },
  removeRecipe: async (id: number) => {
    await RecipesDb.remove(id);
    set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) }));
  },
}));

export default useRecipeStore;
