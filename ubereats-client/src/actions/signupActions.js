import { CUSTOMER_SINGUP, OWNER_SIGNUP } from "./types";
import axios from "axios";
import backendServer from "../webConfig";

export const customerSignup = (customerData) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log("signupactions called",backendServer,customerData);
    axios.post(`${backendServer}/signup/customer`, customerData)
    .then(response => dispatch({
        type:CUSTOMER_SINGUP,
        payload:response.data
    },console.log("respons = ",response.data))
    
    )
    .catch(error => {
        if(error.response && error.response.data){
            return dispatch({
                type:CUSTOMER_SINGUP,
                payload:error.response.data
            });
        }
        return;
    });
}

export const ownerSignup = (ownerData) => dispatch =>{
    axios.defaults.withCredentials=true;
    axios.post(`${backendServer}/signup/owner`,ownerData)
    .then(response => dispatch({
        type:OWNER_SIGNUP,
        payload:response.data
    }))
    .catch(error => {
        if(error.response && error.response.data){
            return dispatch({
                type:OWNER_SIGNUP,
                payload:error.response.data
            });
        }
        return;
    });
}