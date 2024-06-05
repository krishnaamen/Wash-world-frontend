import React from 'react';
import { StyleSheet, Text, View } from "react-native";

interface PlanItemProps {
    title: string;
    price: number;
    currency: string;
    offers: string[];
}
// props like parameter of any functions
const PlanItem: React.FC<PlanItemProps> = ({ title, price, currency, offers }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}>{price} {currency}</Text>
            {offers.map((offer, index) => (
                <Text style={styles.offer} key={index}>{offer}</Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'green',
        marginLeft: 10,
        shadowColor: 'green',
        shadowOffset: { width: 0, height: 1 },
        zIndex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        backgroundColor: 'yellow',
        display: 'flex',
        justifyContent: 'center',
    },
    price: {
        fontSize: 16,
        color: 'green',
        marginBottom: 5,
    },
    offer: {
        fontSize: 14,
        color: '#333',
    },
});

export default PlanItem;
