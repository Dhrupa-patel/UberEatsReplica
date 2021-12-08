import { Component } from "react";
import Button from '@mui/material/Button';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { addCart, deleteCart } from "../../actions/cartActions";
import { deleteItem } from "../../actions/menuActions";
import { connect } from "react-redux";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { withRouter } from "react-router";
import Grid from '@mui/material/Grid';
import NavigationBar from "../../NavigationBar";
import { getDishes } from "../../graphql/queries";
import axios from "axios";
import backendServer from "../../webConfig";

class Menu extends Component{

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
        if("res_user_id"in sessionStorage){
            var dishesData = await axios.post(`${backendServer}/graphql`,
                {query: getDishes,
                    variables:{
                        user_id: sessionStorage.getItem("res_user_id")
                    }
                }
            );
            if(dishesData.data.data.getdishes){
                await this.setState({
                    datas:dishesData.data.data.getdishes.dishes,
                    resid:dishesData.data.data.getdishes.res
                })
            }
        }
    }

    cartIds = async()=>{
        if("cust_user_id" in sessionStorage){
            axios.defaults.headers.common.authorization = localStorage.getItem("token");
            var response = await axios.get(`${backendServer}/cart/getCartResID/${sessionStorage.getItem("cust_user_id")}`);
            console.log("cartres",response.data);
            await this.setState({
                cartRes:response.data
            })
        }
    }

    async componentDidMount(){
        await this.getDishItems();
        await this.cartIds();
        console.log(this.state);
    }

    onQuantityChange = async(idx)=>{
        console.log("idx",idx);
        this.setState({
           ["quantity"+String(idx)]:idx
        })
    }

    addItem = async(data)=>{
        this.props.addCart(data);
        await sessionStorage.setItem("cart_res_id",data.Res_ID);
        await this.setState({
            cartRes: data.Res_ID,
        })
    }
    clearAndAddItem = async(item)=>{
        var Cust_ID = {"Cust_ID":sessionStorage.getItem("cust_user_id")}
        console.log("resid", Cust_ID);
        await this.props.deleteCart(Cust_ID);
        await this.addItem(item);
    }

    addToCart = (item,idx)=>{
        console.log("here",item,this.state.cartRes,this.state);
        var data = {
            "Dish_Name":item.name,
            "Res_ID":this.state.resid,
            "Dish_Price":item.price,
            "Quantity": this.state.quantity||"1",
            "Cust_ID":sessionStorage.getItem("cust_user_id"),
            "Dish_ID":item.id
        }
        if(this.state.cartRes===this.state.resid || this.state.cartRes===null){
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
            image:data.image,
            edititem:true
        })
    }

    delete = async(e)=>{
        console.log("here",e)
        var id = {"dishid":Number(e[0]),"Res_ID":sessionStorage.getItem("res_user_id")};
        this.props.deleteItem(id);
        // axios.defaults.headers.common.authorization = localStorage.getItem("token");
        // axios.post(`${backendServer}/menu/delete`,id).then(response =>{
        //     console.log("deleted");
        // }).catch(error =>{
        //     if(error.response && error.response.data){
        //         console.log(error.response.data);
        //     }
        // });
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
            var id = String(this.state.dish.id)+"+"+String(sessionStorage.getItem("res_user_id"));
            axios.defaults.headers.common.authorization = localStorage.getItem("token");
            axios.post( `${backendServer}/images/profile-img-upload/`+id+`/menu`, form_data, {
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
                        image:response.data.location
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
        console.log("on submit",this.state,this.state.name || this.state.dish.name)
        var data = {
            "Res_ID":sessionStorage.getItem("res_user_id"),
            "dishid":this.state.id || this.state.dish.id,
            "dishname":this.state.name || this.state.dish.name,
            "description": this.state.description || this.state.dish.description,
            "category": this.state.category || this.state.dish.category,
            "price":this.state.price || this.state.dish.price,
            "ingredients":this.state.ingredients || this.state.dish.ingredients,
            "image": this.state.image||this.state.dish.image
        }
        axios.defaults.headers.common.authorization = localStorage.getItem("token");
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
        let permit = ["name","description","category","price","ingredients"]
        if(!this.state.edititem){
            dishes = this.state.datas.map((data,index) => {
            console.log(data)
                return(
                        <Grid item xs={3}>
                            <Card style = {{width:"100%", height:"100%"}}>
                            <CardHeader
                                title={data.name}
                            />
                            <CardMedia
                                component="img"
                                height="140"
                                image={data.image}
                                alt={data.name}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                {data.category}<br/>
                                Dish Description: {data.description}<br/>
                                Dish Price: {data.price}<br/>
                                Ingredients:{data.ingredients}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                            <CardActions>
                                {this.state.userType==="customer" ? (
                                    <div>
                                        <TextField
                                        required
                                        name="quantity"
                                        label="Quantity"
                                        id="quantity"
                                        defaultValue="1"
                                        autoComplete="Quantity"
                                        onChange={this.onChange}
                                        />
                                        <Button 
                                        onClick={() => this.addToCart(data,index)}  
                                        value={[data]} 
                                        size="small">
                                            Add to Cart
                                        </Button>
                                    </div>
                                ):
                                (   <div>
                                    <IconButton onClick={()=>this.delete([data.id,index])} size="small"><DeleteForeverIcon /></IconButton>
                                        {/* <Button 
                                        onClick={this.delete} 
                                        value={[data.Dish_ID,index]} 
                                        size="small">
                                            Delete Item
                                        </Button> */}
                                    <IconButton onClick={()=> this.editItem(data)} size="small"><EditIcon /></IconButton>
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
                <Avatar style={{height:"15%", width:"15%", align:"center", margin:"0% auto"}} alt="" src={this.state.image} />
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
export default connect(null, {addCart, deleteCart, deleteItem} )(withRouter(Menu));