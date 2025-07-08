"use client";

import { useEffect, useState } from "react";
import { fetchExercises } from "@/features/content/api/exerciseApi";
import ExerciseCard from "@/features/exercises/components/ExerciseCard";
import type { Exercise } from "@/features/content/types/Exercise";
import Loader from "@/components/ui/Loader";
import Select from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Exercices statiques réalistes et paramétrés
const staticExercises: Exercise[] = [
    {
        id: "static-calme-express",
        title: "🧘 Calme Express",
        type: "relaxation",
        duration: 120,
        instructions: `
1. Inspire calmement pendant 4 secondes.
2. Garde ta respiration pendant 2 secondes.
3. Expire doucement pendant 4 secondes.
4. Répète 4 cycles.`,
        inhale: 4,
        hold: 2,
        exhale: 4,
        cycles: 4,
    },
    {
        id: "static-coherence-cardiaque",
        title: "❤️ Cohérence Cardiaque 365",
        type: "concentration",
        duration: 300,
        instructions: `
1. Inspire pendant 5 secondes.
2. Expire pendant 5 secondes.
3. Répète pendant 6 cycles.`,
        inhale: 5,
        hold: 0,
        exhale: 5,
        cycles: 6,
    },
    {
        id: "static-sommeil-paisible",
        title: "🌙 Sommeil Paisible",
        type: "sommeil",
        duration: 180,
        instructions: `
1. Inspire pendant 4 secondes.
2. Garde ta respiration pendant 7 secondes.
3. Expire doucement pendant 8 secondes.
4. Répète pendant 4 cycles.`,
        inhale: 4,
        hold: 7,
        exhale: 8,
        cycles: 4,
    },
];

export default function IndexExercisePage() {
    const [apiExercises, setApiExercises] = useState<Exercise[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const allExercises = [...staticExercises, ...apiExercises];
    const totalPages = Math.ceil(allExercises.length / itemsPerPage);
    const paginatedExercises = allExercises.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        fetchExercises()
            .then((data) => setApiExercises(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const handleItemsPerPageChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = parseInt(e.target.value);
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <main className="py-10 px-4 bg-[#F6F9FC] min-h-screen">
            <h1 className="text-3xl font-bold text-[#2E2E2E] text-center mb-6">
                Mes <span className="text-[#A8D5BA]">Exercices</span> de Respiration
            </h1>

            <div className="flex justify-center mb-8">
                <Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    {[3, 6, 9, 12].map((count) => (
                        <option key={count} value={count}>
                            {count} exercices par page
                        </option>
                    ))}
                </Select>
            </div>

            {error ? (
                <p className="text-center text-[#FADADD] font-semibold">
                    Erreur lors du chargement des exercices : {error}
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {paginatedExercises.map((exercise) => (
                            <ExerciseCard key={exercise.id} exercise={exercise} />
                        ))}
                    </div>

                    <div className="flex justify-center mt-10 gap-2 items-center flex-wrap">
                        <Button
                            variant="outline"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="w-4 h-4 text-[#A8D5BA] mr-1" />
                            Précédent
                        </Button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === currentPage ? "default" : "outline"}
                                className={page === currentPage ? "btn-primary" : "btn-outline"}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Button>
                        ))}

                        <Button
                            variant="outline"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Suivant
                            <ChevronRight className="w-4 h-4 text-[#A8D5BA] ml-1" />
                        </Button>
                    </div>
                </>
            )}
        </main>
    );
}
