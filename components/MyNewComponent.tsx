import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import EntryList from '../pages/EntryList';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../pages/Profile';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppDispatch, RootState, store } from '../store/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { Categories } from '../pages/Categories';
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage';
import { useEffect, useState } from 'react';
import HomePage from '../pages/HomePage';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'



export type RootStackParamList = {
  EntryList: undefined;
  EntryEdit: { entryId: number };
  LoginPage: undefined;
  AuthSignup: undefined;
  AuthLogin: undefined;
};

import * as SecureStore from 'expo-secure-store';
import AppNavigator from './AppNavigator';
async function getValueFor(key:string) {
  let result = await SecureStore.getItemAsync(key);
 return result
}


const queryClient = new QueryClient();
const MyNewComponent =  () => {
    const [token, setToken] = useState<string | null>(null);
    
    const rtoken = useSelector((state: RootState) => state.auth.token);
    useEffect(() => {
      getValueFor('token').then((value) => {
        setToken(value);
      });
    }, [rtoken]);

    console.log("token in choosing it from app",token); 
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
    
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: React.ComponentProps<typeof Ionicons>['name'];

        if (route.name === 'home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Categories') {
          iconName = focused ? 'settings' : 'settings-outline';
        }  else if (route.name === 'login') {
          iconName = focused ? 'log-in' : 'log-in-outline';
        } 
        else if (route.name === 'signup') {
          iconName = focused ? 'log-out' : 'log-out-outline';
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

    { token ? (
    <>
     <Tab.Screen name="Entries" component={StackNavigationEntry} />
    <Tab.Screen name="Categories" component={Categories} />
    </>
  ) : (
    <>
      <Tab.Screen name="home" component={HomePage} />
      <Tab.Screen name="login" component={LoginPage} />
      <Tab.Screen name="signup" component={SignupPage} />
    </>
  )}
      
  

    
  </Tab.Navigator>
  
  
  )
  
}

export default MyNewComponent