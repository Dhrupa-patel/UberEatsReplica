import { ADD_CART, DELETE_CART } from "./types";
import axios from "axios";
import backendServer from "../webConfig";
import jwt_decode from "jwt-decode";
import { addtocart } from "../graphql/mutations";

export const addCart = (cartData) => dispatch =>{
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common.authorization = localStorage.getItem("token");
    axios.post(`${backendServer}/graphql`,
        {query: addtocart,
            variables:{
                Dish_ID: cartData.Dish_ID,
                Res_ID: cartData.Res_ID, 
                Dish_Name: cartData.Dish_Name,
                Quantity: cartData.Quantity,
                Dish_Price: cartData.Dish_Price,
                Cust_ID: cartData.Cust_ID,
            }
        }
    )
    .then(response => {
        dispatch({
        type: ADD_CART,
        payload: "added"
    },console.log("response action = ",response.data))})
    .catch(error => {
        if(error.response && error.response.data){
            return dispatch({
                type: ADD_CART,
                payload: error.response.data
            });
        }
    });
}

export const deleteCart = (data) => dispatch =>{
    axios.defaults.headers.common.authorization = localStorage.getItem("token");
    let link = backendServer+"/cart/removeitems";
    axios.post(link, data)
    .then(response => {
        dispatch({
        type: DELETE_CART,
        payload: "removed"
    },console.log("response action = ",response.data))})
    .catch(error => {
        if(error.response && error.response.data){
            return dispatch({
                type: DELETE_CART,
                payload: error.response.data
            });
        }
    });   
}