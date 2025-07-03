"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function IndexContentPage() {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-cloud flex flex-col items-center justify-center px-6 text-center"
        >
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold text-graphite mb-6"
            >
                Bienvenue sur{" "}
                <span className="text-sage">CESIZen</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base md:text-lg text-graphite max-w-xl mb-8"
            >
                L’application de bien-être dédiée aux étudiants et apprenants du CESI.<br />
                Respirez, suivez votre humeur, faites un diagnostic émotionnel, et accédez à des exercices pour vous recentrer.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
            >
                <Link href="/login" className="btn-primary px-6 py-2 text-sm sm:text-base shadow-md hover:scale-105 transition-transform">
                    Se connecter
                </Link>
                <Link href="/diagnostic" className="btn-outline px-6 py-2 text-sm sm:text-base hover:scale-105 transition-transform">
                    Découvrir
                </Link>
            </motion.div>
        </motion.main>
    );
}
