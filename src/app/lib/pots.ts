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
    }); 
    return posts;
};

const getOnePost = async (id: string) => {
    const post = await prisma.post.findFirst({
        where: {
            id: id,
        },
    });
    return post;
}


const createSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters long"),
    content: z.string().min(1, "Content is required"),
    organizer: z.string().min(1, "Organizer is required"),
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

    const image = formData.get("image") as File;
    let imgUrl = null;

    if (image) {
        const timestamp = Date.now();
        const imageBytesData = await image.arrayBuffer();
        const buffer = Buffer.from(imageBytesData);
        const path = `public/${timestamp}_${image.name}`;
        await writeFile(path, buffer);
        imgUrl = `/${timestamp}_${image.name}`;
    }

    await prisma.post.create({
        data: {
            title: result.data.title,
            content: result.data.content,
            orgnizer: result.data.organizer,
            bannerImage: imgUrl,
            authorId: session.userId as string,
            published: true,
        },
    });

    return {
        success: true,
    };
}

export { getAllPosts, getOnePost, createPosts };