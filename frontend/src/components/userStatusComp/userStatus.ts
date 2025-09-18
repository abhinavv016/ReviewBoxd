"use client"
import { useSession } from "next-auth/react"

export default function UserStatus() : boolean {
    const {data: session, status } = useSession();
    
    return status ==="authenticated" && !!session?.user;
}