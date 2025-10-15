import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    }

    const { action, mediaId, content, rating } = await req.json();
    const userId = session.user.id;

    if (!mediaId) {
        return NextResponse.json({ error: "Missing mediaId" }, { status: 400 });
    }
    const watched = await prisma.watchedMovie.findUnique({
        where: { userId_mediaId: { userId, mediaId: String(mediaId) } },
    });

    if (!watched) {
        return NextResponse.json(
            { error: "You must watch this movie before interacting with it" },
            { status: 403 }
        );
    }

    switch (action) {
        case "toggleLike": {
            const updated = await prisma.watchedMovie.update({
                where: { userId_mediaId: { userId, mediaId: String(mediaId) } },
                data: { liked: !watched.liked },
            });

            return NextResponse.json({ liked: updated.liked });
        }

        case "saveReview": {
            const review = await prisma.reviews.upsert({
                where: { userId_mediaId: { userId, mediaId: String(mediaId) } },
                update: {
                    content: content ?? undefined,
                    rating: rating ?? undefined,
                    updatedAt: new Date(),
                },
                create: {
                    userId,
                    mediaId: String(mediaId),
                    watchedMovieId: watched.id,
                    content: content ?? "",
                    rating: rating ?? null,
                },
            });

            return NextResponse.json({
                message: "Review saved successfully",
                content: review.content,
                rating: review.rating,
            });
        }

        default:
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
}