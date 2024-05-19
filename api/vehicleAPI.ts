
import axios from 'axios';
import { BASE_URL } from '../config';
import { CreateVehicleDto } from '../entities/CreateVehicleDTO';




export class vehicleAPI {
    static baseUrl = BASE_URL + "/vehicle";

    static async createVehicle(vehicle: CreateVehicleDto, jwt: string) {
        console.log("jwt from api ",jwt);
        try {

            const response = await axios.post(this.baseUrl, vehicle,
                {
                    headers: {
                        'Authorization': `Bearer ${jwt}`,
                    },
                }
            );
            console.log("response from create vehicle", response.data);
            return response.data;
        } catch (error) {
            console.log("error from create vehicle", error);
        }
    }


    static async getVehicles(jwt: string, id: number) {
        try {
            const response = await axios.get(this.baseUrl,
                {
                    headers: { 
                        'Authorization': `Bearer ${jwt}`,
                     }
                    })
                }catch (error) {
                    console.log("error from get vehicles", error);
                }
            }

}