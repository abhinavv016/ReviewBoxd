import CreateAccountTrigger from "@/components/trigger/CreateAccount"; // optional
import SignInTrigger from "@/components/trigger/SigninTrigger";
import SearchPage from "@/components/search/searchBar";
import UserDetails from "../profileDropdown/userDetails";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export default async function Navbar() {
    const session  = await getServerSession(authOptions);
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
                <a className="hover:text-[#D7E0E8]" href="/shows">SHOWS</a>
                <a className="hover:text-[#D7E0E8]" href="/lists">LISTS</a>
                <SearchPage />
            </div>
        </div>
    );
}