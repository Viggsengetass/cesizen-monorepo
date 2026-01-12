import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
    id: number;
    email: string;
    roles: string[];
};

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        AsyncStorage.getItem('user').then((json) => {
            if (json) setUser(JSON.parse(json));
        });
    }, []);

    return { user };
}
