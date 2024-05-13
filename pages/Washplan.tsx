import { Image, StyleSheet, Text, View, TouchableOpacity, Button, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../components/AppNavigator';
import PlanItem from '../components/PlanItem';
import { Ionicons } from '@expo/vector-icons';
import { clearToken } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { logout } from '../store/userSlice';


type RootStackParamList = {
    HomePage: undefined;
    LoginPage: undefined;
    SignupPage: undefined;
};

 

const Stack = createNativeStackNavigator();
type Props = {}

export const WashplanPage: React.FC<Props> = () => {
    const token = SecureStore.getItemAsync('token');
    const dispatch = useDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'WashplanPage'>>();
    const username = "Krishnaamen";
    useEffect(() => {
        if (token === null) {
            navigation.navigate('LoginPage');
        }

    }, [token]);

    const handleLogout = async() => {
        dispatch(clearToken());
        dispatch(logout());
        SecureStore.deleteItemAsync('token');
        console.log("token deleted");
       
    }

    return (



        <View style={styles.container}>
            <View style={styles.nav}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />

                <Text>{username}</Text>

                <View style={styles.title}>
                    <Text>Logout</Text>
                    <TouchableOpacity
                                style={styles.addButton}
                                onPress={()=>{
                                    handleLogout()
                                    //navigation.navigate('LoginPage')
                                }}>
                                <Ionicons name="log-out" size={50} color="red" />
                            </TouchableOpacity>
                </View>
            </View>
            

            <Image style={styles.wimage} source={require('../assets/w.png')} />


            



            <Text style={styles.title} >Choose your washing plan</Text>

            <View style={styles.welcome}>

                <ScrollView style={styles.plan} horizontal={true}>

                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('')}>

                        <PlanItem title='Basic' price={99} currency='DKK/M' offers={['shampoo', 'light dry', 'light brush']} />
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.addButton}

                        onPress={() => navigation.navigate('')}>

                        <PlanItem title='Gold' price={139} currency='DKK/M' offers={['shampoo', 'wash']} />

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.addButton}

                        onPress={() => navigation.navigate('')}>

                        <PlanItem title='Premium' price={169} currency='DKK/M' offers={['shampoo', 'wash']} />

                    </TouchableOpacity>
                </ScrollView>

            </View>




        </View>



    )
}

export default WashplanPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',


    },
    nav: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 0,
        backgroundColor: '#76E174',
        height: '15%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    logo: {
        display: 'flex',
        padding: 30,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wimage: {
        display: 'flex',
        marginTop: 30,
        marginLeft: '20%',

    },
    welcome: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
    },
    addButton1: {
        backgroundColor: '#BBEDC3',
        padding: 10,
        margin: 10,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
    },
    addButton: {},
    footer: {
        marginBottom: 0,
        backgroundColor: '#76E174',
        height: '15%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    plan: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },

})  