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
                    console.log('[AuthContext] Token chargé depuis AsyncStorage :', token);
                    setUser(token);
                } else {
                    console.log('[AuthContext] Aucun token trouvé dans AsyncStorage');
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
            console.log('[AuthContext] Login réussi, token sauvegardé :', token);
        } catch (e) {
            console.error('[AuthContext] Erreur login :', e);
        }
    };

    const logout = async () => {
        console.log('[AuthContext] Début du logout');
        try {
            const tokenBefore = await AsyncStorage.getItem('auth_token');
            console.log('[AuthContext] Token actuel avant suppression :', tokenBefore);

            await AsyncStorage.removeItem('auth_token');
            console.log('[AuthContext] Token supprimé de AsyncStorage');

            setUser(null);
            console.log('[AuthContext] State user réinitialisé à null');

            const tokenAfter = await AsyncStorage.getItem('auth_token');
            console.log('[AuthContext] Token après suppression (doit être null) :', tokenAfter);
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
