"use server";

import { z } from "zod";
import { createSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import prisma  from "@/app/lib/prisma";

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

  const user  = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return {
      errors: {
        message: ["Email not found"],
      },
    };
  }

  const passwordMatch = user.password as string === password;

  if (!passwordMatch) {
    throw new Error("Incorrect password");
  }

  await createSession(user.id);
  redirect("/profile");
}
