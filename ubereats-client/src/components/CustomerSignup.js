import { Component } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { customerSignup } from "../actions/signupActions";

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

class CustomerSignup extends Component{
    constructor(){
        super();
        this.state={
            theme:createTheme()
        }
    }

    onChange = (e) =>{
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) =>{
        e.preventDefault();
        console.log("called submit customersignup", this.state);
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            // nickname: this.state.nickname,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            // dateofbirth: this.state.dateofbirth
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
            console.log("alert called");
            alert("Successfully registered");
            redirectVar = <Redirect to="/login" />
        }
        else if(this.props.user === "USER_EXISTS" && this.state.signup){
            message = "Email ID is already registered";
        }


        return(

            <ThemeProvider theme={this.state.theme}>
                {redirectVar}
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <p>{message}</p>
                    <Box component="form" noValidate onSubmit={this.onSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                autoComplete="fname"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                onChange={this.onChange}
                                autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                name="city"
                                label="City"
                                id="city"
                                autoComplete="city"
                                onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                name="state"
                                label="State"
                                id="state"
                                autoComplete="state"
                                onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                <InputLabel id="country">Country</InputLabel>
                                <Select
                                labelId="country"
                                id="country"
                                value={"India"}
                                label="Country"
                                name="country"
                                onChange={this.onChange}
                                >
                                <MenuItem value={"India"}>India</MenuItem>
                                <MenuItem value={"United States"}>United States</MenuItem>
                                <MenuItem value={"Australia"}>Australia</MenuItem>
                                </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign Up
                        </Button>
                        <Grid container justify="center">
                        <Grid item>
                            <Link href="/login" variant="body2">
                            Already have an account? Sign in
                            </Link>
                        </Grid>
                        </Grid>
                    </Box>
                    </Box>
                </Container>
            </ThemeProvider>


            // <div>
            //     {redirectVar}
            //     <Row>
            //         <Col>
            //         <div class="container">
            //             <div class="login-form">
            //                 <div class="main-div">
            //                     <div class="panel">
            //                         <h2>SignUp for UberEats Account</h2>
            //                     </div>
            //                     <form onSubmit={this.onSubmit}>
            //                     <div class="form-group">
            //                             <input type="text" class="form-control" name="name" onChange={this.onChange} placeholder="Enter your name" required/>
            //                         </div>
            //                         <div class="form-group">
            //                             <input type="text" class="form-control" name="nickname" onChange={this.onChange} placeholder="Enter your preferred name" required/>
            //                         </div>
            //                         <div class="form-group">
            //                             <input type="email" class="form-control" name="email_id" onChange={this.onChange} placeholder="Enter valid email-id" required/>
            //                         </div>
            //                         <div class="form-group">
            //                             <input type= "password" class="form-control" name="password" onChange={this.onChange} placeholder="Enter password" required />
            //                         </div>
            //                         <div class="form-group">
            //                             <input type="text" class="form-control" name="city" onChange={this.onChange} placeholder="Enter your city" required/>
            //                         </div>
            //                         <div class="form-group">
            //                             <input type="text" class="form-control" name="State" onChange={this.onChange} placeholder="Enter your state" required/>
            //                         </div>
            //                         <div class="form-group">
            //                             <label for="counrty">Country:</label>
            //                             <select name="country" onChange={this.onChange}>
            //                                 <option value="India" selected>India</option>
            //                                 <option value="USA">United State of America</option>
            //                                 <option value="SriLanka">Sri Lanka</option>
            //                                 <option value="Nepal">Nepal</option>
            //                                 <option value="Spain">Spain</option>
            //                                 <option value="Italy">Italy</option>
            //                                 <option value="China">China</option>
            //                                 <option value="Europe">Europe</option>
            //                                 <option value="Pakistan">Pakistan</option>
            //                                 <option value="Afganistan">Afganistan</option>
            //                                 <option value="Australia">Australia</option>
            //                             </select>
            //                         </div>
            //                         <div class="form-group">
            //                             <label for="dateofbirth">Date of Birth:</label>
            //                             <input type="date" class="form-control" onChange={this.onChange} name="dateofbirth" required/>
            //                         </div>
            //                         <div>{message}</div>
            //                         <button type="submit" class="btn btn-primary">SignUp</button><br/><br/>
            //                         <div><Link to="/ownersignup">SignUp as Restaurant Owner</Link></div>
            //                         <div><Link to="/login">Already have an account?</Link></div>
            //                     </form>
            //                 </div>
            //             </div>
            //         </div>
            //         </Col>
            //     </Row>
            // </div>
        );

    }
}

const mapStateToProps = state =>({
    user:state.signup.user
})
export default connect(mapStateToProps, { customerSignup } )(CustomerSignup);