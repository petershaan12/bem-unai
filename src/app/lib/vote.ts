"use server";

import prisma from "./prisma";

export async function getVotingResults() {
  try {
    // Get all candidates with their vote counts
    const candidates = await prisma.candidate.findMany({
      select: {
        id: true,
        name: true,
        photo: true,
        _count: {
          select: {
            ballots: true,
          },
        },
      },
      orderBy: {
        ballots: {
          _count: "desc",
        },
      },
    });

    // Get total votes
    const totalVotes = await prisma.ballot.count();

    // Get total eligible voters
    const totalVoters = await prisma.voter.count({
      where: { isEligible: true },
    });

    // Get voters who have voted
    const votedCount = await prisma.voter.count({
      where: { hasVoted: true },
    });

    const results = candidates.map((candidate) => ({
      id: candidate.id,
      name: candidate.name,
      photo: candidate.photo,
      votes: candidate._count.ballots,
      percentage:
        totalVotes > 0
          ? ((candidate._count.ballots / totalVotes) * 100).toFixed(1)
          : "0",
    }));

    return {
      candidates: results,
      totalVotes,
      totalVoters,
      votedCount,
      turnoutPercentage:
        totalVoters > 0 ? ((votedCount / totalVoters) * 100).toFixed(1) : "0",
    };
  } catch (error) {
    console.error("Failed to get voting results:", error);
    throw error;
  }
}

export async function getIsResultsVisible() {
  try {
    const config = await prisma.election_config.findFirst();
    return config?.isShowResultsAfterVotingEnds === false;
  } catch (error) {
    console.error("Failed to check results visibility:", error);
    return false;
  }
}
