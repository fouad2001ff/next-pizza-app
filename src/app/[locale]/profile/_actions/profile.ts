"use server";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/get-locale-in-server";
import { db } from "@/lib/prisma";
import { profileSchema } from "@/validations/profile";
import { UserRole } from "@prisma/client";
import { File } from "@web-std/file";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export const updateProfile = async (prevState: unknown, formData: FormData) => {
  const t = await getTranslations("");
  const locale = getCurrentLocale();
  const result = profileSchema(t).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    return {
      error: result.error.formErrors.fieldErrors,
      formData,
    };
  }

  const data = result.data;

  const isAdmin = formData.get("isAdmin") === "true";
  let imageFile: File | null = formData.get("image") as unknown as File | null;
  let imageUrl: string | undefined;

  if (imageFile !== null) {
    if (!(imageFile instanceof File)) {
      imageFile = new File([imageFile], "profile.jpg", { type: "image/jpeg" });
    }

    if (imageFile.size > 0) {
      imageUrl = await getImageUrl(imageFile);
    }
  }
  try {
    const user = await db.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return {
        status: 401,
        message: t("messages.userNotFound"),
        formData,
      };
    }

    await db.user.update({
      where: { email: user.email },
      data: {
        ...data,
        image: imageUrl ?? user.image,
        role: isAdmin? UserRole.ADMIN : UserRole.USER
      },
    });
    revalidatePath(`/${locale}/${Routes.PROFILE}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`
    );

    return {
      status: 200,
      message: t("messages.updateProfileSucess"),
    };
  } catch (error) {
    console.error("❌ Database error:", error);
    return {
      status: 500,
      message: "Internal server error",
      formData,
    };
  }
};

const getImageUrl = async (imageFile: File) => {

  console.log("Image file:", {
    name: imageFile.name,
    type: imageFile.type,
    size: imageFile.size,
  });
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("pathName", "profile_images");

  try {
    console.log("ℹ️ Uploading image...");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    const image = await response.json();
    console.log("✅ Image uploaded:", image.url);
    return image.url;
  } catch (error) {
    console.error("❌ Error uploading file:", error);
    return undefined;
  }
};
