import { FaStar } from "react-icons/fa6";

interface StarIconProps{
    color?: string;
    size?: string;
}
export default function StarIcon({ color = "text-[#8ab8ec]", size = "text-4xl" }: StarIconProps){
    return <FaStar className={`${size} ${color}`}/>
}