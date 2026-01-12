import React from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    Animated,
    StyleSheet,
    ViewStyle,
    TextStyle,
    GestureResponderEvent,
} from 'react-native';
import { colors, spacing, fontSizes, fonts, borderRadius } from '../../styles/theme';

type Props = {
    label: string;
    onPress: (event: GestureResponderEvent) => void;
    variant?: 'primary' | 'outline' | 'ghost';
    style?: ViewStyle;
    textStyle?: TextStyle;
};

export default function Button({
                                   label,
                                   onPress,
                                   variant = 'primary',
                                   style,
                                   textStyle,
                               }: Props) {
    const scale = new Animated.Value(1);

    const animateIn = () => {
        Animated.spring(scale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const animateOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const getStyles = (): { button: ViewStyle; text: TextStyle } => {
        switch (variant) {
            case 'primary':
                return {
                    button: {
                        backgroundColor: colors.sage,
                    },
                    text: {
                        color: colors.white,
                    },
                };
            case 'outline':
                return {
                    button: {
                        borderWidth: 2,
                        borderColor: colors.sage,
                        backgroundColor: 'transparent',
                    },
                    text: {
                        color: colors.graphite,
                    },
                };
            case 'ghost':
                return {
                    button: {
                        backgroundColor: 'transparent',
                    },
                    text: {
                        color: colors.sage,
                    },
                };
            default:
                return {
                    button: {},
                    text: {},
                };
        }
    };

    const stylesVariant = getStyles();

    return (
        <TouchableWithoutFeedback
            onPressIn={animateIn}
            onPressOut={animateOut}
            onPress={onPress}
        >
            <Animated.View
                style={[
                    styles.button,
                    stylesVariant.button,
                    style,
                    { transform: [{ scale }] },
                ]}
            >
                <Text style={[styles.label, stylesVariant.text, textStyle]}>{label}</Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.xl,
        borderRadius: borderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: fontSizes.body,
        fontFamily: fonts.regular,
    },
});
