import { Component } from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

class Profile extends Component{
    render(){
        return(
            <Box component="form" sx={{ mt: 5, alignItems: 'center'}} >
                <Avatar style={{height:"15%", width:"15%", align:"center", margin:"0% auto"}} alt="Dhrupa Patel" src="" />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Div>{"Dhrupa Patel"}</Div>
                    </Grid>
                    <Grid item xs={12}>
                        <Div>{"Date Of Birth"}</Div>
                        <Div>{"12/03/1997"}</Div>
                    </Grid>
                    <Grid item xs={12}>
                        <Div>{"Date Of Birth"}</Div>
                        <Div>{"12/03/1997"}</Div>
                    </Grid>
                    <Grid item xs={12}>
                        <Div>{"Date Of Birth: "}</Div>
                        <Div>{"12/03/1997"}</Div>
                    </Grid>
                </Grid>
            </Box>

        );
    }

}

export default Profile;