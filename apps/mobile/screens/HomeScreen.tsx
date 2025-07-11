import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import { MotiView } from 'moti';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts } from '../styles/theme';
import UserHeaderButton from '../components/UserHeaderButton';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={{ uri: 'https://www.transparenttextures.com/patterns/white-wall-3.png' }}
                style={StyleSheet.absoluteFill}
                resizeMode="repeat"
            />

            <View style={styles.header}>
                <UserHeaderButton />
            </View>

            <Image
                source={require('../assets/logo_cesizen.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <MotiView
                from={{ opacity: 0, translateY: -20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 100, type: 'timing', duration: 600 }}
            >
                <Image
                    source={require('../assets/illustration.jpg')}
                    style={styles.illustration}
                />
            </MotiView>

            <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 300, type: 'timing', duration: 600 }}
            >
                <Text style={styles.title}>Bienvenue sur CESIZen 🌱</Text>
                <Text style={styles.subtitle}>
                    Trouve ton équilibre, explore ta respiration, tes émotions et ton bien-être.
                </Text>
            </MotiView>

            {/* Ajout d’un résumé du jour */}
            <View style={styles.todayCard}>
                <Text style={styles.todayTitle}>Aujourd’hui</Text>
                <View style={styles.todayInfo}>
                    <Ionicons name="sunny-outline" size={20} color={colors.sage} />
                    <Text style={styles.todayText}> Temps : ensoleillé, 22°C</Text>
                </View>
                <View style={styles.todayInfo}>
                    <Feather name="smile" size={20} color={colors.sage} />
                    <Text style={styles.todayText}> Humeur : Positif 🌞</Text>
                </View>
            </View>

            <View style={styles.modules}>
                <AnimatedButton
                    icon={<Feather name="wind" size={20} color="#fff" />}
                    label="Exercices de respiration"
                    onPress={() => navigation.navigate('Breathing')}
                />
                <AnimatedButton
                    icon={<Ionicons name="happy-outline" size={20} color="#fff" />}
                    label="Suivi des émotions"
                    onPress={() => navigation.navigate('Emotions')}
                />
                <AnimatedButton
                    icon={<FontAwesome5 name="book-reader" size={18} color="#fff" />}
                    label="Fiches informatives"
                    onPress={() => navigation.navigate('InfoSheets')}
                />
                <AnimatedButton
                    icon={<FontAwesome5 name="heartbeat" size={18} color="#fff" />}
                    label="Faire un diagnostic"
                    onPress={() => navigation.navigate('Diagnostic')}
                />
            </View>

            <MotiView
                from={{ scale: 1 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ loop: true, type: 'timing', duration: 4000 }}
                style={styles.breathBubble}
            />

            <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1000 }}
                style={styles.inspiration}
            >
                <Text style={styles.inspirationText}>
                    🌸 “Le calme est le nouveau super-pouvoir.” 🌸
                </Text>
            </MotiView>
        </ScrollView>
    );
}

function AnimatedButton({
                            icon,
                            label,
                            onPress,
                        }: {
    icon: JSX.Element;
    label: string;
    onPress: () => void;
}) {
    return (
        <MotiView
            from={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'timing', duration: 400 }}
            style={styles.buttonWrapper}
        >
            <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={onPress}>
                {icon}
                <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
        </MotiView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.cloud,
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    header: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 10,
    },
    logo: {
        width: 90,
        height: 90,
        marginBottom: 12,
    },
    illustration: {
        width: screenWidth * 0.85,
        height: 200,
        borderRadius: 20,
        marginBottom: 24,
        alignSelf: 'center',
    },
    title: {
        fontSize: 32,
        fontFamily: fonts.title,
        color: colors.graphite,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: fonts.body,
        color: colors.graphite,
        textAlign: 'center',
        marginBottom: 28,
    },
    todayCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        width: '100%',
        marginBottom: 28,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    todayTitle: {
        fontSize: 18,
        fontFamily: fonts.title,
        color: colors.graphite,
        marginBottom: 8,
    },
    todayInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    todayText: {
        fontFamily: fonts.body,
        fontSize: 15,
        color: colors.graphite,
    },
    modules: {
        width: '100%',
        gap: 16,
        marginBottom: 30,
    },
    buttonWrapper: {
        width: '100%',
    },
    button: {
        backgroundColor: colors.sage,
        borderRadius: 20,
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: fonts.body,
    },
    breathBubble: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.lavender,
        marginVertical: 20,
    },
    inspiration: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    inspirationText: {
        textAlign: 'center',
        fontFamily: fonts.body,
        fontSize: 14,
        color: colors.graphite,
        fontStyle: 'italic',
    },
});
