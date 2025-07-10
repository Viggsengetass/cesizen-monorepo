import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/theme';

interface TooltipProps {
    text: string;
    visible: boolean;
    position?: 'top' | 'bottom';
}

export default function Tooltip({ text, visible, position = 'top' }: TooltipProps) {
    if (!visible) return null;

    return (
        <View style={[styles.container, position === 'bottom' && styles.bottom]}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#000a',
        padding: 10,
        borderRadius: 8,
        top: -40,
        left: '50%',
        transform: [{ translateX: -50 }],
        zIndex: 99,
    },
    bottom: {
        top: undefined,
        bottom: -40,
    },
    text: {
        color: 'white',
        fontSize: 13,
    },
});
