import React, { FC, ReactNode } from 'react';
import { Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';

interface KeyboardAvoidingWrapperProps {
    children: ReactNode;
}

const KeyboardAvoidingWrapper: FC<KeyboardAvoidingWrapperProps> = ({ children }) => {
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                {children}
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default KeyboardAvoidingWrapper;