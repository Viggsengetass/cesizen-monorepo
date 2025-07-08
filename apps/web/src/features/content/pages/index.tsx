"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Wind, BookText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconWrapper } from "@/components/ui/IconWrapper";

export default function IndexContentPage() {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-cloud flex flex-col items-center justify-start"
        >
            {/* Hero vidéo */}
            <div
                id="hero-video-section"
                className="relative w-full h-screen overflow-hidden -mt-[64px] mb-16"
            >
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    src="/cesizen-bg.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10" />
                <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-white">
                        Bienvenue sur <span className="text-[#A8D5BA]">CESIZen</span>
                    </h1>
                    <p className="text-white text-lg mt-4 max-w-xl">
                        L’application de bien-être dédiée aux étudiants du CESI.
                        Respirez, suivez votre humeur, faites un diagnostic émotionnel.
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <Link href="/login"><Button variant="primary">Se connecter</Button></Link>
                        <Link href="/diagnostic"><Button variant="soft">Découvrir CESIZen</Button></Link>
                    </div>
                </div>
            </div>

            {/* Fonctionnalités */}
            <section className="w-full max-w-6xl px-4 mb-24 text-center">
                <h2 className="text-2xl font-semibold mb-6 text-graphite">Fonctionnalités principales</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="text-center">
                        <IconWrapper><Heart className="mx-auto" size={40} /></IconWrapper>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Suivi d’humeur</h3>
                        <p className="text-base leading-relaxed">Enregistrez vos émotions et suivez votre évolution pour mieux comprendre votre bien-être.</p>
                    </Card>
                    <Card className="text-center">
                        <IconWrapper><Wind className="mx-auto" size={40} /></IconWrapper>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Respiration guidée</h3>
                        <p className="text-base leading-relaxed">Des exercices pour vous détendre, respirer profondément et réduire votre stress.</p>
                    </Card>
                    <Card className="text-center">
                        <IconWrapper><BookText className="mx-auto" size={40} /></IconWrapper>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Fiches informatives</h3>
                        <p className="text-base leading-relaxed">Accédez à des contenus sur la santé mentale, le stress, le sommeil et bien plus encore.</p>
                    </Card>
                </div>
            </section>

            {/* Animation respiration */}
            <section className="text-center mb-32">
                <motion.div
                    className="w-32 h-32 rounded-full bg-[var(--cesizen-skyblue)] mx-auto mb-6"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <p className="text-lg font-medium text-graphite">Prenez une pause… Respirez profondément.</p>
            </section>

            {/* Footer */}
            <footer className="text-sm text-center text-gray-400 mb-6">
                <p>© 2025 CESIZen — Tous droits réservés</p>
                <p className="mt-2">
                    <a href="/cgu" className="underline">CGU</a> · <a href="/credits" className="underline">Crédits</a>
                </p>
            </footer>
        </motion.main>
    );
}
