"use server";

import { getServerSession } from "next-auth";
import prisma from "@/app/lib/prisma";
import { generateReceiptHash, sendVoteReceipt } from "@/app/lib/email";

export async function submitVote(candidateId: string) {
  try {
    const session = await getServerSession();
    const email = session?.user?.email;

    if (!email?.endsWith("@unai.edu")) {
      return {
        ok: false,
        error: "Unauthorized",
        message: "Anda tidak memiliki akses untuk vote.",
      };
    }

    // cek window pemilu
    const config = await prisma.election_config.findFirst({
      where: { isActive: true },
    });
    const now = new Date();
    if (!config || now < config.opensAt || now > config.closesAt) {
      return {
        ok: false,
        error: "Voting is closed",
        message: "Periode voting telah berakhir.",
      };
    }

    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
      select: { name: true },
    });

    if (!candidate) {
      return {
        ok: false,
        error: "Candidate not found",
        message: "Kandidat tidak ditemukan.",
      };
    }

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
      return {
        ok: false,
        error: "Not eligible or already voted",
        message: "Anda tidak layak vote atau sudah memilih sebelumnya.",
      };
    }

    // Send email dalam background, jangan tunggu
    sendVoteReceipt(email, candidate.name, receiptHash).catch((emailError) => {
      console.error("Failed to send email receipt:", emailError);
    });

    return {
      ok: true,
      message: "Vote berhasil! Email receipt sedang dikirim.",
    };
  } catch (error) {
    console.error("Submit vote error:", error);
    return {
      ok: false,
      error: "Server error",
      message: "Terjadi kesalahan server. Silakan coba lagi.",
    };
  }
}
