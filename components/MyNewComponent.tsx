import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppDispatch, RootState, store } from '../store/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import AddCar from '../pages/AddCar';
import WashplanPage from '../pages/Washplan';
import { useEffect } from 'react';
import { setToken } from '../store/authSlice';
import PaymentMethod from '../pages/PaymentMethod';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'



export type RootStackParamList = {
  WashplanPage: undefined;
  LoginPage: undefined;
  AuthSignup: undefined;
  AuthLogin: undefined;
  HomePage: undefined;
  AddCar: undefined;
  PaymentMethod: undefined;
};

import * as SecureStore from 'expo-secure-store';
import AppNavigator from './AppNavigator';
async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  return result
}


const queryClient = new QueryClient();
const MyNewComponent =   () => {

  useEffect(() => {
    async function readTokenFromSecureStore() {
        const token = await SecureStore.getItemAsync('token');
        token && dispatch(setToken(token))
    }
    readTokenFromSecureStore();
}, [])
 
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector((state: RootState) => state.auth.token);
  //const token = getValueFor('token');

  
  
  const Stack = createStackNavigator<RootStackParamList>();
  const Tab = createBottomTabNavigator();


  function StackNavigationEntry() {
    return (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>


    );
  }

  return (
<QueryClientProvider client={queryClient}>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'];

          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Categories') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'login') {
            iconName = focused ? 'log-in' : 'log-in-outline';
          }
          else if (route.name === 'signup') {
            iconName = focused ? 'log-out' : 'log-out-outline';
          }
          else if (route.name === 'washplan') {
            iconName = focused ? 'car' : 'car-outline';
          }
          else if (route.name === 'addcar') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          }
          else if (route.name === 'addpayment') {
            iconName = focused ? 'card' : 'card-outline';
          }
          else {
            iconName = 'alert'; // Default icon, make sure this is valid
          }

          // Now iconName is explicitly a valid icon key, no error should be thrown
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>

      {token ? (
        <>
          
          <Tab.Screen name="washplan" component={WashplanPage} />
          <Tab.Screen name="addcar" component={AddCar} />
          <Tab.Screen name="addpayment" component={PaymentMethod} />

        </>
      ) : (
        <>
          <Tab.Screen name="home" component={HomePage} />
          <Tab.Screen name="login" component={LoginPage} />
          <Tab.Screen name="signup" component={SignupPage} />
         
        </>
      )}




    </Tab.Navigator>

    </QueryClientProvider>
  )

}

export default MyNewComponent