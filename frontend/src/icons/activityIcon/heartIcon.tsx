"use client"
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";


interface Media {
    id: string;
    title: string;
    poster_path?: string;
}

interface HeartIconProps {
    media: Media;
    color?: string;
    size?: string;
    activeColor?: string;
}
export default function HeartIcon({
    media,
    color = "text-[#8ab8ec]",
    size = "text-5xl",
    activeColor = "text-[#00BA2F]"
}: HeartIconProps) {
    const { data: session } = useSession();
    const [active, setActive] = useState(false);

    const toggleLike = async () => {
        if (!session) {
            alert("Please login first");
            return;
        }

        console.log("media.id being sent:", media.id);
        
        try {
            const res = await fetch("/api/watchedMovie/like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "toggleLike", mediaId: String(media.id) }),
            });
            const data = await res.json();

            if (res.ok) {
                setActive(data.liked);
            } else {
                alert(data.error || "You must watch this movie before liking it");
            }
        } catch (error) {
            console.error("Failed to toggle like:", error);
        }
    };

    return (
        <FaHeart
            onClick={toggleLike}
            className={`${size} cursor-pointer transition ${active ? activeColor : color
            }`}
        />
    );
}