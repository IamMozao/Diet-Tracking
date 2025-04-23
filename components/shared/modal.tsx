import React from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    GestureResponderEvent,
} from 'react-native';

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
                <View style={styles.backdrop}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            {children}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
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
