"use client"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserDetails() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const router = useRouter()

    if (!session?.user) return null;
    const username = session.user.username || session.user.email?.split("@")[0];

    const menuItems: { label: string; path: string | null }[] = [
        { label: "Home", path: "/" },
        { label: "Profile", path: `/profile/${username}` },
        { label: "Films", path: `/films/${username}` },
        { label: "Diary", path: `/diary/${username}` },
        { label: "Reviews", path: `/reviews/${username}` },
        { label: "Watchlist", path: `/watchlist/${username}` },
        { label: "Lists", path: `/lists/${username}` },
        { label: "Likes", path: `/likes/${username}` },
        { label: "Networks", path: `/networks/${username}` },
        { label: "Settings", path: `/settings` },
    ];

    const handleNavigation = (path: string | null) => {
        if (path) router.push(path);
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button className="text-white font-semibold cursor-pointer">
                {username}
            </button>
            {open && (
                <div className="absolute right-0 w-48 bg-[#2C3440] rounded-lg shadow-lg text-white z-50">
                    <ul className="flex flex-col font-light">
                        {menuItems.map((item) => (
                            <li
                                key={item.label}
                                className="px-4 py-1 hover:bg-[#3A4552] cursor-pointer"
                                onClick={() => handleNavigation(item.path)}
                            >
                                {item.label}
                            </li>
                        ))}

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