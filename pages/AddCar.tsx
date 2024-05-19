import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { vehicleAPI } from '../api/vehicleAPI';
import SecureStorage from 'expo-secure-store';
import { useSelector } from 'react-redux';
import { CreateVehicleDto } from '../entities/CreateVehicleDTO';

const AddCar: React.FC = () => {
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [licencePlateNumber, setLicencePlateNumber] = useState('');
    const [year, setYear] = useState();
    const jwt = useSelector((state: any) => state.auth.token);
    console.log("jwt from add car", jwt);


    const handleAddCar = () => {

        vehicleAPI.createVehicle(new CreateVehicleDto(model, color, licencePlateNumber, year), jwt);
        // Logic to add the car
        // You can access the values of model, color, numberPlate, and year here
        console.log(model, color, licencePlateNumber, year);

    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Model"
                value={model}
                onChangeText={setModel}
            />
            <TextInput
                style={styles.input}
                placeholder="Color"
                value={color}
                onChangeText={setColor}
            />
            <TextInput
                style={styles.input}
                placeholder="Number Plate"
                value={licencePlateNumber}
                onChangeText={setLicencePlateNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Year"
                value={year}
                onChangeText={setYear}
            />
            <TouchableOpacity
                style={styles.createButton}
                onPress={handleAddCar}>

                <Text style={styles.buttonText}>Add Your Car</Text>

            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    input1: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    createButton: {
        display: 'flex',
        borderRadius: 20,
        backgroundColor: "#2c6979",
        margin: 10
    },
    buttonText: {
        padding: 20,
        marginLeft: '20%',
        color: 'white',
        fontSize: 30,

    }
});

export default AddCar;