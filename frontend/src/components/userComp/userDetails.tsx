import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function UserDetails() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);

    if (!session?.user) return null;

    const handleLogout = () => {
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
        });

        signOut({ redirect: true, callbackUrl: "/" });
    };

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
                <div className="absolute right-0 mt-2 w-48 bg-[#2C3440] rounded-lg shadow-lg text-white z-50">
                    <ul className="flex flex-col">
                        <li className="px-4 py-2 hover:bg-[#3A4552] cursor-pointer">
                            Profile
                        </li>
                        <li className="px-4 py-2 hover:bg-[#3A4552] cursor-pointer">
                            Settings
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