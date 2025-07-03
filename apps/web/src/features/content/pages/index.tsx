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
            className="min-h-screen bg-cloud flex flex-col items-center justify-center px-6 text-center"
        >
            {/* Hero */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold text-graphite mb-6"
            >
                Bienvenue sur{" "}
                <span className="text-[var(--cesizen-green)]">CESIZen</span>
            </motion.h1>

            <p className="text-base leading-relaxed max-w-2xl mb-8 text-graphite">
                L’application de bien-être dédiée aux étudiants et apprenants du CESI.
                Respirez, suivez votre humeur, faites un diagnostic émotionnel, et
                accédez à des exercices pour vous recentrer.
            </p>

            <div className="flex gap-4 flex-wrap justify-center mb-16">
                <Link href="/login">
                    <Button variant="primary">Se connecter</Button>
                </Link>
                <Link href="/diagnostic">
                    <Button variant="outline">Découvrir CESIZen</Button>
                </Link>
            </div>

            {/* Fonctionnalités */}
            <section className="w-full max-w-6xl px-4 mb-24">
                <h2 className="text-2xl font-semibold mb-6">Fonctionnalités principales</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="text-center">
                        <IconWrapper>
                            <Heart className="mx-auto" size={40} />
                        </IconWrapper>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Suivi d’humeur</h3>
                        <p className="text-base leading-relaxed">
                            Enregistrez vos émotions et suivez votre évolution pour mieux comprendre votre bien-être.
                        </p>
                    </Card>
                    <Card className="text-center">
                        <IconWrapper>
                            <Wind className="mx-auto" size={40} />
                        </IconWrapper>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Respiration guidée</h3>
                        <p className="text-base leading-relaxed">
                            Des exercices pour vous détendre, respirer profondément et réduire votre stress.
                        </p>
                    </Card>
                    <Card className="text-center">
                        <IconWrapper>
                            <BookText className="mx-auto" size={40} />
                        </IconWrapper>
                        <h3 className="text-xl font-semibold mt-4 mb-2">Fiches informatives</h3>
                        <p className="text-base leading-relaxed">
                            Accédez à des contenus sur la santé mentale, le stress, le sommeil et bien plus encore.
                        </p>
                    </Card>
                </div>
            </section>

            {/* Animation respiration */}
            <section className="text-center mb-32">
                <motion.div
                    className="w-32 h-32 rounded-full bg-[var(--cesizen-skyblue)] mx-auto mb-6"
                    animate={{
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <p className="text-lg font-medium text-graphite">
                    Prenez une pause… Respirez profondément.
                </p>
            </section>

            {/* Footer */}
            <footer className="text-sm text-center text-gray-400 mb-6">
                <p>© 2025 CESIZen — Tous droits réservés</p>
                <p className="mt-2">
                    <a href="/cgu" className="underline">CGU</a> ·{" "}
                    <a href="/credits" className="underline">Crédits</a>
                </p>
            </footer>
        </motion.main>
    );
}
