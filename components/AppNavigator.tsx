import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/HomePage';
import LoginScreen from '../pages/LoginPage';
import LoginPage from '../pages/LoginPage';

// Define the parameter list for your stack navigator
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

// Create a stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Define the navigation stack
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Login" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
