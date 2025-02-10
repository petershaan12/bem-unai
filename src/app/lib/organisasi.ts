"use server"

import { z } from "zod";
import prisma from "./prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const organisasiSchema = z.object({
    title: z.string().min(3, { message: "Nama harus lebih dari 3 karakter" }).trim(),
    abbreviation: z.string().min(2, { message: "Singkatan harus lebih dari 2 karakter" }).trim(),
    type: z.string().min(3, { message: "Type harus lebih dari 3 karakter" }).trim(),
    description: z.string().min(3, { message: "Deskripsi harus lebih dari 3 karakter" }).optional(),
    familyId: z.string().optional(),
});

const getAllOrganisasi = async () => {
    try {
        const organisasi = await prisma.organisasi.findMany({
            orderBy: {
                createdAt: "asc",
            },
        });
        return organisasi;
    } catch (error) {
        console.error("Error fetching organizations:", error);
        throw new Error("Could not fetch organizations");
    }
};


const getOrganisasiByAbbreviation = async (abbreviation: string) => {
    try {
        const organisasi = await prisma.organisasi.findFirst({
            where: {
                abbreviation: abbreviation,
            }
        });
        return organisasi;
    } catch (error) {
        console.error("Error fetching organization:", error);
        return null;
    }
}

const getFamilyOrganisasi = async (familyId: string) => {
    try {
        const organisasi = await prisma.organisasi.findMany({
            where: {
                OR: [
                    { id: familyId },
                    { familyId: familyId },
                ],
            },
            include: {
                family: {
                    select: {
                        title: true,
                        image: true,
                        abbreviation: true,
                    },
                },
            }
        });
        return organisasi;
    } catch (error) {
        console.error("Error fetching organizations:", error);
        throw new Error("Could not fetch organizations");
    }
}

const getChildOrganisasi = async (id: string) => {
    try {
        const organisasi = await prisma.organisasi.findMany({
            where: {
                OR: [
                    { id: id },
                    { familyId: id },
                ],
            },
        });
        return organisasi;
    } catch (error) {
        console.error("Error fetching organizations:", error);
        throw new Error("Could not fetch organizations");
    }
}

const saveOrganisasi = async (prevState: any, formData: FormData) => {
    const result = organisasiSchema.safeParse(Object.fromEntries(formData));
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
                abbreviation: formData.get("abbreviation") as string,
                type: formData.get("type") as string,
                description: formData.get("description") as string,
                familyId: formData.get("familyId") as string
            },
        };
    }
    const { title, abbreviation, type, description, familyId } = result.data;
    const id = formData.get("id") as string;

    if (abbreviation.includes(" ")) {
        return {
            errors: {
                message: "Abbreviation tidak boleh mengandung spasi",
            },
        };
    }

    const image = type.toLowerCase().replace(" ", "_");

    try {
        if (id) {
            await prisma.organisasi.update({
                where: { id: id },
                data: {
                    title,
                    abbreviation,
                    type,
                    description,
                    familyId: familyId || null,
                    image: image,
                },
            });
        } else {
            await prisma.organisasi.create({
                data: {
                    title,
                    abbreviation,
                    type,
                    description,
                familyId: familyId || null,
                    image: image,
                },
            });
        }
        revalidatePath("/kelola-pemerintahan");

        return {
            success: {
                message: "Organisasi berhasil disimpan",
                redirect: "/kelola-pemerintahan",
            },
        }
    } catch (error) {
        console.error("Error creating organization:", error);
        return {
            errors: {
                message: "Could not create organization",
            },
            data: {
                title,
                abbreviation,
                type,
                description,
                familyId,
            },
        };
    } 
}



export { getAllOrganisasi, getOrganisasiByAbbreviation, saveOrganisasi, getFamilyOrganisasi, getChildOrganisasi };
