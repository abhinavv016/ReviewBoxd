'use client'
import { useState } from "react"
import LoginForm from "../login/page"
import { usePathname } from "next/navigation"

export default function NotUser(){
    const [ isVisible, setIsVisible ] = useState(false)
    const pathname = usePathname();
    const base = "http://localhost:3000";

    const links = base + pathname;
    const copylink = (_e: any) => {
        navigator.clipboard.writeText(links)
        alert("Copied to clipboard")
    }
    return (
    <>
        <div className="hidden sm:flex absolute left-240 translate-x-20 flex-col items-center bg-[#0E344E] w-60 mt-50 rounded-sm">
            <div 
                className="text-base px-2 py-1.5 cursor-pointer"
                onClick={() => setIsVisible(true)}>
                Sign in to log, rate and review
            </div>
            <div className="border-t border-slate-100 w-full mt-2"></div>
            <div onClick={copylink} className="text-base px-2 py-1.5 cursor-pointer">
                Share
            </div>
        </div>
        {isVisible && <LoginForm onClose={() => setIsVisible(false)}/>}
    </>
)}