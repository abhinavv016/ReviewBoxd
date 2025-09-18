import EyeIcon from "@/icons/eyeIcon";
import Card from "./Cards";
import HeartIcon from "@/icons/heartIcon";
import CollectionIcon from "@/icons/collectionIcon";
import ReviewIcon from "@/icons/reviewIcon";
import StarIcon from "@/icons/starIcon";
import DiaryIcon from "@/icons/diaryIcon";


const cards = [
    { text: "Keep track of every film you’ve ever watched (or just start from the day you join)", hoverColor: "#00C030", href: "/welcome", Icon: EyeIcon },

    { text: "Show some love for your favorite films, tv shows, lists and reviews with a “like”", hoverColor: "#EE7000", href: "/welcome", Icon: HeartIcon},

    { text: "Write and share reviews, and follow friends and other members to read theirs", hoverColor: "#1E9CE4", href: "/welcome", Icon: ReviewIcon  },

    { text: "Rate each film or tv show on a five-star scale (with halves) to record and share your reaction", hoverColor: "#00C030", href: "/welcome", Icon: StarIcon  },

    { text: "Keep a diary of your film or tv show(log each episode) watching", hoverColor: "#EE7000", href: "/welcome", Icon: DiaryIcon },

    { text: "Compile and share lists of films/shows on any topic", hoverColor: "#1E9CE4", href: "/welcome", Icon: CollectionIcon  },
    
];

export default function Collect() {
    return (
        <div>

            <div className="mt-15 ml-70 text-[#8898A9]">REVIEWBOXD LET'S YOU...</div>
            <div className="flex justify-center mt-2">
                <div className="h-px w-[65rem] bg-[#99A9BB]"></div>
            </div>

            <div className="grid grid-cols-3 gap-3 mx-68 mt-5">
                
                {cards.map((card, index) => (
                    <Card 
                    key={index} 
                    text={card.text} 
                    hoverColor={card.hoverColor} 
                    href={card.href} 
                    Icon={card.Icon} />
                ))}
            </div>

        </div>
    );
}