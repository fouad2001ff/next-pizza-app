import { z } from "zod";

export const loginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().trim().email(t("validation.validEmail")),
    password: z
      .string()
      .min(6, t("validation.passwordMinLength"))
      .max(40, t("validation.passwordMaxLength")),
  });

export const signUpSchema = (t: (key: string) => string) =>
  z
    .object({
      name: z.string().min(2, t("validation.nameRequired")),
      email: z.string().email(t("validation.validEmail")),
      password: z
        .string()
        .min(6, t("validation.passwordMinLength"))
        .max(40, t("validation.passwordMaxLength")),
      confirmPassword: z
        .string()
        .min(6, t("validation.passwordMinLength"))
        .max(40, t("validation.passwordMaxLength")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwordMismatch"),
      path: ["confirmPassword"],
    });

export type ValidationErrors = { [key: string]: string[] } | undefined;
