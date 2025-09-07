import { getDb } from "@/config/db";
import { Tag } from "@/types/Tag";

async function add(tagName: string): Promise<number | null> {
  const db = await getDb();
  try {
    const result = await db.runAsync(
      `INSERT INTO tags (name)
     VALUES (?)`,
      tagName
    );

    return result.lastInsertRowId;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getAll(): Promise<Tag[]> {
  const db = await getDb();

  const rows = await db.getAllAsync<Tag>(
    "SELECT * FROM tags ORDER BY name ASC"
  );

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
  }));
}

async function remove(id: number): Promise<void> {
  const db = await getDb();
  await db.runAsync("DELETE FROM tags WHERE id = ?", id);
}

export const TagsDb = { add, getAll, remove };
