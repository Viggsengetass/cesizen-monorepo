"use client";

import { useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { motion } from "framer-motion";

export default function CookieAccessButton() {
    const [showMiniBanner, setShowMiniBanner] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <>
            {/* Bouton fixe en bas à droite */}
            <div
                className="fixed bottom-4 right-4 z-50 group"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {/* Tooltip */}
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-14 right-1 bg-white text-graphite text-sm px-3 py-2 rounded-xl shadow-lg border border-gray-200"
                    >
                        Gestion des cookies
                    </motion.div>
                )}

                <button
                    onClick={() => setShowMiniBanner(true)}
                    className="w-12 h-12 bg-white border border-[#A8D5BA] text-[#A8D5BA] rounded-full shadow-md flex items-center justify-center hover:bg-[#A8D5BA]/10 transition"
                    aria-label="Gérer les cookies"
                >
                    <Cookie className="w-6 h-6" strokeWidth={1.5} />
                </button>
            </div>

            {/* Mini bandeau cookies */}
            {showMiniBanner && (
                <div className="fixed bottom-20 right-6 z-50 bg-white shadow-lg rounded-xl px-6 py-4 text-sm border border-gray-200 max-w-sm">
                    <p className="mb-3">
                        Consultez notre{" "}
                        <Link
                            href="/politique-cookies"
                            className="underline text-[var(--cesizen-green)] hover:text-[#92c6a5]"
                        >
                            politique de cookies
                        </Link>{" "}
                        pour en savoir plus.
                    </p>
                    <button
                        onClick={() => setShowMiniBanner(false)}
                        className="text-sm px-4 py-1 border border-[#A8D5BA] text-graphite rounded-xl hover:bg-[#A8D5BA]/10 transition"
                    >
                        Fermer
                    </button>
                </div>
            )}
        </>
    );
}
