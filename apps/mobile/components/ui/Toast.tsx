import React, { useEffect } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import { colors } from '../../styles/theme';

interface ToastProps {
    message: string;
    type?: 'success' | 'error';
    duration?: number;
    onClose: () => void;
}

export default function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
    const translateY = new Animated.Value(100);

    useEffect(() => {
        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            Animated.timing(translateY, {
                toValue: 100,
                duration: 300,
                useNativeDriver: true,
            }).start(() => onClose());
        }, duration);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Animated.View style={[styles.toast, { transform: [{ translateY }] }, type === 'error' && styles.error]}>
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        backgroundColor: colors.sage,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        zIndex: 999,
        elevation: 10,
    },
    error: {
        backgroundColor: '#FADADD',
    },
    text: {
        color: colors.graphite,
        fontWeight: '500',
        fontSize: 15,
    },
});
