import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea} from '@mui/material';
import customerImage from "../images/customer.png";
import ownerImage from "../images/restaurant3.jpeg";

class LandingPage extends Component{
    constructor(){
        super();
        this.state={};
    }

    addUser = async(e)=>{
        console.log("usertype:", e.target.value);
        localStorage.setItem("userType", e.target.value);
        await this.setState({
            selected:1
        })
    }
    render(){
        let redirectVar = null;
        if(this.state.selected){
            redirectVar = <Redirect to="/login" />
        }
        return(
            <Box sx={{ maxWidth: 1200 }}>
                {redirectVar}
                <Grid container spacing={0}
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={4}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="250"
                                image={customerImage}
                                onClick = {this.addUser}
                                alt="Customer Login"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h8" component="div">
                                Customer Login
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={this.addUser} value="customer" 
                                fullWidth
                                sx={{ mt: 1, mb: 1 }} size="medium" color="primary">
                                Login
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ maxWidth: 345 }} >
                            <CardMedia
                                component="img"
                                height="250"
                                image={ownerImage}
                                alt="Restaurant Owner Login"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h8" component="div">
                                Restaurant Owner Login
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={this.addUser} value="owner" 
                                fullWidth
                                sx={{ mt: 1, mb: 1 }}
                                size="medium" color="primary">
                                Login
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>




            // <div style={{ margin:"20%" }}>
            //     {redirectVar}
            //     <center>
            //         <div class='row'>
            //             <div class="col-sm-6">
            //                 <div class="card">
            //                 <div class="card-body">
            //                     <button type="button" onClick={this.addUser} value="customer">Customer Login</button>
            //                     <button type="button" onClick={this.addUser} value="owner">Restaurant Owner Login</button>
            //                 </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </center><br /><br /><br />
            // </div>
        );
    }
}

export default LandingPage;