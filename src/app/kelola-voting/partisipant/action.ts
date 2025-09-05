"use server";

import prisma from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function updateEligibility(voterId: string, isEligible: boolean) {
  const session = await getSession();
  if (!session || !session.userId) {
    return redirect("/letsgo");
  }

  try {
    await prisma.voter.update({
      where: { id: voterId },
      data: { isEligible },
    });

    revalidatePath("/kelola-voting/partisipant");

    return {
      success: {
        message: `Status kelayakan berhasil ${
          isEligible ? "diaktifkan" : "dinonaktifkan"
        }`,
      },
    };
  } catch (error) {
    console.error("Failed to update eligibility:", error);
    return {
      errors: {
        message: "Gagal mengupdate status kelayakan",
      },
    };
  }
}
