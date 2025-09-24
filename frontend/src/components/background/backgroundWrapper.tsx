"use client";

import { usePathname } from "next/navigation";
import Background from "./background";

export default function BackgroundWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isContentPage = pathname.startsWith("/content");

    return (
        <>
            {!isContentPage && <Background />}
            <main className="relative z-10">{children}</main>
        </>
    );
}