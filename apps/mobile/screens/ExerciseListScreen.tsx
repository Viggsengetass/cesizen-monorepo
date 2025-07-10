import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RespirationStackParamList } from '../navigation/RespirationNavigator';
import { STATIC_EXERCISES } from '../data/staticExercises';
import { colors, fontSizes, spacing, borderRadius, fonts } from '../styles/theme';

type NavigationProp = NativeStackNavigationProp<RespirationStackParamList, 'ExerciseList'>;

export default function ExerciseListScreen() {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🌬️ Exercices de respiration</Text>
            <FlatList
                data={STATIC_EXERCISES}
                keyExtractor={({ slug }) => slug}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('ExercisePlayer', { exercise: item })}
                    >
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardDesc}>{item.description}</Text>
                    </TouchableOpacity>
                )}
            />
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
        marginBottom: spacing.md,
    },
    card: {
        backgroundColor: colors.white,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.md,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: fontSizes.h2,
        fontFamily: fonts.regular,
        color: colors.sage,
    },
    cardDesc: {
        fontSize: fontSizes.body,
        fontFamily: fonts.soft,
        color: colors.graphite,
    },
});
