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
        <div className="relative flex justify-center text-white p-4">
            <a className="font-bold font-sans text-4xl mx-auto md:mx-0" href="/">
                Reviewboxd
            </a>

            <div className="hidden md:flex font-semibold items-center gap-10 ml-10">
                <div>
                    {session?.user ? <UserDetails /> : <SignInTrigger />}
                </div>
                {session?.user ? <UserDetails/> :<CreateAccountTrigger />}
                <a className="hover:text-[#D7E0E8]" href="/films">FILMS</a>
                <a className="hover:text-[#D7E0E8]" href="/journal">SHOWS</a>
                <a className="hover:text-[#D7E0E8]" href="/lists">LISTS</a>
                <SearchPage />
            </div>
        </div>
    );
}