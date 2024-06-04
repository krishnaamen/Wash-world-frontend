
import { render } from "@testing-library/react-native";
import Loginpage from "../../src/pages/login/Loginpage";
import React from "react";


describe("login page", () => {  
    it("should render login page", () => {
       const loginpage =  render(<Loginpage />);
       const loginbutton = loginpage.getByTestId("loginButton");
        console.log(loginbutton);
    });
    
});
