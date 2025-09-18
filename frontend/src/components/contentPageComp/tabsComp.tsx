"use client"
import { useState } from "react";

type TabType = "cast" | "crew" | "details";

function Tabs({
    cast,
    crew,
    details,
}: {
    cast: string[];
    crew: string[];
    details: { studio: string[]; country: string[]; spoken_language: string[]; genres: string[] };
}) {
    const [activeTab, setActiveTab] = useState<TabType>("cast")
    const [showAll, setShowAll] = useState(false);

    const tabs: TabType[] = ["cast", "crew", "details"];

    const LIMIT = 30;

    const renderList = (items: string[]) => {
        const visibleItems = showAll ? items : items.slice(0, LIMIT);

        return (
            <div className="flex flex-wrap gap-2 w-140">
                {visibleItems.map((name, index) => (
                    <div key={index} className="bg-slate-700 px-3 py-1 rounded-md">
                        {name}
                    </div>
                ))}

                {items.length > LIMIT && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="bg-slate-700 px-3 py-1 rounded-md"
                    >
                        {showAll ? "Show Less" : "Show More"}
                    </button>
                )}
            </div>
        );
    };
    return (
        <div className="mt-10 w-[40rem]">
            {/* Tab Buttons */}
            <div className="flex gap-6 w-150 border-b border-gray-600 mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                            setActiveTab(tab);
                            setShowAll(false); // reset when switching tab
                        }}
                        className={`pb-2 capitalize ${activeTab === tab
                                ? "border-b-2 border-[#00E054] text-[#00E054]"
                                : "text-gray-400 hover:text-[#00E054]"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === "cast" && renderList(cast)}
            {activeTab === "crew" && renderList(crew)}
            {activeTab === "details" && (
                <div className="flex flex-col space-y-4">
                    {[
                        { label: "Studios", items: details.studio },
                        { label: "Country", items: details.country },
                        { label: "Spoken Language", items: details.spoken_language },
                        { label: "Genres", items: details.genres },
                    ].map(({ label, items }, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className="font-medium w-[200px]">{label}</div>
                            {renderList(items)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Tabs;
