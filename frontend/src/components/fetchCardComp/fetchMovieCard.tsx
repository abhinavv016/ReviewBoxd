import { motion } from "framer-motion";
import Link from "next/link";

interface MovieProps {
    id: number;
    title?: string;
    poster_path: string | null;
    media_type: string;
}

export default function FetchMovieCard({ movie }: { movie: MovieProps }) {
    if (!movie || !movie.title) return null;

    return (
        <Link href={`/content/movie/${movie.id}`}>
            <motion.div 
                whileHover={{
                scale:1.1,
                transition: {duration : 0.2}
                }}
                className="w-[170px] h-[250px] rounded-md border-2 hover:border-[#04AB1D] overflow-hidden bg-slate-700 cursor-pointer">
                {movie.poster_path && (
                    <img
                        src={movie.poster_path}
                        alt={movie.title}
                        className="w-full h-full object-cover rounded-md"
                    />
                )}
            </motion.div>
        </Link>
    );
}