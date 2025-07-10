"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";

const fiches = [
    {
        title: "Comprendre le stress",
        img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
        desc: "Quels sont les mécanismes du stress ? Comment le gérer ? Découvrez nos conseils pratiques.",
        full: "Le stress est une réaction normale face aux défis. Il devient problématique lorsqu’il devient chronique. Respiration, activité physique, cohérence cardiaque et sommeil sont les piliers d'une bonne gestion du stress."
    },
    {
        title: "Sommeil et bien-être",
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
        desc: "Le sommeil est crucial pour votre équilibre émotionnel. Apprenez à mieux dormir.",
        full: "Un sommeil réparateur améliore l'humeur, réduit le stress et favorise la clarté mentale. Évitez les écrans avant de dormir, maintenez un rythme régulier et créez un environnement calme."
    },
    {
        title: "Identifier ses émotions",
        img: "https://images.unsplash.com/photo-1611605698335-c7f9b968fe4b",
        desc: "Savoir nommer ses émotions, c’est le premier pas vers une meilleure gestion émotionnelle.",
        full: "Reconnaître ses émotions permet d'agir avec plus de recul. Utilisez des outils comme la roue des émotions, les carnets émotionnels ou les exercices de respiration pour prendre du recul."
    },
    {
        title: "La cohérence cardiaque",
        img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15",
        desc: "Un outil puissant pour réguler le stress grâce à la respiration.",
        full: "La cohérence cardiaque consiste à respirer profondément 6 fois par minute, pendant 5 minutes. Cela calme le système nerveux et réduit les effets du stress."
    },
    {
        title: "La pleine conscience",
        img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
        desc: "Se reconnecter à l’instant présent pour apaiser le mental.",
        full: "Pratiquer la pleine conscience aide à diminuer l’anxiété. Marchez en conscience, écoutez vos sensations, faites des pauses de respiration."
    },
    {
        title: "Le rôle du corps",
        img: "https://images.unsplash.com/photo-1544213456-bfc30ebd1b3c",
        desc: "Le corps et les émotions sont intimement liés.",
        full: "Bouger régulièrement, s’étirer, danser ou simplement respirer profondément impacte directement votre bien-être émotionnel."
    },
];

export default function InformationsPage() {
    const [selected, setSelected] = useState(null);

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-cloud py-12 px-4"
        >
            <div className="max-w-5xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-graphite mb-4">
                    Fiches Informatives
                </h1>
                <p className="text-lg text-graphite/80">
                    Retrouvez ici des ressources fiables, claires et bienveillantes pour vous aider à mieux comprendre vos émotions, votre stress ou votre sommeil.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {fiches.map((fiche, index) => (
                    <Card
                        key={index}
                        className="overflow-hidden p-0 hover:shadow-lg transition cursor-pointer"
                        onClick={() => setSelected(fiche)}
                    >
                        <Image
                            src={fiche.img + "?w=600&q=80"}
                            alt={fiche.title}
                            width={600}
                            height={400}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                            <h3 className="text-xl font-semibold mb-2 text-graphite">
                                {fiche.title}
                            </h3>
                            <p className="text-sm text-graphite/80 leading-relaxed">
                                {fiche.desc}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>

            <AnimatePresence>
                {selected && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden relative"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <button
                                className="absolute top-4 right-4 text-2xl font-bold text-graphite hover:text-red-500"
                                onClick={() => setSelected(null)}
                            >
                                &times;
                            </button>
                            <Image
                                src={selected.img + "?w=800&q=80"}
                                alt={selected.title}
                                width={800}
                                height={500}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-graphite mb-3">
                                    {selected.title}
                                </h2>
                                <p className="text-base text-graphite/80 leading-relaxed">
                                    {selected.full}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.main>
    );
}
