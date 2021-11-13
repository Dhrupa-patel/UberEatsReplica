import axiosInstance from "../helper/axios"
import { USER_LOGIN, USER_LOGOUT } from "./types";
import axios from "axios";
import backendServer from "../webConfig";
import jwt_decode from "jwt-decode";

export const userLogin = (loginData) => dispatch =>{
    axios.defaults.withCredentials = true;
    let link = backendServer+"/login/"+localStorage.getItem("userType");
    axios.post(link, loginData)
    .then(response => {
        const tokenArray = response.data.token.split(" ");
        console.log("token Array", tokenArray);
        localStorage.setItem("token", response.data.token);
        let decodedToken = jwt_decode(tokenArray[1]);
        console.log(decodedToken);
        dispatch({
        type: USER_LOGIN,
        payload: decodedToken
    },console.log("response action = ",response.data))})
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