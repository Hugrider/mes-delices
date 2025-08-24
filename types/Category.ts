export const CATEGORIES = ["beef", "chicken", "vegetarian", "fish"] as const;

export type Category = (typeof CATEGORIES)[number] | string;
