
import { vehicleAPI } from "../api/vehicleAPI";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { washPlanAPI } from "../api/washplanAPI";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { VehicleDTO } from "../pages/Washplan";


async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}



export const useGetCurrentVehicle = () => {

    return useQuery({
        queryKey: ['current_vehicle'],
        queryFn: async function fetchVehicles() {
            const token = await SecureStore.getItemAsync('token');
            const response = await vehicleAPI.getVehicles(token as string);
            console.log("response from get current vehicle from query:", response);
            return response;
        },
    })
}

export const useGetCurrentPlan = (id: number) => {
    return useQuery({
        queryKey: ['current_plan'],
        queryFn: async function fetchCurrentPlan() {
            const token = await SecureStore.getItemAsync('token');
            const currentVehicle = await SecureStore.getItemAsync('current_vehicle');
            const response = await vehicleAPI.getCurrentPlan(token as string, id);

            console.log("response from get current plan from query:", response);
            if (response) {

                return response;

            }
            else {
                return null;
            }

        },
    })
}


export const useUpdateCurrentWashplan = () => {
    const queryClient = useQueryClient()


    return useMutation({
        mutationFn: async (variables: { token: string, id: number, currentVehicle: VehicleDTO }) => {
            const { token, id, currentVehicle } = variables;
            const response = await vehicleAPI.updateVehicleWithPlan(token, id, currentVehicle);
            await SecureStore.deleteItemAsync("current_plan");
            console.log("response from update current plan from query:", response);
            return response;
        },
        onSuccess: () => {
            console.log("on success from update current plan from query");
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['current_plan', 'current_vehicle'] })
        },

    })

}

export const useResetCurrentWashplan = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (variables: { token: string, id: number, currentVehicle: VehicleDTO }) => {
            const { token, id, currentVehicle } = variables;
            const response = await vehicleAPI.resetVehicleWithPlan(token, id, currentVehicle);

            console.log("response from reset current plan from query:", response);
            return response;
        },
        onSuccess: () => {
            console.log("on success from reset current plan from query");
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['current_plan', 'current_vehicle'] })
        },

    })

}

