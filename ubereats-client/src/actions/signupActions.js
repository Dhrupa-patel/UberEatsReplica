import { CUSTOMER_SINGUP, OWNER_SIGNUP } from "./types";
import axios from "axios";
import backendServer from "../webConfig";
import { customersignup } from "../graphql/mutations";
import { ownersignup } from "../graphql/mutations";

export const customerSignup = (customerData) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log("signupactions called",backendServer,customerData);
    axios.post(`${backendServer}/graphql`,
        {query: customersignup,
            variables:{
                email: customerData.email,
                password: customerData.password,
                city: customerData.city,
                state: customerData.state,
                country: "United States",
                dateOfBirth: customerData.dob,
                nickname: customerData.nickname,
                name: customerData.firstName+" "+customerData.lastName
            }
        }
    )
    .then(response => dispatch({
        type:CUSTOMER_SINGUP,
        payload:response.data.data.customersignup.status
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
    console.log("signupactions called",ownerData);
    axios.post(`${backendServer}/graphql`,
        {query: ownersignup,
            variables:{
                email: ownerData.email,
                password: ownerData.password,
                name: ownerData.name,
                city: ownerData.city,
                state: ownerData.state,
                country: "United States",
                timings: "9:00 AM - 10:00 PM",
                phoneNumber: ownerData.phonenumber,
                description: ownerData.description,
                menuCategory: ownerData.menucategory,
                deliveryType: ownerData.delivery[0],
            }
        }
    )
    .then(response => dispatch({
        type:OWNER_SIGNUP,
        payload:response.data.data.ownersignup.status
    },console.log("response res = ",response.data)
    ))
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