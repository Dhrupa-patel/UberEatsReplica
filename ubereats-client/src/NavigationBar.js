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
import Cart from "./components/Orders/Cart";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {Route, withRouter } from "react-router";
import { Modal } from "@mui/material";

class NavigationBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:localStorage.getItem("name"),
            open:false
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

    logout = async()=>{
        window.localStorage.clear();
        window.sessionStorage.clear();
        this.props.userLogout();
        await this.setState({
            logout:true
        });
    }
    handleClickOpen = async()=>{
        await this.setState({
            open:true
        })
    }
    handleClose = async()=>{
        await this.setState({
            open:false
        })
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
                        <Link to="/addDishes"><Button style={{color: "black"}} type="button" color="inherit">Add Dishes</Button></Link>
                        <Link to="/orders"><Button style={{color: "black"}} type="button" color="inherit">Orders</Button></Link>
                    </Grid>
                )
            }
            else if(localStorage.getItem("userType")==="customer"){
                navbar = (
                    <Grid>
                        <Link to="/home"><Button style={{color: "black"}} type="button" color="inherit">Home</Button></Link>
                        <Link to="/profile"><Button style={{color: "black"}} type="button" color="inherit">Profile</Button></Link>
                        <Button style={{color: "black"}} type="button" color="inherit" onClick={this.handleClickOpen}>Cart</Button>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                        >
                            <DialogTitle id="alert-dialog-title">
                            {"Place an Order?"}
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Cart/>
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                            <Button autoFocus>
                                <Link to="/checkout">Checkout</Link>
                            </Button>
                            </DialogActions>
                        </Dialog>
                        <Link to="/favorites"><Button style={{color: "black"}} type="button" color="inherit">Favorites</Button></Link>
                        <Link to="/checkout"><Button style={{color: "black"}} type="button" color="inherit">Orders</Button></Link>
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