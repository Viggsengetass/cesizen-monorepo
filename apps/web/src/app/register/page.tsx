"use client";

import RegisterForm from "@/features/auth/register-form";
import { motion } from "framer-motion";

export default function RegisterPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cloud">
            <div className="absolute inset-0 bg-gradient-radial opacity-40 pointer-events-none" />
            <div className="absolute w-full h-full z-0 pointer-events-none overflow-hidden">
                <div className="bubble w-40 h-40 top-10 left-10"></div>
                <div className="bubble w-32 h-32 bottom-20 right-20 animation-delay-200"></div>
                <div className="bubble w-24 h-24 top-1/2 left-1/3 animation-delay-400"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md z-10"
            >
                <h1 className="text-3xl font-bold text-center mb-6 text-[var(--cesizen-graphite)]">
                    Créer un compte
                </h1>
                <RegisterForm />
            </motion.div>
        </div>
    );
}
