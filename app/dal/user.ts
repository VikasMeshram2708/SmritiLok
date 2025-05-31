/**
 * this is server actions file for user auth
 */

"use server";

import prisma from "@/lib/prisma";
import { registerSchema } from "@/models/user";
import bcrypt from "bcryptjs";

export async function registerUser(data: unknown) {
  try {
    // sanitize
    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.flatten().fieldErrors,
      };
    }
    const { email, password, name } = parsed.data;

    // check user exist
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save the user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "User Registered",
      redirectUrl: "/login",
    };
  } catch (e) {
    const err =
      (e as Error).message ?? "Something went wrong. Please try again.";
    console.log(err);
    return {
      success: false,
      message: err,
    };
  }
}
