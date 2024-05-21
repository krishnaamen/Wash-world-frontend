import { useQuery } from "@tanstack/react-query";
import { vehicleAPI } from "../api/vehicleAPI";
import * as Securestorage from 'expo-secure-store';

export const useGetCurrentVehicle = () => {
    return useQuery({
        queryKey: ['current_vehicle'],
        queryFn: async () => {
            const response:string|null = await Securestorage.getItemAsync('current_vehicle');
            if (response) {
                
                return response;
            } else {
                return null;
            }
        },
    })
}