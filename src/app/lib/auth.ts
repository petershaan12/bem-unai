"use server"

import { redirect } from "next/navigation";
import { deleteSession, getSession } from "./session";

const getUser =  async () => {
    const session = await getSession();
    if(!session || !session.userId) {
        return null;
    }
    const user = await prisma.user.findUnique({
        where: {
            id: session.userId as string,
        },
    });
    if(!user) {
        return null;
    }
    return user;
}


export async function logout() {
    await deleteSession();
    redirect('/');
  }

export { getUser };