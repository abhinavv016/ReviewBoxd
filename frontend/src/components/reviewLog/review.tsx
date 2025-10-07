import CrossIcons from "@/icons/crossIcon";
import { motion } from "framer-motion";

interface Movie {
    title: string;
    poster_path: string;
    release_date: string;
}

interface ReviewProps {
    onClose: () => void;
    movie: Movie;
}

export default function Review({ onClose, movie }: ReviewProps) {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }
    const releaseDate = movie.release_date
    const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : null;

    return (
        <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className="relative flex items-center rounded-sm justify-center bg-slate-400 w-200 h-100">
                <div className="absolute top-3 left-10 text-2xl font-semibold">I Watched...</div>
                <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
                    <CrossIcons />
                </div>
                <div className="absolute top-14 border-[1px] border-slate-500 w-full"></div>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="absolute left-10 w-40 h-60 object-cover rounded border border-slate-100 shadow-xl shadow-black/60"
                />

                <div className="absolute items-baseline top-20 left-55 flex text-white">
                    <h2 className="text-xl font-bold">{movie.title}</h2>
                    <p className="text-gray-600 font-light text-base  ml-3">{releaseYear}</p>
                </div>
                <div className="absolute text-base top-30 left-55">
                    <label>
                        <textarea className="bg-white rounded-sm px-2 py-1 mt-2 text-sm text-black" name="postContent" placeholder="Add a review...." rows={6} cols={70}></textarea>
                    </label>
                </div>
                <div className="flex flex-col absolute bottom-10 left-55">
                    {/* Label above */}
                    <div className="text-base mb-1">Tags</div>

                    {/* Writing area */}
                    <label>
                        <textarea
                            className="bg-white rounded-sm h-8 px-2 py-1 text-sm text-black resize-none"
                            name="postContent"
                            placeholder="eg. netflix..."
                            rows={1}
                            cols={25}
                        />
                    </label>

                    {/* Tags below (example hardcoded) */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-slate-700 text-white text-xs px-2 py-1 rounded">netflix</span>
                        <span className="bg-slate-700 text-white text-xs px-2 py-1 rounded">drama</span>
                    </div>
                </div>
                <div className="absolute bottom-3 right-15 text-base border-t-1 bg-[#04AB1D] hover:bg-[#008814] px-2 py-1 rounded">
                    submit
                </div>
            </div>
        </motion.div>
    )
}