import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

interface AvatarProps {
    uri?: string;
    label?: string;
    size?: number;
}

export default function Avatar({ uri, label = '?', size = 50 }: AvatarProps) {
    return (
        <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
            {uri ? (
                <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />
            ) : (
                <Text style={styles.label}>{label}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#A8D5BA',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    label: {
        color: '#2E2E2E',
        fontWeight: '600',
        fontSize: 18,
    },
});
