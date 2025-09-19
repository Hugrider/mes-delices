import * as FileSystem from "expo-file-system/legacy";
import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

const DB_NAME = "recipes.db";

export async function getDb() {
  if (!db) {
    db = await SQLite.openDatabaseAsync(DB_NAME);
    await db.execAsync(`PRAGMA journal_mode = WAL;`);
  }
  return db;
}

export async function initDb() {
  // /!\ RENITIALISATION DE LA BDD
  // await resetDb();
  const database = await getDb();

  const row = await database.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version;"
  );
  const currentVersion = row?.user_version ?? 0;

  if (currentVersion < 1) {
    try {
      await database.execAsync(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT,
      grade INTEGER,
      ingredients TEXT,
      servings INTEGER,
      cookingTime INTEGER,
      description TEXT,
      link TEXT,
      photoUri TEXT
    );
  `);

      await database.execAsync(`
    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `);

      await database.execAsync(`
    CREATE TABLE recipe_tags (
      recipe_id INTEGER NOT NULL,
      tag_id INTEGER NOT NULL,
      PRIMARY KEY (recipe_id, tag_id),
      FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    );
  `);

      await database.execAsync("PRAGMA user_version = 1;");
    } catch (error) {
      console.error(error);
    }
  }

  // if (currentVersion < 2) {
  //   try {
  //     const cols = await database.getAllAsync<{ name: string }>(
  //       `PRAGMA table_info(recipes);`
  //     );

  //     const hasGrade = cols.some((c) => c.name === "grade");
  //     if (!hasGrade) {
  //       await database.execAsync(
  //         `ALTER TABLE recipes ADD COLUMN grade INTEGER DEFAULT 0;`
  //       );
  //     }
  //     await database.execAsync("PRAGMA user_version = 2;");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return database;
}

export async function resetDb() {
  const dbPath = `${FileSystem.documentDirectory}SQLite/${DB_NAME}`;
  const fileInfo = await FileSystem.getInfoAsync(dbPath);

  if (fileInfo.exists) {
    console.log("🔴 Reset DB");
    await FileSystem.deleteAsync(dbPath, { idempotent: true });
  }
}
