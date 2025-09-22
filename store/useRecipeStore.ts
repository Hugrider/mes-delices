import { RecipesDb } from "@/services/recipesDb";
import { Recipe, RecipeForm } from "@/types/Recipe";
import { create } from "zustand";

type RecipeStore = {
  recipes: Recipe[];
  loadRecipes: () => Promise<void>;
  addRecipe: (recipe: RecipeForm) => Promise<void>;
  updateRecipe: (id: number, recipe: RecipeForm) => Promise<void>;
  removeRecipe: (id: number) => Promise<void>;
  getRecipeById: (id: number) => Promise<Recipe | null>;
};

const useRecipeStore = create<RecipeStore>((set) => ({
  recipes: [],
  loadRecipes: async () => {
    const results = await RecipesDb.getAll();
    set({ recipes: results });
  },
  addRecipe: async (recipe: RecipeForm) => {
    await RecipesDb.add(recipe);
    await useRecipeStore.getState().loadRecipes();
  },
  updateRecipe: async (id: number, recipe: RecipeForm) => {
    await RecipesDb.update(id, recipe);
    await useRecipeStore.getState().loadRecipes();
  },
  removeRecipe: async (id: number) => {
    await RecipesDb.remove(id);
    set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) }));
  },
  getRecipeById: async (id: number) => {
    return await RecipesDb.getById(id);
  },
}));

export default useRecipeStore;
