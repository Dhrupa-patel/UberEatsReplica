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


const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

class Profile extends Component{

    constructor(){
        super();
        this.state = {
            datas:[],
            update:false,
        };
    }
    componentDidMount(){
        axios.get(`${backendServer}/profile/restaurantprofile/${sessionStorage.getItem("user_id")}`).then(response =>{
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
    onChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submit = (e)=>{
        axios.post(`${backendServer}/profile/setrestaurantprofile/${sessionStorage.getItem("user_id")}`).then(response =>{
            console.log(response.data);
        }).catch(error =>{
            if(error.response && error.response.data){
                console.log(error.response.data);
            }
        });
        this.setState({
            submit:true
        })
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
                <Avatar style={{height:"150px", width:"150px", align:"center", margin:"0% auto"}} alt="" src="../public/cust1.png" />
                <br />
                <Grid container spacing={2}>
                    {profile}
                </Grid>
            </Box>
        );
    }

}

export default Profile;