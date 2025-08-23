import { Category } from "./Category";

export type Recipe = {
  id?: number;
  photoUri: string | null;
  name: string;
  category: Category;
  tags: string[];
  ingredients: string[];
  servings: number;
  description: string;
  createdAt: string;
};
