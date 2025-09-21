import { Category } from "@/types/Category";

const categoryLabels: Record<Category, string> = {
  starter: "Entrée",
  meat: "Viande",
  fish: "Poisson",
  vegetarian: "Végétarien",
  dessert: "Dessert",
};

export function getCategoryLabel(category: Category): string {
  return categoryLabels[category];
}
