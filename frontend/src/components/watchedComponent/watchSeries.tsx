"use client"
import EyeIcon from "@/icons/eyeIcon";
import HeartIcon from "@/icons/heartIcon";
import StarIcon from "@/icons/starIcon";
import WatchLaterIcon from "@/icons/watchLaterIcon";
import SeasonsComp from "../Carousal/seasonsComp";
import { AnimatePresence } from "framer-motion";
import { useUiState } from "@/app/store/useStore";

interface Media {
    id: string;
    media_type: string;
    title: string;
    poster_path: string
}

interface WatchSeriesProps{
    media: Media
}

export default function WatchedSeries({ media }: WatchSeriesProps) {
    const { isVisible, open, close } = useUiState()

    return (<>
        <div className="absolute flex left-210 translate-x-80 flex-col items-center bg-[#0E344E] w-60 mt-85 rounded-sm">
            <div className="flex justify-center w-full px-5">
                <div className="flex flex-col items-center w-30 mt-2 text-slate-400 cursor-pointer">
                    <EyeIcon color="text-slate-400 hover:text-[#FF9010]" size="text-4xl" />
                    <span className="text-sm">Watch</span>
                </div>

                <div className="flex flex-col items-center w-30 ml-5 mt-2 text-slate-400 cursor-pointer">
                    <HeartIcon color="text-slate-400 hover:text-[#00BA2F]" size="text-4xl" />
                    <span className="text-sm">Like</span>
                </div>

                <div className="flex flex-col items-center w-30 ml-5 mt-2 text-slate-400 cursor-pointer">
                    <WatchLaterIcon media={media} color="text-slate-400 hover:text-[#40BCF4]" size="text-4xl" />
                    <span className="text-sm">Watchlist</span>
                </div>
            </div>

            <div className="border-t border-slate-100 w-full mt-2"></div>
            <div className="w-full text-sm mt-1 border-slate-400 text-center ">
                Ratings
                <div className="flex justify-center gap-2">
                    <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
                </div>
            </div>

            <div className="border-t border-slate-100 w-full mt-2"></div>
            <div
                className="flex justify-center items-center text-sm h-8 w-full hover:text-[#B6C0CE] cursor-pointer"
                onClick={open}>
                Seasons
            </div>

            <div className="border-t border-slate-100 w-full"></div>
            <div className="flex justify-center items-center text-sm h-8 w-full hover:text-[#B6C0CE] cursor-pointer">
                Show your Activity
            </div>

            <div className="border-t border-slate-100 w-full"></div>
            <div className="flex justify-center items-center text-sm h-8 w-full hover:text-[#B6C0CE] cursor-pointer">
                Review or log
            </div>

            <div className="border-t border-slate-100 w-full"></div>
            <div className="flex justify-center items-center text-sm h-8 w-full hover:text-[#B6C0CE] cursor-pointer">
                Add to lists
            </div>

            <div className="border-t border-slate-100 w-full"></div>
            <div className="flex justify-center items-center text-sm h-8 w-full cursor-pointer hover:text-[#B6C0CE]">
                Share
            </div>

        </div>

        <AnimatePresence>
            {isVisible && <SeasonsComp onClose={close} media_type={media.media_type} id={media.id} />}
        </AnimatePresence>
    </>
    )
}