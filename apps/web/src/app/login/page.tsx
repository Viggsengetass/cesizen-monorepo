"use client";

import LoginForm from "@/features/auth/login-form";
import { motion } from "framer-motion";
import AnimatedWave from "@/components/ui/AnimatedWaves";

export default function LoginPage() {
    return (
        <div
            className="relative flex items-center justify-center overflow-hidden bg-[#F6F9FC]"
            style={{ height: "calc(100dvh - 80px)" }} // adapte la valeur à ton header
        >
            {/* Fond doux */}
            <div className="absolute inset-0 bg-gradient-radial opacity-30 pointer-events-none z-0" />

            {/* Bulles animées */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="bubble w-40 h-40 top-10 left-10"></div>
                <div className="bubble w-32 h-32 bottom-20 right-20" style={{ animationDelay: "0.2s" }}></div>
                <div className="bubble w-24 h-24 top-1/2 left-1/3" style={{ animationDelay: "0.4s" }}></div>
            </div>

            {/* Formulaire */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md z-10"
            >
                <h1 className="text-3xl font-bold text-center mb-6 text-[#2E2E2E]">
                    Connexion
                </h1>
                <LoginForm />
            </motion.div>

            {/* 🌊 Vague */}
            <AnimatedWave />
        </div>
    );
}
