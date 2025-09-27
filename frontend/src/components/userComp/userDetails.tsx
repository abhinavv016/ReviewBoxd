import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserDetails() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const router = useRouter()

    const handleClick = () => {
        if(session?.user?.id){
            router.push(`/watchlist/${session.user.username}`)
        }
    }

    if (!session?.user) return null;

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button className="text-white font-semibold cursor-pointer">
                {session.user.username || session.user.email?.split("@")[0]}
            </button>
            {open && (
                <div className="absolute right-0 w-48 bg-[#2C3440] rounded-lg shadow-lg text-white z-50">
                    <ul className="flex flex-col">
                        <li className="px-4 py-2 hover:bg-[#3A4552] cursor-pointer">
                            Profile
                        </li>
                        <li className="px-4 py-2 hover:bg-[#3A4552] cursor-pointer">
                            Settings
                        </li>
                        <li 
                            className="px-4 py-2 hover:bg-[#3A4552] cursor-pointer"
                            onClick={handleClick}>
                            Watchlist
                        </li>
                        <li
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="px-4 py-2 hover:bg-red-600 cursor-pointer"
                        >
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}