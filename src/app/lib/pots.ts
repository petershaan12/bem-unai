"use server"

import { z } from "zod";
import prisma from "./prisma";
import { getSession } from "./session";
import { writeFile } from "fs/promises";

const getAllPosts = async () => {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            organisasi: {
                select: {
                    title: true,
                    image: true,
                    abbreviation: true,
                },
            }
        }
    });
    return posts;
};

const getOnePost = async (slug: string) => {
    const post = await prisma.post.findFirst({
        where: {
            slug: slug,
        },
        include: {
            organisasi: {
                select: {
                    title: true,
                    image: true,
                    abbreviation: true,
                },
            }
        }
    });
    return post;
}


const createSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters long"),
    content: z.string().min(1, "Content is required"),
    organisasiId: z.string().min(1, "Organizer is required"),
});

const createPosts = async (formData: FormData) => {
    const result = createSchema.safeParse(Object.fromEntries(formData));

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
        };
    }

    try {
        const image = formData.get("image") as File;
        const dateValue = formData.get("date");
        const date = dateValue instanceof File ? new Date(dateValue.name) : new Date(dateValue as string);

        let imgUrl = null;

        if (image) {
            const timestamp = Date.now();
            const imageBytesData = await image.arrayBuffer();
            const buffer = Buffer.from(imageBytesData);
            const path = `public/posts/${timestamp}_${image.name}`;
            await writeFile(path, buffer);
            imgUrl = `/${timestamp}_${image.name}`;
        }

        //buat slug dari title
        const slug = result.data.title.toLowerCase().replace(/ /g, "-");

        await prisma.post.create({
            data: {
                title: result.data.title,
                slug: slug,
                content: result.data.content,
                date: date,
                organisasiId: result.data.organisasiId,
                bannerImage: imgUrl,
                authorId: session.userId as string,
                published: true,
            },
        });

        return {
            success: {
                message: "Post created successfully",
            },
        };
    } catch (error) {
        console.error(error);
        return {
            errors: {
                message: "Internal server error",
            },
        };
    }
}

    export { getAllPosts, getOnePost, createPosts };