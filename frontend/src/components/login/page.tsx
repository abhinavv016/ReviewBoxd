"use client"
import { RememberMeCheckbox } from "@/components/ui/checkbox";
import CrossIcons from "@/icons/crossIcon";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

interface LoginFormProps {
    onClose: () => void;
}

export default function LoginForm({ onClose }: LoginFormProps) {
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        try {
            setLoading(true);

            const res = await signIn("credentials", {
                username: form.username,
                password: form.password,
                redirect: true,
                callbackUrl: "/"
            });

            if (res?.error) {
                alert(res.error || "Invalid username or password");
            } else {
                alert("Signed in successfully!");
                onClose();
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
            >
            <div className="fixed w-[45rem] top-5 right-55 bg-[#3B3D54] p-6 rounded-lg shadow-2xl">
                <form className="flex gap-3 space-y-4" onSubmit={handleSubmit}>
                    <div className="flex mt-7 cursor-pointer" onClick={onClose}>
                        <CrossIcons />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-400">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full p-2 mt-1 bg-[#2C3440] rounded-lg"
                            value={form.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full p-2 mt-1 bg-[#2C3440] rounded-lg"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="absolute ml-85 w-20 h-5 text-sm text-[#04AB1D] cursor-pointer hover:text-white">
                        Forgotten?
                    </div>

                    <div className="flex flex-col gap-2 items-center ml-8">
                        <button
                            type="submit"
                            className="cursor-pointer w-25 bg-[#04AB1D] hover:bg-[#008814] px-3 py-1.5 text-white font-bold rounded-sm"
                            disabled={loading}>
                            {loading ? "SIGN IN" : "SIGN IN"}
                        </button>
                        <button
                            type="button"
                            onClick={() => signIn("google" , { 
                                prompt: "select_account" , 
                                callbackUrl: "/", 
                                redirect: true}) }
                            className="flex items-center cursor-pointer justify-center gap-2 w-50 h-9 ml-2 bg-white text-black rounded-sm shadow hover:bg-gray-200"
                        >
                            <FcGoogle size={25} />
                            <span>Sign in with Google</span>
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}