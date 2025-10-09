import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id, title, poster_path, media_type } = await req.json();

  if (!id || !title || !media_type) {
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

    
    const existing = await prisma.watchlist.findUnique({
      where: {
        userId_mediaId: {
          userId: session.user.id,
          mediaId: media.id,
        },
      },
    });

    if (existing) {
      
      await prisma.watchlist.delete({
        where: { userId_mediaId: { userId: session.user.id, mediaId: media.id } },
      });
      return NextResponse.json({ removed: true });
    }

    
    const watchlist = await prisma.watchlist.create({
      data: {
        userId: session.user.id,
        mediaId: media.id,
        mediaType: media_type,
        title: media.title,
        posterPath: media.posterPath,
      },
    });

    return NextResponse.json(watchlist);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update watchlist" }, { status: 500 });
  }
}

export async function GET(req: NextRequest){
  const userId = req.nextUrl.searchParams.get("userId")

  if(!userId){
    return NextResponse.json({
      error: "UserId Required"
    }, {status: 400})
  }

  try{
    const watchlist = await prisma.watchlist.findMany({
      where:{ userId },
      include: {
        media: true
      }
    })

    return NextResponse.json({watchlist})
  }catch(err){
    console.error(err)
    return NextResponse.json({
      error: "Failed to Fetch Watchlist"
    }, {status: 500})
  }
}