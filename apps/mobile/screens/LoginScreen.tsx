import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { API_URL } from '../env';

export default function LoginScreen() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        const payload = { email, password };

        console.log('[Login] Tentative de connexion...');
        console.log('[Login] API_URL utilisé :', `${API_URL}/login_check`);
        console.log('[Login] Payload envoyé :', payload);

        try {
            const response = await fetch(`${API_URL}/login_check`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            console.log('[Login] Status HTTP reçu :', response.status);
            console.log('[Login] Réponse JSON :', data);

            if (!response.ok) {
                throw new Error(data.message || 'Identifiants incorrects ou erreur serveur.');
            }

            await login(data.token); // ➜ déclenche le switch automatique dans AppNavigation
        } catch (err: any) {
            console.error('[Login] Erreur attrapée :', err);
            setError(err.message || 'Erreur inconnue.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo_cesizen.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Bienvenue sur CESIZen</Text>
            <Text style={styles.subtitle}>Connecte-toi pour accéder à l'application</Text>

            <TextInput
                label="Email"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
            />

            <TextInput
                label="Mot de passe"
                mode="outlined"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            {error && <HelperText type="error" visible>{error}</HelperText>}

            <Button
                mode="contained"
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                style={styles.button}
                contentStyle={{ paddingVertical: 8 }}
            >
                Se connecter
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F9FC',
    },
    logo: {
        width: 160,
        height: 60,
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E2E2E',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
        width: '100%',
        backgroundColor: '#A8D5BA',
    },
});
