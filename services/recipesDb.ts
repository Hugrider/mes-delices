// services/recipesDb.ts
import { Recipe } from "@/types/Recipe";
import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase;

export async function initDb() {
  db = await SQLite.openDatabaseAsync("recipes.db");

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT,
      tags TEXT,
      ingredients TEXT,
      servings INTEGER,
      description TEXT,
      photoUri TEXT
    );
  `);

  return db;
}

async function add(recipe: Recipe): Promise<number> {
  if (!db) throw new Error("DB not initialized");

  const result = await db.runAsync(
    `INSERT INTO recipes (name, category, tags, ingredients, servings, description, photoUri)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    recipe.name,
    recipe.category,
    JSON.stringify(recipe.tags),
    JSON.stringify(recipe.ingredients),
    recipe.servings,
    recipe.description,
    recipe.photoUri || null
  );

  return result.lastInsertRowId;
}

async function getAll(): Promise<Recipe[]> {
  if (!db) throw new Error("DB not initialized");

  const rows = await db.getAllAsync<
    Recipe & { tags: string; ingredients: string }
  >("SELECT * FROM recipes");

  return rows.map((r) => ({
    ...r,
    tags: JSON.parse(r.tags || "[]"),
    ingredients: JSON.parse(r.ingredients || "[]"),
  }));
}

async function getById(id: number): Promise<Recipe | null> {
  if (!db) throw new Error("DB not initialized");

  const row = await db.getFirstAsync<any>(
    "SELECT * FROM recipes WHERE id = ?",
    id
  );

  if (!row) return null;

  return {
    ...row,
    tags: JSON.parse(row.tags || "[]"),
    ingredients: JSON.parse(row.ingredients || "[]"),
  };
}

async function remove(id: number): Promise<void> {
  if (!db) throw new Error("DB not initialized");
  await db.runAsync("DELETE FROM recipes WHERE id = ?", id);
}

export const RecipesDb = { add, getAll, getById, remove };
