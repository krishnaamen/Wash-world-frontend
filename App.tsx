import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './pages/Profile';
// import { createDrawerNavigator } from '@react-navigation/drawer';

import Ionicons from '@expo/vector-icons/Ionicons';
import { AppDispatch, RootState, store } from './store/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import SignupPage from './pages/SignupPage'
import  LoginPage from './pages/LoginPage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import MyNewComponent from './components/MyNewComponent';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
const queryClient = new QueryClient()
import { RootSiblingParent } from 'react-native-root-siblings';
import { Box, NativeBaseProvider } from "native-base";







export default function App() {
  return (
    <Provider store = {store}>
      <QueryClientProvider client={queryClient}>
    <NavigationContainer>
    <NativeBaseProvider>
      <MyNewComponent />
     

    </NativeBaseProvider>
    </NavigationContainer>
    </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
