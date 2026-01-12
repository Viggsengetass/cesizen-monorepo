import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BreathingPlayer from '../components/BreathingPlayer';
import { colors, fontSizes, spacing, fonts } from '../styles/theme';

export default function ExercisePlayerScreen({ route }: any) {
    const { exercise } = route.params;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
                <Text style={styles.closeText}>✖️ Fermer</Text>
            </TouchableOpacity>

            <Text style={styles.title}>🌬️ {exercise.title}</Text>
            <Text style={styles.description}>{exercise.description}</Text>

            <BreathingPlayer {...exercise} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.cloud,
        padding: spacing.lg,
        alignItems: 'center',
    },
    title: {
        fontSize: fontSizes.h1,
        fontFamily: fonts.regular,
        color: colors.graphite,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    description: {
        fontSize: fontSizes.body,
        fontFamily: fonts.soft,
        color: colors.sky,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    closeBtn: {
        alignSelf: 'flex-start',
        marginBottom: spacing.md,
    },
    closeText: {
        fontSize: fontSizes.caption,
        color: colors.graphite,
    },
});
