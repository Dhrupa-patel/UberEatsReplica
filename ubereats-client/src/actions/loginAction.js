import axiosInstance from "../helper/axios"


export const userLogin = (loginData) => dispatch =>{
    axiosInstance.defaults.withCredentials = true;

}