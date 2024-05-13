import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, AppState, Text } from 'react-native';
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
    try {
      console.log(email, password);
      const { payload } = await dispatch(login({ email: email, password: password }))
      if (payload.access_token !== undefined) {
        save('token', payload.access_token);
        save("current_user", JSON.stringify(payload.user));
        dispatch(setToken(payload.access_token));
        console.log("handle login access", payload.access_token);

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
      <Button title="Login" onPress={handleLogin} />
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

})

export default LoginPage;