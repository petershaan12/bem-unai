"use server";

import { redirect } from "next/navigation";
import { getSession } from "./session";
import { z } from "zod";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";

const getAllCandidates = async () => {
  const candidates = await prisma.candidate.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return candidates;
};

const getOneCandidateById = async (id: string) => {
  const candidate = await prisma.candidate.findUnique({
    where: { id },
  });
  return candidate;
};

const getIsCandidateOpen = async () => {
  const config = await prisma.election_config.findFirst();
  return config?.isActive || false;
};

const candidateSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be at most 100 characters long"),
  url: z.string().url("Invalid URL"),
});

const upsertCandidate = async (formData: FormData, candidateId?: string) => {
  const result = candidateSchema.safeParse(Object.fromEntries(formData));

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

    let imgUrl = null;
    if (candidateId) {
      const existingCandidate = await getOneCandidateById(candidateId);
      imgUrl = existingCandidate?.photo || null;
    }

    if (image) {
      const imageFile = formData.get("image") as File;
      const blob = await put(imageFile.name, imageFile, {
        access: "public",
      });
      imgUrl = blob.url;
    }

    const candidateData = {
      name: result.data.name,
      url: result.data.url,
      photo: imgUrl,
    };

    if (candidateId) {
      await prisma.candidate.update({
        where: { id: candidateId },
        data: candidateData,
      });
      return {
        success: {
          message: "Candidate updated successfully",
          redirect: "/kelola-kandidat",
        },
      };
    } else {
      await prisma.candidate.create({
        data: candidateData,
      });
      return {
        success: {
          message: "Candidate created successfully",
          redirect: "/kelola-kandidat",
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

const deleteCandidate = async (id: string) => {
  const session = await getSession();
  if (!session || !session.userId) {
    return redirect("/letsgo");
  }
  try {
    await prisma.candidate.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/kelola-kandidat");
  } catch (error) {
    console.error("Error deleting candidate:", error);
    throw new Error("Could not delete candidate");
  }
};

export {
  getAllCandidates,
  getOneCandidateById,
  upsertCandidate,
  deleteCandidate,
  getIsCandidateOpen,
};
