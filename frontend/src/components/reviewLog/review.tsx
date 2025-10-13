import HeartIcon from "@/icons/activityIcon/heartIcon";
import CrossIcons from "@/icons/crossIcon";
import StarIcon from "@/icons/starIcon";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface Movie {
    id: string;
    title: string;
    poster_path: string;
    release_date: string;
}

interface ReviewProps {
    onClose: () => void;
    media: Movie;
}

export default function Review({ onClose, media }: ReviewProps) {
    const { data: session } = useSession();
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hoverRating, setHoverRating] = useState<number>(0);


    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }
    const releaseYear = media.release_date ? new Date(media.release_date).getFullYear() : null;

    const submitReview = async () => {
        if (!session) return alert("Please login first");
        if (!reviewText.trim()) return alert("Please write a review");

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/watchedMovie/review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "saveReview",
                    mediaId: String(media.id),
                    reviewText,
                    rating
                })
            });

            const data = await res.json();

            if (res.ok) {
                alert("Review submitted successfully!");
                onClose();
            } else {
                alert(data.error || "Failed to submit review");
            }
        } catch (err) {
            console.error(err);
            alert("Error submitting review");
        } finally {
            setIsSubmitting(false);
        }
    }

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
                    src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                    alt={media.title}
                    className="absolute left-10 w-40 h-60 object-cover rounded border border-slate-100 shadow-xl shadow-black/60"
                />

                <div className="absolute items-baseline top-20 left-55 flex text-white">
                    <h2 className="text-xl font-bold">{media.title}</h2>
                    <p className="text-gray-600 font-light text-base  ml-3">{releaseYear}</p>
                </div>
                {/* Review Area */}
                <div className="absolute text-base top-30 left-55">
                    <label>
                        <textarea
                            className="bg-white rounded-sm px-2 py-1 mt-2 text-sm text-black"
                            name="postContent"
                            placeholder="Add a review...."
                            rows={6}
                            cols={70}
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        ></textarea>
                    </label>
                </div>

                {/* Ratings */}
                <div className="flex flex-col absolute bottom-20 left-55">
                    <div className="text-base">Ratings</div>
                    <div className="flex justify-start gap-2 mt-1">
                        {[1, 2, 3, 4, 5].map((num) => {
                            // Color logic: hover overrides selected rating
                            const colorClass = (hoverRating || rating) >= num ? "text-yellow-400" : "text-white";

                            return (
                                <div
                                    key={num}
                                    onClick={() => setRating(num)}
                                    onMouseEnter={() => setHoverRating(num)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className={`cursor-pointer ${colorClass}`}
                                >
                                    <StarIcon />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Liked */}
                <div className="flex flex-col items-center absolute bottom-16 right-20 text-center">
                    <div className="text-base mb-1">Like</div>
                    <div className="flex justify-center items-center">
                        <HeartIcon media={media} />
                    </div>
                </div>

                <button
                    onClick={submitReview}
                    disabled={isSubmitting}
                    className="absolute bottom-3 right-15 text-base bg-[#04AB1D] hover:bg-[#008814] px-3 py-1 rounded text-white"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>
        </motion.div>
    )
}