import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Loader from '../components/ui/Loader';
import { colors } from '../styles/theme';

export default function LoadingScreen() {
    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.center}>
                <Loader />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.cloud },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
