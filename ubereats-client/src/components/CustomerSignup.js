import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { customerSignup } from "../actions/signupActions";

class CustomerSignup extends Component{
    constructor(){
        super();
        this.state={}
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) =>{
        e.preventDefault();
        console.log("called submit customersignup");
        const data = {
            name: this.state.name,
            email_id: this.state.email_id,
            password: this.state.password,
            nickname: this.state.nickname,
            city: this.state.city,
            state: this.state.State,
            country: this.state.country,
            dateofbirth: this.state.dateofbirth
        }
        
        this.props.customerSignup(data);
        this.setState({
            signup:true
        });
        console.log(this.props)
    }

    render(){
        let redirectVar = null;
        let message="";
        if(localStorage.getItem("user_id")){
            redirectVar = <Redirect to="/home" />
        }
        else if(this.props.user === "USER_ADDED" && this.state.signup){
            alert("Successfully registered");
            redirectVar = <Redirect to="/login" />
        }
        else if(this.props.user === "USER_EXISTS" && this.state.signup){
            message = "Email ID is already registered";
        }


        return(
            <div>
                {redirectVar}
                <Row>
                    <Col>
                    <div class="container">
                        <div class="login-form">
                            <div class="main-div">
                                <div class="panel">
                                    <h2>SignUp for UberEats Account</h2>
                                </div>
                                <form onSubmit={this.onSubmit}>
                                <div class="form-group">
                                        <input type="text" class="form-control" name="name" onChange={this.onChange} placeholder="Enter your name" required/>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="nickname" onChange={this.onChange} placeholder="Enter your preferred name" required/>
                                    </div>
                                    <div class="form-group">
                                        <input type="email" class="form-control" name="email_id" onChange={this.onChange} placeholder="Enter valid email-id" required/>
                                    </div>
                                    <div class="form-group">
                                        <input type= "password" class="form-control" name="password" onChange={this.onChange} placeholder="Enter password" required />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="city" onChange={this.onChange} placeholder="Enter your city" required/>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="State" onChange={this.onChange} placeholder="Enter your state" required/>
                                    </div>
                                    <div class="form-group">
                                        <label for="counrty">Country:</label>
                                        <select name="country" onChange={this.onChange}>
                                            <option value="India" selected>India</option>
                                            <option value="USA">United State of America</option>
                                            <option value="SriLanka">Sri Lanka</option>
                                            <option value="Nepal">Nepal</option>
                                            <option value="Spain">Spain</option>
                                            <option value="Italy">Italy</option>
                                            <option value="China">China</option>
                                            <option value="Europe">Europe</option>
                                            <option value="Pakistan">Pakistan</option>
                                            <option value="Afganistan">Afganistan</option>
                                            <option value="Australia">Australia</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="dateofbirth">Date of Birth:</label>
                                        <input type="date" class="form-control" onChange={this.onChange} name="dateofbirth" required/>
                                    </div>
                                    <div>{message}</div>
                                    <button type="submit" class="btn btn-primary">SignUp</button><br/><br/>
                                    <div><Link to="/ownersignup">SignUp as Restaurant Owner</Link></div>
                                    <div><Link to="/login">Already have an account?</Link></div>
                                </form>
                            </div>
                        </div>
                    </div>
                    </Col>
                </Row>
            </div>
        );

    }
}

const mapStateToProps = state =>({
    user:state.signup.user
})
export default connect(mapStateToProps, { customerSignup } )(CustomerSignup);