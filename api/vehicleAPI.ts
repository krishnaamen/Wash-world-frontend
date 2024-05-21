
import axios from 'axios';
import { BASE_URL } from '../config';
import { CreateVehicleDto } from '../entities/CreateVehicleDTO';
import * as SecureStore from 'expo-secure-store';




export class vehicleAPI {
    static baseUrl = BASE_URL + "/vehicle";

    static async createVehicle(vehicle: CreateVehicleDto, jwt: string) {

        try {

            console.log("jwt from api ", jwt);
            console.log(vehicle);
            const response = await axios.post(this.baseUrl, vehicle,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("response from create vehicle", response.data);
            return response.data;
            


        } catch (error) {
            console.log("error from create vehicle", error);
        }



    }


    static async getVehicles(jwt: string) {
  
            const response = await axios.get(this.baseUrl,
                {
                    headers: {
                        'Authorization': `Bearer ${jwt}`,
                    }
                })

                if(response.data){
                    await SecureStore.setItemAsync('vehicles', JSON.stringify(response.data));
                    console.log("response from get vehicles", response.data[0]);
                return response.data[0].licencePlateNumber;
                }
             
            }
            
         
    

}