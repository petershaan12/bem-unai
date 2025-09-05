"use server";

import { getServerSession } from "next-auth";
import prisma from "@/app/lib/prisma";
import { generateReceiptHash, sendVoteReceipt } from "@/app/lib/email";

export async function submitVote(candidateId: string) {
  const session = await getServerSession();
  const email = session?.user?.email;

  if (!email?.endsWith("@unai.edu")) {
    throw new Error("Unauthorized");
  }

  // cek window pemilu
  const config = await prisma.election_config.findFirst({
    where: { isActive: true },
  });
  const now = new Date();
  if (!config || now < config.opensAt || now > config.closesAt) {
    throw new Error("Voting is closed");
  }

  const candidate = await prisma.candidate.findUnique({
    where: { id: candidateId },
    select: { name: true },
  });

  if (!candidate) throw new Error("Candidate not found");

  const receiptHash = generateReceiptHash(email, candidateId, now);

  // transaksi anti double-vote
  const result = await prisma.$transaction(async (tx) => {
    const upd = await tx.voter.updateMany({
      where: { email, isEligible: true, hasVoted: false },
      data: { hasVoted: true, votedAt: now },
    });

    if (upd.count !== 1) {
      return { ok: false };
    }

    const voterId = await tx.voter
      .findUnique({
        where: { email },
        select: { id: true },
      })
      .then((v) => v?.id);

    if (!voterId) {
      throw new Error("Voter not found");
    }

    await tx.ballot.create({
      data: { candidateId, voterId, receiptHash },
    });

    return { ok: true };
  });

  if (!result.ok) {
    throw new Error("Kamu Tidak Layak Vote atau Kamu Sudah Memilih Sebelumnya");
  }

  try {
    await sendVoteReceipt(email, candidate.name, receiptHash);
  } catch (emailError) {
    console.error("Failed to send email receipt:", emailError);
  }

  return { ok: true };
}
