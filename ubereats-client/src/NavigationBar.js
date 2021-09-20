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

class NavigationBar extends Component{
    constructor(){
        super();

        this.state = {
            name:localStorage.getItem("name")
        }
    }

    render(){
        let navUser = null;
        let pendingOrders = null;
        let nameMsg = null;

        if(localStorage.getItem("userType") && localStorage.getItem("userType")==="owner"){
            pendingOrders = (<Dropdown.Item><Link to="/orders">Pending Orders</Link></Dropdown.Item>);
        }

        nameMsg = (
            <Dropdown>
                <Dropdown.Toggle>
                    Hi! {this.state.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item><Link to="/profile">Profile</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/orders/history">Past Orders</Link></Dropdown.Item>
                    {pendingOrders}
                    <Dropdown.Item><Link to="/">Logout</Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );

        if("userType" in localStorage){
            if(localStorage.getItem("userType")==="owner"){
                navUser = (
                    <div>
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav.Link>{nameMsg}</Nav.Link>
                        <Nav.Link>
                            <Link to="/menu/view">Menu</Link>
                        </Nav.Link>
                    </div>
                );
            }
            else{
                navUser = (
                    <div>
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav.Link>{nameMsg}</Nav.Link>
                        <Nav.Link>
                            <Link to="/cart">Cart</Link>
                        </Nav.Link>
                    </div>
                );
            }
        }
        else{
            navUser=(
                <div>
                    <Nav className="mr-auto"></Nav>
                    <Nav.Link>
                        <Link to="/profile">Profile</Link>
                    </Nav.Link>
                </div>
            );
        }

        return(
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        UberEats
                    </Typography>
                    <Button color="inherit">Logout</Button>
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

export default NavigationBar;