"use server"

import { z } from "zod";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "./session";

const portalSchema = z.object({
    title: z.string().min(3, { message: "Nama harus lebih dari 3 karakter" }).trim(),
    link: z.string().min(5, { message: "Link harus lebih dari 7 karakter" }).trim(),
});

const getAllPortal = async () => {
    try {
        const portal = await prisma.portal.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return portal;
    } catch (error) {
        console.error("Error fetching portal:", error);
        throw new Error("Could not fetch portal");
    }
}

const getOnePortal = async (id: string) => {
    try {
        const portal = await prisma.portal.findFirst({
            where: {
                id: id,
            },
        });
        return portal;
    } catch (error) {
        console.error("Error fetching portal:", error);
        return null;
    }
}

const deletePortal = async (id: string) => {

    const session = await getSession();
    if (!session || !session.userId) {
        return null;
    }

    
    try {
        await prisma.portal.delete({
            where: {
                id: id,
            },
        });
        revalidatePath("/kelola-portal");
    } catch (error) {
        console.error("Error deleting portal:", error);
        throw new Error("Could not delete portal");
    }
}

const savePortal = async (prevState: any, formData: FormData) => {
    const result = portalSchema.safeParse(Object.fromEntries(formData));

    const session = await getSession();
    if (!session || !session.userId) {
        return null;
    }


    if (!result.success) {
        const errorMessages = result.error.flatten().fieldErrors;
        const consolidatedErrorMessage = Object.values(errorMessages)
            .flat()
            .join(", ");
        return {
            errors: {
                message: consolidatedErrorMessage,
            },
            data: {

                title: formData.get("title") as string,
                link: formData.get("link") as string,
            },
        };
    }

    const { title, link } = result.data;
    const id = formData.get("id") as string;

    //link harus https
    if (!link.startsWith("https://")) {
        return {
            errors: {
                message: "Link harus diawali dengan https://",
            },
            data: {
                title: formData.get("title") as string,
                link: formData.get("link") as string,
            },
        };
    }

    try {
        if (id) {
            await prisma.portal.update({
                where: {
                    id: id,
                },
                data: {
                    title,
                    link,
                },
            });
        } else {
            await prisma.portal.create({
                data: {
                    title,
                    link,
                },
            });
        }

        revalidatePath("/kelola-portal");

        return {
            success: {
                message: "Portal berhasil disimpan",
                redirect: "/kelola-portal",
            },
        }
    } catch (error) {
        console.error("Error creating portal:", error);
        return {
            errors: {
                message: "Gagal membuat portal",
            },
            data: {
                title,
                link
            },
        }
    }
}


export { getAllPortal, savePortal, getOnePortal, deletePortal }