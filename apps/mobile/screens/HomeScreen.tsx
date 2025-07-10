import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, fonts } from '../styles/theme';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function HomeScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Bienvenue sur CESIZen 🌿</Text>
            <Text style={styles.subtitle}>
                Prends un moment pour respirer, te recentrer et explorer ton bien-être.
            </Text>

            <Image
                source={{
                    uri: 'https://cdn.pixabay.com/photo/2018/03/27/13/50/yoga-3266728_1280.jpg',
                }}
                style={styles.illustration}
                resizeMode="contain"
            />

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.cardButton}>
                    <Ionicons name="md-body" size={24} color="#fff" style={styles.icon} />
                    <Text style={styles.cardText}>Exercices de respiration</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardButton}>
                    <MaterialCommunityIcons name="emoticon-outline" size={24} color="#fff" style={styles.icon} />
                    <Text style={styles.cardText}>Suivi des émotions</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardButton}>
                    <FontAwesome5 name="book-open" size={20} color="#fff" style={styles.icon} />
                    <Text style={styles.cardText}>Fiches informatives</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.cloud,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontFamily: fonts.title,
        color: colors.graphite,
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontFamily: fonts.body,
        color: colors.graphite,
        marginBottom: 20,
        textAlign: 'center',
    },
    illustration: {
        width: '90%',
        height: 200,
        borderRadius: 16,
        marginBottom: 30,
    },
    buttonsContainer: {
        width: '100%',
        gap: 16,
    },
    cardButton: {
        backgroundColor: colors.sage,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },
    cardText: {
        fontSize: 16,
        color: '#fff',
        fontFamily: fonts.body,
    },
    icon: {
        marginRight: 10,
    },
});
