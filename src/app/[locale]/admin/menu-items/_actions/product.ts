"use server";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/get-locale-in-server";
import { db } from "@/lib/prisma";
import { addProductSchema, updateProductSchema } from "@/validations/product";
import { Extra, ExtraIngredients, productSizes, Size } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";

export const addProduct = async (
  args: {
    categoryId: string;
    options: { sizes: Partial<Size>[]; extras: Partial<Extra>[] };
  },
  prevState: unknown,
  formData: FormData
) => {
  formData.append("categoryId", args.categoryId);

  const locale = await getCurrentLocale();
  const t = await getTranslations();

  const result = addProductSchema(t).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
      formData,
    };
  }

  const data = result.data;
  const basePrice = Number(data.basePrice);

  let imageFile: File | null = formData.get("image") as unknown as File | null;
  let imageUrl: string | undefined;

  if (imageFile && !(imageFile instanceof Blob)) {
    imageFile = new File([imageFile], "profile.jpg", { type: "image/jpeg" });
  }

  if (imageFile && imageFile.size > 0) {
    imageUrl = await getImageUrl(imageFile);
  }

  try {
    if (imageUrl) {
      await db.product.create({
        data: {
          ...data,
          image: imageUrl,
          basePrice,
          order: 0,
          categoryId: args.categoryId,
          sizes: {
            createMany: {
              data: args.options.sizes.map((size) => ({
                name: size.name as productSizes,
                price: Number(size.price),
              })),
            },
          },
          extras: {
            createMany: {
              data: args.options.extras.map((extra) => ({
                name: extra.name as ExtraIngredients,
                price: Number(extra.price),
              })),
            },
          },
        },
      });
      revalidatePath(`/${locale}`);
      revalidatePath(`/${locale}/${Routes.MENU}`);
      revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENUITEMS}`);
      return {
        status: 201,
        message: t("messages.productAdded"),
      };
    }
    return {};
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (
  args: {
    productId: string;
    options: { sizes: Partial<Size>[]; extras: Partial<Extra>[] };
  },
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const t = await getTranslations();

  const result = updateProductSchema(t).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400,
      formData,
    };
  }

  const data = result.data;
  const basePrice = Number(data.basePrice);
  let imageFile: File | null = formData.get("image") as unknown as File | null;
  let imageUrl: string | undefined;

  if (imageFile && !(imageFile instanceof Blob)) {
    imageFile = new File([imageFile], "profile.jpg", { type: "image/jpeg" });
  }

  if (imageFile && imageFile.size > 0) {
    imageUrl = await getImageUrl(imageFile);
  }

  const product = await db.product.findUnique({
    where: { id: args.productId },
  });

  if (!product) {
    return {
      status: 400,
      message: t("messages.unexpectedError"),
    };
  }

  try {
    const category = await db.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new Error(`Category with id ${data.categoryId} does not exist`);
    }

    const updatedProduct = await db.product.update({
      where: {
        id: args.productId,
      },
      data: {
        ...data,
        basePrice,
        image: imageUrl ?? product.image,
      },
    });

    await db.size.deleteMany({
      where: { productId: args.productId },
    });

    await db.size.createMany({
      data: args.options.sizes.map((size) => ({
        productId: args.productId,
        name: size.name as productSizes,
        price: Number(size.price),
      })),
    });

    await db.extra.deleteMany({
      where: { productId: args.productId },
    });

    await db.extra.createMany({
      data: args.options.extras.map((extra) => ({
        productId: args.productId,
        name: extra.name as ExtraIngredients,
        price: Number(extra.price),
      })),
    });

    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENUITEMS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.MENUITEMS}/${updatedProduct.id}/${Pages.EDIT}`
    );

    return {
      status: 200,
      message: t("messages.updateProductSucess"),
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: t("messages.unexpectedError"),
    };
  }
};

export const deleteProduct = async (id: string) => {
  const locale = await getCurrentLocale();
  const t = await getTranslations();

  try {
    await db.product.delete({
      where: { id },
    });

    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENUITEMS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.MENUITEMS}/${id}/${Pages.EDIT}`
    );

    return {
      status: 200,
      message: t("messages.deleteProductSucess"),
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: t("messages.unexpectedError"),
    };
  }
};

const getImageUrl = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("pathName", "product_images");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const image = await response.json();
    if (!image.url) {
      throw new Error("No URL returned in response");
    }

    return image.url;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
