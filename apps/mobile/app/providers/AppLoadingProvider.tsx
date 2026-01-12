// apps/mobile/app/providers/AppLoadingProvider.tsx
import React, { useEffect, useState } from 'react';
import LoadingScreen from '../../screens/LoadingScreen';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from '../../navigation/TabNavigator';

export default function AppLoadingProvider() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // simulation chargement

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
}
