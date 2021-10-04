import {Component} from "react";
import { Redirect } from "react-router-dom";
import {connect} from "react-redux";
import { userLogin } from "../actions/loginAction"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

class Login extends Component {
    constructor(){
        super();
        this.state={
            theme: createTheme()
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async(e) => {
        e.preventDefault();
        console.log("onsubmit login", this.state);
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        console.log("data",data);
        this.props.userLogin(data);
        console.log("onsubmit prop",this.props);
        await this.setState({
            loggedIn:true
        });
    }
    
    render(){
        console.log("login props", this.props);
        let redirectVar = null;
        let message="";
        let user="/customersignup";
        if(this.props.user && this.props.user.user_id){
            console.log("props called", this.props.user);
            sessionStorage.setItem("username",this.props.user.name);
            sessionStorage.setItem("email_id",this.props.user.email);
            if(localStorage.getItem("userType")==="owner"){
              sessionStorage.setItem("res_user_id",this.props.user.user_id);
            }
            else{
              sessionStorage.setItem("cust_user_id",this.props.user.user_id);
            }
            sessionStorage.setItem("location", this.props.user.location);
            redirectVar = <Redirect to="/home"/>
        }
        else if(this.props.user==="NO_USER" && this.state.loggedIn){
            message = "No user registered with this email ID";
        }
        else if(this.props.user==="INCORRECT_PASSWORD" && this.state.loggedIn){
            message = "Incorrect Password";
        }
        if(localStorage.getItem("userType")==="owner"){
            user = "/ownersignup";
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
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <p>{message}</p>
                <Box component="form" onSubmit={this.onSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    type="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange = {this.onChange}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange = {this.onChange}
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container justify="center">
                    <Grid item>
                        <Link href={user} variant="body2">
                            {"Don't have an account?"}
                        </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
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