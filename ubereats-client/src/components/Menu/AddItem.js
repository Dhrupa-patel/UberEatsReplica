import { Component } from "react";
import { Button, Dropdown, DropdownButton, FormControl, InputGroup, Row } from "react-bootstrap";
import Profile from "../Profile/Profile";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import NavigationBar from "../../NavigationBar";
import axios from "axios";
import backendServer from "../../webConfig";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import backendServer from "../../webConfig";

class CustomerHome extends Component{
    constructor(){
        super();
        this.state={
            theme:createTheme()
        }
    }

    onChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit = (e)=>{
        let data = {
            "Res_ID":sessionStorage.getItem("user_id"),
            "Dish_Name": this.state.dishName,
            "Dish_Description": this.state.dishDescription,
            "Dish_Category": this.state.dishCategory,
            "Dish_Price": this.state.dishPrice,
            "Ingredients": this.state.ingredients,
            "Restaurant_Name": sessionStorage.getItem("Restaurant_Name"),
            "Location": sessionStorage.getItem("location")
        }
        axios.post(`${backendServer}/menu/addItem`, data).then(response =>{
        }).catch(error =>{
            if(error.response && error.response.data){
                console.log(error.response.data);
            }
        })
        this.props.history.push("/home");

    }

    render(){
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
                        Add Item
                    </Typography>
                    <p>{message}</p>
                    <Box component="form" onSubmit={this.onSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                autoComplete="dishName"
                                name="dishName"
                                required
                                fullWidth
                                id="dishName"
                                label="Dish Name"
                                onChange={this.onChange}
                                autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="dishDescription"
                                label="Dish Description"
                                name="dishDescription"
                                autoComplete="Dish Description"
                                onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="dishCategory"
                                label="Dish Category"
                                name="dishCategory"
                                autoComplete="Dish Category"
                                onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                name="dishPrice"
                                label="Dish Price"
                                id="dishPrice"
                                autoComplete="Dish Price"
                                onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                name="ingredients"
                                label="Ingredients"
                                id="ingredients"
                                autoComplete="ingredients"
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
                        Add item
                        </Button>
                    </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }

}
export default CustomerHome;