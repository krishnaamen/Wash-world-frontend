import { Image, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';


type RootStackParamList = {
    HomePage: undefined;
    LoginPage: undefined;
    SignupPage: undefined;
};

type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>;

type Props = {
    navigation: DetailsScreenNavigationProp;
};


const HomePage: React.FC<Props> = ( {navigation} ) => {
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
                                style={styles.addButton}
                                
                                onPress={() => navigation.navigate('LoginPage')}>

                                <Text>Log In</Text>  
                                
                            </TouchableOpacity>
                            <Text>
                    Not Member Yet ?
           </Text>

                            <TouchableOpacity
                                style={styles.addButton}
                                
                                onPress={() => navigation.navigate('SignupPage')}>

                                <Text>Register yourself </Text>  
                                
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
    }

})