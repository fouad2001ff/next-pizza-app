"use server";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/get-locale-in-server";
import { db } from "@/lib/prisma";
import {
  addCategorySchema,
  updateCategorySchema,
} from "@/validations/category";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export const addCategory = async (prevState: unknown, formData: FormData) => {
  const t = await getTranslations("");

  const locale = await getCurrentLocale();
  const result = addCategorySchema(t).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  }
  const data = result.data;

  try {
    await db.category.create({
      data,
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);

    revalidatePath(`/${locale}/${Routes.MENU}`);

    return {
      status: 200,
      message: t("messages.categoryAdded"),
    };
  } catch (error) {
    console.error("❌ Database error:", error);
    return {
      status: 500,
      message: t("messages.unexpectedError"),
      formData,
    };
  }
};

export const updateCategory = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const t = await getTranslations("");

  const locale = await getCurrentLocale();
  console.log("Locale:", locale);
  const result = updateCategorySchema(t).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
    };
  }
  const data = result.data;

  try {
    await db.category.update({
      where: {
        id,
      },
      data: {
        name: data.categoryName,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);

    return {
      status: 200,
      message: t("messages.updatecategorySucess"),
    };
  } catch (error) {
    console.error("❌ Database error:", error);
    return {
      status: 500,
      message: t("messages.unexpectedError"),
      formData,
    };
  }
};

export const deleteCategory = async (id: string) => {
  const t = await getTranslations("");

  const locale = await getCurrentLocale();

  try {
    await db.category.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);

    return {
      status: 200,
      message: t("messages.deletecategorySucess"),
    };
  } catch (error) {
    console.error("❌ Database error:", error);
    return {
      status: 500,
      message: t("messages.unexpectedError"),
    };
  }
};
