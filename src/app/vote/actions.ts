"use server";

import { getServerSession } from "next-auth";
import prisma from "@/app/lib/prisma";

export async function ensureVoter() {
  const session = await getServerSession();
  const email = session?.user?.email;

  if (!email || !email.endsWith("@unai.edu")) {
    throw new Error("Unauthorized");
  }

  // cek / buat voter
  const id = email.split("@")[0];
  let isEligible = false;

  // Check if id starts with numbers (for student IDs)
  if (/^\d+/.test(id)) {
    const year = parseInt(id.substring(0, 2));
    isEligible = year >= 22;
  }

  await prisma.voter.upsert({
    where: { email },
    update: {}, // tidak usah update apa-apa
    create: {
      email,
      isEligible,
      hasVoted: false,
    },
  });

  return { ok: true, email };
}
