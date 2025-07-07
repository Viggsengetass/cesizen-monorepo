"use client";

import { useEffect, useState } from "react";
import { fetchExercises } from "@/features/content/api/exerciseApi";
import ExerciseCard from "@/features/exercises/components/ExerciseCard";
import type { Exercise } from "@/features/content/types/Exercise";

export default function IndexExercisePage() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("[IndexExercisePage] 🌀 Chargement des exercices...");
        fetchExercises()
            .then((data) => {
                console.log("[IndexExercisePage] ✅ Exercices reçus :", data);
                setExercises(data);
            })
            .catch((err) => {
                console.error("[IndexExercisePage] ❌ Erreur :", err);
                setError(err.message);
            });
    }, []);

    return (
        <main className="py-8 px-4">
            <h1 className="text-3xl font-bold text-[#2E2E2E] text-center mb-6">
                Mes <span className="text-[#A8D5BA]">Exercices</span> de Respiration
            </h1>

            {error ? (
                <p className="text-center text-[#FADADD] font-semibold">
                    Erreur lors du chargement des exercices : {error}
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {exercises.map((exercise) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                    ))}
                </div>
            )}
        </main>
    );
}
