import GuestHome from "@/components/Home/guestHome";
import UserHome from "@/components/Home/userHome";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {

    const session = await getServerSession(authOptions)
    if (!session) {
        return <GuestHome />;
    }
    return <UserHome />;
}