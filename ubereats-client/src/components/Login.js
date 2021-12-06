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
import axios from "axios";
import backendServer from "../webConfig";

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
        let query;
        if(localStorage.getItem("userType")==="customer"){
          query = await `mutation($email: String!, $password: String!, $usertype: String!){
                customerlogin(email: $email, password: $password, usertype: $usertype){
                      email
                      _id
                      state
                      name
                  }
              }
          `
        }
        else{
          query = await `mutation($email: String!, $password: String!, $usertype: String!){
                ownerlogin(email: $email, password: $password, usertype: $usertype){
                      email
                      _id
                      state
                      name
                  }
              }
          `
        }
        var login = await axios.post(`${backendServer}/graphql`,
            {query:query,
            variables:{
                email:data.email,
                password:data.password,
                usertype:"customer"
            }
        }
        );
        console.log("login ",login.data.data)
        sessionStorage.setItem("username",login.data.data.customerlogin.name);
        sessionStorage.setItem("email_id",login.data.data.customerlogin.email);
        sessionStorage.setItem("location", login.data.data.customerlogin.state);
        if(localStorage.getItem("userType")==="owner"){
          sessionStorage.setItem("res_user_id",login.data.data.customerlogin._id);
        }
        else{
          sessionStorage.setItem("cust_user_id",login.data.data.customerlogin._id);
        }
        // this.props.userLogin(data);
        // console.log("onsubmit prop",this.props);
        await this.setState({
            loggedIn:true
        });
    }
    
    render(){
        console.log("login props", this.props.user);
        let redirectVar = null;
        let message="";
        let user="/customersignup";
        if('location' in sessionStorage){
            redirectVar = <Redirect to="/home"/>
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