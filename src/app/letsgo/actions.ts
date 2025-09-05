"use server";

import { z } from "zod";
import { createSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs"; // You'll need to install this: npm install bcryptjs @types/bcryptjs

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    const errorMessages = result.error.flatten().fieldErrors;
    const consolidatedErrorMessage = Object.values(errorMessages)
      .flat()
      .join(", ");
    return {
      errors: {
        message: consolidatedErrorMessage,
      },
    };
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return {
      errors: {
        message: "Invalid email or password",
      },
    };
  }

  // Use bcrypt to compare passwords securely
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return {
      errors: {
        message: "Invalid email or password",
      },
    };
  }

  await createSession(user.id);
  redirect("/profile");
}
