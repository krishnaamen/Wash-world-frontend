import axios from "axios"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BASE_URL } from "../config";
import { EntryAPI } from "../api/entriesAPI";
import { CreateEntryDTO } from "../entities/CreateEntryDTO";
import { UpdateEntryDTO } from "../entities/UpdateEntryDTO";
import { CategoriesAPI } from "../api/categoriesAPI";
import { Category } from "../entities/category";
import { CreateCategoryDTO } from "../entities/CreateCategoryDTO";
 
const url = BASE_URL+"/categories"

export const useGetCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await axios.get<Category[]>(url);
            console.log(response.data);
            return response.data;
            
        },
    })
}

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newCategory: CreateCategoryDTO) => {
            return axios.post(url, newCategory)
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories']    })
    })
}