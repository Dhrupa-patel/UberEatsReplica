import { Component } from "react";
import Button from '@mui/material/Button';
import Profile from "../Profile/Profile";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { withRouter } from "react-router";
import Grid from '@mui/material/Grid';
import NavigationBar from "../../NavigationBar";
import axios from "axios";
import backendServer from "../../webConfig";
import { Redirect } from "react-router-dom";
import { touchRippleClasses } from "@mui/material";

class CustomerHome extends Component{

    constructor(props){
        super(props);
        this.state={
            datas:[],
            userType:localStorage.getItem("userType"),
            cartRes:[],
            edititem: false
        }
    }

    async getDishItems(){
        await axios.get(`${backendServer}/menu/getDetails/${sessionStorage.getItem("res_user_id")}`).then(response =>{
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
    }

    cartIds = async()=>{
        var response = await axios.get(`${backendServer}/cart/getCartResID/${sessionStorage.getItem("cust_user_id")}`);
        console.log("cartres",response.data);
        await this.setState({
            cartRes:response.data
        })
    }

    async componentDidMount(){
        await this.getDishItems();
        await this.cartIds();
        console.log(this.state);
    }

    addItem = async(data)=>{
        await axios.post(`${backendServer}/cart/additem`,data).then(response =>{
            console.log("item added");
        }).catch(error =>{
            if(error.response && error.response.data){
                console.log(error.response.data);
            }
        });
        sessionStorage.setItem("cart_res_id",data.Res_ID);
        await this.setState({
            cartRes:[data.Res_ID]
        })
    }
    clearAndAddItem = (item)=>{
        var Res_ID = {"Res_ID":sessionStorage.getItem("cart_res_id"), "type":"Res_ID"}
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
        console.log("here",item,this.state.cartRes);
        var data = {
            "Dish_Name":item.Dish_Name,
            "Res_ID":item.Res_ID,
            "Dish_Price":item.Dish_Price,
            "Cust_ID":sessionStorage.getItem("cust_user_id"),
            "Dish_ID":item.Dish_ID
        }
        if(this.state.cartRes.includes(item.Res_ID)){
            console.log("additem data", data);
            this.addItem(data)
        }
        else{
            var response = window.confirm("want to empty cart?");
            if(response){
                this.clearAndAddItem(data);
            }
        }

    }

    editItem = async(data)=>{
        await this.setState({
            dish:data,
            edititem:true
        })
    }

    delete = async(e)=>{
        console.log("here",e)
        var id = {"dish_id":Number(e[0])};
        axios.post(`${backendServer}/menu/delete`,id).then(response =>{
            console.log("deleted");
        }).catch(error =>{
            if(error.response && error.response.data){
                console.log(error.response.data);
            }
        });
        let items = [...this.state.datas];
        items.splice(Number(e[1]),1);
        await this.setState({
            datas: items
        })
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
            var data
            axios.post( `${backendServer}/images/profile-img-upload/${this.state.dish.Dish_ID}/menu`, form_data, {
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
                    console.log(response.data.location);
                    this.setState({
                        fileName:response.data.location
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
    
    onChange = async(e)=>{
        await this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async(e)=>{
        console.log("on submit",this.state,this.state.Dish_Name || this.state.dish.Dish_Name)
        var data = {
            "dishid":this.state.dish.Dish_ID,
            "dishname":this.state.Dish_Name || this.state.dish.Dish_Name,
            "description": this.state.Dish_Description || this.state.dish.Dish_Description,
            "category": this.state.Dish_Category || this.state.dish.Dish_Category,
            "price":this.state.Dish_Price || this.state.dish.Dish_Price,
            "ingredients":this.state.Ingredients || this.state.dish.Ingredients
        }
        var res = await axios.post(`${backendServer}/menu/edititem`,data);
        await this.setState({
            edititem:false
        })
        await this.getDishItems()
    }

    render(){
        let dishes = null;
        let profile = [];
        let ImageUploadButton = null;
        let permit = ["Dish_Name","Dish_Description","Dish_Category","Dish_Price","Ingredients"]
        if(!this.state.edititem){
            dishes = this.state.datas.map((data,index) => {
            console.log(data)
                return(
                        <Grid item xs={4}>
                            <Card style = {{width:"100%", height:"100%"}}>
                            <CardHeader
                                title={data.Dish_Name}
                            />
                            <CardMedia
                                component="img"
                                height="140"
                                image={data.Dish_ProfileImageLocation}
                                alt={data.Dish_Name}
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
                                    <Button 
                                    onClick={() => this.addToCart(data)}  
                                    value={[data]} 
                                    size="small">
                                        Add to Cart
                                    </Button>
                                ):
                                (   <div>
                                    <IconButton onClick={()=>this.delete([data.Dish_ID,index])} size="small"><DeleteForeverIcon /></IconButton>
                                        {/* <Button 
                                        onClick={this.delete} 
                                        value={[data.Dish_ID,index]} 
                                        size="small">
                                            Delete Item
                                        </Button> */}
                                    <IconButton onClick={()=>this.editItem(data)} size="small"><EditIcon /></IconButton>
                                        {/* <Button 
                                        onClick={()=>this.editItem(data)} 
                                        size="small">
                                            Edit Item
                                        </Button> */}
                                    </div>
                                )}

                            </CardActions>
                            </CardActions>
                            </Card>
                        </Grid>
                )
            })
        }
        else{
            for(let key in this.state.dish){
                if(permit.includes(key)){
                    profile.push(<Grid item xs={12}>
                        <TextField
                            required
                            name={key}
                            label={key}
                            style = {{width:"50%"}}
                            id={key}
                            defaultValue = {this.state.dish[key]}
                            autoComplete={key}
                            onChange={this.onChange}
                        />
                    </Grid>
                    )
                }
            }
            ImageUploadButton = (
            <Grid item xs={12}>
                <Button type="button" onClick={this.onSubmit}>Submit</Button>
                <Box>
                <Avatar style={{height:"15%", width:"15%", align:"center", margin:"0% auto"}} alt="Dhrupa Patel" src={this.state.fileName} />
                </Box>
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
                </Grid>)
        }

        return(
            <div>
                <NavigationBar />
                <Box component="form" onSubmit={this.onSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    {dishes}
                    {ImageUploadButton}
                    {profile}
                    </Grid>
                </Box>
            </div>
        );
    }

}
export default withRouter(CustomerHome);