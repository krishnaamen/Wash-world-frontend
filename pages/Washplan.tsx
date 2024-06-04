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
import { useGetCurrentPlan, useGetCurrentVehicle, useUpdateCurrentWashplan, useResetCurrentWashplan } from '../query/vehicle.hooks';
import { vehicleAPI } from '../api/vehicleAPI';
import { useGetWashplanList } from '../query/washplan.hooks';
import { RootState } from '../store/store';
import Toast from 'react-native-root-toast';
import { Mutation, useQueryClient } from '@tanstack/react-query';


const getcurrentvehicle = async () => {
    return await SecureStore.getItemAsync('current_vehicle');

}

export type WashPlan = {
    id: number,
    washplanName: string,
    washPlanPrice: number,
    washPlanOffers: string[]

}

export type VehicleDTO = {
    id: number,
    licencePlateNumber: string,
    model: string,
    color: string,
    year: string,
    washplan: number | null

}

type RootStackParamList = {
    HomePage: undefined;
    LoginPage: undefined;
    SignupPage: undefined;
    WashplanPage: undefined;
};




const Stack = createNativeStackNavigator();
type Props = {}


export const WashplanPage: React.FC<Props> = () => {
    const [currentPlan, setCurrentPlan] = useState<WashPlan | any>();
    const [currentVehicle, setCurrentVehicle] = useState<VehicleDTO | any>();
    const username = SecureStore.getItemAsync('current_user');
    const { isPending, isError, data, error } = useGetCurrentUser();
    const token = useSelector((state: RootState) => state.auth.token);
    const { isPending: isPending2, isError: isError2, data: data2, error: error2 } = useGetWashplanList();
    const { isPending: isPending1, isError: isError1, data: data1, error: error1 } = useGetCurrentVehicle();
    console.log("current vehicle id", currentVehicle ? currentVehicle.id : null);
    const currentVehicleId = currentVehicle ? currentVehicle.id : 2;

    const queryClient = useQueryClient();


    const updateWashplan = useUpdateCurrentWashplan();
    const deleteWashplan = useResetCurrentWashplan();



    const { isPending: isPending3, isError: isError3, data: data3, error: error3 } = useGetCurrentPlan(currentVehicleId!);
    const dispatch = useDispatch();
    const mutation = useUpdateCurrentWashplan()

    useEffect(() => {

        if (data1) {
            console.log("current vehicle from washplan", data1);
            setCurrentVehicle(data1);
        }
        console.log("current vehicle from washplan", data1);
        console.log("current plan from washplan before if check", data3);

        if (data3) {
            console.log("current plan from washplan in useeffect     ", data3);
            setCurrentPlan(data3);
        } else {
            setCurrentPlan(null);
        }

        async function readVehicleFromSecureStore() {
            const vehicle = await SecureStore.getItemAsync('current_vehicle');
            vehicle && setCurrentVehicle(JSON.parse(vehicle));
        }
        readVehicleFromSecureStore();

        async function readCurrentPlanFromSecureStore() {
            const currentPlan = await SecureStore.getItemAsync('current_plan');
            currentPlan && setCurrentPlan(JSON.parse(currentPlan));
        }
        readCurrentPlanFromSecureStore();





    }, [data1, data3]);

    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'WashplanPage'>>();



    const createToast = (message: string, time: number) => {
        let toast = Toast.show(`${message}`, {
            duration: Toast.durations.LONG,

        });

        console.log("toast", toast);
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, time);

    }



    const handleLogout = async () => {
        dispatch(clearToken());
        //navigation.pop();
        dispatch(logout());
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('current_user');
        await SecureStore.deleteItemAsync('current_vehicle');
        console.log("token deleted");

    }

    const handlePlan = (id: number, token: string) => {
        const plan = data2.find((plan: any) => plan.id === id);
        console.log("plan from handle plan", plan);
        setCurrentPlan(plan);
        const currentVehicleDto = {
            id: currentVehicle?.id!,
            licencePlateNumber: currentVehicle?.licencePlateNumber!,
            model: currentVehicle?.model!,
            color: currentVehicle?.color!,
            year: currentVehicle?.year!,
            washplan: id!
        }
        console.log("current vehicle dto", currentVehicleDto);

        console.log("before mutation applied")
        updateWashplan.mutate({ token: token, id: currentVehicle?.id!, currentVehicle: currentVehicleDto });
        queryClient.invalidateQueries(['current_plan', 'current_vehicle']);
        console.log("after mutation applied and before toast");
        createToast('Plan has been Changed.', 2000);


    }

    // Add this line to import the `useResetPlan` hook

    const resetPlan = async (id: number, token: string) => {
        setCurrentPlan(null);
        const plan = data2.find((plan: WashPlan) => plan.id === id);
        const currentVehicleDto = {
            id: currentVehicle?.id!,
            licencePlateNumber: currentVehicle?.licencePlateNumber!,
            model: currentVehicle?.model!,
            color: currentVehicle?.color!,
            year: currentVehicle?.year!,
            washplan: null,
        }

        createToast('Plan has been reseted.', 2000);
        if (currentVehicle) {

            deleteWashplan.mutate({ token: token, id: currentVehicle?.id!, currentVehicle: currentVehicleDto });
            vehicleAPI.resetVehicleWithPlan(token, currentVehicle?.id!, currentVehicleDto!);
            await SecureStore.deleteItemAsync('plan');
            queryClient.invalidateQueries(['current_plan', 'current_vehicle']);
            //await SecureStore.setItemAsync('plan', JSON.stringify(plan));
        }
        else {
            console.log("current vehicle not found");

        }

    }




    const changePlan = async (currentPlan: WashPlan) => {
        createToast('Plan changed successfully', 2000);
        const id = currentPlan.id;
        SecureStore.deleteItemAsync('plan');
        setCurrentPlan(null);
        SecureStore.deleteItemAsync('current_plan');
        console.log("plan deleted");
        navigation.navigate('HomePage');


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
                            data={data2}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={() => handlePlan(item.id, token as string)}>
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
                    <PlanItem title={currentPlan.washplanName} price={currentPlan.washplanPrice} currency='DKK/M' offers={['shampoo', 'light dry', 'light brush']} />
                    <TouchableOpacity
                        style={styles.addButton1}
                        onPress={() => {
                            resetPlan(currentPlan.id!, token as string);

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