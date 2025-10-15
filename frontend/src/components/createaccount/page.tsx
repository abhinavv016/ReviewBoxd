"use client"
import CrossIcons from "@/icons/crossIcon";
import { Checkbox } from "@/components/ui/checkbox"
import axios from "axios";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

interface AccountProps {
    onClose: () => void;
}

export default function CreateAccount({ onClose }: AccountProps) {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
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
            const res = await axios.post("/api/auth/signup", form);
            alert(res.data.message || "Account created successfully!");
            onClose();
        } catch (err: any) {
            console.error(err);
            if (err.response?.data?.error) {
                alert(err.response.data.error);
            } else {
                alert("Something went wrong!");
            }
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
            <div className="w-[420px] h-[549px] shadow-2xl bg-[#3B3D54] rounded-lg relative">
                <div className="ml-10">
                    <div className=" flex items-center my-6 text-[#99A9BB] ">
                        JOIN REVIEWBOXD
                        <button className="ml-45 cursor-pointer" onClick={onClose}>
                            <CrossIcons />
                        </button>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#99A9BB] h-6 ">
                                Email address
                            </label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={form.email}
                                onChange={handleChange}
                                className="h-[31px] w-[348px] p-3 bg-[#CCDCEE] rounded-[3px] mb-5 text-black"
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-[#99A9BB] h-6">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={form.username}
                                onChange={handleChange}
                                className="h-[31px] w-[190px] p-3 bg-[#CCDCEE] rounded-[3px] mb-5 text-black"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#99A9BB] h-6">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={form.password}
                                onChange={handleChange}
                                className="h-[31px] w-[190px] p-3 bg-[#CCDCEE] rounded-[3px] mb-5 text-black"
                            />
                        </div>
                        <div className="flex items-center">
                            <Checkbox />
                            <div className="text-sm mx-3 text-[#99A9BB]">
                                By continuing, I confirm that I accept the
                                <a href="/legal" className="text-white hover:text-[#40BCF4]"> Terms of Service </a>
                                and consent to the use of my personal data.
                            </div>
                        </div>

                        <div className="flex items-center gap-5 mt-25">
                            <button
                                type="submit"
                                className="w-[84px] h-[29px] text-white bg-[#04AB1D] font-extrabold rounded-md cursor-pointer hover:bg-[#009D1A] border-[#4ef066] border-t-1 flex justify-center items-center"
                                disabled={loading}>
                                {loading ? "SIGN UP" : "SIGN UP"}
                            </button>
                            <button
                                type="button"
                                onClick={() => signIn("google", {
                                    prompt: "select_account",
                                    callbackUrl: "/",
                                    redirect: true
                                })}
                                className="flex items-center cursor-pointer justify-center gap-2 w-50 h-9 ml-2 bg-white text-black rounded-sm shadow hover:bg-gray-200"
                            >
                                <FcGoogle size={25} />
                                <span>Sign in with Google</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}