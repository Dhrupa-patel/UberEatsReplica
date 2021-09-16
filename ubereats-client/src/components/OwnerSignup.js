import { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

class OwnerSignup extends Component{

    render(){

        return(
            <div>
                <Row>
                    <Col>
                    <div class='container'>
                        <div class='login-form'>
                            <div class='main-div'>
                                <div class='panel'>
                                    <h2>SignUp for UberEats Account</h2>
                                </div>
                                <form onSubmit="">
                                    <div class='form-group'>
                                        <input type='text' class='form-control' name='name' placeholder='Enter your name' required/>
                                    </div>
                                    <div class='form-group'>
                                        <input type='text' class='form-control' name='nickname' placeholder='Enter your preferred name' required/>
                                    </div>
                                    <div class='form-group'>
                                        <input type='email' class='form-control' name='email_id' placeholder='Enter valid email-id' required/>
                                    </div>
                                    <div class='form-group'>
                                        <input type='password' class='form-control' name='password' placeholder='Enter password' required />
                                    </div>
                                    <div class='form-group'>
                                        <input type='text' class='form-control' name='city' placeholder='Enter your city' required/>
                                    </div>
                                    <div class='form-group'>
                                        <input type='text' class='form-control' name='state' placeholder='Enter your state' required/>
                                    </div>
                                    <div class='form-group'>
                                        <label for='counrty'>Country:</label>
                                        <select name='country'>
                                            <option value='India'>India</option>
                                            <option value='USA'>United State of America</option>
                                            <option value='SriLanka'>Sri Lanka</option>
                                            <option value='Nepal'>Nepal</option>
                                            <option value='Spain'>Spain</option>
                                            <option value='Italy'>Italy</option>
                                            <option value='China'>China</option>
                                            <option value='Europe'>Europe</option>
                                            <option value='Pakistan'>Pakistan</option>
                                            <option value='Afganistan'>Afganistan</option>
                                            <option value='Australia'>Australia</option>
                                        </select>
                                    </div>
                                    <div>
                                        <input type='text' class='form-control' name='description' placeholder='Description...' required/>
                                    </div>
                                    <div class='from-group'>
                                        <label for="starttime">Enter StartTime</label>
                                        <input type='time' class='form-control' name='starttime' required/>
                                        <label for="endtime">Enter EndTime</label>
                                        <input type='time' class='form-control' name='endtime' required/>
                                    </div>
                                    <div class='form-group'>
                                        <input type='text' class='form-control' name='phone_no' placeholder='Enter phone number' required/>
                                    </div>
            
                                    <button type='submit' class='btn btn-primary'>SignUp</button><br/><br/>
                                    <div><Link to='/customersignup'>SignUp as Customer</Link></div>
                                    <div><Link to='/login'>Already have an account?</Link></div>
                                </form>
                            </div>
                        </div>
                    </div>
                    </Col>
                </Row>
            </div>
        )

    }
}

export default OwnerSignup;