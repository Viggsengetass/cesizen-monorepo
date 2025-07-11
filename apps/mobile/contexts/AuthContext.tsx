import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
    user: string | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await AsyncStorage.getItem('auth_token');
                if (token) {
                    setUser(token);
                }
            } catch (e) {
                console.error('[AuthContext] Erreur chargement token :', e);
            }
        };
        loadToken();
    }, []);

    const login = async (token: string) => {
        try {
            await AsyncStorage.setItem('auth_token', token);
            setUser(token);
        } catch (e) {
            console.error('[AuthContext] Erreur login :', e);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('auth_token');
            setUser(null);
        } catch (e) {
            console.error('[AuthContext] Erreur logout :', e);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
