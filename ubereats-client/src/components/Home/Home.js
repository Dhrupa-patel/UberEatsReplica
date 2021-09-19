import { Component } from "react";
import { Redirect } from "react-router";
import CustomerHome from "./CustomerHome";
import OwnerHome from "./OwnerHome";
import NavigationBar from "../../NavigationBar";

class Home extends Component{
    render(){
        let homecomponent = null;
        let redirectvar = null;
        if(localStorage.getItem("userType")==="customer"){
            homecomponent = <CustomerHome />
        }
        else if(localStorage.getItem("usertType")==="owner"){
            homecomponent = <OwnerHome />
        }
        else{
            redirectvar = <Redirect to="/" />
        }
        
        return(
            <div>
                { redirectvar }
                <NavigationBar />
                { homecomponent }
            </div>
        );


    }
}
export default Home;