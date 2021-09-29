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
import { withRouter } from "react-router";
import Grid from '@mui/material/Grid';
import NavigationBar from "../../NavigationBar";
import axios from "axios";
import backendServer from "../../webConfig";
import { Redirect } from "react-router-dom";

class CustomerHome extends Component{

    constructor(props){
        super(props);
        this.state={
            datas:[],
            userType:localStorage.getItem("userType"),
        }
    }

    componentDidMount(){
        axios.get(`${backendServer}/menu/getDetails/${sessionStorage.getItem("res_user_id")}`).then(response =>{
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
        console.log(this.state);
    }

    addItem = (data)=>{
        axios.post(`${backendServer}/cart/additem`,data).then(response =>{
            console.log("item added");
        }).catch(error =>{
            if(error.response && error.response.data){
                console.log(error.response.data);
            }
        });
        sessionStorage.setItem("cart_res_id",data.Res_ID);
    }
    clearAndAddItem = (item)=>{
        var Res_ID = {"Res_ID":sessionStorage.getItem("cart_res_id")}
        console.log("resid", Res_ID);
        axios.post(`${backendServer}/cart/removeitems`,Res_ID).then(response =>{
            console.log("items deleted");
            console.log("confirm", item);
            this.addItem(item);
        }).catch(error =>{
            if(error.response && error.response.data){
                console.log(error.response.data);
            }
        });
    }

    addToCart = (item)=>{
        console.log("here",item);
        var data = {
            "Dish_Name":item.Dish_Name,
            "Res_ID":item.Res_ID,
            "Dish_Price":item.Dish_Price,
            "Cust_ID":sessionStorage.getItem("cust_user_id"),
            "Dish_ID":item.Dish_ID
        }
        if("cart_res_id" in sessionStorage && sessionStorage.getItem("cart_res_id")!=item.Res_ID){
            var response = window.confirm("want to empty cart?");
            if(response){
                this.clearAndAddItem(data);
            }
        }
        else{
            console.log("additem data", data);
            this.addItem(data)
        }

    }
    delete = (e,index)=>{
        var id = {"dish_id":e.target.value[0]};
        axios.post(`${backendServer}/menu/delete`,id).then(response =>{
            console.log("deleted");
        }).catch(error =>{
            if(error.response && error.response.data){
                console.log(error.response.data);
            }
        });
        let items = [...this.state.datas];
        items.splice(e.target.value[1],1);
        this.setState({
            datas: items
        })
    }

    render(){
        let dishes = this.state.datas.map((data,index) => {
            console.log(data)
            return(
                <Grid item xs={4}>
                    <Card style = {{width:"100%", height:"100%"}}>
                    <CardHeader
                        title={data.Dish_Name}
                    />
                    <CardMedia
                        component="img"
                        height="10%"
                        image="/static/images/cards/paella.jpg"
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        {data.Dish_Category}<br/>
                        Dish Description: {data.Dish_Description}<br/>
                        Dish Price: {data.Dish_Price}<br/>
                        Ingredients:{data.Ingredients}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                    <CardActions>
                        {this.state.userType==="customer" ? ( 
                            <Button onClick={() => this.addToCart(data)}  value={[data]} size="small">Add to Cart</Button>
                        ):
                        (
                            <Button onClick={this.delete} value={[data.Dish_ID,index]} size="small">Delete Item</Button>
                        )}

                    </CardActions>
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
                    {dishes}
                    </Grid>
                </Box>
            </div>
        );
    }

}
export default withRouter(CustomerHome);