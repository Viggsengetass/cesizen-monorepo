// apps/mobile/app/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    const iconName = route.name === 'Accueil' ? 'home' : 'alert-circle';
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#A8D5BA',
                tabBarInactiveTintColor: '#999',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Accueil" component={HomeScreen} />
        </Tab.Navigator>
    );
}
