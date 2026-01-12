import React from 'react';
import { Modal as RNModal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/theme';

interface ModalProps {
    visible: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
}

export default function Modal({
                                  visible,
                                  title,
                                  message,
                                  onConfirm,
                                  onCancel,
                                  confirmText = 'Confirmer',
                                  cancelText = 'Annuler',
                              }: ModalProps) {
    return (
        <RNModal transparent animationType="fade" visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttons}>
                        {onCancel && (
                            <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                                <Text style={styles.cancelText}>{cancelText}</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
                            <Text style={styles.confirmText}>{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </RNModal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#0006',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 20,
        width: '100%',
    },
    title: {
        fontSize: 20,
        color: colors.graphite,
        fontWeight: '600',
        marginBottom: 8,
    },
    message: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    confirmBtn: {
        backgroundColor: colors.sage,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 16,
    },
    confirmText: {
        color: 'white',
        fontWeight: '500',
    },
    cancelBtn: {
        borderColor: colors.sage,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 16,
    },
    cancelText: {
        color: colors.graphite,
    },
});
