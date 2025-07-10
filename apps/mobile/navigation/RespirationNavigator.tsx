import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExerciseListScreen from '../screens/ExerciseListScreen';
import ExercisePlayerScreen from '../screens/ExercisePlayerScreen';

export type RespirationStackParamList = {
    ExerciseList: undefined;
    ExercisePlayer: { exercise: any };
};

const Stack = createNativeStackNavigator<RespirationStackParamList>();

export default function RespirationNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ExerciseList" component={ExerciseListScreen} options={{ title: 'Exercices' }} />
            <Stack.Screen name="ExercisePlayer" component={ExercisePlayerScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
