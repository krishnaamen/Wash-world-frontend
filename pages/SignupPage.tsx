import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../components/MyNewComponent';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { signup } from '../store/userSlice';
import * as SecureStore from 'expo-secure-store';
import Moment from 'react-moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


type Props = NativeStackScreenProps<RootStackParamList>

const SignupScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'signup'>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [dob, setDob] = useState(new Date());

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        console.log("A date has been picked: ", date);
        setDob(date);
        hideDatePicker();
    };
    const dispatch = useDispatch<AppDispatch>();

    const handleSignup = () => {
        // Perform signup logic here
        dispatch(signup({ firstName, lastName, email, username, password, dob }));
        // console.log('Signing up with username:', username, 'and password:', password);
    };

    return (
        <View style={styles.container}>

            <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={setFirstName}
                value={firstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={setLastName}
                value={lastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />

            <Button title="Choose your Date of birth" onPress={showDatePicker} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />



            <View style={styles.button}>
                <Button title="Sign Up" onPress={handleSignup} />
            </View>
            <Text style={styles.loginText} onPress={() => navigation.navigate("login")}>Go to Login</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    button: {
        marginTop: 10,
        padding: 10,
        width: '100%',
        // backgroundColor: 'blue',
    },
    loginText: {
        marginTop: 20,
        color: 'blue',
        fontSize: 16,
    },
});

export default SignupScreen;