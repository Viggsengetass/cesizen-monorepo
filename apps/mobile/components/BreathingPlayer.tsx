import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Vibration,
    Dimensions,
} from 'react-native';
import { colors, spacing, fontSizes, fonts, borderRadius } from '../styles/theme';

type Props = {
    inhale: number;
    hold: number;
    exhale: number;
    cycles: number;
};

const { width } = Dimensions.get('window');

export default function BreathingPlayer({ inhale, hold, exhale, cycles }: Props) {
    const [currentCycle, setCurrentCycle] = useState(1);
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
    const [paused, setPaused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(inhale);
    const [progress, setProgress] = useState(0);
    const [playing, setPlaying] = useState(true);

    const scale = useRef(new Animated.Value(1)).current;
    const totalDuration = (inhale + hold + exhale) * cycles;

    const phaseDurations = {
        inhale,
        hold,
        exhale,
    };

    const animateScale = (to: number) => {
        Animated.spring(scale, {
            toValue: to,
            useNativeDriver: true,
            friction: 4,
        }).start();
    };

    useEffect(() => {
        if (!playing || paused || currentCycle > cycles) return;

        Vibration.vibrate(100);
        animateScale(phase === 'inhale' ? 1.5 : 1);

        setTimeLeft(phaseDurations[phase]);

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    nextPhase();
                }
                return prev - 1;
            });

            setProgress((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase, paused, currentCycle, playing]);

    const nextPhase = () => {
        if (phase === 'inhale') {
            setPhase(hold > 0 ? 'hold' : 'exhale');
        } else if (phase === 'hold') {
            setPhase('exhale');
        } else if (phase === 'exhale') {
            if (currentCycle < cycles) {
                setCurrentCycle((c) => c + 1);
                setPhase('inhale');
            } else {
                setPlaying(false);
            }
        }
    };

    const totalSeconds = totalDuration;
    const progressRatio = progress / totalSeconds;
    const progressWidth = width * progressRatio;

    if (!playing || currentCycle > cycles) {
        return (
            <View style={styles.center}>
                <Text style={styles.done}>✅ Exercice terminé !</Text>
                <TouchableOpacity
                    onPress={() => {
                        setCurrentCycle(1);
                        setPhase('inhale');
                        setPaused(false);
                        setPlaying(true);
                        setProgress(0);
                    }}
                    style={styles.pauseBtn}
                >
                    <Text style={styles.pauseText}>🔁 Recommencer</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.circle, { transform: [{ scale }] }]}>
                <Text style={styles.timer}>{timeLeft}s</Text>
            </Animated.View>

            <Text style={styles.phaseText}>
                {phase === 'inhale' && '🫁 Inspirez'}
                {phase === 'hold' && '🤐 Retenez'}
                {phase === 'exhale' && '🌬️ Expirez'}
            </Text>

            <Text style={styles.cycle}>Cycle {currentCycle} / {cycles}</Text>

            <TouchableOpacity onPress={() => setPaused((p) => !p)} style={styles.pauseBtn}>
                <Text style={styles.pauseText}>{paused ? '▶️ Reprendre' : '⏸️ Pause'}</Text>
            </TouchableOpacity>

            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: progressWidth }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: spacing.xl,
    },
    circle: {
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: colors.lavender,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    timer: {
        fontSize: fontSizes.h1,
        color: colors.graphite,
        fontFamily: fonts.soft,
    },
    phaseText: {
        fontSize: fontSizes.h2,
        fontFamily: fonts.soft,
        color: colors.graphite,
        marginBottom: spacing.sm,
    },
    cycle: {
        fontSize: fontSizes.body,
        fontFamily: fonts.regular,
        color: colors.sky,
        marginBottom: spacing.md,
    },
    pauseBtn: {
        backgroundColor: colors.sage,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.xl,
        marginTop: spacing.lg,
    },
    pauseText: {
        fontSize: fontSizes.body,
        color: colors.white,
        fontFamily: fonts.regular,
    },
    done: {
        fontSize: fontSizes.h2,
        color: colors.sage,
        fontFamily: fonts.soft,
        marginBottom: spacing.md,
    },
    center: {
        marginTop: spacing.xl,
        alignItems: 'center',
    },
    progressBar: {
        marginTop: spacing.lg,
        height: 10,
        width: width - 40,
        backgroundColor: '#E0E0E0',
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
    },
    progressFill: {
        height: 10,
        backgroundColor: colors.sage,
    },
});
