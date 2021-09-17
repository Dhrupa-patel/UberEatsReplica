import { Component } from "react";
import { Redirect } from "react-router";
import CustomerHome from "./CustomerHome";
import OwnerHome from "./OwnerHome";
import NavigationBar from "../../NavigationBar";

class Home extends Component{
    render(){
        let homecomponent = null;
        let redirectvar = null;
        if('userType' in sessionStorage){
            if(sessionStorage.getItem("userType")==="customer"){
                homecomponent = <CustomerHome />
            }
            else{
                homecomponent = <OwnerHome />
            }
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