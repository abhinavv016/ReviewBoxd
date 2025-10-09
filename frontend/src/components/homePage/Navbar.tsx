"use client";

import { useSession } from "next-auth/react";
import CreateAccountTrigger from "@/components/trigger/CreateAccount";
import SignInTrigger from "@/components/trigger/SigninTrigger";
import SearchPage from "@/components/search/searchBar";
import UserDetails from "../profileDropdown/userDetails";
import { Spinner } from "../ui/shadcn-io/spinner";

export default function Navbar() {
    const { data: session, status } = useSession();

    return (
        <div className="relative flex justify-center text-white p-4">
            <a className="font-bold text-4xl mx-auto md:mx-0" href="/">
                Reviewboxd
            </a>

            <div className="hidden md:flex font-semibold items-center gap-10 ml-10">
                {status === "loading" ? (
                    <Spinner variant="infinite" className="text-white w-5 h-5" />
                ) : session?.user ? (
                    <>
                        <UserDetails />
                    </>
                ) : (
                    <>
                        <SignInTrigger />
                        <CreateAccountTrigger />
                    </>
                )}

                <a className="hover:text-[#D7E0E8]" href="/films">FILMS</a>
                <a className="hover:text-[#D7E0E8]" href="/shows">SHOWS</a>
                <a className="hover:text-[#D7E0E8]" href="/lists">LISTS</a>
                <SearchPage />
            </div>
        </div>
    );
}