"use server"

import { redirect } from "next/navigation";
import { deleteSession, getSession } from "./session";
import prisma from "./prisma";

const getUser = async () => {
    const session = await getSession();
    if (!session || !session.userId) {
        console.log("No user session found");
        return null;
    }
    const user = await prisma.user.findUnique({
        where: {
            id: session.userId as string,
        },
    });
    if (!user) {
        console.log("User not found");
        return null;
    }
    return user;
}


export async function logout() {
    await deleteSession();
    redirect('/');
  }

export { getUser };