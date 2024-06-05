import { useQuery } from "@tanstack/react-query";
import * as SecureStore from 'expo-secure-store';

export const useGetCurrentUser = () => {
    return useQuery({
      queryKey: ['current_user'],
      queryFn: async () => {
        const response = await SecureStore.getItemAsync('current_user');
        return response;
  
      },
    })
  }
  // secure store is the device storage for storing sensitive data