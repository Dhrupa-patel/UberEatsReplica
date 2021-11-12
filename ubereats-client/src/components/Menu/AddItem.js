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

    singleFileChangedHandler = async(e)=>{
        console.log("calling");
        await this.setState({
            selectedFile: e.target.files[0]
           });
        console.log(this.state);
        const form_data = new FormData();// If file selected
        if ( this.state.selectedFile ) 
        {
            console.log("reaching here", this.state.selectedFile);
            form_data.append( 'profileImage', this.state.selectedFile, this.state.selectedFile.name );
            axios.defaults.headers.common.authorization = localStorage.getItem("token");
            axios.post( `${backendServer}/images/profile-img-upload/1/xyz`, form_data, {
                headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${form_data._boundary}`,
                }
            })
            .then( ( response ) => {
                if ( 200 === response.status ) {
                    // If file size is larger than expected.
                    if( response.data.error ) {
                    if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
                    alert( 'Max size: 2MB');
                    } else {
                    console.log( response.data );// If not the given file type
                    alert( response.data.error);
                    }
                    } else {
                    // Success
                    console.log("here",response.data,response.data.location);
                    this.setState({
                        fileName:response.data.location,
                        imagename:response.data.image
                    })
                    alert( 'File Uploaded');
                    }
                }
            }).catch( ( error ) => {
            // If another error
            alert( error );
            });
        } 
        else {
        // if file not selected throw error
        alert( 'Please upload file');
        }
    }

    onChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit = async(e)=>{
        console.log("here")
        let data = {
            "Res_ID":sessionStorage.getItem("res_user_id"),
            "Dish_Name": this.state.dishName,
            "Dish_Description": this.state.dishDescription,
            "Dish_Category": this.state.dishCategory,
            "Dish_Price": this.state.dishPrice,
            "Ingredients": this.state.ingredients,
            "Restaurant_Name": sessionStorage.getItem("username"),
            "Location": sessionStorage.getItem("location"),
            "imagename":this.state.imagename,
            "imagelocation":this.state.fileName
        }
        console.log(data,this.state);
        axios.defaults.headers.common.authorization = localStorage.getItem("token");
        var res = await axios.post(`${backendServer}/menu/addItem`, data);
        await this.setState({
            submit: true
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
                    <Avatar style={{height:"15%", width:"15%", align:"center", margin:"0% auto"}} alt="Dhrupa Patel" src={this.state.fileName} />
                    <label htmlFor="btn-upload">
                    <input
                        id="btn-upload"
                        name="btn-upload"
                        style={{ display: 'none' }}
                        type="file"
                        accept="image/*"
                        onChange = {this.singleFileChangedHandler}
                    />
                    <Button
                        className="btn-choose"
                        variant="outlined"
                        component="span"
                        >
                        Choose Image
                    </Button>
                    </label>
                    <Box component="form" sx={{ mt: 3 }}>
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
                        fullWidth
                        variant="contained"
                        onClick={this.onSubmit}
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