"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
    email: string;
    roles: string[];
};

type AuthContextType = {
    token: string | null;
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function decodeJwt(token: string): any | null {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Erreur décodage JWT :", e);
        return null;
    }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const payload = decodeJwt(storedToken);
            if (payload) {
                setToken(storedToken);
                setUser({
                    email: payload.username || payload.email,
                    roles: payload.roles || [],
                });
            }
        }
    }, []);

    function login(newToken: string) {
        localStorage.setItem("token", newToken);
        setToken(newToken);

        const payload = decodeJwt(newToken);
        if (payload) {
            setUser({
                email: payload.username || payload.email,
                roles: payload.roles || [],
            });
        }
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    const value: AuthContextType = {
        token,
        isAuthenticated: !!token,
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth doit être utilisé dans un AuthProvider");
    return context;
}
