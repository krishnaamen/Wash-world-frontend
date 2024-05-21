
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from '../config';




export class washPlanAPI {
    static baseUrl = BASE_URL + "/washplan";

static async getPlans(jwt: string) {
  
    const response = await axios.get(this.baseUrl,
        {
            headers: {
                'Authorization': `Bearer ${jwt}`,
            }
        })
        console.log(" washplan list from api",response.data);
        return response.data;
     
    }

}
