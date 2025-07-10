"use client";

import { useParams, useRouter } from "next/navigation";
import BreathingPlayer from "@/components/ui/BreathingPlayer";
import { useEffect, useState } from "react";

const STATIC_EXERCISES = [
    {
        slug: "calme-express",
        title: "Calme Express",
        description: "Exercice rapide pour retrouver son calme.",
        inhale: 4,
        hold: 2,
        exhale: 4,
        cycles: 3,
    },
    {
        slug: "coherence-cardiaque",
        title: "Cohérence Cardiaque",
        description: "Exercice de 5 min pour réguler la respiration.",
        inhale: 5,
        hold: 0,
        exhale: 5,
        cycles: 6,
    },
    {
        slug: "sommeil-paisible",
        title: "Sommeil Paisible",
        description: "Préparez votre corps au sommeil.",
        inhale: 4,
        hold: 7,
        exhale: 8,
        cycles: 4,
    },
];

export default function ExerciseDetailPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [exercise, setExercise] = useState<any>(null);

    useEffect(() => {
        const found = STATIC_EXERCISES.find((e) => e.slug === slug);
        if (!found) {
            router.push("/exercises");
        } else {
            setExercise(found);
        }
    }, [slug, router]);

    if (!exercise) return null;

    return (
        <main className="min-h-screen bg-[#F6F9FC] py-10 px-6 flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-[#2E2E2E] mb-4">
                🌬️ {exercise.title}
            </h1>
            <p className="text-center text-gray-600 max-w-xl mb-8">{exercise.description}</p>

            <BreathingPlayer
                inhale={exercise.inhale}
                hold={exercise.hold}
                exhale={exercise.exhale}
                cycles={exercise.cycles}
            />
        </main>
    );
}
