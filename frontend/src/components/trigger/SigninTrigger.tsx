"use client"
import React, { useState } from "react";
import LoginForm from "@/app/(routes)/login/page";
import { AnimatePresence } from "framer-motion";

export default function SignInTrigger() {
    const [isLoginVisible, setIsLoginVisible] = useState(false);

    const handleSignInClick = () => setIsLoginVisible(true);
    const handleCloseLogin = () => setIsLoginVisible(false);

    return (
        <>
            <div
                className="text-white cursor-pointer"
                onClick={handleSignInClick}
            >
                SIGN IN
            </div>
            <AnimatePresence>
                {isLoginVisible && <LoginForm onClose={handleCloseLogin} />}
            </AnimatePresence>
        </>
    );
}