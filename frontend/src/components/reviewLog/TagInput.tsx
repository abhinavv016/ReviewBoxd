"use client";

import { useState } from "react";

export default function TagInput() {
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

    const addTag = (value: string) => {
        if (value.trim() && !tags.includes(value.trim())) {
            setTags([...tags, value.trim()]);
        }
    };

    const removeTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === "Tab" || e.key === ",") {
            e.preventDefault();
            addTag(inputValue);
            setInputValue("");
        }
        if (e.key === "Backspace" && inputValue === "") {
            setTags(tags.slice(0, -1));
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <label className="block text-gray-300 font-medium mb-1">Tags</label>

            <div className="flex flex-wrap items-center gap-2 border border-gray-600 rounded-lg p-2 bg-[#1E293B]">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="flex items-center gap-1 bg-[#334155] text-gray-100 px-3 py-1 rounded-md text-sm"
                    >
                        {tag}
                        <button
                            onClick={() => removeTag(tag)}
                            className="text-gray-400 hover:text-gray-200"
                        >
                            ✕
                        </button>
                    </span>
                ))}

                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="eg. netflix"
                    className="bg-transparent outline-none flex-1 text-gray-100 placeholder-gray-500 py-1"
                />
            </div>
        </div>
    );
}