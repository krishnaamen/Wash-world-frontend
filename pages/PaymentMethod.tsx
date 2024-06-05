import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const PaymentMethod: React.FC = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleCardNumberChange = (text: string) => {
        setCardNumber(text);
    };

    const handleExpiryDateChange = (text: string) => {
        setExpiryDate(text);
    };

    const handleCvvChange = (text: string) => {
        setCvv(text);
    };

    const handleSubmit = () => {
        //we will use this function to submit the form for now we are just showing the alert
        Alert.alert('Form Submitted', `Card Number: ${cardNumber}, Expiry Date: ${expiryDate}, CVV: ${cvv}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Card Number:</Text>
            <TextInput
                style={styles.input}
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                keyboardType="numeric"
            />
            <Text style={styles.label}>Expiry Date:</Text>
            <TextInput
                style={styles.input}
                value={expiryDate}
                onChangeText={handleExpiryDateChange}
                keyboardType="numeric"
            />
            <Text style={styles.label}>CVV:</Text>
            <TextInput
                style={styles.input}
                value={cvv}
                onChangeText={handleCvvChange}
                keyboardType="numeric"
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
        marginVertical: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        fontSize: 18,
        borderRadius: 4,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 4,
        marginTop: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default PaymentMethod;
