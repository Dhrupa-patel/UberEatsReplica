import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        
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
                                    <form onSubmit="">
                                        <div>Login In</div><br />
                                        <div class="form-group">
                                            <input type='email' class='form-control' name='email' placeholder="Enter your EmailID" required/>

                                        </div>
                                        <div>
                                            <input type='password' class='form-control' name='password' placeholder='Enter Password' required />

                                        </div>
                                        <button type='submit' class='btn btn-primary'>SignIn</button><br /><br />
                                        <div><center><Link to='/CustomerSignup'>Create new Account</Link></center></div>
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

export default Login;