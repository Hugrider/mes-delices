import { getDb } from "@/config/db";
import type { Recipe, RecipeForm } from "@/types/Recipe";

async function add(recipe: RecipeForm): Promise<number | null> {
  const db = await getDb();
  try {
    const result = await db.runAsync(
      `INSERT INTO recipes (name, category, grade, ingredients, servings, cookingTime, description, photoUri)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      recipe.name,
      recipe.category,
      recipe.grade,
      JSON.stringify(recipe.ingredients),
      recipe.servings,
      recipe.cookingTime,
      recipe.description,
      recipe.photoUri || null
    );

    const recipeId = result.lastInsertRowId;
    if (!recipeId) return null;

    for (const tagId of recipe.tagIds) {
      await db.runAsync(
        "INSERT INTO recipe_tags (recipe_id, tag_id) VALUES (?, ?)",
        recipeId,
        tagId
      );
    }

    return recipeId;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la recette :", error);
    return null;
  }
}

async function getAll(): Promise<Recipe[]> {
  const db = await getDb();

  // On récupère toutes les recettes
  const recipes = await db.getAllAsync<Recipe & { ingredients: string }>(
    "SELECT * FROM recipes ORDER BY name ASC"
  );

  const recipeIds = recipes.map((r) => r.id);
  if (recipeIds.length === 0) return [];

  // Récupérer toutes les associations tags en une seule requête
  const tagRows = await db.getAllAsync<{
    recipe_id: number;
    id: number;
    name: string;
  }>(
    `SELECT rt.recipe_id, t.id, t.name
     FROM recipe_tags rt
     INNER JOIN tags t ON t.id = rt.tag_id
     WHERE rt.recipe_id IN (${recipeIds.map(() => "?").join(",")})`,
    ...recipeIds
  );

  // Regrouper les tags par recette
  const tagsByRecipe: Record<number, { id: number; name: string }[]> = {};
  for (const row of tagRows) {
    if (!tagsByRecipe[row.recipe_id]) tagsByRecipe[row.recipe_id] = [];
    tagsByRecipe[row.recipe_id].push({ id: row.id, name: row.name });
  }

  // Retourner les recettes avec les tags enrichis
  return recipes.map((r) => ({
    ...r,
    ingredients: JSON.parse(r.ingredients || "[]"),
    tags: tagsByRecipe[r.id] || [],
  }));
}

async function getById(id: number): Promise<Recipe | null> {
  const db = await getDb();

  // Récupérer la recette
  const row = await db.getFirstAsync<Recipe & { ingredients: string }>(
    "SELECT * FROM recipes WHERE id = ?",
    id
  );

  if (!row) return null;

  // Récupérer ses tags
  const tags = await db.getAllAsync<{ id: number; name: string }>(
    `SELECT t.id, t.name
     FROM recipe_tags rt
     INNER JOIN tags t ON t.id = rt.tag_id
     WHERE rt.recipe_id = ?`,
    id
  );

  return {
    ...row,
    ingredients: JSON.parse(row.ingredients || "[]"),
    tags,
  };
}

async function remove(id: number): Promise<void> {
  const db = await getDb();
  await db.runAsync("DELETE FROM recipes WHERE id = ?", id);
}

export const RecipesDb = { add, getAll, getById, remove };
