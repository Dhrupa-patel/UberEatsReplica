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
            selectedFile:null
        }
    }
    componentDidMount(){
        axios.get(`${backendServer}/profile/customerprofile/${sessionStorage.getItem("user_id")}`).then(response =>{
            console.log("response data",response.data);
            if(response.data){
                this.setState({
                    datas:[response.data]
                })
            }
        }).catch(error =>{
            if(error.response && error.response.data){
                console.log(error.response.data);
            }
        })
        console.log(this.state.datas);
    }
    update = (e)=>{
        this.setState({
            update:true
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
            for(var key of form_data.entries()){
                console.log(key[0],key[1]);
            }
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
                    let fileName = response.data;
                    console.log( 'fileName', fileName );
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

    singleFileUploadHandler = (e)=>{
        console.log("calling here");
        const data = new FormData();// If file selected
        if ( this.state.selectedFile ) 
        {
            console.log("inside upload button",this.state)
            data.append( 'CustomerImage', this.state.selectedFile, this.state.selectedFile.name );
            console.log("data",data);
            axios.post(`${backendServer}/images/profile-img-upload`, data, {
                headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
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
                    let fileName = response.data;
                    console.log( 'fileName', fileName );
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
                                onLoad = {this.change}
                                onChange={this.onChange}
                                />
                    )} 
                </Grid>)
            }
        }
        let submitButton = null;
        if (this.state.update){
            submitButton = <Button type="button" onClick={this.submit}>Submit</Button>
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
                <Avatar style={{height:"15%", width:"15%", align:"center", margin:"0% auto"}} alt="Dhrupa Patel" src="" />
                <br />
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
                        onChange={this.singleFileUploadHandler}
                        >
                        Choose Image
                    </Button>
                </label>
                <Grid container spacing={2}>
                    {profile}
                </Grid>
            </Box>
        );
    }

}

export default Profile;