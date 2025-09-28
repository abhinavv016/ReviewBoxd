"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Example from "@/shadcnComp/spinners";
import { useRouter } from "next/navigation";
import Navbar from "@/components/homePage/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { Media, useWatchlistStore } from "@/app/store/useWatchlistStore";

export default function WatchlistGrid() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { watchlist, setWatchlist, activeTab, setActiveTab } = useWatchlistStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    useEffect(() => {
        if (!session?.user?.id) return;

        fetch(`/api/watchlist?userId=${session.user.id}`)
            .then((res) => res.json())
            .then((data) => {
                const mediaList: Media[] = data.watchlist.map((item: any) => ({
                    id: item.media.id,
                    title: item.media.title,
                    posterPath: item.media.posterPath,
                    mediaType: item.mediaType,
                }));
                setWatchlist(mediaList);
            })
            .finally(() => setLoading(false));
    }, [session, setWatchlist]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-black-600/90">
                <Example />
            </div>
        );
    }

    const filteredList = watchlist.filter(
        (media) => media.mediaType === activeTab
    );

    return (
        <>
            <Navbar />

            <div className="flex justify-center mt-6 mb-4">
                <button
                    onClick={() => setActiveTab("movie")}
                    className={` capitalize ${activeTab === "movie"
                        ? "px-2 text-2xl w-40 h-10 border-2 border-gray-400 rounded-l-md bg-green-600 text-[#000000]"
                        : "text-gray-400 px-2 text-2xl w-40 h-10 border-2 border-gray-400 rounded-l-md bg-green-400/60 hover:text-[#dde5ee]"
                        }`}
                >
                    Movies
                </button>
                <button
                    onClick={() => setActiveTab("tv")}
                    className={` capitalize ${activeTab === "tv"
                        ? "px-2 text-2xl w-40 h-10 border-2 border-gray-400 rounded-r-md bg-blue-600 text-[#000000]"
                        : "text-gray-400 px-2 text-2xl w-40 h-10 border-2 border-gray-400 rounded-r-md bg-blue-400/60 hover:text-[#dde5ee]"
                        }`}
                >
                    Tv Shows
                </button>
            </div>

            <div className="ml-70 mt-15 text-[#8898A9]">
                YOU WANT TO WATCH THESE {activeTab === "movie" ? "MOVIES" : "SERIES"}
            </div>

            <div className="flex justify-center mt-1">
                <div className="h-px w-[65rem] bg-[#99A9BB]"></div>
            </div>

            <div className="grid justify-center grid-cols-5 ml-70 mr-70 gap-4 mt-5 mx-20">
                {filteredList.length > 0 ? (
                    filteredList.map((media) => (
                        <Link key={media.id} href={`/content/${activeTab}/${media.id}`}>
                            <motion.div
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.2 }
                                }}
                                key={media.id}
                                className="cursor-pointer bg-gray-700 w-[170px] h-[250px] rounded-md border-2 hover:border-[#04AB1D] overflow-hidden"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/original${media.posterPath}`}
                                    alt={media.title}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </Link>
                    ))
                ) : (
                    <p className="text-white col-span-5">
                        No {activeTab === "movie" ? "movies" : "tv"} in your watchlist.
                    </p>
                )}
            </div>
        </>
    );
}