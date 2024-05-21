import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, AppState, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/userSlice';
import { AppDispatch, RootState } from '../store/store';
import { setToken } from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Box, Button as bt, FormControl, Input, WarningOutlineIcon } from 'native-base';
import * as SecureStore from 'expo-secure-store';
import { RootStackParamList } from '../components/MyNewComponent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { vehicleAPI } from '../api/vehicleAPI';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}


//   type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EntryList'>;

// type Props = {
//     navigation: DetailsScreenNavigationProp;
// };


const Stack = createNativeStackNavigator();
type Props = {}

const LoginPage: React.FC<Props> = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'LoginPage'>>();


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();



  const token = useSelector((state: RootState) => state.users.token);

  const handleLogin = async () => {
    const jwt = await SecureStore.getItemAsync('token') as string;
    //Nk.Leader@2024


    try {
      console.log("email and password", email, password);
      const { payload } = await dispatch(login({ email: email, password: password }))
      console.log("payload in user login", payload);
      if (payload.access_token !== undefined) {
        save('token', payload.access_token);
        dispatch(setToken(payload.access_token));
        console.log("handle login access", payload.access_token);
        save('current_user', payload.username);
      
        const current_vehicle = await vehicleAPI.getVehicles(payload.access_token);
        save('current_vehicle', current_vehicle);
     
        

      }


    } catch (error) {
      console.error('Error logging in:', error);
    }


  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleLogin}>

        <Text style={styles.buttonText}>Login</Text>

      </TouchableOpacity>



    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input1: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  createButton: {
    display: 'flex',
    borderRadius: 10,
    backgroundColor: "#2c6979",
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
  },
  buttonText: {
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 20,

  }

})

export default LoginPage;