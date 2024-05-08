import axios from 'axios';
import { BASE_URL } from '../config';
import { LoginDTO } from '../entities/LoginDTO';
import { SignUpDTO } from '../entities/SignUpDTO';


export class UserAPI {
    static baseUrl = `${BASE_URL}/auth`

    static async login(logindto:LoginDTO) {
        const{email,password} = logindto;
        const response = await axios.post(this.baseUrl + "/sign-in", { email, password } )
        return response.data;
    }

    static async signup(signUpDTO: SignUpDTO) {
        const {firstName,lastName,email,password,birthDate,username} = signUpDTO;
        console.log("data from frontend before calling signup ",signUpDTO)
        const response = await axios.post(this.baseUrl + "/sign-up", { firstName,lastName,birthDate,email,username,password } )
        console.log("response from backend after calling signup ", await response);
        return response.data;
    }
    static async logout() {
        console.log("Not implemented yet")
    }
}