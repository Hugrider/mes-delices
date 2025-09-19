import { Category } from "./Category";
import { Tag } from "./Tag";

export type Recipe = {
  id: number;
  photoUri: string | null;
  name: string;
  category: Category;
  grade: number;
  tags: Tag[];
  ingredients: string[];
  servings: number;
  cookingTime: number;
  description: string;
  link: string;
  createdAt: string;
};

export type RecipeForm = {
  photoUri: string | null;
  name: string;
  category: Category;
  grade: number;
  tagIds: number[];
  ingredients: string[];
  servings: number;
  cookingTime: number;
  description: string;
  link: string;
};
