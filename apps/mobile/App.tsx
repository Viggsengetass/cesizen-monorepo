// apps/mobile/App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts as useInterFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { useFonts as useDmSansFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';

import TabNavigator from './navigation/TabNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [interLoaded] = useInterFonts({ Inter_400Regular });
    const [dmLoaded] = useDmSansFonts({ DMSans_400Regular });
    const fontsLoaded = interLoaded && dmLoaded;

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
}
