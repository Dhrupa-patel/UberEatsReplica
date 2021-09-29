import { Component } from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CustomerProfile from "../Profile/CustomerProfile";
import OwnerProfile from "../Profile/OwnerProfile";
import { Redirect } from "react-router";
import NavigationBar from "../../NavigationBar";

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

class Profile extends Component{
    render(){
        let profileComponent = null;
        let redirectVar = null;
        if(localStorage.getItem("userType") && (sessionStorage.getItem("res_user_id")||sessionStorage.getItem("cust_user_id"))){
            if(localStorage.getItem("userType")==="customer"){
                profileComponent = <CustomerProfile />
            }
            else{
                profileComponent = <OwnerProfile />
            }
        }
        else{
            redirectVar = <Redirect to="/" />
        }
        return(
            <div>
                {redirectVar}
                <NavigationBar/>
                {profileComponent}
            </div>
        );
    }

}

export default Profile;