import { Component } from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import axios from "axios";
import backendServer from "../../webConfig";
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Redirect } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { getRestaurantProfile } from "../../graphql/queries";


const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

class OwnerProfile extends Component{

    constructor(){
        super();
        this.state = {
            datas:[],
            update:false,
            selectedFile:null,
            fileName:""
        };
    }
    getRestaurantdetails = async()=>{
        var restaurant = await axios.post(`${backendServer}/graphql`,
            {query: getRestaurantProfile,
            variables:{
                user_id:sessionStorage.getItem("res_user_id")
            }
        }
        );
        await this.setState({
            datas:[restaurant.data.data.getRestaurantProfile.profile],
            fileName:restaurant.data.data.getRestaurantProfile.fileName
        })
        console.log("here",this.state.datas);
    }
    componentDidMount(){
        console.log("called here")
        this.getRestaurantdetails();
    }
    update = async(e)=>{
        await this.setState({
            update:true
        })

    }
    onChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submit = async(e)=>{
        console.log(this.state);
        var userID = {
            "email":this.state["Email_ID"] || this.state.datas["Email_ID"],
            "timings":this.state["Timings"]|| this.state.datas["Timings"],
            "city":this.state.City || this.state.datas.City,
            "state":this.state.State || this.state.datas.State,
            "country":this.state.Country ||this.state.datas.Country,
            "name":this.state.Name || this.state.datas.Name,
            "descripton":this.state.description || this.state.datas.Description,
            "deliveryType":this.state.Delivery_Type || this.state.datas.DeliveryType,
            "user_id":sessionStorage.getItem("res_user_id")}
        console.log("sending data ",userID);
        axios.defaults.headers.common.authorization = localStorage.getItem("token");
        var response = await axios.post(`${backendServer}/profile/updaterestaurantprofile`,userID);
        await this.getRestaurantdetails();
        await this.setState({
            update:false
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
            axios.defaults.headers.common.authorization = localStorage.getItem("token");
            axios.post( `${backendServer}/images/profile-img-upload/${sessionStorage.getItem("res_user_id")}/owner`, form_data, {
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

    render(){
        let profile = [];
        if(this.state.datas.length>0){
            for(let key in this.state.datas[0]){
                profile.push(<Grid item xs={12}>
                    {!this.state.update ? (
                        <Typography name={key}>{key}: {this.state.datas[0][key]}</Typography>
                    ):(
                        <TextField
                                required
                                name={key}
                                label={key}
                                id={key}
                                style = {{width:"50%"}}
                                autoComplete={key}
                                defaultValue={this.state.datas[0][key]}
                                onLoad = {this.change}
                                onChange={this.onChange}
                                />
                    )} 
                </Grid>)
            }
        }
        let submitButton = null;
        let ImageUploadButton = null;
        if (this.state.update){
            submitButton = <Button type="button" onClick={this.submit}>Submit</Button>
            ImageUploadButton = (<label htmlFor="btn-upload">
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
                    onChange={this.singleFileUploadHandler}
                    >
                    Choose Image
                </Button>
            </label>)
        }
        let updateButton = null;
        if(!this.state.update){
            updateButton = <Button type="button" onClick={this.update}>update</Button>
        }
        let redirectVar = null;
        if(this.state.submit){
            redirectVar = <Redirect to="/profile"></Redirect>
        }

        return(
            <Box component="form" sx={{ mt: 5, alignItems: 'center'}} >
                {redirectVar}
                {submitButton}
                {updateButton}
                <Avatar style={{height:"150px", width:"150px", align:"center", margin:"0% auto"}} alt="" src={this.state.fileName} />
                <br />
                {ImageUploadButton}
                <Grid container spacing={2}>
                    {profile}
                </Grid>
            </Box>
        );
    }

}

export default OwnerProfile;