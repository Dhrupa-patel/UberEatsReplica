import { Component } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { customerSignup } from "../actions/signupActions";
import axios from "axios";
import backendServer from "../webConfig";
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

class CustomerSignup extends Component{
    constructor(){
        super();
        this.state={
            theme:createTheme()
        }
    }

    componentDidMount(){
        axios.get(`${backendServer}/login/customer`).then(response =>{
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

    onSubmit = (e) =>{
        e.preventDefault();
        console.log("called submit customersignup", this.state);
        if (this.state.emails_ids["Emails"].includes(this.state.email)){
            console.log("already exists");
            this.setState({
                email_id_exists:true
            });
            return;
        }
        else{
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
    }

    render(){
        let redirectVar = null;
        let message="";
        if(localStorage.getItem("cust_user_id")){
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
        );

    }
}

const mapStateToProps = state =>({
    user:state.signup.user
})
export default connect(mapStateToProps, { customerSignup } )(CustomerSignup);