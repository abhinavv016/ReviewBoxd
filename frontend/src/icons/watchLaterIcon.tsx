"use client"
import { useState } from "react";
import { TbClockPlus } from "react-icons/tb";

interface watchLaterProps{
    color?: string,
    size?: string,
    activeColor?: string,
}
export default function WatchLaterIcon({ color = "text-[#8ab8ec]", size = "text-5xl", activeColor = "text-[#40BCF4]"}: watchLaterProps){
    const[active, setActive] = useState(false);
    return <TbClockPlus 
    onClick={() => setActive(!active)}
    className={`${size} cursor-pointer transition ${
        active ? activeColor : color
    }`}/>
}