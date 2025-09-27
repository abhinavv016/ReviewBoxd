"use client";

import { useState, useRef } from "react";
import { TbClockPlus } from "react-icons/tb";
import { useSession } from "next-auth/react";

interface Media {
    id: string;
    title: string;
    poster_path?: string;
    media_type: string;
}

interface WatchLaterProps {
    media: Media;
    color?: string;
    size?: string;
    activeColor?: string;
}

export default function WatchLaterIcon({
    media,
    color = "text-[#8ab8ec]",
    size = "text-5xl",
    activeColor = "text-[#40BCF4]",
}: WatchLaterProps) {
    const { data: session } = useSession();
    const [active, setActive] = useState(false);
    const clickTimeout = useRef<NodeJS.Timeout | null>(null);

    const addToWatchlist = async () => {
        if (!session) {
            alert("Please login first");
            return;
        }

        try {
            const res = await fetch("/api/watchlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(media),
            });

            if (res.ok) setActive(true);
        } catch (err) {
            console.error(err);
        }
    };

    const removeFromWatchlist = async () => {
        if (!session) {
            alert("Please login first");
            return;
        }

        try {
            const res = await fetch("/api/watchlist", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: media.id }),
            });

            if (res.ok) setActive(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleClick = () => {
        if (clickTimeout.current) {
            clearTimeout(clickTimeout.current);
            clickTimeout.current = null;
            removeFromWatchlist();
        } else {
            clickTimeout.current = setTimeout(() => {
                addToWatchlist();
                clickTimeout.current = null;
            },);
        }
    };

    return (
        <TbClockPlus
            onClick={handleClick}
            className={`${size} cursor-pointer transition ${active ? activeColor : color
                }`}
        />
    );
}