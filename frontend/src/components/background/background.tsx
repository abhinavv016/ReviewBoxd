"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Background() {
    const [posters, setPosters] = useState<string[]>([]);
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        async function fetchPoster() {
            try {
                const { data } = await axios.get<string[]>(`http://localhost:4000/posters`);
                setPosters(data);
            } catch (err) {
                console.error("Failed to fetch posters", err);
            }
        }
        fetchPoster();
    }, []);

    useEffect(() => {
        if (posters.length === 0) return;

        const interval = setInterval(() => {
            setVisibleCount((prev) => {
                if (prev < posters.length) {
                    return prev + 1;
                }
                clearInterval(interval);
                return prev;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [posters]);

    return (
        <>
            <div className="fixed inset-0 -z-10 grid grid-cols-5 md:grid-cols-14 auto-rows-[150px]">
                {posters.slice(0, visibleCount).map((poster, i) => (
                    <img
                        key={i}
                        src={poster}
                        alt={`poster-${i}`}
                        className="w-full h-full object-cover opacity-0 animate-fadeIn"
                    />
                ))}
            </div>
            <div className="fixed inset-0 -z-10 bg-black/80"></div>
        </>
    );
}