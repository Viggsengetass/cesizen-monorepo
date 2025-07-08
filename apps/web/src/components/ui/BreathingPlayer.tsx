"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

interface Props {
    inhale: number;
    hold: number;
    exhale: number;
    rest?: number;
    cycles: number;
    inhaleMethod?: "nez" | "bouche";
    exhaleMethod?: "nez" | "bouche";
}

type Phase = "inhale" | "hold" | "exhale" | "rest";

export default function BreathingPlayer({
                                            inhale,
                                            hold,
                                            exhale,
                                            rest = 0,
                                            cycles,
                                            inhaleMethod = "nez",
                                            exhaleMethod = "bouche",
                                        }: Props) {
    const [cycle, setCycle] = useState(0);
    const [phase, setPhase] = useState<Phase>("inhale");
    const [isRunning, setIsRunning] = useState(true);
    const [remainingTime, setRemainingTime] = useState(inhale);
    const [elapsed, setElapsed] = useState(0);

    const controls = useAnimation();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const getDuration = (p: Phase): number => {
        if (p === "inhale") return inhale;
        if (p === "hold") return hold;
        if (p === "exhale") return exhale;
        if (p === "rest") return rest;
        return 0;
    };

    const totalDuration = (inhale + hold + exhale + rest) * cycles;
    const progress = Math.min((elapsed / totalDuration) * 100, 100);

    const nextPhase = (current: Phase): Phase => {
        if (current === "inhale") return hold > 0 ? "hold" : "exhale";
        if (current === "hold") return "exhale";
        if (current === "exhale") return rest > 0 ? "rest" : "inhale";
        return "inhale";
    };

    const animatePhase = (p: Phase, duration: number) => {
        if (p === "inhale")
            controls.start({ scale: [0.8, 1.3], backgroundColor: "#A8D5BA", transition: { duration } });
        if (p === "hold")
            controls.start({ scale: 1.3, backgroundColor: "#A8D5BA", transition: { duration: 0.2 } });
        if (p === "exhale")
            controls.start({ scale: [1.3, 0.8], backgroundColor: "#D5CFE1", transition: { duration } });
        if (p === "rest")
            controls.start({ scale: 0.8, backgroundColor: "#F6F9FC", transition: { duration } });
    };

    const startPhase = (p: Phase) => {
        const duration = getDuration(p);
        setRemainingTime(duration);
        animatePhase(p, duration);

        intervalRef.current = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    return 0;
                }
                return prev - 1;
            });

            setElapsed((prev) => Math.min(prev + 1, totalDuration));
        }, 1000);

        timeoutRef.current = setTimeout(() => {
            const next = nextPhase(p);
            if (next === "inhale" && (p === "rest" || (p === "exhale" && rest === 0))) {
                setCycle((c) => c + 1);
            }
            setPhase(next);
        }, duration * 1000);
    };

    useEffect(() => {
        if (!isRunning || cycle >= cycles) return;

        startPhase(phase);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [phase, isRunning]);

    useEffect(() => {
        setCycle(0);
        setPhase("inhale");
        setRemainingTime(inhale);
        setElapsed(0);
    }, [inhale, hold, exhale, rest, cycles]);

    const getInstruction = () => {
        if (phase === "inhale") return `Inspire par le ${inhaleMethod}`;
        if (phase === "exhale") return `Expire par la ${exhaleMethod}`;
        if (phase === "hold") return "Retiens ta respiration";
        if (phase === "rest") return "Repos";
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6 w-full">
            {/* Barre de progression */}
            <div className="fixed bottom-0 left-0 w-full px-6 pb-6">
                <div className="w-full max-w-4xl mx-auto h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#A8D5BA] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>


            {/* Cercle animé */}
            <motion.div
                animate={controls}
                initial={{ scale: 0.8, backgroundColor: "#A3D2CA" }}
                className="w-60 h-60 rounded-full shadow-lg flex items-center justify-center text-2xl font-bold text-[#2E2E2E]"
            >
                {remainingTime}s
            </motion.div>

            {/* Infos cycle & instructions */}
            <div className="flex flex-col items-center justify-center mt-4 text-center gap-2">
                <div className="text-sm text-[#2E2E2E]">
                    Cycle {cycle + 1} / {cycles}
                </div>
                <div className="text-lg font-semibold capitalize text-[#2E2E2E]">
                    {getInstruction()}
                </div>

                {/* Bouton Pause / Reprendre */}
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="btn-primary mt-4 flex items-center gap-2"
                >
                    {isRunning ? (
                        <>
                            <Pause className="w-4 h-4" /> Pause
                        </>
                    ) : (
                        <>
                            <Play className="w-4 h-4" /> Reprendre
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
