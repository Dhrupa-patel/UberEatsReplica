import { Component } from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Redirect } from "react-router-dom";
import TextField from '@mui/material/TextField';
import axios from "axios";
import backendServer from "../../webConfig";

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

class CustomerProfile extends Component{

    constructor(){
        super()
        this.state={
            datas:[],
            selectedFile:null,
            fileName:""
        }
    }
    getCustomerdetails = async()=>{
        axios.defaults.headers.common.authorization = localStorage.getItem("token");
        var response = await axios.get(`${backendServer}/profile/customerprofile/${sessionStorage.getItem("cust_user_id")}`);
        await this.setState({
            datas:[response.data.profile],
            fileName:response.data.fileName
        })
        await console.log(this.state);
    }
    componentDidMount(){
        this.getCustomerdetails();
    }
    update = async(e)=>{
        await this.setState({
            update:true
        })

    }

    onChange =(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    updateProfile = async(data)=>{
        axios.defaults.headers.common.authorization = localStorage.getItem("token");
        var res = await axios.post(`${backendServer}/profile/updatecustomerprofile`, data);
    }

    onSubmit =async(e)=>{
        console.log(this.state);
        var userID = {
            "email":this.state["Email ID"] || this.state.datas[0]["Email ID"],
            "DOB":this.state["Date of Birth"] || this.state.datas[0]["Date of Birth"],
            "city":this.state.City || this.state.datas[0].City,
            "state":this.state.State || this.state.datas[0].State,
            "country":this.state.Country || this.state.datas[0].Country,
            "name":this.state.Name || this.state.datas[0].Name,
            "nickname":this.state.Nickname || this.state.datas[0].Nickname,
            "user_id":sessionStorage.getItem("cust_user_id")}
        console.log("sending data ",userID);
        await this.updateProfile(userID);
        await this.setState({
            update:false
        })
        await this.getCustomerdetails();
        console.log("updated");
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
            axios.post( `${backendServer}/images/profile-img-upload/${sessionStorage.getItem("cust_user_id")}/customer`, form_data, {
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
                            style = {{width:"50%"}}
                            id={key}
                            defaultValue={this.state.datas[0][key]}
                            // value = {this.state.datas[0][key]}
                            autoComplete={key}
                            onChange={this.onChange}
                        />
                    )} 
                </Grid>)
            }
        }
        let submitButton = null;
        let updateButton = null;
        let ImageUploadButton = null;
        if(this.state.update){
            submitButton = <Button type="button" onClick={this.onSubmit}>Submit</Button>
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
                    >
                    Choose Image
                </Button>
            </label>)
        }
       else if(!this.state.update){
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
                <Avatar style={{height:"15%", width:"15%", align:"center", margin:"0% auto"}} alt="Dhrupa Patel" src={this.state.fileName} />
                <br />
                {ImageUploadButton}
                <Grid container spacing={2}>
                    {profile}
                </Grid>
            </Box>
        );
    }

}

export default CustomerProfile;