import axios from "axios"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BASE_URL } from "../config";
import { EntryAPI } from "../api/entriesAPI";
import { CreateEntryDTO } from "../entities/CreateEntryDTO";
import { UpdateEntryDTO } from "../entities/UpdateEntryDTO";
export const useGetEntries = () => {
    return useQuery({
        queryKey: ['allentries'],
        queryFn: async () => {
            const response = await EntryAPI.fetchAllEntries();
            
            return response.data;
        },
    })
}

export const usePostTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newEntry: CreateEntryDTO,jwt:string) => {
            return  EntryAPI.createEntry(newEntry,jwt);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['entries']    })
    })
}

export const handleUpdate = async (entry:UpdateEntryDTO,id:number) => {
    const response = await axios.put(`${BASE_URL}/entries/${id}`, entry);
    return response.data;

}

/*
export const useUpdateEntry = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: handleUpdate,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['entries'] })
    });
}

*/
export const useDeleteEntry = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => {
            return EntryAPI.deleteEntry(id);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['entries']    })
    })
}