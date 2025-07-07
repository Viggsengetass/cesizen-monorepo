"use client";

import { Exercise } from "@/features/content/types/Exercise";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

type Props = {
    exercise: Exercise;
};

export default function ExerciseCard({ exercise }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className="card bg-white rounded-2xl shadow-md p-5 hover:shadow-lg cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                {exercise.imageUrl && (
                    <img
                        src={exercise.imageUrl}
                        alt={exercise.name}
                        className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                )}
                <h2 className="text-xl font-bold text-[#2E2E2E] mb-2">{exercise.name}</h2>
                <p className="text-sm text-[#A3D2CA] mb-1">
                    Durée : {Math.round(exercise.duration / 60)} min
                </p>
                <p className="text-gray-600 text-base">{exercise.description}</p>
            </div>

            {/* Modale d'affichage détaillé (optionnel) */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="card max-w-lg w-full bg-white">
                        <Dialog.Title className="text-2xl font-bold mb-4">
                            {exercise.name}
                        </Dialog.Title>
                        <p className="mb-2">{exercise.description}</p>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="btn-primary mt-4"
                        >
                            Fermer
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}
