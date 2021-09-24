import { Component } from "react";
import { Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { userLogout } from "./actions/loginAction"
import Grid from '@mui/material/Grid';
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {Route, withRouter } from "react-router";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

class NavigationBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:localStorage.getItem("name"),
        }
    }

    redirect = (e) =>{
        if(e.target.value==="profile"){
            this.props.history.push("/profile");
        }
        else if(e.target.value==="cart"){
            this.props.history.push("/cart");
        }
        else{
            this.props.history.push("/home");
        }
    }

    logout = ()=>{
        window.localStorage.clear();
        this.props.userLogout();
        this.setState({
            logout:true
        });
    }
    

    render(){
        let navbar = null;
        let redirectVar = null;
        let searchbar = null;
        console.log("userType" in localStorage);
        if(this.state.logout){
            redirectVar = <Redirect to="/" />
        }

        if("userType" in localStorage){
            if(localStorage.getItem("userType")==="owner"){
                navbar=(
                    <Grid sx={6}>
                        <Link to="/home"><Button style={{color: "black"}} type="button" color="inherit">Home</Button></Link>
                        <Link to="/profile"><Button style={{color: "black"}} type="button" color="inherit">Profile</Button></Link>
                        <Link to="/addEditDishes"><Button style={{color: "black"}} type="button" color="inherit">Add/Edit Dishes</Button></Link>
                        <Link to="/pendingOrders"><Button style={{color: "black"}} type="button" color="inherit">Pending Orders</Button></Link>
                    </Grid>
                )
            }
            else if(localStorage.getItem("userType")==="customer"){
                navbar = (
                    <Grid>
                        <Link to="/home"><Button style={{color: "black"}} type="button" color="inherit">Home</Button></Link>
                        <Link to="/profile"><Button style={{color: "black"}} type="button" color="inherit">Profile</Button></Link>
                        <Link to="/cart"><Button style={{color: "black"}} type="button" color="inherit">Cart</Button></Link>
                    </Grid>
                )
            }
            else{
                redirectVar = <Redirect to="/" />
            }

        }
        else{
            redirectVar = <Redirect to="/" />
        }

        return(
            <Box>
                    {redirectVar}
                    <AppBar position="static">
                    <Toolbar>
                    <Grid container>
                        <Grid item xs={2}>
                            <Typography variant="h6" component="div" sx={{flexGrow:0.25}}>
                                UberEats
                            </Typography>
                        </Grid>
                        {navbar}
                        <Grid xs={2}>
                            <Button style={{color: "black"}} type="submit" onClick={this.logout} color="inherit">Logout</Button>
                        </Grid>
                    </Grid>
                    </Toolbar>
                </AppBar>
            </Box>




            // <div>
            //     <Navbar>
            //         <Navbar.Brand>
            //             <Link to="/">Home</Link>
            //         </Navbar.Brand>
            //         {navUser}
            //     </Navbar>
            // </div>
        )

    }


}

export default connect(null, { userLogout })(NavigationBar);