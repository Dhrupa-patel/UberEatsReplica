import { Component } from "react";
import { Redirect } from "react-router-dom";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from "react-redux";
import { ownerSignup } from "../actions/signupActions";
import { TextareaAutosize } from "@mui/material";
import axios from "axios";
import backendServer from "../webConfig";


class OwnerSignup extends Component{
    constructor(){
        super();
        this.state={
            theme:createTheme()
        }
    }
    
    async componentDidMount(){
        await axios.get(`${backendServer}/login/owner/`).then(response =>{
            console.log("response data", response.data);
            if(response.data){
                this.setState({
                    emails_ids:response.data
                })
            }
        }).catch(error =>{
            if(error.response && error.response.data){
                console.log(error.response.data);
            }
        })
        console.log(this.state.emails_ids);
    }

    onChange = (e) =>{
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = async(e) =>{
        e.preventDefault();
        console.log("called submit ownersignup", this.state);
        if (this.state.emails_ids["Emails"].includes(this.state.email)){
            console.log("already exists");
            await this.setState({
                email_id_exists:true
            });
            return;
        }
        else{
            const data = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                city: this.state.city,
                state: this.state.state,
                country: this.state.country,
                description: this.state.description
            }
            
            this.props.ownerSignup(data);
            await this.setState({
                signup:true
            });
            console.log(this.props)
        }
    }

    render(){
        let redirectVar = null;
        let message="";
        if(localStorage.getItem("res_user_id")){
            redirectVar = <Redirect to="/home" />
        }
        else if(this.props.user === "USER_ADDED" && this.state.signup){
            console.log("alert called");
            message = "Successfully got Added!"
            redirectVar = <Redirect to="/login" />
        }
        else if(this.state.email_id_exists){
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
                    <Box component="form" onSubmit={this.onSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                autoComplete="name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Restaurant's Name"
                                onChange={this.onChange}
                                autoFocus
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
                                defaultValue={"India"}
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
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                <InputLabel id="Delivery_Type">Delivery Type</InputLabel>
                                <Select
                                labelId="Delivery_Type"
                                id="DeliveryType"
                                defaultValue={"Delivery"}
                                label="DeliveryType"
                                name="DeliveryType"
                                onChange={this.onChange}
                                >
                                <MenuItem value={"Delivery"}>Delivery</MenuItem>
                                <MenuItem value={"Pickup"}>Pickup</MenuItem>
                                </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="description"
                                    label="Description"
                                    id="description"
                                    autoComplete="What's your tagline!"
                                    onChange={this.onChange}
                                    />
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
            //     <Row>
            //         <Col>
            //         <div class="container">
            //             <div class="login-form">
            //                 <div class="main-div">
            //                     <div class="panel">
            //                         <h2>SignUp for UberEats Account</h2>
            //                     </div>
            //                     <form onSubmit="/login">
            //                         <div class="form-group">
            //                             <input type="text" class="form-control" name="name" placeholder="Enter your name" required/>
            //                         </div>
            //                         <div class="form-group">
            //                             <input type="email" class="form-control" name="email_id" placeholder="Enter valid email-id" required/>
            //                         </div>
            //                         <div class="form-group">
            //                             <input type= "password" class="form-control" name="password" placeholder="Enter password" required />
            //                         </div>
            //                         <div class="form-group">
            //                             <input type="text" class="form-control" name="city" placeholder="Enter your city" required/>
            //                         </div>
            //                         <div class="form-group">
            //                             <input type="text" class="form-control" name="state" placeholder="Enter your state" required/>
            //                         </div>
            //                         <div class="form-group">
            //                             <label for="counrty">Country:</label>
            //                             <select name="country">
            //                                 <option value="India">India</option>
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
            //                         <div>
            //                             <input type='text' class="form-group" name="description" placeholder="Description..." required/>
            //                         </div>
            //                         <div class="form-group">
            //                             <label for="starttime">Enter StartTime</label>
            //                             <input type='time' class="form-control" name="starttime" required/><br/>
            //                             <label for="endtime">Enter EndTime</label>
            //                             <input type='time' class="form-control" name="endtime" required/>
            //                         </div>
            //                         <div class="form-group">
            //                             <input type="text" class="form-control" name="phone_no" placeholder="Enter phone number" required/>
            //                         </div>
            
            //                         <button type="submit" class="btn btn-primary">SignUp</button><br/><br/>
            //                         <div><Link to="/customersignup">SignUp as Customer</Link></div>
            //                         <div><Link to="/login">Already have an account?</Link></div>
            //                     </form>
            //                 </div>
            //             </div>
            //         </div>
            //         </Col>
            //     </Row>
            // </div>
        )

    }
}
const mapStateToProps = state =>({
    user:state.signup.user
})

export default connect(mapStateToProps, { ownerSignup } )(OwnerSignup);