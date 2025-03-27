import { z } from "zod";

export const addCategorySchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().trim().min(1, t("validation.categoryRequired")),
  });
export const updateCategorySchema = (t: (key: string) => string) =>
  z.object({
    categoryName: z.string().trim().min(1, t("admin.categories.validation.required")),
  });
