import { useQuery } from "@tanstack/react-query";
import { vehicleAPI } from "../api/vehicleAPI";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';


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


