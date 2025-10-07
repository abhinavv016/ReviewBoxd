"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Content } from "@/lib/fetchContent";

interface SearchResultProps {
    decodedQuery: string;
    contents: Content[];
}

export default function SearchResult({ decodedQuery, contents }: SearchResultProps) {
    const sortedContent = [...contents]
        .filter((c) => c.poster_path)
        .sort((a, b) => Number(b.popularity ?? 0) - Number(a.popularity ?? 0));

    if (sortedContent.length === 0) {
        return (
            <p className="text-center text-[#99A9BB] mt-10">No results found.</p>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col items-center mt-10 mb-5">
                <h2 className="text-[#99A9BB] text-center">
                    SHOWING MATCHES FOR "<span>{decodedQuery.toUpperCase()}</span>"
                </h2>
                <div className="h-px w-full max-w-4xl bg-[#99A9BB] mt-2"></div>
            </div>

            {/* Results */}
            <div className="flex justify-center">
                <ul className="space-y-6 w-full max-w-4xl">
                    <AnimatePresence>
                        {sortedContent.map((content, index) => (
                            <motion.li
                                key={`${content.media_type}-${content.id}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{
                                    delay: index * 0.05,
                                    duration: 0.4,
                                    ease: "easeOut",
                                }}
                                className="flex flex-col gap-3 text-white"
                            >
                                <Link
                                    href={`/content/${content.media_type}/${content.id}`}
                                    className="flex gap-5 cursor-pointer"
                                >
                                    {/* Poster */}
                                    {content.poster_path && (
                                        <img
                                            src={content.poster_path}
                                            alt={content.title}
                                            className="w-28 h-40 rounded-md hover:border-[#04AB1D] border-2 cursor-pointer"
                                        />
                                    )}

                                    {/* Info */}
                                    <div className="flex flex-col">
                                        <span className="text-xl">
                                            {content.title} ({content.release_date?.slice(0, 4)})
                                        </span>
                                        <p className="mt-2 text-[#99A9BB] text-sm">
                                            {content.overview}
                                        </p>
                                    </div>
                                </Link>

                                {/* Divider */}
                                <div className="h-px w-full bg-[#99A9BB] mt-2"></div>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
            </div>
        </div>
    );
}