import EyeIcon from "@/icons/eyeIcon";
import HeartIcon from "@/icons/heartIcon";
import StarIcon from "@/icons/starIcon";
import WatchLaterIcon from "@/icons/watchLaterIcon";

export default function WatchedMovie() {
    return (
        <div className="absolute flex left-1/2 translate-x-80 flex-col items-center bg-slate-600 w-80 mt-15 rounded-md">
            <div className="flex justify-center w-full">
                <div className="flex flex-col items-center w-30 mt-5 text-slate-400 cursor-pointer">
                    <EyeIcon color="text-slate-400 hover:text-[#FF9010]" size="text-5xl" />
                    <span>Watch</span>
                </div>

                <div className="flex flex-col items-center w-30 ml-5 mt-5 text-slate-400 cursor-pointer">
                    <HeartIcon color="text-slate-400 hover:text-[#00BA2F]" size="text-5xl" />
                    <span>Like</span>
                </div>

                <div className="flex flex-col items-center w-30 ml-5 mt-5 text-slate-400 cursor-pointer">
                    <WatchLaterIcon color="text-slate-400 hover:text-[#40BCF4]" size="text-5xl" />
                    <span>Watchlist</span>
                </div>
            </div>
            <div className="border-t border-slate-100 w-full mt-2"></div>
            <div className="w-full mt-2 border-slate-400 text-center ">
                Ratings
                <div className="flex justify-center">
                    <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon />
                </div>
            </div>
            <div className="border-t border-slate-100 w-full mt-2"></div>
            <div className="flex justify-center items-center h-10 w-full hover:text-[#8FA1B9] cursor-pointer">
                Show your Activity
            </div>
            <div className="border-t border-slate-100 w-full mt-2"></div>
            <div className="flex justify-center items-center h-10 w-full hover:text-[#8FA1B9] cursor-pointer">
                Review or log
            </div>
            <div className="border-t border-slate-100 w-full mt-2"></div>
            <div className="flex justify-center items-center h-10 w-full hover:text-[#8FA1B9] cursor-pointer">
                Add to lists
            </div>
            <div className="border-t border-slate-100 w-full mt-2"></div>
            <div className="flex justify-center items-center h-10 w-full cursor-pointer hover:text-[#8FA1B9]">
                Share
            </div>
        </div>
    )
}