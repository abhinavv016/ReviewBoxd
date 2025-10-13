"use client"
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";


interface Media {
    id: string;
    title: string;
    poster_path?: string;
}

interface EyeIconProps{
    media: Media;
    color?: string;
    size?: string;
    activeColor?: string;
}

export default function EyeIcon({ 
    media,
    color = "text-[#8ab8ec]", 
    size = "text-5xl" , 
    activeColor = "text-[#FF9010]"}: EyeIconProps){
    const { data: session } = useSession();
    const clickTimeout = useRef<NodeJS.Timeout | null>(null);
    const[active, setActive] = useState(false);
    
    const addtoWatchedMovie = async() => {
        if(!session){
            alert("Please login first");
            return;
        }

        try {
            const res = await fetch("/api/watchedMovie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(media),
            });

            if(res.ok) setActive(true);
        } catch (error) {
            console.error(error)
        }
    }

    const removeFromWatchMovie = async () => {
        if (!session) {
            alert("Please login first");
            return;
        }

        try {
            const res = await fetch("/api/watchedMovie", {
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
            removeFromWatchMovie();
        } else {
            clickTimeout.current = setTimeout(() => {
                addtoWatchedMovie();
                clickTimeout.current = null;
            },);
        }
    };


    return <IoEyeSharp 
    onClick={handleClick}
    className={`${size} cursor-pointer transition ${
        active ? activeColor : color
    }`}
    />
}