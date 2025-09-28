import { motion } from "framer-motion";
import Link from "next/link";

interface TvProps {
    id: number;
    name?: string;
    poster_path: string | null;
    media_type: string;
}

export default function FetchTvCard({ tv }: { tv: TvProps }) {
    if (!tv || !tv.name) return null;

    return (
        <Link href={`/content/tv/${tv.id}`}>
            <motion.div
                whileHover={{
                scale:1.05,
                transition: {duration : 0.2}
                }}
                className="w-[170px] h-[250px] rounded-md border-2 hover:border-[#04AB1D] overflow-hidden bg-slate-700 cursor-pointer">
                {tv.poster_path && (
                    <img
                        src={tv.poster_path}
                        alt={tv.name}
                        className="w-full h-full object-cover rounded-md"
                    />
                )}
            </motion.div>
        </Link>
    );
}