import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../styles/theme';

export default function ScreenWrapper({
                                          children,
                                          scrollable = false,
                                          centered = false,
                                      }: {
    children: React.ReactNode;
    scrollable?: boolean;
    centered?: boolean;
}) {
    const Container = scrollable ? ScrollView : View;

    return (
        <SafeAreaView style={styles.safe}>
            <Container contentContainerStyle={[styles.container, centered && styles.centered]}>
                {children}
            </Container>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: colors.cloud,
    },
    container: {
        padding: spacing.md,
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
