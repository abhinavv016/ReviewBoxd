"use client";

import React, { useState } from "react";
import Button from "@/components/button";
import MovieIcon from "@/icons/movieIcon";
import CreateAccount from "@/components/createaccount/page";
import FetchMovieCard from "@/components/homePage/fetchMovieCard";
import FetchTvCard from "@/components/homePage/fetchTvCard";
import { motion } from "framer-motion";

interface MediaProps {
    id: number;
    title: string;
    name?: string;
    poster_path: string | null;
    media_type: string;
}

export default function HomeClient({ movies, tv }: { movies: MediaProps[], tv: MediaProps[] }) {
    const [isAccount, setIsAccount] = useState(false);

    return (
        <div className="flex flex-col mt-10 px-4 md:px-20 lg:px-40">

            {/* Heading */}
            <h2 className="text-[20px] md:text-[28px] lg:text-[36px] text-white font-bold leading-[28px] md:leading-[36px] lg:leading-[48px] text-center">
                Track content you've watched. <br />
                Save those you want to see. <br />
                Tell your friends what's good.
            </h2>

            {/* Get Started Button */}
            <div className="flex justify-center mt-6 md:mt-10">
                <Button
                    variant={"primary"}
                    text={"Get Started - it's free !!"}
                    onClick={() => setIsAccount(true)}
                />
            </div>

            {/* Tagline */}
            <div className="mt-4 md:mt-6 text-[16px] md:text-[20px] text-[#8898A9] flex justify-center items-center gap-2">
                The Social Network for Cinephiles
                <MovieIcon />
            </div>

            {/* Popular Movies */}
            <div className="mt-10 text-[#8898A9] text-md font-medium">
                POPULAR MOVIES THIS WEEK
            </div>
            <div className="h-px w-full max-w-6xl bg-[#99A9BB] mt-1"></div>
            <div className="flex flex-row overflow-x-auto gap-4 md:gap-3 py-4">
                {movies.map((movie) => (
                    <FetchMovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {/* Popular TV */}
            <div className="mt-10 text-[#8898A9] text-md font-medium">
                POPULAR TV SHOWS THIS WEEK
            </div>
            <div className="h-px w-full max-w-6xl bg-[#99A9BB] mt-1"></div>
            <div className="flex flex-row overflow-x-auto gap-4 md:gap-3 py-4">
                {tv.map((tv) => (
                    <FetchTvCard key={tv.id} tv={tv} />
                ))}
            </div>

            {/* Create Account Modal */}
            <motion.div>
                {isAccount && <CreateAccount onClose={() => setIsAccount(false)} />}
            </motion.div>
        </div>
    );
}