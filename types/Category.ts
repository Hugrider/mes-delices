export const CATEGORIES = [
  "starter",
  "meat",
  "fish",
  "vegetarian",
  "dessert",
] as const;

export type Category = (typeof CATEGORIES)[number] | (string & {});
