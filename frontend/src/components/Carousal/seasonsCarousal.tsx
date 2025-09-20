"use client";
import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import fetchComp from "../../lib/fetchDetails";
import Example from "@/shadcnComp/spinners";
import { AnimatePresence, motion } from "framer-motion";
import EyeIcon from "@/icons/eyeIcon";
import EpisodesComp from "./episodesComp";


interface Season {
    season_number: number;
    episode_count: number;
    overview: string;
    poster_path: string;
}

interface SeasonsCarousalProps {
    media_type: string;
    id: string;
}

export default function SeasonsCarousal({ media_type, id }: SeasonsCarousalProps) {
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState<number | null>(null)

    useEffect(() => {
        async function fetchSeasons() {
            try {
                const result = await fetchComp({ media_type, id });
                setSeasons(result.data.details.seasons || []);
                setContent(result.data.details || []);
            } catch (err) {
                console.error(err);
                setSeasons([]);
            } finally {
                setLoading(false);
            }
        }

        if (media_type && id) fetchSeasons();
    }, [media_type, id]);

    if (loading) return <Example />;

    if (seasons.length === 0) return <p className="text-center text-gray-500 mt-4">No seasons available</p>;

    return (<div>
        <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className={`ml-14 ${seasons.length === 1 ? "justify-center" : ""}`}>
                {seasons
                .filter((season) => season.season_number !== 0)
                .map((season) => (
                    <CarouselItem key={season.season_number} className="basis-1/2">
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="relative h-135 w-[400px] overflow-hidden rounded-xl shadow-lg mt-5"
                                onClick={() => setSelectedSeason(season.season_number)}
                            >

                                <motion.img
                                    src={season.poster_path ? `https://image.tmdb.org/t/p/w500${season.poster_path}` : `https://image.tmdb.org/t/p/original${content.poster_path}`}
                                    alt={`Season ${season.season_number}`}
                                    className="w-full h-full object-cover"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    onLoad={() => setLoaded(true)}
                                />
                                {loaded && (
                                    <div className="absolute top-2 left-2 z-10 bg-black/60 text-white px-2 py-1 rounded-md">
                                        Season {season.season_number}
                                    </div>
                                )}
                                {loaded && (
                                    <div className="absolute top-2 left-[15rem] z-10 bg-black/60 text-white px-2 py-1 rounded-md">
                                        Total Episodes {season.episode_count}
                                    </div>
                                )}
                                {loaded && season.overview && (
                                    <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white px-3 py-2 text-sm leading-snug">
                                        {season.overview.slice(0,200)}...
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                        <div className="flex justify-center mr-15 mt-5">
                            <EyeIcon />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
        {selectedSeason && (
            <EpisodesComp
                id={id}
                season={selectedSeason}
                onClose={() => setSelectedSeason(null)}
            />
        )}
    </div>
    );
}