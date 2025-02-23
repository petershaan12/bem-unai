"use server"

import { z } from "zod";
import prisma from "./prisma";
import { getSession } from "./session";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { redirect } from "next/navigation";

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

const getOnePostById = async (id: string) => {
    const post = await prisma.post.findFirst({
        where: {
            id: id,
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

const incrementViewCount = async (slug: string) => {
    const post = await prisma.post.findFirst({
        where: {
            slug: slug,
        },
    });

    if (!post) {
        return null;
    }

    const updatedPost = await prisma.post.update({
        where: {
            id: post.id,
        },
        data: {
            views: post.views + 1,
        },
    });

    return updatedPost.views;
};


const postSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters long"),
    content: z.string().min(1, "Content is required"),
    organisasiId: z.string().min(1, "Organizer is required"),
});

const upsertPost = async (formData: FormData, postId?: string) => {
    const result = postSchema.safeParse(Object.fromEntries(formData));

    const session = await getSession();
    if (!session || !session.userId) {
        return redirect("/letsgo");
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
        if (postId) {
            const existingPost = await getOnePostById(postId);
            imgUrl = existingPost?.bannerImage || null;
        }

        if (image) {
            const imageFile = formData.get('image') as File;
            const blob = await put(imageFile.name, imageFile, {
                access: 'public',
            });
            imgUrl = blob.url;
        }

        //buat slug dari title
        const slug = result.data.title.toLowerCase().replace(/ /g, "-");

        const postData = {
            title: result.data.title,
            slug: slug,
            content: result.data.content,
            date: date,
            organisasiId: result.data.organisasiId,
            bannerImage: imgUrl,
            authorId: session.userId as string,
            published: true,
        };

        if (postId) {
            await prisma.post.update({
                where: { id: postId },
                data: postData,
            });
            return {
                success: {
                    message: "Post updated successfully",
                    redirect: "/kelola-informasi"
                },
            };
        } else {
            await prisma.post.create({
                data: postData,
            });
            return {
                success: {
                    message: "Post created successfully",
                    redirect: "/kelola-informasi"
                },
            };
        }
    } catch (error) {
        console.error(error);
        return {
            errors: {
                message: "Internal server error",
            },
        };
    }
};

const deletePost = async (id: string) => {
    const session = await getSession();
    if (!session || !session.userId) {
       return redirect("/letsgo");
    }
    try {
        await prisma.post.delete({
            where: {
                id: id,
            },
        });
        revalidatePath("/kelola-informasi");
    } catch (error) {
        console.error("Error deleting post:", error);
        throw new Error("Could not delete post");
    }
}


export { getAllPosts, getOnePost, upsertPost, incrementViewCount, getOnePostById, deletePost };