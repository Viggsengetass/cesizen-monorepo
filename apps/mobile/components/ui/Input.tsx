import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, borderRadius, spacing, fonts } from '../../styles/theme';

export default function Input(props: TextInputProps) {
    return <TextInput style={styles.input} placeholderTextColor={colors.sky} {...props} />;
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: colors.sky,
        borderRadius: borderRadius.lg,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        fontFamily: fonts.regular,
        fontSize: 16,
        color: colors.graphite,
    },
});
