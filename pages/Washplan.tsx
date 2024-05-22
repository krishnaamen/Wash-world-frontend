import { Image, StyleSheet, Text, View, TouchableOpacity, Button, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../components/AppNavigator';
import PlanItem from '../components/PlanItem';
import { Ionicons } from '@expo/vector-icons';
import { clearToken } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { logout } from '../store/userSlice';
import { useGetCurrentUser } from '../query/user.hooks';
import { useGetCurrentVehicle } from '../query/vehicle.hooks';
import { vehicleAPI } from '../api/vehicleAPI';
import { useGetWashplanList } from '../query/washplan.hooks';
import { RootState } from '../store/store';


const getcurrentvehicle = async () => {
    return await SecureStore.getItemAsync('current_vehicle');

}

type Vehicle = {
    id: number,
    licencePlateNumber: string,
    model: string,
    color: string,
    year: string

}

type RootStackParamList = {
    HomePage: undefined;
    LoginPage: undefined;
    SignupPage: undefined;
};



const Stack = createNativeStackNavigator();
type Props = {}


export const WashplanPage: React.FC<Props> = () => {
    const [currentPlan, setCurrentPlan] = useState<string | null>();
    const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>();

    const username = SecureStore.getItemAsync('current_user');
    const { isPending, isError, data, error } = useGetCurrentUser();
    const { isPending: isPending2, isError: isError2, data: washplanlist, error: error2 } = useGetWashplanList();
    console.log("washplanlist", washplanlist);


    console.log("current user", data);

    const token = useSelector((state: RootState) => state.auth.token);
    console.log("token", token);

    const { isPending: isPending1, isError: isError1, data: data1, error: error1 } = useGetCurrentVehicle();
    console.log("current vehicle", data1);
    useEffect(() => {

        if (data1) {
            setCurrentVehicle(data1);
        }


    }, [data1]);

    const dispatch = useDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'washplanpage'>>();

    console.log("current vehicle from wahsh", currentVehicle);

    const handleLogout = async () => {
        dispatch(clearToken());
        //navigation.navigate('LoginPage'); 
        dispatch(logout());
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('current_user');
        await SecureStore.deleteItemAsync('current_vehicle');
        console.log("token deleted");
    }

    const handlePlan = (id: number,token:string) => {

        const plan = washplanlist.find((plan: any) => plan.id === id);
        console.log("**********");
        console.log("plan selected", plan);
        console.log("token", token);
        console.log("current vehicle", currentVehicle);
        console.log("**********");
        const currentVehicleDto = {

            id: currentVehicle?.id!,
            licencePlateNumber: currentVehicle?.licencePlateNumber!,
            model: currentVehicle?.model!,
            color: currentVehicle?.color!,
            year: currentVehicle?.year!,
            washplan: id!
        }
        vehicleAPI.updateVehicleWithPlan(token, currentVehicle?.id!,currentVehicleDto!);
        

        //await SecureStore.deleteItemAsync('plan');
        //await SecureStore.setItemAsync('plan', plan);
        //setCurrentPlan(plan);
        //console.log("plan selected clicking me", plan);
    }

    const changePlan = (planname) => {
        SecureStore.deleteItemAsync('plan');
        setCurrentPlan(null);
        console.log("plan deleted");
    }

    const planhandler = () => {
        return (
            <View style={styles.container}>

                <Image style={styles.wimage} source={require('../assets/w.png')} />

                <Text style={styles.title} >Choose your washing plan</Text>

                <View style={styles.welcome}>
                    <ScrollView style={styles.plan} horizontal={true}>

                        <FlatList
                            horizontal={true}
                            data={washplanlist}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={() => handlePlan(item.id,token as string)}>
                                    <PlanItem title={item.washplanName} price={item.washPlanPrice} currency={"DKK"} offers={["shamphoo", "polinig", "dry"]} />
                                </TouchableOpacity>
                            )}





                        />

                    </ScrollView>

                </View>




            </View>




        )

    }

    return (

        <>

            <View style={styles.nav}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                <View>
                    <Text >{data}</Text>
                    <Text style={styles.title}><Ionicons name="car" size={25} color="blue" />{currentVehicle?.licencePlateNumber}</Text>

                </View>



                <View style={styles.title}>
                    <Text>Logout</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => {
                            handleLogout()
                            //navigation.navigate('LoginPage')
                        }}>
                        <Ionicons name="log-out" size={50} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
            {currentPlan ? (
                <>
                    <Text style={styles.title}>Current Plan is</Text>
                    <PlanItem title='Basic' price={99} currency='DKK/M' offers={['shampoo', 'light dry', 'light brush']} />
                    <TouchableOpacity
                        style={styles.addButton1}
                        onPress={() => {
                            changePlan()

                        }}>

                        <Text style={styles.title}>Change Plan</Text>
                    </TouchableOpacity>
                </>
            ) : planhandler()}
        </>
    );
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
        display: 'flex',
        backgroundColor: '#BBEDC3',
        padding: 10,
        margin: 10,
        borderRadius: 100,
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
    icon: {
        marginLeft: 30,
    }

})  