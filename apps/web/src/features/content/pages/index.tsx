"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Wind, BookText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconWrapper } from "@/components/ui/IconWrapper";
import CookieConsent from "react-cookie-consent";

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
                <motion.div
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1.5" y="1.5" width="21" height="33" rx="10.5" stroke="white" strokeWidth="3" />
                        <circle cx="12" cy="10" r="2" fill="white" />
                    </svg>
                </motion.div>
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

            {/* Témoignages */}
            <section className="w-full bg-white py-20 px-4 text-center">
                <h2 className="text-2xl font-semibold text-graphite mb-10">Ils en parlent mieux que nous</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                        { name: "Camille L.", text: "Grâce à CESIZen, j’ai appris à mieux gérer mon stress pendant mes examens." },
                        { name: "Théo R.", text: "L’exercice de respiration m’a littéralement sauvé pendant une période de fatigue intense." },
                        { name: "Jade M.", text: "Les contenus sont clairs, doux et bienveillants. J’adore l’univers visuel de l’appli." }
                    ].map((testimonial, i) => (
                        <Card key={i} className="text-left">
                            <div className="flex items-start gap-4">
                                <MessageCircle className="text-[#D5CFE1] mt-1" size={32} />
                                <div>
                                    <p className="text-base text-graphite italic">"{testimonial.text}"</p>
                                    <p className="mt-2 font-semibold text-graphite">— {testimonial.name}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="w-full py-16 px-4 bg-[#A3D2CA]/20 text-center">
                <h2 className="text-2xl font-semibold text-graphite mb-4">Rejoignez l’aventure CESIZen</h2>
                <p className="text-base text-graphite mb-6">Inscrivez-vous dès maintenant pour bénéficier de tous les outils bien-être personnalisés.</p>
                <Link href="/login">
                    <Button variant="primary">Créer un compte</Button>
                </Link>
            </section>

            {/* Cookie Consent */}
            <CookieConsent
                location="bottom"
                buttonText="Accepter"
                declineButtonText="Refuser"
                enableDeclineButton
                cookieName="cesizenCookieConsent"
                style={{
                    background: "#2E2E2E",
                    color: "#F6F9FC",
                    fontSize: "16px",
                    padding: "1rem",
                }}
                buttonStyle={{
                    backgroundColor: "#A8D5BA",
                    color: "#fff",
                    borderRadius: "1rem",
                    padding: "0.5rem 1rem",
                    fontWeight: "600",
                    marginLeft: "1rem",
                }}
                declineButtonStyle={{
                    backgroundColor: "transparent",
                    color: "#fff",
                    border: "2px solid #fff",
                    borderRadius: "1rem",
                    padding: "0.5rem 1rem",
                    fontWeight: "600",
                    marginLeft: "1rem",
                }}
            >
                Ce site utilise des cookies pour améliorer votre expérience.{" "}
                <a
                    href="/politique-cookies"
                    className="underline text-[#A8D5BA] hover:text-[#92c6a5]"
                >
                    En savoir plus
                </a>
            </CookieConsent>

        </motion.main>
    );
}