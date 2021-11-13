import { ADD_ITEM, DELETE_ITEM } from "./types";
import axios from "axios";
import backendServer from "../webConfig";
import jwt_decode from "jwt-decode";

export const addItem = (cartData) => dispatch =>{
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common.authorization = localStorage.getItem("token");
    let link = backendServer+"/menu/additem";
    axios.post(link, cartData)
    .then(response => {
        dispatch({
        type: ADD_ITEM,
        payload: "added"
    },console.log("response action = ",response.data))})
    .catch(error => {
        if(error.response && error.response.data){
            return dispatch({
                type: ADD_ITEM,
                payload: error.response.data
            });
        }
    });
}

export const deleteItem = (data) => dispatch =>{
    axios.defaults.headers.common.authorization = localStorage.getItem("token");
    let link = backendServer+"/menu/delete";
    axios.post(link, data)
    .then(response => {
        dispatch({
        type: DELETE_ITEM,
        payload: "removed"
    },console.log("response action = ",response.data))})
    .catch(error => {
        if(error.response && error.response.data){
            return dispatch({
                type: DELETE_ITEM,
                payload: error.response.data
            });
        }
    });   
}