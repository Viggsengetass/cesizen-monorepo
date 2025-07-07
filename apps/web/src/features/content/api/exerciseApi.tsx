"use client";

import { Exercise } from "@/features/content/types/Exercise";

export async function fetchExercises(): Promise<Exercise[]> {
    const token: string | null =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    console.log("[fetchExercises] 🪪 Token récupéré :", token);

    if (!token) {
        throw new Error("Aucun token d'authentification trouvé.");
    }

    const response: Response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/exercises`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/ld+json",
            },
            cache: "no-store",
        }
    );

    console.log("[fetchExercises] 🌐 Appel de", `${process.env.NEXT_PUBLIC_API_URL}/api/exercises`);
    console.log("[fetchExercises] 📬 Status de la réponse :", response.status);

    if (!response.ok) {
        throw new Error(`Erreur lors du chargement des exercices : ${response.status}`);
    }

    const data: any = await response.json();
    console.log("[fetchExercises] 📦 Données reçues :", data);

    const exercises = data["hydra:member"] ?? data["member"] ?? [];

    console.log("[fetchExercises] ✅ Exercices retournés :", exercises);

    return exercises;
}
