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
            <div className="flex flex-wrap gap-1 w-90 md:w-140">
                {visibleItems.map((name, index) => (
                    <div key={index} className="bg-[#0E344E] text-xs md:text-sm px-1 md:px-2 py-1 rounded-sm">
                        {name}
                    </div>
                ))}

                {items.length > LIMIT && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="bg-[#0E344E] text-xs md:text-sm px-1 md:px-2 py-1 rounded-sm"
                    >
                        {showAll ? "Show Less" : "Show More"}
                    </button>
                )}
            </div>
        );
    };
    return (
        <div className="mt-4 md:mt-10 w-[40rem]">
            {/* Tab Buttons */}
            <div className="flex border-b border-gray-600 w-85 md:w-150 gap-3 md:gap-6 mb-2 md:mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                            setActiveTab(tab);
                            setShowAll(false);
                        }}
                        className={`pb-2 text-sm md:text-base capitalize ${activeTab === tab
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
                <div className="flex flex-col text-sm md:text-base space-y-3 md:space-y-4">
                    {[
                        { label: "Studios", items: details.studio },
                        { label: "Country", items: details.country },
                        { label: "Spoken Language", items: details.spoken_language },
                        { label: "Genres", items: details.genres },
                    ].map(({ label, items }, i) => (
                        <div
                            key={i}
                            className="flex flex-col md:flex-row md:items-start md:gap-3"
                        >
                            <div className="font-medium w-full md:w-[200px] mb-1 md:mb-0">
                                {label}
                            </div>
                            <div className="flex-1">{renderList(items)}</div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default Tabs;
