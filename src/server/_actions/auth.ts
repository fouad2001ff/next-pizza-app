"use server";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/get-locale-in-server";
// import { Pages, Routes } from "@/constants/enums";
import { db } from "@/lib/prisma";

import { loginSchema, signUpSchema } from "@/validations/auth";
import bcrypt from "bcrypt";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
// import { revalidatePath } from "next/cache";

export const login = async (
  credentials: Record<"email" | "password", string> | undefined
) => {
  const t = await getTranslations("");
  const result = loginSchema(t).safeParse(credentials);

  if (!result.success) {
    return {
      error: result.error.formErrors.fieldErrors,
      status: 400, // Bad Request
    };
  }

  try {
    const user = await db.user.findUnique({
      where: { email: result.data.email },
    });

    if (!user) {
      return {
        message: "User not found",
        status: 401, // Unauthorized
      };
    }

    const isValidPassword = await bcrypt.compare(
      result.data.password,
      user.password
    );

    if (!isValidPassword) {
      return {
        message: "Invalid password",
        status: 401, // Unauthorized
      };
    }

    // Exclude password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      status: 200,
      message: "User logged in successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};

export const signup = async (prevState: unknown, formData: FormData) => {
  const locale = await getCurrentLocale();

  const t = await getTranslations("");
  const result = signUpSchema(t).safeParse(
    Object.fromEntries(formData.entries())
  );
  console.log(result);
  if (result.success === false) {
    return {
      error: result.error.formErrors.fieldErrors,
      formData,
    };
  }
  try {
    const { email, name, password } = result.data;
    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return {
        status: 409, // Conflict
        message: "User already exists",
        formData,
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.USERS}/${createdUser.id}/${Pages.EDIT}`
    );
    return {
      status: 201, // Created
      message: "User created successfully",
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500, // error
      message: "Internal server error",
    };
  }
};
