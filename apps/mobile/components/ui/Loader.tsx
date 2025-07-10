import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors, spacing } from '../../styles/theme';

export default function Loader() {
    const animationProgress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(animationProgress, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ).start();
    }, [animationProgress]);

    return (
        <View style={styles.container}>
            <LottieView
                progress={animationProgress}
                source={require('../../assets/lottie/hamster-run.json')}
                style={styles.lottie}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.lg,
    },
    lottie: {
        width: 160,
        height: 160,
    },
});
