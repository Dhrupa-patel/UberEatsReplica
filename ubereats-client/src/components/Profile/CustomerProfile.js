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

class Profile extends Component{

    constructor(){
        super()
        this.state={
            datas:[],
            selectedFile:null,
            fileName:""
        }
    }
    componentDidMount(){
        axios.get(`${backendServer}/profile/customerprofile/${sessionStorage.getItem("user_id")}`).then(response =>{
            console.log("response data",response.data);
            if(response.data){
                this.setState({
                    datas:[response.data.profile],
                    fileName:response.data.fileName
                })
                console.log(this.state);
            }
        }).catch(error =>{
            if(error.response && error.response.data){
                console.log(error.response.data);
            }
        })
    }
    update = (e)=>{
        this.setState({
            update:true
        })

    }

    onChange =(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit =(e)=>{
        console.log(this.state);
        var userID = {
            "email":this.state["Email ID"],
            "DOB":this.state["Date of Birth"],
            "city":this.state.City,
            "state":this.state.State,
            "country":this.state.Country,
            "name":this.state.Name,
            "user_id":sessionStorage.getItem("user_id")}
        console.log("sending data ",userID);
        axios.post(`${backendServer}/profile/updatecustomerprofile`, userID).then(response =>{
            if(response.data){
                this.setState({
                    datas:[response.data.profile],
                    fileName:response.data.fileName
                })
                this.setState({
                    update:false
                })
                console.log("updated");
            }
        }).catch( (error) => {
            console.log(error);
        });
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
            axios.post( `${backendServer}/images/profile-img-upload`, form_data, {
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
                    onChange={this.singleFileUploadHandler}
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

export default Profile;