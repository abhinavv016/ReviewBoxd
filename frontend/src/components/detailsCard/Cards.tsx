import EyeIcon from "@/icons/eyeIcon";
import Link from "next/link";

interface CardProps {
    text: string;
    hoverColor: string;
    href: string;
    Icon?: React.ComponentType;
}

export default function Card({ text, hoverColor, href, Icon}: CardProps) {
    const DefaultIcon = EyeIcon;
    return (
        <Link href={href}>
            <div className="group flex items-center text-md w-[320px] h-[100px]  bg-[#435565] rounded-sm hover:[background-color:var(--hover-color)]"
            style={{ ["--hover-color" as any]: hoverColor }}
            >
                <div className="ml-3 pr-2">
                    {Icon ? <Icon /> : <DefaultIcon />}
                </div>
                <div className="text-[#DDEDFF] mr-3">{text}</div>
            </div>
        </Link>
        
    );
}