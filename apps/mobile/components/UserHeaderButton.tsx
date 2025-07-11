import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../styles/theme';

export default function UserHeaderButton() {
    const navigation = useNavigation();
    const { user } = useAuth();

    const handlePress = () => {
        if (!user) {
            navigation.navigate('Login');
        } else {
            const isAdmin = user.roles.includes('ROLE_ADMIN');
            navigation.navigate(isAdmin ? 'AdminDashboard' : 'UserDashboard');
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
            {user ? (
                <Image
                    source={{ uri: 'https://i.pravatar.cc/40?u=' + user.email }}
                    style={styles.avatar}
                />
            ) : (
                <Text style={styles.loginText}>Connexion</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: colors.sage,
    },
    loginText: {
        color: colors.graphite,
        fontSize: 14,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
});
