import { Category } from "@/types/Category";

const categoryLabels: Record<Category, string> = {
  beef: "Bœuf",
  chicken: "Poulet",
  vegetarian: "Végétarien",
  fish: "Poisson",
};

export function getCategoryLabel(category: Category): string {
  return categoryLabels[category];
}
