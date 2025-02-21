"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";

const contactSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }).trim(),
    email: z.string().email({ message: "Invalid email address" }).trim(),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }).trim(),
});

export async function contact(prevState: any, formData: FormData) {
    const result = contactSchema.safeParse(Object.fromEntries(formData));

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

    const { name, email, message } = result.data;

   const kirim = await prisma.contact.create({
        data: {
            name,
            email,
            message,
        },
    });

    if(kirim){
        return {
            success: {
                message: "Informasi berhasil dikirim",
            },
        }
    } else {
        return {
            errors: {
                message: "Failed to send message",
            },
        };
    }

}
