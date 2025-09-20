"use client"
import FetchSeasons from "@/lib/fetchSeasons";
import Example from "@/shadcnComp/spinners";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../ui/carousel";

interface Episodes {
    id: number,
    episode_number: number;
    name: string;
    overview: string;
    still_path: string;
    air_date: string;
}

interface EpisodesCarousalProps {
    id: string;
    season: number
}

export default function EpisodesCarousal({ id, season }: EpisodesCarousalProps) {
    const [episodes, setEpisodes] = useState<Episodes[]>([]);
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function fetchEpisodes() {
            try {
                const result = await FetchSeasons({ id, season });
                setEpisodes(result.data.Seasons.episodes || []);
            } catch (err) {
                console.error(err);
                setEpisodes([]);
            } finally {
                setLoading(false);
            }
        }
        fetchEpisodes();
    }, [id, season])

    if (loading) return <Example />;

    if (episodes.length === 0)
        return <p className="text-center text-gray-500">No episodes found.</p>;

    return (
        <div>
            <Carousel className="w-full max-w-5xl mx-auto">
                <CarouselContent className="ml-14 space-x-8">
                    {episodes.map((ep) => (
                        <CarouselItem key={ep.id} className="basis-1/2">
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="relative h-[350px] w-[500px] overflow-hidden rounded-xl shadow-lg mt-25"
                                >
                                    {ep.still_path && (
                                        <motion.img
                                            src={`https://image.tmdb.org/t/p/original${ep.still_path}`}
                                            alt={ep.name}
                                            className="w-full h-full object-cover"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5 }}
                                            onLoad={() => setLoaded(true)}
                                        />

                                    )}
                                    {loaded && (
                                        <div className="absolute top-2 left-2 bg-black/60 test-white px-2 py-1 rounded-md ">
                                            Episode {ep.episode_number}
                                        </div>
                                    )}
                                    {loaded && (
                                        <>
                                            <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded-md">
                                                Episode {ep.episode_number}
                                            </div>

                                            <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white px-4 py-3">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="font-semibold">{ep.name}</span>
                                                    <span>{ep.air_date}</span>
                                                </div>
                                                <p className="text-xs leading-snug">
                                                    {ep.overview ? ep.overview.slice(0, 200) + "..." : "No overview available"}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}