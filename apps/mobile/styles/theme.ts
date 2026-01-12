// apps/mobile/styles/theme.ts

import { Animated, Easing } from 'react-native';

export const colors = {
    sage: '#A8D5BA', // vert sauge
    sky: '#A3D2CA', // bleu ciel
    lavender: '#D5CFE1', // lavande douce
    cloud: '#F6F9FC', // gris nuage
    graphite: '#2E2E2E', // texte foncé
    white: '#FFFFFF', // fond global
    pink: '#FADADD', // rose pale
};

export const fonts = {
    regular: 'Inter_400Regular',
    soft: 'DMSans_400Regular',
};

export const fontSizes = {
    h1: 32,
    h2: 24,
    body: 16,
    caption: 14,
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};

export const borderRadius = {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 64,
};

export const shadows = {
    soft: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
};

// Animations douces (Framer Motion-like via React Native)
export const animations = {
    fadeIn: (value: Animated.Value, duration = 300) => {
        return Animated.timing(value, {
            toValue: 1,
            duration,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        });
    },
    scaleIn: (value: Animated.Value, duration = 500) => {
        return Animated.spring(value, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
        });
    },
    scaleUpDown: (value: Animated.Value, duration = 1000) => {
        return Animated.loop(
            Animated.sequence([
                Animated.timing(value, {
                    toValue: 1.5,
                    duration,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(value, {
                    toValue: 1,
                    duration,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );
    },
};
