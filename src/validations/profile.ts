// schemas/profileSchema.ts
import { z } from "zod";

export const profileSchema = (t: (key: string) => string) =>
 z.object({
  name: z.string().min(1, t("validation.nameRequired")),
  email: z.string().email(t("validation.validEmail")),

  phone: z
    .string()
    .optional()
    .refine((value) => {
      if (!value) return true;
      return /^\+?[1-9]\d{1,14}$/.test(value);
    }),
  streetAddress: z.string().optional(),
  postalCode: z
    .string()
    .trim()
    .refine((value) => {
      if (!value) return true;
      return /^\d{5,10}$/.test(value);
    })

    .optional(), 
  city: z.string().optional(),
  country: z.string().optional(),
  image: z.union([
    z.string().url().optional().nullable(), 
    z.instanceof(Blob).optional(), 
  ]),});
