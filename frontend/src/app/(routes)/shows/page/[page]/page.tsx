
import Link from "next/link";
import React from "react";

async function getShows(page: number) {
    const res = await fetch(`http://localhost:4000/shows/page/${page}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch shows");
    return res.json();
}

export default async function ShowsPage({ params }: { params: { page: string } }) {
    const page = parseInt(params.page, 10) || 1;
    const data = await getShows(page);
    const shows = data.shows;

    return (<>
        <div className="px-40 mt-10 text-white font-medium text-xl">
            Shows
        </div>
        <div className="flex justify-center mt-1">
            <div className="h-px w-[70rem] bg-[#99A9BB]"></div>
        </div>
        <div className="grid grid-cols-10 p-4 gap-4 px-40">

            {shows.map((shows: any) => (
                <Link key={shows.id} href={`/content/tv/${shows.id}`}>
                    <div
                        key={shows.id}
                        className="w-[100px] h-[160px] rounded-sm border-2 hover:border-[#04AB1D] overflow-hidden bg-slate-700 cursor-pointer">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${shows.poster_path}`}
                            alt={shows.title}
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>
                </Link>
            ))}
        </div>
    </>);
}