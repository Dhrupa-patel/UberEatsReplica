import { Component } from "react";
import { Redirect } from "react-router";
import CustomerHome from "./CustomerHome";
import OwnerHome from "./OwnerHome";

class Home extends Component{
    render(){
        let homecomponent = null;
        let redirectvar = null;
        if(localStorage.getItem("userType")==="customer"){
            homecomponent = <CustomerHome />
        }
        else if(localStorage.getItem("userType")==="owner"){
            console.log("hello");
            homecomponent = <OwnerHome />
        }
        else{
            redirectvar = <Redirect to="/" />
        }
        
        return(
            <div>
                { redirectvar }
                { homecomponent }
            </div>
        );


    }
}
export default Home;