import { prisma } from "@/lib/prisma";

export async function getRecentReviews() {
  const recentReviews = await prisma.watchedMovie.findMany({
    where: {
      review: { not: null },
    },
    orderBy: { watchedAt: "desc" },
    distinct: ["mediaId"],
    take: 10,
    include: {
      media: true
    },
  });

  return recentReviews;
}