import axios from 'axios'
import { Category } from '../entities/category'
import { CreateCategoryDTO } from '../entities/CreateCategoryDTO'
import { BASE_URL } from '../config'

export class CategoriesAPI {
    static baseUrl = BASE_URL+"/categories";

    static async fetchAll() {
        const response = await axios.get (this.baseUrl);
        console.log("categories ", response.data);
        return response.data;
    }
    static async createCategory(category: CreateCategoryDTO){
        const response = await axios.post(this.baseUrl, category);
        return response.data;
    }
}