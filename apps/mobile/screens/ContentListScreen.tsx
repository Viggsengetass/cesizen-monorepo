// apps/mobile/screens/ContentListScreen.tsx

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { colors, fontSizes, fonts, spacing } from '../styles/theme';
import ContentCard from '../components/ContentCard';
import { staticContents } from '../data/staticContents';

type Content = {
    id: number;
    title: string;
    body: string;
    coverImage?: string;
    type?: string;
};

function groupByType(contents: Content[]) {
    const grouped: Record<string, Content[]> = {};
    contents.forEach((item) => {
        const type = item.type ?? 'Autres';
        if (!grouped[type]) grouped[type] = [];
        grouped[type].push(item);
    });
    return grouped;
}

function chunkArray<T>(array: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

export default function ContentListScreen() {
    const [remoteContents, setRemoteContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/api/contents')
            .then((res) => res.json())
            .then((data) => {
                const transformed = data['hydra:member'].map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    body: item.body,
                    coverImage: item.coverImage,
                    type: item.type,
                }));
                setRemoteContents(transformed);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const groupedStatic = groupByType(staticContents);
    const groupedRemote = groupByType(remoteContents);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>📚 Ressources Informatives</Text>

            {/* Affichage des contenus statiques d'abord */}
            {Object.entries(groupedStatic).map(([type, items]) => (
                <View key={type}>
                    <Text style={styles.sectionTitle}>{type}</Text>
                    {chunkArray(items, 3).map((chunk, index) => (
                        <FlatList
                            key={`${type}-${index}`}
                            data={chunk}
                            horizontal
                            renderItem={({ item }) => <ContentCard {...item} />}
                            keyExtractor={(item) => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: spacing.md }}
                        />
                    ))}
                </View>
            ))}

            {/* Puis les contenus distants */}
            {loading ? (
                <ActivityIndicator size="large" color={colors.sage} />
            ) : (
                Object.entries(groupedRemote).map(([type, items]) => (
                    <View key={type}>
                        <Text style={styles.sectionTitle}>{type}</Text>
                        {chunkArray(items, 3).map((chunk, index) => (
                            <FlatList
                                key={`${type}-${index}`}
                                data={chunk}
                                horizontal
                                renderItem={({ item }) => <ContentCard {...item} />}
                                keyExtractor={(item) => item.id.toString()}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: spacing.md }}
                            />
                        ))}
                    </View>
                ))
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.cloud,
        padding: spacing.lg,
    },
    heading: {
        fontSize: fontSizes.h1,
        fontFamily: fonts.soft,
        color: colors.graphite,
        marginBottom: spacing.md,
    },
    sectionTitle: {
        fontSize: fontSizes.h2,
        fontFamily: fonts.regular,
        color: colors.sky,
        marginTop: spacing.lg,
        marginBottom: spacing.sm,
    },
});
