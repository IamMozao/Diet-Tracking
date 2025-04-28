import React from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    GestureResponderEvent,
} from 'react-native';
import { ThemedView } from '../ui/ThemedView';

type CustomModalProps = {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function CustomModal({ visible, onClose, children }: CustomModalProps) {
    const handleOutsidePress = (e: GestureResponderEvent) => {
        e.stopPropagation();
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={handleOutsidePress}>
                <ThemedView style={styles.backdrop}>
                    <TouchableWithoutFeedback>
                        <ThemedView style={styles.modalContent}>
                            {children}
                        </ThemedView>
                    </TouchableWithoutFeedback>
                </ThemedView>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        width: '80%',
        maxWidth: 400,
    },
});
