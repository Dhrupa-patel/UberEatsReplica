import React, {Component} from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import axiosInstance from "../helper/axios";

function Login() {
    const history = useHistory();
    const loadSuccess = () => {
        history.push("/dashboard");
    }

    function login(){
        axiosInstance.post("/setuser", {user:document.getElementById("usertype").value}).then((response)=>{
            console.log(response);
        });
        loadSuccess();
    }
    return(
        <div>
            <div>
                <Row>
                    <Col>
                        <div class="login-form">
                            <div class='main-div'>
                                <div class='panel'>
                                    <h2>SignIn with your UberEats Account</h2>
                                </div><br/>
                                <form>
                                    <div>Login In</div><br />
                                    <div class="form-group">
                                        <input type="email" class="form-control" name="email" placeholder="Enter your EmailID" required/>

                                    </div>
                                    <div>
                                        <input type="password" class="form-control" name="password" placeholder="Enter Password" required />

                                    </div>
                                    <div>
                                        <label for="usertype">Country:</label>
                                        <select name="usertype" id='usertype'>
                                            <option value="owner">Restaurant Owner</option>
                                            <option value="customer">Customer</option>
                                        </select>
                                    </div>
                                    <button type="button" onClick={()=> login()} class="btn btn-primary">SignIn</button><br /><br />
                                    <div><center><Link to="/CustomerSignup">Create new Account</Link></center></div>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Login;