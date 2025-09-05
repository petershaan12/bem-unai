"use server";

import { redirect } from "next/navigation";
import { getSession } from "./session";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";

const getAllPartisipants = async () => {
  try {
    const partisipants = await prisma.voter.findMany();
    return partisipants;
  } catch (error) {
    console.error("Error fetching partisipants:", error);
    throw new Error("Failed to fetch partisipants");
  }
};

const deletePartisipant = async (id: string) => {
  const session = await getSession();
  if (!session || !session.userId) {
    return redirect("/letsgo");
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.ballot.deleteMany({
        where: {
          voter: {
            id: id,
          },
        },
      });

      await tx.voter.update({
        where: { id },
        data: {
          hasVoted: false,
          votedAt: null,
        },
      });
    });

    return {
      success: {
        message: "Vote berhasil direset. Partisipan dapat memilih lagi.",
      },
    };
  } catch (error) {
    console.error("Error resetting partisipant vote:", error);
    return {
      errors: {
        message: "Gagal mereset vote partisipan",
      },
    };
  }
};

export { getAllPartisipants, deletePartisipant };
