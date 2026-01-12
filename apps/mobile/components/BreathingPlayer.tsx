import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Vibration,
    Dimensions,
    Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();
    const scale = useRef(new Animated.Value(1)).current;
    const totalDuration = (inhale + hold + exhale) * cycles;
    const phaseDurations = { inhale, hold, exhale };

    const animatePhase = (phase: 'inhale' | 'hold' | 'exhale') => {
        let toValue = 1;
        let duration = phaseDurations[phase] * 1000;

        if (phase === 'inhale') toValue = 1.5;
        if (phase === 'hold') toValue = 1.5;
        if (phase === 'exhale') toValue = 1;

        Animated.timing(scale, {
            toValue,
            duration: phase === 'hold' ? 0 : duration,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        if (!playing || paused || currentCycle > cycles) return;

        Vibration.vibrate(100);
        animatePhase(phase);
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
                setModalVisible(true);
            }
        }
    };

    const restart = () => {
        setCurrentCycle(1);
        setPhase('inhale');
        setPaused(false);
        setPlaying(true);
        setProgress(0);
        setModalVisible(false);
    };

    const progressRatio = progress / totalDuration;
    const progressWidth = (width - 40) * progressRatio;

    const getCircleColor = () => {
        if (phase === 'inhale') return colors.sage;
        if (phase === 'hold') return colors.sky;
        return colors.lavender;
    };

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.circle,
                    { backgroundColor: getCircleColor(), transform: [{ scale }] },
                ]}
            >
                <Text style={styles.timer}>{timeLeft}s</Text>
            </Animated.View>

            <View style={styles.content}>
                <Text style={styles.phaseText}>
                    {phase === 'inhale' && '🫁 Inspirez'}
                    {phase === 'hold' && '🤐 Retenez'}
                    {phase === 'exhale' && '🌬️ Expirez'}
                </Text>

                <Text style={styles.cycle}>Cycle {currentCycle} / {cycles}</Text>

                <TouchableOpacity
                    onPress={() => setPaused((p) => !p)}
                    style={styles.roundButton}
                >
                    {paused ? (
                        <View>
                            {/* ▶️ Play icon */}
                            <View style={{ width: 24, height: 24 }}>
                                <View
                                    style={{
                                        width: 0,
                                        height: 0,
                                        borderTopWidth: 12,
                                        borderBottomWidth: 12,
                                        borderLeftWidth: 20,
                                        borderStyle: 'solid',
                                        borderTopColor: 'transparent',
                                        borderBottomColor: 'transparent',
                                        borderLeftColor: colors.white,
                                    }}
                                />
                            </View>
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row' }}>
                            {/* ⏸️ Pause icon */}
                            <View
                                style={{
                                    width: 6,
                                    height: 24,
                                    backgroundColor: colors.white,
                                    marginRight: 4,
                                }}
                            />
                            <View
                                style={{
                                    width: 6,
                                    height: 24,
                                    backgroundColor: colors.white,
                                }}
                            />
                        </View>
                    )}
                </TouchableOpacity>


                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: progressWidth }]} />
                </View>
            </View>

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalWrapper}>
                    <View style={styles.modal}>
                        <Text style={styles.done}>🧘‍♀️ Exercice terminé !</Text>
                        <TouchableOpacity style={styles.modalBtn} onPress={restart}>
                            <Text style={styles.modalText}>🔁 Recommencer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalBtnOutline}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.modalTextOutline}>⬅️ Quitter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: spacing.xl,
        paddingHorizontal: spacing.md,
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    timer: {
        fontSize: fontSizes.h1,
        color: colors.graphite,
        fontFamily: fonts.soft,
    },
    content: {
        alignItems: 'center',
        marginTop: spacing.lg,
        width: '100%',
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
    roundButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.sage,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    progressBar: {
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
    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modal: {
        backgroundColor: colors.white,
        padding: spacing.xl,
        borderRadius: borderRadius.xl,
        alignItems: 'center',
        width: width * 0.8,
    },
    done: {
        fontSize: fontSizes.h2,
        color: colors.sage,
        fontFamily: fonts.soft,
        marginBottom: spacing.md,
    },
    modalBtn: {
        backgroundColor: colors.sage,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.xl,
        marginTop: spacing.md,
        width: '100%',
        alignItems: 'center',
    },
    modalText: {
        fontSize: fontSizes.body,
        color: colors.white,
        fontFamily: fonts.regular,
    },
    modalBtnOutline: {
        borderWidth: 1,
        borderColor: colors.sage,
        borderRadius: borderRadius.xl,
        marginTop: spacing.sm,
        paddingVertical: spacing.sm,
        width: '100%',
        alignItems: 'center',
    },
    modalTextOutline: {
        fontSize: fontSizes.body,
        color: colors.sage,
        fontFamily: fonts.regular,
    },
    roundButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.sage,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },

});
