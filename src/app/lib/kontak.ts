"use server"

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { getSession } from "./session";
import { redirect } from "next/navigation";

const getAllKontak = async () => {
    const kontak = await prisma.contact.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return kontak;
}

const deleteKontak = async (id: string) => {
    const session = await getSession();
    if (!session || !session.userId) {
       return redirect("/letsgo");
    }
    try {
        await prisma.contact.delete({
            where: {
                id: id,
            },
        });
        revalidatePath("/kelola-pemerintahan");
    } catch (error) {
        console.error("Error deleting organization:", error);
        throw new Error("Could not delete organization");
    }
}

export { getAllKontak, deleteKontak }