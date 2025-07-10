import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ScrollView,
    Dimensions,
} from 'react-native';
import { colors, spacing, fontSizes, fonts, borderRadius } from '../styles/theme';

const { width, height } = Dimensions.get('window');

type Props = {
    title: string;
    body: string;
    coverImage?: string;
};

export default function ContentCard({ title, body, coverImage }: Props) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
                {coverImage && (
                    <Image source={{ uri: coverImage }} style={styles.image} resizeMode="cover" />
                )}
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.body}>{body.slice(0, 80)}...</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide">
                <ScrollView contentContainerStyle={styles.modalWrapper}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                        <Text style={styles.closeText}>✖️ Fermer</Text>
                    </TouchableOpacity>

                    {coverImage && (
                        <Image source={{ uri: coverImage }} style={styles.modalImage} resizeMode="cover" />
                    )}

                    <Text style={styles.modalTitle}>{title}</Text>
                    <Text style={styles.modalBody}>{body}</Text>
                </ScrollView>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        width: width * 0.7,
        backgroundColor: colors.white,
        borderRadius: borderRadius.xl,
        padding: spacing.md,
        marginRight: spacing.lg,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.sm,
    },
    title: {
        fontSize: fontSizes.h2,
        fontFamily: fonts.soft,
        color: colors.graphite,
        marginBottom: spacing.xs,
    },
    body: {
        fontSize: fontSizes.body,
        fontFamily: fonts.regular,
        color: colors.sky,
    },
    modalWrapper: {
        padding: spacing.lg,
        backgroundColor: colors.cloud,
    },
    closeBtn: {
        alignSelf: 'flex-end',
        marginBottom: spacing.md,
    },
    closeText: {
        fontSize: fontSizes.caption,
        color: colors.graphite,
    },
    modalImage: {
        width: '100%',
        height: height * 0.25,
        borderRadius: borderRadius.xl,
        marginBottom: spacing.md,
    },
    modalTitle: {
        fontSize: fontSizes.h1,
        fontFamily: fonts.soft,
        color: colors.graphite,
        marginBottom: spacing.sm,
    },
    modalBody: {
        fontSize: fontSizes.body,
        fontFamily: fonts.regular,
        color: colors.graphite,
    },
});
