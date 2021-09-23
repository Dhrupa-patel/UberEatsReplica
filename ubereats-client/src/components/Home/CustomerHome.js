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

class CustomerHome extends Component{

    constructor(){
        super();
        this.state={
            datas:[]
        }
    }

    componentDidMount(){
        axios.get(`${backendServer}/restaurants/getDetails`).then(response =>{
            console.log("response data", response.data);
            if(response.data){
                this.setState({
                    datas:response.data
                })
            }
        }).catch(error =>{
            if(error.response && error.response.data){
                console.log(error.response.data);
            }
        })
        console.log(this.state.datas);
    }

    render(){
        let restaurants = this.state.datas.map(data => {
            console.log(data)
            return(
                <Grid item xs={4}>
                    <Card style = {{width:"100%", height:"100%"}}>
                    <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {data.Res_Name[0]}
                        </Avatar>
                        }
                        title={data.Res_Name}
                        subheader={data.Res_City}
                    />
                    <CardMedia
                        component="img"
                        height="10%"
                        image="/static/images/cards/paella.jpg"
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        {data.Description}<br/>
                        Timings: {data.Timings}<br/>
                        State: {data.Res_State}<br/>
                        Phone Number: {data.Phone_Number}<br/>
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                        </IconButton>
                    </CardActions>
                    </Card>
                </Grid>
            )
        });

        return(
            <div>
                <NavigationBar />
                <Box component="form" onSubmit={this.onSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    {restaurants}
                    </Grid>
                </Box>
            </div>
        );
    }

}
export default CustomerHome;