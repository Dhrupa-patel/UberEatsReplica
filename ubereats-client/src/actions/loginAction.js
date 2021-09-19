import axiosInstance from "../helper/axios"
import { USER_LOGIN, USER_LOGOUT } from "./types";
import axios from "axios";
import backendServer from "../webConfig";

export const userLogin = (loginData) => dispatch =>{
    axios.defaults.withCredentials = true;
    let link = backendServer+"/login/"+localStorage.getItem("userType");
    console.log("link",link, loginData);
    axios.post(link, loginData)
    .then(response => dispatch({
        type: USER_LOGIN,
        payload: response.data
    },console.log("respons = ",response.data)))
    .catch(error => {
        if(error.response && error.response.data){
            return dispatch({
                type: USER_LOGIN,
                payload: error.response.data
            });
        }
    });
}

export const userLogout = () => dispatch => dispatch({type: USER_LOGOUT});