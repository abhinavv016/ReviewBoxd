"use client"
import React, { useState } from "react";
import CreateAccount from "@/components/createaccount/page";
import { AnimatePresence } from "framer-motion";

export default function CreateAccountTrigger() {
    const [isAccountVisible, setIsAccountVisible] = useState(false);
    const handleCreateClick = () => setIsAccountVisible(true);
    const handleCloseClick = () => setIsAccountVisible(false);

    return (
        <>
            <span
                className="text-white hover:text-[#D7E0E8] cursor-pointer"
                onClick={handleCreateClick}
            >
                CREATE ACCOUNT
            </span>
            <AnimatePresence>
                {isAccountVisible && <CreateAccount onClose={handleCloseClick} />}
            </AnimatePresence>
        </>
    );
}