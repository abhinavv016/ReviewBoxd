"use client"
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

interface HeartIconProps{
    color?: string;
    size?: string;
    activeColor?: string;
}
export default function HeartIcon({ color = "text-[#8ab8ec]", size = "text-5xl", activeColor = "text-[#00BA2F]" }: HeartIconProps){
    const[active, setActive] = useState(false);
    return <FaHeart
    onClick={() => setActive(!active)}
    className={`${size} cursor-pointer transition ${
        active ? activeColor : color
    }`}/>
}