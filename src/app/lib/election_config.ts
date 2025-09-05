"use server";

import { redirect } from "next/navigation";
import { getSession } from "./session";
import { z } from "zod";
import prisma from "./prisma";

const getElectionConfig = async () => {
  try {
    const config = await prisma.election_config.findFirst();
    return config;
  } catch (error) {
    console.error("Failed to get election config:", error);
    throw error;
  }
};

const getTimeLeft = async () => {
  const now = new Date();
  const config = await getElectionConfig();
  if (!config) {
    return 0;
  }

  const endTime = new Date(config.closesAt);
  const difference = endTime.getTime() - now.getTime();
  return difference > 0 ? difference : 0;
};

const showIsResult = async () => {
  try {
    const config = await prisma.election_config.findFirst();
    return config?.isShowResultsAfterVotingEnds || false;
  } catch (error) {
    console.error("Failed to get election config:", error);
    throw error;
  }
};

const updateElectionConfig = async (formData: FormData) => {
  const session = await getSession();
  if (!session || !session.userId) {
    return redirect("/letsgo");
  }

  const schema = z.object({
    start_time: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid start time",
    }),
    end_time: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid end time",
    }),
    isActive: z.string().transform((val) => val === "true"),
    isShowResultsAfterVotingEnds: z.string().transform((val) => val === "true"),
  });

  const result = schema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    console.error("Failed to validate election config:", result.error);
    return {
      errors: {
        message: "Data tidak valid",
      },
    };
  }

  const { start_time, end_time, isActive, isShowResultsAfterVotingEnds } =
    result.data;

  try {
    if (new Date(start_time) >= new Date(end_time)) {
      return {
        errors: {
          message: "Waktu mulai harus lebih awal dari waktu berakhir",
        },
      };
    }

    const existingConfig = await prisma.election_config.findFirst();

    if (existingConfig) {
      await prisma.election_config.update({
        where: { id: existingConfig.id },
        data: {
          opensAt: new Date(start_time),
          closesAt: new Date(end_time),
          isActive,
          isShowResultsAfterVotingEnds,
          salt: Math.random().toString(36).substring(2, 15),
        },
      });
    } else {
      await prisma.election_config.create({
        data: {
          opensAt: new Date(start_time),
          closesAt: new Date(end_time),
          isActive,
          isShowResultsAfterVotingEnds,
          salt: Math.random().toString(36).substring(2, 15),
        },
      });
    }

    return {
      success: {
        message: "Konfigurasi waktu voting berhasil disimpan!",
      },
    };
  } catch (error) {
    console.error("Failed to update election config:", error);
    return {
      errors: {
        message: "Gagal menyimpan konfigurasi",
      },
    };
  }
};

export { getElectionConfig, updateElectionConfig, showIsResult, getTimeLeft };
