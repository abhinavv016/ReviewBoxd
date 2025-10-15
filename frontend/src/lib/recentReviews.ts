// import { prisma } from "@/lib/prisma";

// export async function getRecentReviews() {
//   const recentReviews = await prisma.reviews.findMany({
//     where: {
//       content: { not: "" },
//     },
//     orderBy: { createdAt: "desc" },
//     distinct: ["mediaId"],
//     take: 10,
//     include: {
//       media: true,
//       user: true
//     },
//   });

//   return recentReviews;
// }