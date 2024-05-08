import { RouteProp, useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginPage from './LoginPage';
import { BASE_URL } from '../config';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import HomePage from './HomePage';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Entry } from '../entities/entry';
import { EntryItem} from '../components/EntryItem'

import { CreateEntryDTO } from '../entities/CreateEntryDTO';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useGetEntries } from '../query/entry.hooks';
import { clearToken, setToken } from '../store/authSlice';
import * as SecureStore from 'expo-secure-store';





type RootStackParamList = {
   
    LoginPage: undefined;
    HomePage: undefined;
};

type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>;

type Props = {
    navigation: DetailsScreenNavigationProp;
};


const EntryList: React.FC<Props> = ({ navigation }) => {
    const [entries, setEntries] = useState<Entry[]>([]);
    // const entries = useSelector(
    //     (state: RootState) => state.entries.entries)

    // repalcing using the react-query hook

    // const { data: allentries, error, isLoading, isError } = useGetEntries();



    // repalcing using the react-query hook
     const dispatch = useDispatch<AppDispatch>();
  
    useEffect(() => {
       // dispatch(fetchEntries())
    }, [])

//console.log("entries", entries)

const handleLogout = async() => {
    dispatch(clearToken());
    SecureStore.deleteItemAsync('token');
    console.log("token deleted");
}

const token = useSelector((state: RootState) => state.users.token);
    return (
        
        <SafeAreaView >

            <View style={styles.container}>
                
            <View style={styles.addLogout}>
                <View style={styles.addEntry}>
                    <Text>Add Entry</Text>
                    <TouchableOpacity
                                style={styles.addButton}>
                                <Ionicons name="add-circle" size={50} color="green" />
                            </TouchableOpacity>
                </View>

                <View style={styles.addEntry}>
                    <Text>Logout</Text>
                    <TouchableOpacity
                                style={styles.addButton}
                                onPress={()=>{
                                    handleLogout()
                                    navigation.push('LoginPage')
                                }}>
                                <Ionicons name="log-out" size={50} color="red" />
                            </TouchableOpacity>
                </View>
            
                            

            </View>
                            

                <Text>Entry-list</Text>
                <FlatList
                    data={entries}
                    keyExtractor={(item: Entry) => item?.id.toString()}
                    renderItem={({ item }) => (
                        
                        <View style={styles.datastyle}>
                            <TouchableOpacity
                                style={styles.addButton}
                               >
                                   
                                <EntryItem name={item?.name} date={new Date().toString().substring(0,15)} amount={item?.amount} categoryname={item?.category} description={item?.description}   />
                            </TouchableOpacity>

                        </View>


                    )}
                />
            </View>

        </SafeAreaView>
    );
};

export default EntryList;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%'
    },
    addLogout: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%'
    },
    addEntry: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    
    datastyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 5
    },
    textStyle: {
        marginRight: 5,

    },
    datestyle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 5
    },

    addButton: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 20,
        margin: 20,
    }

})