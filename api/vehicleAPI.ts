
import axios from 'axios';
import { BASE_URL } from '../config';
import { CreateVehicleDto } from '../entities/CreateVehicleDTO';
import * as SecureStore from 'expo-secure-store';




export class vehicleAPI {
    static baseUrl = BASE_URL + "/vehicle";
    static baseUrl1 = BASE_URL + "/washplan";

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
        console.log(" vehicle list from api", response.data)
        if (response.data) {
            await SecureStore.setItemAsync('vehicles', JSON.stringify(response.data));
            console.log("response from get vehicles", response.data[0]);
            await SecureStore.setItemAsync('current_vehicle', response.data[0].licencePlateNumber);
            //return response.data[0].licencePlateNumber;
            return response.data[0];
        }

    }


    static async updateVehicleWithPlan(jwt: string, id: number, createVehicleDto: CreateVehicleDto) {
        try {

            console.log("dto from update vehicle", createVehicleDto);

            const response = await axios.patch(this.baseUrl + `/${id}`, createVehicleDto, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
            });

            console.log("response from create vehicle", response.data);
            return response.data;
        } catch (error) {
            console.log("error from create vehicle", error);
        }
    }





    static async resetVehicleWithPlan(jwt: string, id: number, createVehicleDto: CreateVehicleDto) {
        try {

            console.log("dto from update vehicle", createVehicleDto);

            const response = await axios.patch(this.baseUrl + `/${id}`, createVehicleDto, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
            });

            console.log("response from reset  vehicle", response.data);
            return response.data;
        } catch (error) {
            console.log("error from create vehicle", error);
        }
    }





    static async getCurrentPlan(jwt: string, id: number) {
        try {
            const response = await axios.get(this.baseUrl + `/${id}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
            });

            console.log("response from get current plan from api call from vehicle", response.data);
            return response.data;



        } catch (error) {
            console.log("error from get plan", error);
        }

    }

    static async getPlans(jwt: string) {
        try {
            const response = await axios.get(this.baseUrl1, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
            });

            console.log("response from get plan", response.data);
            return response.data;
        } catch (error) {
            console.log("error from get plan", error);
        }
    }

}