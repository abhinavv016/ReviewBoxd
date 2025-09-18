"use client";

import React, { useState } from "react";
import Button from "@/components/button";
import MovieIcon from "@/icons/movieIcon";
import CreateAccount from "@/app/(routes)/createaccount/page";
import FetchMovieCard from "@/components/fetchCardComp/fetchMovieCard";
import FetchTvCard from "@/components/fetchCardComp/fetchTvCard";
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
        <div className="flex flex-col mt-15">

            <h2 className="text-[36px] text-white font-[700] leading-[48px] text-center">
                Track content you've watched. <br />
                Save those you want to see. <br />
                Tell your friends what's good.
            </h2>

            <div className="flex justify-center mt-10">
                <Button
                    variant={"primary"}
                    text={"Get Started - it's free !!"}
                    onClick={() => setIsAccount(true)}
                />
            </div>

            <div className="mt-10 text-[20px] text-[#8898A9] flex justify-center gap-2 ">
                The Social Network for Cinephiles
                <MovieIcon />
            </div>


            <div className="ml-70 mt-15 text-[#8898A9]">POPULAR MOVIES THIS WEEK</div>
            <div className="flex justify-center mt-2">
                <div className="h-px w-[65rem] bg-[#99A9BB]"></div>
            </div>
            <div 
            className="flex items-center justify-center gap-10 mt-5 mx-20">
                {movies.slice(0, 5).map((movie: any) => (
                    <FetchMovieCard key={movie.id} movie={movie} />
                ))}
            </div>


            <div className="ml-70 mt-15 text-[#8898A9]">POPULAR TV THIS WEEK</div>
            <div className="flex justify-center mt-2">
                <div className="h-px w-[65rem] bg-[#99A9BB]"></div>
            </div>
            <div className="flex items-center justify-center gap-10 mt-5 mx-20">
                {tv.slice(0, 5).map((tv: any) => (
                    <FetchTvCard key={tv.id} tv={tv} />
                ))}
            </div>
            <motion.div>
                {isAccount && <CreateAccount onClose={() => setIsAccount(false)} />}
            </motion.div>
        </div>
    );
}