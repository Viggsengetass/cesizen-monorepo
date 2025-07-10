import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import RespirationNavigator from './RespirationNavigator'; // 💡 navigation stack pour Respiration
import { View, Text } from 'react-native';
import { colors } from '../styles/theme';

const Tab = createBottomTabNavigator();

const Placeholder = ({ label }: { label: string }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>{label}</Text>
    </View>
);

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.sage,
                tabBarInactiveTintColor: colors.graphite,
                tabBarStyle: {
                    backgroundColor: colors.white,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 70,
                    position: 'absolute',
                    borderTopWidth: 0.5,
                    borderTopColor: '#eee',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 8,
                    elevation: 8,
                },
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName = '';

                    switch (route.name) {
                        case 'Accueil':
                            iconName = 'home-outline';
                            break;
                        case 'Respiration':
                            iconName = 'weather-windy';
                            break;
                        case 'Émotions':
                            iconName = 'emoticon-happy-outline';
                            break;
                        case 'Fiches':
                            iconName = 'book-open-page-variant';
                            break;
                    }

                    return (
                        <MaterialCommunityIcons
                            name={iconName}
                            color={color}
                            size={focused ? size + 4 : size}
                        />
                    );
                },
            })}
        >
            <Tab.Screen name="Accueil" component={HomeScreen} />
            <Tab.Screen name="Respiration" component={RespirationNavigator} />
            <Tab.Screen name="Émotions" children={() => <Placeholder label="Suivi des émotions" />} />
            <Tab.Screen name="Fiches" children={() => <Placeholder label="Fiches informatives" />} />
        </Tab.Navigator>
    );
}
