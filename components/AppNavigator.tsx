import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import WashplanPage from '../pages/Washplan';

// Define the parameter list for your stack navigator
export type AuthStackParamList = {
  HomePage: undefined;
  LoginPage: undefined;
  SignupPage: undefined;
  WashplanPage: undefined;
};

// Create a stack navigator
const Stack = createStackNavigator<AuthStackParamList>();

// Define the navigation stack
export default function AppNavigator() {
  return (

    <Stack.Navigator initialRouteName='HomePage'>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="SignupPage" component={SignupPage} />
      <Stack.Screen name="WashplanPage" component={WashplanPage} />
    </Stack.Navigator>

  );
};

