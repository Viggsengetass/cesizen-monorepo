import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import jwtDecode from 'jwt-decode';
import { colors } from '../styles/theme';

type JwtPayload = {
    email?: string;
    username?: string;
};

export default function DashboardScreen() {
    const { token, logout } = useAuth();

    let email = 'utilisateur inconnu';
    if (token) {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            email = decoded.email || decoded.username || email;
        } catch (e) {
            console.warn('Erreur décodage JWT:', e);
        }
    }

    const handleLogoutConfirm = () => {
        Alert.alert(
            'Déconnexion',
            'Es-tu sûr de vouloir te déconnecter ?',
            [
                {
                    text: 'Annuler',
                    style: 'cancel',
                },
                {
                    text: 'Se déconnecter',
                    style: 'destructive',
                    onPress: logout,
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://source.unsplash.com/800x400/?meditation,relax' }}
                style={styles.avatar}
            />
            <Text style={styles.welcome}>Bonjour 👋</Text>
            <Text style={styles.email}>{email}</Text>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Informations</Text>
                <Text style={styles.item}>📅 Dernière connexion : aujourd’hui</Text>
                <Text style={styles.item}>🎯 Objectif du jour : Respirer 5 min</Text>
            </View>

            <TouchableOpacity onPress={handleLogoutConfirm} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Se déconnecter</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F9FC',
        padding: 24,
        alignItems: 'center',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 12,
    },
    welcome: {
        fontSize: 24,
        color: colors.graphite,
        fontWeight: '600',
    },
    email: {
        fontSize: 16,
        color: '#555',
        marginBottom: 24,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: colors.graphite,
    },
    item: {
        fontSize: 16,
        color: '#444',
        marginBottom: 8,
    },
    logoutButton: {
        backgroundColor: '#FADADD',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 20,
    },
    logoutText: {
        color: colors.graphite,
        fontSize: 16,
        fontWeight: '500',
    },
});
