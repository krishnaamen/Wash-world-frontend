import React, { useState } from 'react';
import { View, TextInput, Button as bt, StyleSheet, AppState, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/userSlice';
import { AppDispatch, RootState } from '../store/store';
import { setToken } from '../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Box, Button , Link, FormControl, Input, WarningOutlineIcon, Stack as Stack1 } from 'native-base';
import * as SecureStore from 'expo-secure-store';
import { RootStackParamList } from '../components/MyNewComponent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { vehicleAPI } from '../api/vehicleAPI';


async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

type Props = {}

const LoginPage: React.FC<Props> = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'LoginPage'>>();


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();


  const handleLogin = async () => {
    const jwt = await SecureStore.getItemAsync('token') as string;
    
    try {

      console.log("email and password ", email, password);
      const { payload } = await dispatch(login({ email: email, password: password }))
      console.log("payload in user login", payload);
      if (payload.access_token !== undefined) {
        save('token', payload.access_token);
        dispatch(setToken(payload.access_token));
        console.log("handle login access", payload.access_token);
        save('current_user', payload.username);
      
        const current_vehicle = await vehicleAPI.getVehicles(payload.access_token);
        save('current_vehicle', JSON.stringify(current_vehicle));
     
        

      }


    } catch (error) {
      console.error('Error logging in:', error);
    }


  };

  return (
  <View >

{/* //native base ui library */}
    <Box alignItems="center" pt="30">
    <Box w="100%" maxWidth="300px">
        <FormControl isRequired>
            <Stack1 mx="4">
                <FormControl.Label>Email</FormControl.Label>
                <Input type="text" placeholder="Email" value={email} 
                    autoCapitalize="none" onChangeText={setEmail}/>
            </Stack1>
        </FormControl>
    </Box>

    <Box w="100%" maxWidth="300px">
        <FormControl isRequired>
            <Stack1 mx="4">
                <FormControl.Label >Password</FormControl.Label>
                <Input type="password" defaultValue="12345" placeholder="Password" 
                    value={password} onChangeText={setPassword}/>
                <FormControl.HelperText >
                  <Text>Must be atleast 6 characters.</Text>
                    
                </FormControl.HelperText>
            </Stack1>
        </FormControl>
    </Box>
</Box>

<Box alignItems="center" >
  <Button mt="10" onPress={handleLogin} testID='loginButton' >
  <Text style={styles.buttonText}>Login</Text>
  </Button>
  
  
  
</Box>
<Box alignItems="center" >
  
  <Text style= {styles.link} onPress={() => navigation.navigate('signup')} >Don't have an account? Sign up</Text>
  
</Box>





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
    padding: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 20,

  },
  link: {
    marginTop: 20,
    color: 'blue',
    fontSize: 16,
  },

})

export default LoginPage;





{
  /* <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Don't have an account? Sign up"
        onPress={() => navigation.navigate('Signup')}
      />
    </View> */    
}