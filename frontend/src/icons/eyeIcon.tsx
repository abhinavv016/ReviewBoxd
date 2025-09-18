"use client"
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";

interface EyeIconProps{
    color?: string;
    size?: string;
    activeColor?: string;
}

export default function EyeIcon({ color = "text-[#8ab8ec]", size = "text-5xl" , activeColor = "text-[#FF9010]"}: EyeIconProps){
    const[active, setActive] = useState(false);
    
    return <IoEyeSharp 
    onClick={() => setActive(!active)}
    className={`${size} cursor-pointer transition ${
        active ? activeColor : color
    }`}
    />
}