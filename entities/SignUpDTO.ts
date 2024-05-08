
export class SignUpDTO {
   firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;
    username: string;
    password: string;
    

    constructor(firstName: string, lastName: string, birthDate: Date, email: string, username: string, password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
        this.username = username;
        this.password = password;
    }   
}