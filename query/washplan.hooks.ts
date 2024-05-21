import { useQuery } from "@tanstack/react-query";
import * as SecureStore from 'expo-secure-store';
import { washPlanAPI } from "../api/washplanAPI";


export const useGetWashplanList = () => {
    return useQuery({
        queryKey: ['washplan_list'],
        queryFn: async function fetchWashPlans () {
            const token = await SecureStore.getItemAsync('token');
            const response = await washPlanAPI.getPlans(token as string);
            return response;
        },
    })
}