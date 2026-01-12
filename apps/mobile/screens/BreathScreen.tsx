// apps/mobile/screens/BreathScreen.tsx

import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { colors, fontSizes, spacing, borderRadius, fonts, animations } from '../styles/theme';

export default function BreathScreen() {
    const scale = useRef(new Animated.Value(1)).current;
    const [isBreathing, setIsBreathing] = useState(false);
    const [countdown, setCountdown] = useState(60); // durée en secondes

    const startBreathing = () => {
        setIsBreathing(true);
        animations.scaleUpDown(scale, 3000).start();

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    stopBreathing();
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const stopBreathing = () => {
        setIsBreathing(false);
        scale.stopAnimation();
        scale.setValue(1);
        setCountdown(60);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Respiration guidée</Text>

            <Animated.View style={[styles.circle, { transform: [{ scale }] }]} />

            <Text style={styles.timer}>
                {isBreathing ? `${countdown} sec` : 'Prêt à commencer'}
            </Text>

            <TouchableOpacity
                style={[styles.button, isBreathing && styles.stopButton]}
                onPress={isBreathing ? stopBreathing : startBreathing}
            >
                <Text style={styles.buttonText}>
                    {isBreathing ? 'Stop' : 'Démarrer'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cloud,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg,
    },
    title: {
        fontSize: fontSizes.h1,
        fontFamily: fonts.regular,
        color: colors.graphite,
        marginBottom: spacing.xl,
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: colors.lavender,
        marginVertical: spacing.lg,
    },
    timer: {
        fontSize: fontSizes.h2,
        fontFamily: fonts.soft,
        color: colors.graphite,
        marginTop: spacing.lg,
    },
    button: {
        marginTop: spacing.xl,
        backgroundColor: colors.sage,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: borderRadius.xl,
    },
    stopButton: {
        backgroundColor: colors.pink,
    },
    buttonText: {
        color: 'white',
        fontSize: fontSizes.body,
        fontFamily: fonts.regular,
    },
});
