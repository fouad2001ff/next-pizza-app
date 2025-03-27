'use server';

import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/get-locale-in-server";
import { db } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";


export const deleteUser = async (id: string) => {
  const locale = await getCurrentLocale();
  const t = await getTranslations();

  try {
    await db.user.delete({
      where: { id },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.USERS}/${id}/${Pages.EDIT}`
    );
    return {
      status: 200,
      message: t("messages.deleteUserSucess"),
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: ("messages.unexpectedError"),
    };
  }
};
