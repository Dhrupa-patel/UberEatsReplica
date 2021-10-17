import { Component } from "react";
import Profile from "../Profile/Profile";
import Button from '@mui/material/Button';
import * as React from 'react';
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
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { createTheme } from "@mui/material/styles";
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
      paddingLeft: `calc(1em + ${theme.spacing(1)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '100%',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const theme = createTheme({
      palette:{
          primary:{
              main:'#004d40',
          },

          secondary:{
              main:'#f5f5f5',
          },
      },
  })

class CustomerHome extends Component{

    constructor(){
        super();
        this.state={
            datas:[],
            newData:[],
            delivery_type:"Delivery",
            menu_category:"Veg"
        }
    }
    getResDetails = async ()=>{
        var response = await axios.get(`${backendServer}/restaurants/getDetails/~/~/~`);
        await this.setState({
            datas:response.data
        })
        var response = await axios.get(`${backendServer}/restaurants/getDetails/${sessionStorage.getItem("location")}/${this.state.delivery_type}/${this.state.menu_category}`);
        await this.setState({
            newData:response.data
        })
    }

    componentDidMount(){
        this.getResDetails();
        console.log(this.state.datas);
    }

    getResids(ids){
        let resids = [];
        for(var i in ids){
            resids.push(ids[i]["Res_ID"]);
        }
        return resids;
    }
    search = async(e)=>{
        let search = e.target.value;
        if(search===""){
            await this.setState({
                newData:this.state.datas
            })
        }
        else{
            let searchData = await axios.get(`${backendServer}/menu/getRestaurantIDs/${search}`);
            console.log(searchData.data);
            await this.setState({
                newData:searchData.data
            })
        }
        return;
    }

    updateDelivertype = async(e)=>{
        await this.setState({
            delivery_type:e.target.value
        })
        console.log(this.state.delivery_type);
        this.getResDetails()
    }

    updateMenuCategory = async(e)=>{
        await this.setState({
            menu_category:e.target.value
        })
        console.log(this.state)
        this.getResDetails()
    }

    addFavorite = (res_id)=>{
        console.log(res_id);
        let data = {"Cust_id":sessionStorage.getItem("cust_user_id"), "res_id":res_id};
        console.log("called addfav", data);
        axios.post(`${backendServer}/customer/addfavorites`,data).then(response =>{
            console.log("Added to favorites");
        }).catch(error =>{
            if(error.response && error.response.data){
                console.log(error.response.data);
            }
        });
    }

    menu = (e)=>{
        sessionStorage.setItem("res_user_id",e.target.value);
        this.props.history.push("/ownerhome");
    }

    render(){
        let restaurants = this.state.newData.map(data => {
            console.log(data)
            return(
                <Grid item xs={4}>
                    <Card>
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
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        {data.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton onClick={() => this.addFavorite(data._id)} size="small"><FavoriteIcon /></IconButton>
                        <Button onClick={this.menu} value={data._id} variant="contained">Select</Button>
                        {/* <Button onClick={this.addFavorite} value={data.Res_ID} aria-label="add to favorites"> */}
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
                    <Grid item xs={6}>
                        <Search>
                            <SearchIcon />
                            <StyledInputBase
                            onChange={this.search}
                            placeholder="Search for dishes, location or restaurants"
                            inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Grid>
                    <Grid item xs={3}>
                        {this.state.menu_category==="Veg" && 
                            <div>
                                <Button onClick={this.updateMenuCategory} theme={theme} value="Delivery" variant="contained">Veg</Button>
                                <Button onClick={this.updateMenuCategory} value="Vegan" variant="contained">Vegan</Button>
                                <Button onClick={this.updateMenuCategory} value="NonVeg" variant="contained">Non-Veg</Button>
                            </div>
                        }
                        {this.state.menu_category==="Vegan" &&
                                <div>
                                    <Button onClick={this.updateMenuCategory} value="Veg" variant="contained">Veg</Button>
                                    <Button onClick={this.updateMenuCategory} theme={theme}value="Vegan" variant="contained">Vegan</Button>
                                    <Button onClick={this.updateMenuCategory} value="NonVeg" variant="contained">Non-Veg</Button>
                                </div>
                        }
                        {this.state.menu_category==="NonVeg" &&
                                <div>
                                    <Button onClick={this.updateMenuCategory} value="Veg" variant="contained">Veg</Button>
                                    <Button onClick={this.updateMenuCategory} value="Vegan" variant="contained">Vegan</Button>
                                    <Button onClick={this.updateMenuCategory} theme={theme} value="NonVeg" variant="contained">Non-Veg</Button>
                                </div>
                        }
                        
                    </Grid>
                    <Grid item xs={3}>
                        {this.state.delivery_type==="Delivery"?(
                            <div>
                                <Button onClick={this.updateDelivertype} theme={theme} value="Delivery" variant="contained">Delivery</Button>
                                <Button onClick={this.updateDelivertype} value="Pickup" variant="contained">Pickup</Button>
                            </div>
                        ):(
                            <div>
                                <Button onClick={this.updateDelivertype} value="Delivery" variant="contained">Delivery</Button>
                                <Button onClick={this.updateDelivertype} theme={theme} value="Pickup" variant="contained">Pickup</Button>
                            </div>
                        )}
                    </Grid>
                    <Grid item xs={12}></Grid>
                    {restaurants}
                    </Grid>
                </Box>
            </div>
        );
    }

}
export default withRouter(CustomerHome);