import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    }

    const { id, title, poster_path } = await req.json();

    if (!id || !title) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const media = await prisma.media.upsert({
            where: { id: String(id) },
            update: {},
            create: {
                id: String(id),
                title,
                posterPath: poster_path,
            },
        });

        await prisma.watchlist.deleteMany({
            where: {
                userId: session.user.id,
                mediaId: media.id,
            },
        });

        const alreadyWatched = await prisma.watchedMovie.findUnique({
            where: {
                userId_mediaId: { userId: session.user.id, mediaId: media.id },
            },
        });

        if (alreadyWatched) {
            await prisma.watchedMovie.delete({
                where: { userId_mediaId: { userId: session.user.id, mediaId: media.id } },
            });

            return NextResponse.json({ removed: true });
        }
        const watchedMovie = await prisma.watchedMovie.create({
            data: {
                userId: session.user.id,
                mediaId: media.id,
            },
        });

        return NextResponse.json(watchedMovie);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update WatchedMovie" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get("userId")

    if (!userId) {
        return NextResponse.json({
            error: "UserId Required"
        }, { status: 400 })
    }

    try {
        const watchedMovie = await prisma.watchedMovie.findMany({
            where: { userId },
            include: {
                media: true
            }
        })

        return NextResponse.json({ watchedMovie })
    } catch (err) {
        console.error(err)
        return NextResponse.json({
            error: "Failed to Fetch WatchedMovie"
        }, { status: 500 })
    }
}