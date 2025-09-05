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
  await prisma.voter.upsert({
    where: { email },
    update: {}, // tidak usah update apa-apa
    create: {
      email,
      isEligible: true,
      hasVoted: false,
    },
  });

  return { ok: true, email };
}
