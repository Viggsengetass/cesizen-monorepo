import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { colors, borderRadius } from '../../styles/theme';

const { width } = Dimensions.get('window');

export default function ProgressBar({ progress }: { progress: number }) {
    return (
        <View style={styles.track}>
            <View style={[styles.fill, { width: progress * width }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    track: {
        height: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
        marginTop: 20,
    },
    fill: {
        height: 10,
        backgroundColor: colors.sage,
    },
});