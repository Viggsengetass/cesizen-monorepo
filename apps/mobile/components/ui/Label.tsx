import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, fontSizes, fonts } from '../../styles/theme';

export default function Label({ text, variant = 'regular' }: { text: string; variant?: 'regular' | 'caption' | 'hint' }) {
    const styleMap = {
        regular: styles.regular,
        caption: styles.caption,
        hint: styles.hint,
    };
    return <Text style={styleMap[variant]}>{text}</Text>;
}

const styles = StyleSheet.create({
    regular: {
        fontSize: fontSizes.body,
        color: colors.graphite,
        fontFamily: fonts.regular,
    },
    caption: {
        fontSize: fontSizes.caption,
        color: colors.sky,
        fontFamily: fonts.soft,
    },
    hint: {
        fontSize: fontSizes.caption,
        color: colors.pink,
        fontFamily: fonts.soft,
    },
});