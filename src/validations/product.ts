import { z } from "zod";

const imageValidation = (t: (key: string) => string, isRequired: boolean) => {
  if (!isRequired) {
    return z.any().optional(); // If not required, allow anything
  }

  return z
    .any()
    .refine((val) => {
      if (typeof val === "string") {
        return val.trim() !== ""; // Ensure existing images (URLs) are not empty
      }

      // Check if File exists before using it 
      if ( val instanceof Blob) {
        return true;
      }

      return false;
    }, {
      message: t("admin.menu-items.form.image.validation.required"),
    });
};
;


const getCommonValidations = (t: (key: string) => string) => {
  return {
    name: z
      .string()
      .trim()
      .min(1, {
        message: t("admin.menu-items.form.name.validation.required"),
      }),
    description: z
      .string()
      .trim()
      .min(1, {
        message: t("admin.menu-items.form.description.validation.required"),
      }),
    basePrice: z.string().min(1, {
      message: t("admin.menu-items.form.basePrice.validation.required"),
    }),
    categoryId: z.string().min(1, {
      message: t("admin.menu-items.form.category.validation.required"),
    }),
  };
};

export const addProductSchema = (t: (key: string) => string) => {
  return z.object({
    ...getCommonValidations(t),
    image: imageValidation(t, true),
  });
};

export const updateProductSchema = (t: (key: string) => string) => {
  return z.object({
    ...getCommonValidations(t),
    image: imageValidation(t, false),
  });
};
