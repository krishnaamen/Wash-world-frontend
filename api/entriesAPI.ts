import axios from 'axios'
import { Entry } from '../entities/entry'
import { CreateEntryDTO } from '../entities/CreateEntryDTO'
import { UpdateEntryDTO } from '../entities/UpdateEntryDTO'
import { BASE_URL } from '../config'
import * as SecureStore from 'expo-secure-store'

export class EntryAPI {
    static baseUrl = BASE_URL+"/entries";

    static async fetchAllEntries(jwt:string) {
        const response = await axios.get(this.baseUrl, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
        });
        return response.data;
    }

    static async fetchSingleEntry(id:number){
        const response = await axios.get(`${this.baseUrl}/${id}`)
    }
    static async createEntry(entry: CreateEntryDTO,jwt:string){
        console.log("jwt from api ",jwt);
        const response = await axios.post(this.baseUrl, entry,
            {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  // Add your JWT token to the authorization header if needed
                  Authorization: `Bearer ${jwt}`,
                },
            }
            );
        return response.data;
    }

    static async deleteEntry(id:number){
        const response = await axios.delete(`${this.baseUrl}/${id}`)
        return response.data
    }

    static async updateEntry(entry:UpdateEntryDTO, id:number){
        const response = await axios.put(`${this.baseUrl}/${id}`, entry )
        return response.data;
    }

    
}