"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Play } from "lucide-react";
import type { Exercise } from "@/features/content/types/Exercise";
import BreathingPlayer from "@/components/ui/BreathingPlayer";

type Props = {
    exercise: Exercise;
};

export default function ExerciseCard({ exercise }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [started, setStarted] = useState(false);

    return (
        <>
            <div
                className="card bg-white rounded-2xl shadow-md p-5 hover:shadow-lg cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <h2 className="text-xl font-bold text-[#2E2E2E] mb-1">
                    {exercise.title}
                </h2>
                <p className="text-sm italic text-[#6B7280] mb-2">
                    {exercise.objective}
                </p>
                <p className="text-sm text-[#A3D2CA] mb-1">
                    Durée : {Math.round(exercise.duration / 60)} min
                </p>
            </div>

            <Dialog
                open={isOpen}
                onClose={() => {
                    setIsOpen(false);
                    setStarted(false);
                }}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="bg-white w-full max-w-4xl min-h-[700px] rounded-2xl p-10 shadow-xl flex flex-col items-center justify-center">
                        <Dialog.Title className="text-2xl font-bold mb-2">
                            {exercise.title}
                        </Dialog.Title>
                        <p className="text-base text-[#2E2E2E] mb-4 text-center max-w-xl">
                            {exercise.objective}
                        </p>
                        <p className="mb-4 text-center max-w-xl whitespace-pre-line">
                            {exercise.instructions}
                        </p>

                        {!started ? (
                            <button
                                onClick={() => setStarted(true)}
                                className="btn-primary flex items-center justify-center gap-2 mx-auto"
                            >
                                <Play className="w-5 h-5" />
                                Démarrer
                            </button>
                        ) : (
                            <div className="mt-6">
                                <BreathingPlayer
                                    inhale={exercise.inhale}
                                    hold={exercise.hold}
                                    exhale={exercise.exhale}
                                    rest={exercise.rest || 0}
                                    cycles={exercise.cycles || 4}
                                    inhaleMethod={exercise.inhaleMethod}
                                    exhaleMethod={exercise.exhaleMethod}
                                />
                            </div>
                        )}

                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setStarted(false);
                            }}
                            className="btn-outline mt-10"
                        >
                            Fermer
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
}
