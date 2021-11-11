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

class orderCustProfile extends Component{

    constructor(){
        super()
        this.state={
            datas:[],
            fileName:""
        }
    }
    getCustomerdetails = async()=>{
        var response = await axios.get(`${backendServer}/profile/customerprofile/${sessionStorage.getItem("profile_id")}`);
        await this.setState({
            datas:[response.data.profile],
            fileName:response.data.fileName
        })
        await console.log(this.state);
    }
    componentDidMount(){
        this.getCustomerdetails();
    }

    render(){
        let profile = [];
        if(this.state.datas.length>0){
            for(let key in this.state.datas[0]){
                profile.push(<Grid item xs={12}>
                        <Typography name={key}>{key}: {this.state.datas[0][key]}</Typography> 
                </Grid>)
            }
        }
    
        return(
            <Box component="form" sx={{ mt: 5, alignItems: 'center'}} >
                <Avatar style={{height:"15%", width:"15%", align:"center", margin:"0% auto"}} alt="Dhrupa Patel" src={this.state.fileName} />
                <br />
                <Grid container spacing={2}>
                    {profile}
                </Grid>
            </Box>
        );
    }

}

export default orderCustProfile;