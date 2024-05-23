import { useQuery } from "@tanstack/react-query";
import { vehicleAPI } from "../api/vehicleAPI";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { washPlanAPI } from "../api/washplanAPI";


export const useGetCurrentVehicle = () => {
    return useQuery({
        queryKey: ['current_vehicle'],
        queryFn: async function fetchVehicles () {
            const token = await SecureStore.getItemAsync('token');
            const response = await vehicleAPI.getVehicles(token as string);
            console.log("response from get current vehicle from query:", response);
            return response;
        },
    })
}

export const useGetCurrentPlan = (id:number) => {
    return useQuery({
        queryKey: ['current_plan'],
        queryFn: async function fetchCurrentPlan () {
            const token = await SecureStore.getItemAsync('token');
            const currentVehicle = await SecureStore.getItemAsync('current_vehicle');
            const response = await vehicleAPI.getCurrentPlan(token as string,id );
            console.log("response from get current plan from query:", response);
            if(response){
                return response;

            }
            else{
                return null;
            }
            
        },
    })
}

