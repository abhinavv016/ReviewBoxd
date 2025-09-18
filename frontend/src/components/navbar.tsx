"use client"
import React from "react";
import CreateAccountTrigger from "@/components/trigger/CreateAccount"; // optional
import SignInTrigger from "@/components/trigger/SigninTrigger";
import SearchPage from "@/components/search/searchBar";
import { useSession } from "next-auth/react";
import UserDetails from "./userComp/userDetails";

export default function Navbar() {
    const {data: session} = useSession();
    return (
        <div className="flex text-white items-center relative">
            <a className="relative font-bold font-sans text-4xl p-4 ms-80" href="/">
                Reviewboxd
            </a>

            <div className="font-semibold flex items-center gap-10">
                <div className="ml-10">
                    {session?.user ? <UserDetails /> : <SignInTrigger />}
                </div>
                <CreateAccountTrigger />
                <a className="hover:text-[#D7E0E8]" href="/films">FILMS</a>
                <a className="hover:text-[#D7E0E8]" href="/journal">SHOWS</a>
                <a className="hover:text-[#D7E0E8]" href="/lists">LISTS</a>
            </div>
                <SearchPage />
        </div>
    );
}