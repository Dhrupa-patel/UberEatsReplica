import { Component } from "react";
import axios from "axios";
import backendServer from "../../webConfig";
import Grid from '@mui/material/Grid';
import NavigationBar from "../../NavigationBar";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

class Favorites extends Component{

    constructor(){
        super()
        this.state ={
            favs:[]
        }
    }
    async componentDidMount(){
        await axios.get(`${backendServer}/customer/getFavorites/${sessionStorage.getItem("cust_user_id")}`).then(response =>{
            console.log("response data", response.data);
            if(response.data){
                this.setState({
                    favs:response.data
                })
            }
        }).catch(error =>{
            if(error.response && error.response.data){
                console.log(error.response.data);
            }
        })
        console.log(this.state.favs);
    }
    menu = (e)=>{
        sessionStorage.setItem("res_user_id",e.target.value);
        this.props.history.push("/ownerhome");
    }
    render(){
        let restaurants = this.state.favs.map(data => {
            console.log(data)
            return(
                <Grid item xs={4}>
                    <Card style = {{width:"100%", height:"100%"}}>
                    <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {data.name[0]}
                        </Avatar>
                        }
                        title={data.name}
                        subheader={data.city}
                    />
                    <CardMedia
                        component="img"
                        height="140"
                        image={data.images[0]}
                        alt={data.name}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        {data.description}<br/>
                        Timings: {data.timings}<br/>
                        State: {data.state}<br/>
                        Phone Number: {data.phoneNumber}<br/>
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Button onClick={this.menu} value={data._id} variant="contained">Select</Button>
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

export default Favorites;