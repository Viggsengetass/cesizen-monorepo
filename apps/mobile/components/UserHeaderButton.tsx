import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function UserHeaderButton() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const handlePress = () => {
        navigation.navigate('Dashboard');
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Image
                source={{
                    uri: 'https://i.pravatar.cc/150?img=47', // avatar URL personnalisable
                }}
                style={styles.avatar}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginRight: 16,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
});
