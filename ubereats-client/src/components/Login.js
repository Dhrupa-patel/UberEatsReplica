import React, {Component} from "react";
import { Row, Col } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import { userLogin } from "../actions/loginAction"

class Login extends Component {
    constructor(){
        super();
        this.state={};
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("onsubmit login", this.state);
        const data = {
            email_id: this.state.email,
            password: this.state.password
        }
        console.log("data",data);
        this.props.userLogin(data);
        console.log("onsubmit prop",this.props);
        this.setState({
            loggedIn:true
        });
    }

    render(){
        console.log("login props", this.props);
        let redirectVar = null;
        let message="";
        if(this.props.user && this.props.user.user_id){
            console.log("props calles");
            localStorage.setItem("username",this.props.user.name);
            localStorage.setItem("email_id",this.props.user.email_id);
            localStorage.setItem("user_id",this.props.user.userid);
            redirectVar = <Redirect to="/home"/>
        }
        else if(this.props.user==="NO_USER" && this.state.loggedIn){
            message = "No user registered with this email ID";
        }
        else if(this.props.user==="INCORRECT_PASSWORD" && this.state.loggedIn){
            message = "Incorrect Password";
        }
        return(
            <div>
                {redirectVar}
                <div>
                    <Row>
                        <Col>
                            <div class="login-form">
                                <div class="main-div">
                                    <div class="panel">
                                        <h2>SignIn with your UberEats Account</h2>
                                    </div><br/>
                                    <form onSubmit={this.onSubmit}>
                                        <div>{message}</div><br />
                                        <div class="form-group">
                                            <input type="email" class="form-control" onChange={this.onChange} name="email" placeholder="Enter your EmailID" required/>

                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" onChange={this.onChange} name="password" placeholder="Enter Password" required />

                                        </div>
                                        {/* <div class="form-group">
                                            <label for="usertype">Country:</label>
                                            <select name="usertype" id="usertype">
                                                <option value="owner">Restaurant Owner</option>
                                                <option value="customer">Customer</option>
                                            </select>
                                        </div> */}
                                        <button type="submit" class="btn btn-primary">SignIn</button><br /><br />
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
}

const mapStateToProps = state =>{
    console.log(state);
    return({
        user: state.login.user
    })
};

export default connect(mapStateToProps,{ userLogin })(Login);