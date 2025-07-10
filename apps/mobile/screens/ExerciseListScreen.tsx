import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { STATIC_EXERCISES } from '../data/staticExercises';
import ScreenWrapper from '../components/ui/ScreenWrapper';
import {
    colors,
    spacing,
    fontSizes,
    fonts,
    borderRadius,
} from '../styles/theme';

export default function ExerciseListScreen() {
    const navigation = useNavigation();

    return (
        <ScreenWrapper>
            <Text style={styles.title}>🧘 Exercices de respiration</Text>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {STATIC_EXERCISES.map((exercise) => (
                    <TouchableOpacity
                        key={exercise.slug}
                        onPress={() =>
                            navigation.navigate('ExercisePlayer', { exercise })
                        }
                        style={styles.card}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.cardTitle}>{exercise.title}</Text>
                        <Text style={styles.cardDescription}>{exercise.description}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: fontSizes.h1,
        fontFamily: fonts.bold,
        color: colors.graphite,
        marginBottom: spacing.lg,
        paddingHorizontal: spacing.md,
    },
    scrollContent: {
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.xxl,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xxl,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderLeftWidth: 5,
        borderLeftColor: colors.sage,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    cardTitle: {
        fontSize: fontSizes.h2,
        fontFamily: fonts.soft,
        color: colors.sage,
        marginBottom: spacing.xs,
    },
    cardDescription: {
        fontSize: fontSizes.body,
        fontFamily: fonts.regular,
        color: colors.graphite,
    },
});
