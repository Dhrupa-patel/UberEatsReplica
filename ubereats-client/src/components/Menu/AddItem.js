import { Component } from "react";
import { Redirect } from "react-router-dom";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import axios from "axios";
import backendServer from "../../webConfig";
import NavigationBar from "../../NavigationBar";

class AddItem extends Component{
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

    onSubmit = async(e)=>{
        let data = {
            "Res_ID":sessionStorage.getItem("res_user_id"),
            "Dish_Name": this.state.dishName,
            "Dish_Description": this.state.dishDescription,
            "Dish_Category": this.state.dishCategory,
            "Dish_Price": this.state.dishPrice,
            "Ingredients": this.state.ingredients,
            "Restaurant_Name": sessionStorage.getItem("username"),
            "Location": sessionStorage.getItem("location")
        }
        console.log(data);
        axios.post(`${backendServer}/menu/addItem`, data).then(response =>{
        }).catch(error =>{
            if(error.response && error.response.data){
                console.log(error.response.data);
            }
        })
        await this.setState({
            submit:true
        })

    }

    render(){
        let redirectVar = null;
        if(this.state.submit){
            redirectVar = <Redirect to="/home"></Redirect>
        }
        return(
            <div>
                {redirectVar}
            <NavigationBar/>
            <ThemeProvider theme={this.state.theme}>
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
                    <Typography component="h1" variant="h5" style={{padding:"2%"}}>
                        Add Item
                    </Typography><br />
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
                        onClick={this.submit}
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Add item
                        </Button>
                    </Box>
                    </Box>
                </Container>
            </ThemeProvider>
            </div>
        );
    }

}
export default AddItem;