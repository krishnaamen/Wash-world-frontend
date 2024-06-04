import { Image, StyleSheet, Text, View,TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import LoginPage  from './LoginPage';
import SignupPage from './SignupPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../components/AppNavigator';
import * as SecureStore from 'expo-secure-store';


type RootStackParamList = {
    HomePage: undefined;
    LoginPage: undefined;
    SignupPage: undefined;
};

//type DetailsScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Home'>;

// type Props = {
//     navigation: DetailsScreenNavigationProp;
// };

const Stack = createNativeStackNavigator();
type Props = {}

const HomePage: React.FC<Props> = ( ) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'HomePage'>>();
    const token = SecureStore.getItemAsync('token');


    return (
        

        <View style={styles.container}>
            <View style={styles.nav}>
            <Image  style={styles.logo} source={require('../assets/logo.png')} />
            </View>

           <Image style={styles.wimage} source={require('../assets/w.png')} />
           <View style={styles.welcome}>
                <Text>
                    Welcome to WASH World Family
                </Text>
                <Text>
                    we believe in Green World
           </Text>
                <Text>
                    Already member?
           </Text>
        <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('login')}>

            <Text style={styles.buttonText}>LogIn</Text>
        </TouchableOpacity>
                            <Text>
                    Not Member Yet ?
           </Text>

                            <TouchableOpacity
                                style={styles.createButton}
                                
                                onPress={() => navigation.navigate('signup')}>

                                <Text style={styles.buttonText}>Register yourself </Text>  
                                
                            </TouchableOpacity>
                          
           </View>
           
           


        </View>
        
    )
}

export default HomePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        
        
    },
    nav:{
        marginTop: 0,
        backgroundColor: '#76E174',
        height:'15%',
        width:'100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        },
    logo:{
        display: 'flex',
        padding:30,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wimage:{  
        display: 'flex',
        marginTop: 30,
        marginLeft: '20%',

      },
    welcome:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
    },
    addButton: {
        backgroundColor: '#BBEDC3',
        padding: 10,
        margin: 10,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
    },
    footer:{
        marginBottom: 0,
        backgroundColor: '#76E174',
        height:'15%',
        width:'100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
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