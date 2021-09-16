import { Component } from "react";
import { useHistory } from "react-router";
import axiosInstance from "../helper/axios";


function LandingPage() {

    const history = useHistory();
    const loadSuccess = () => {
        history.push('/login');
    }

    function login(userType){
        console.log("hii");
        axiosInstance.post('/setuser', {user:userType}).then((response)=>{
            console.log(response);
        });
        loadSuccess();
    }
        return(
            <div style={{ margin:'20%' }}>
                <center>
                    <div class='row'>
                        <div class="col-sm-6">
                            <div class="card">
                            <div class="card-body">
                                <button type='button' onClick={()=> login('customer')} value='Customer'>Customer</button>
                            </div>
                            </div>
                        </div>
                        <div class='col-sm-6'>
                            <div class='card'>
                            <div class="card-body">
                                <button type='button' onClick={() => login('owner')} value='Restaurant'>Restaurant</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </center><br /><br /><br />
            </div>
        );
}

export default LandingPage;