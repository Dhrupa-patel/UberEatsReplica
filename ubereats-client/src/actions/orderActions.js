import { UPDATE_STATUS, PLACE_ORDER } from "./types";
import axios from "axios";
import backendServer from "../webConfig";
import jwt_decode from "jwt-decode";
import { changestatus } from "../graphql/mutations";

export const updateStatus = (data) => dispatch =>{
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common.authorization = localStorage.getItem("token");
    axios.post(`${backendServer}/graphql`,
        {query: changestatus,
            variables:{
                Order_ID: data.Order_ID,
                Order_Status: data.Order_Status
            }
        }
    )
    .then(response => {
        dispatch({
        type: UPDATE_STATUS,
        payload: "updated"
    },console.log("response action = ",response.data))})
    .catch(error => {
        if(error.response && error.response.data){
            return dispatch({
                type: UPDATE_STATUS,
                payload: error.response.data
            });
        }
    });
}

export const placeOrder = (data) => dispatch =>{
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common.authorization = localStorage.getItem("token");
    let link = backendServer+"/cart/placeorder";
    axios.post(link, data)
    .then(response => {
        dispatch({
        type: PLACE_ORDER,
        payload: "order got placed!"
    },console.log("response action = ",response.data))})
    .catch(error => {
        if(error.response && error.response.data){
            return dispatch({
                type: PLACE_ORDER,
                payload: error.response.data
            });
        }
    });
}
