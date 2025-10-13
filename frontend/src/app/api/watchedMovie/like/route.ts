import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
    }

    const { mediaId } = await req.json();
    const userId = session.user.id;

    const watched = await prisma.watchedMovie.findUnique({
        where: {
            userId_mediaId: { userId, mediaId }
        }
    })

    if (!watched) {
        return NextResponse.json(
            { error: "You must watch this movie before liking it" },
            { status: 403 }
        );
    }

    const updated = await prisma.watchedMovie.update({
        where:{
            userId_mediaId: { userId, mediaId },
        },
        data:{
            liked: !watched.liked,
        }, 
    });
    return NextResponse.json({ liked: updated.liked });
}