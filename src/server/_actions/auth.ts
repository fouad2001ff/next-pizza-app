"use server";
import { db } from "@/lib/prisma";

import { loginSchema, signUpSchema } from "@/validations/auth";
import bcrypt from "bcrypt";
import { getTranslations } from "next-intl/server";

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
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (user) {
      return {
        status: 409, // Conflict
        message: "User already exists",
        formData,
      };
    }
    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    const createdUser = await db.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
      },
    });
    // revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
    // revalidatePath(
    //   `/${locale}/${Routes.ADMIN}/${Pages.USERS}/${createdUser.id}/${Pages.EDIT}`
    // );
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
