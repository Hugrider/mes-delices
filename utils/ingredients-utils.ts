export function getIngredientName(ingredient: string) {
  return ingredient.split(";")[0];
}

export function getIngredientQuantity(ingredient: string) {
  return ingredient.split(";")[1];
}
