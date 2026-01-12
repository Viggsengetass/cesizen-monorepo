import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/theme';

interface Tab {
    label: string;
    value: string;
}

interface TabsProps {
    tabs: Tab[];
    active: string;
    onChange: (value: string) => void;
}

export default function Tabs({ tabs, active, onChange }: TabsProps) {
    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.value}
                    style={[styles.tab, active === tab.value && styles.activeTab]}
                    onPress={() => onChange(tab.value)}
                >
                    <Text style={[styles.label, active === tab.value && styles.activeLabel]}>
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 16,
        backgroundColor: '#F6F9FC',
        padding: 4,
        marginVertical: 10,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#A8D5BA',
    },
    label: {
        color: '#2E2E2E',
        fontWeight: '500',
    },
    activeLabel: {
        color: '#fff',
    },
});
