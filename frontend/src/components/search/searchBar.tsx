"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim()) {
            router.push(`/search/${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="p-3 ml-2 border rounded-4xl text-white w-30 h-8"
        />
    );
}