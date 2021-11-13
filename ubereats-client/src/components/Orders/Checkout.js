import { Component } from "react";
import NavigationBar from "../../NavigationBar";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from "@mui/material";
import {Route, withRouter } from "react-router";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { connect } from "react-redux";
import Paper from '@mui/material/Paper';
import { deleteCart } from "../../actions/cartActions";
import { placeOrder } from "../../actions/orderActions";
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Redirect } from "react-router-dom";
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import axios from "axios";
import backendServer from "../../webConfig";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    //   backgroundColor: "#008b8b",
    //   color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({

}));
class Checkout extends Component{
    constructor(){
        super()
        this.state={
            rows:[],
            resData:{Name:"",State:""},
            total:0,
            home:false,
            Order_ID:1,
            pastorders:[],
            open:false,
            items:[],
            addresses:[],
            page:0,
            row:5
        }
    }
        
    customerOrders = async()=>{
        axios.defaults.headers.common.authorization = localStorage.getItem("token");
        var response = await axios.get(`${backendServer}/orders/CustOrders/${sessionStorage.getItem("cust_user_id")}`);
        await this.setState({
            pastorders: response.data,
            old_data:response.data
        })
    }

    getAddresses = async()=>{
        axios.defaults.headers.common.authorization = localStorage.getItem("token");
        var response = await axios.get(`${backendServer}/customer/getAddresses/${sessionStorage.getItem("cust_user_id")}`);
        await this.setState({
            addresses:response.data
        })
    }

    async componentDidMount(){
        axios.defaults.headers.common.authorization = localStorage.getItem("token");
        var response = await axios.get(`${backendServer}/cart/Order/${sessionStorage.getItem("cust_user_id")}`);
        await this.setState({
            rows:response.data["items"],
            total:response.data["total"],
            cartResId:response.data["cartResId"]
        })
        if("cart_res_id" in sessionStorage){
            var response = await axios.get(`${backendServer}/profile/restaurantprofile/${sessionStorage.getItem("cart_res_id")}`);
            await this.setState({
                resData:response.data
            })
        }
        var response = await axios.get(`${backendServer}/orders/getID`);
        await this.setState({
            Order_ID:Number(response.data)+1,
        })
        await this.customerOrders();
        await this.getAddresses();
        console.log("here",this.state);
    }

    handleCancelOrder = async(e)=>{
        var data = {"id":e.target.value}
        axios.defaults.headers.common.authorization = localStorage.getItem("token");
        var response = await axios.post(`${backendServer}/orders/cancelOrder`,data);
        await this.customerOrders();
    }

    onChange = async(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleChangePage = async(e,newPage)=>{
        await this.setState({
            page:newPage
        })
    }

    handleChangeRowsPerPage = async(e)=>{
        await this.setState({
            row: e.target.value
        })
    }

    emptyCart = async()=>{
        var data={
            "Cust_ID":sessionStorage.getItem("cust_user_id"),
        }
        this.props.deleteCart(data);
        // axios.defaults.headers.common.authorization = localStorage.getItem("token");
        // axios.post(`${backendServer}/cart/removeitems`,data).then(response =>{
        //     console.log("cart got empty!");
        // }).catch(error =>{
        //     console.log(error);
        // })
        await this.setState({
            home:true
        })
    }
    handlefilter = async(e)=>{
        var new_data = this.state.old_data;
        new_data = await new_data.filter(row => row["orderStatus"]===e.target.value);
        await this.setState({
            pastorders:new_data
        })
    }

    checkout = ()=>{
        var data = {
            "items":this.state.rows,
            "Order_ID":this.state.Order_ID,
            "Cust_Name":sessionStorage.getItem("username"),
            "price":this.state.total,
            "Res_ID": this.state.cartResId,
            "Cust_ID": sessionStorage.getItem("cust_user_id"),
            "Special_Instruction":this.state.special_ins,
            "Address": this.state.address
        }

        this.props.placeOrder(data);
        // axios.defaults.headers.common.authorization = localStorage.getItem("token");
        // axios.post(`${backendServer}/cart/placeorder`,data).then(response =>{
        //     console.log("added to orders");
        // }).catch(error =>{
        //     console.log(error);
        // })
        this.emptyCart()
    }

    handleClickOpen = async (e)=>{
        await sessionStorage.setItem("order_id",Number(e.target.value))
        this.props.history.push("/receipt");
    }

    render(){
        let redirectVar = null;
        if(this.state.home){
            redirectVar = <Redirect to="/home" />
        }

        let order = (
        <div>
            {this.state.rows.length>0 &&
            <div><h3>Current Order</h3>
            <Card sx={{ maxWidth: "100%" }}>
                <CardContent>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        CONFIRM YOUR ORDER
                    </Typography>
                        <TableContainer>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                <StyledTableCell>Dish Name</StyledTableCell>
                                <StyledTableCell align="right">Dish Price</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.rows.map((row) => (
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                    {row.dishName}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.dishPrice}</StyledTableCell>
                                </StyledTableRow>
                                ))}
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        TOTAL
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {this.state.total}
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        Special Instructions
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                    <TextField
                                        required
                                        name="special_ins"
                                        label="Special Instructions"
                                        id="special_ins"
                                        autoComplete="Special Instructions"
                                        onChange={this.onChange}
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        Select Address
                                    </StyledTableCell>
                                    
                                    <StyledTableCell align="right">
                                    {this.state.addresses.length>0 && 
                                        <FormControl style={{minWidth:240}}>
                                            <InputLabel id="addresses">Addresses</InputLabel>
                                            <Select
                                            labelId="Addresses"
                                            id="addresses"
                                            defaultValue={"Veg"}
                                            label="Address"
                                            name="address"
                                            onChange={this.onChange}
                                            >
                                                {this.state.addresses.map((address) => (
                                                    <MenuItem value={address}>{address}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>} &nbsp;
                                        <TextField
                                            required
                                            name="address"
                                            label="Address"
                                            id="address"
                                            autoComplete="Address"
                                            onChange={this.onChange}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <Button onClick = {this.checkout} >Place an Order</Button>
                        
                </CardContent>
            </Card></div>}
        </div>
        
        );
        console.log(this.state);
        let pastorder=(
            <div>
                {this.state.pastorders && 
            <div>
                <h3>Past Orders</h3>
                <Card sx={{ maxWidth: "100%" }}><br />
                <FormControl>
                    <InputLabel id="update">Filter By Order Status</InputLabel>
                    <Select
                    labelId="filter"
                    id="filter"
                    defaultValue={"Order Recieved"}
                    label="Filter By Order Status"
                    name="filter"
                    onChange={this.handlefilter}
                    >
                    <MenuItem value={"Order Recieved"}>Order Recieved</MenuItem>
                    <MenuItem value={"Preparing"}>Preparing</MenuItem>
                    <MenuItem value={"On the Way"}>On the Way</MenuItem>
                    <MenuItem value={"Delivered"}>Delivered</MenuItem>
                    <MenuItem value={"Pickup Ready"}>Pickup Ready</MenuItem>
                    <MenuItem value={"Picked Up"}>Picked Up</MenuItem>
                    <MenuItem value={"Cancelled Order"}>Cancelled Order</MenuItem>
                    </Select>
                </FormControl><br />
                    <CardContent>
                        <TableContainer>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                <StyledTableCell>Receipt No.</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                                <StyledTableCell align="right">Order Status</StyledTableCell>
                                <StyledTableCell align="right">Total Price</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.pastorders.slice(this.state.page*this.state.row,this.state.page*this.state.row+this.state.row).map((row) => (
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                    <Button style={{color: "blue"}} type="button" color="inherit" value={row._id} onClick={this.handleClickOpen}>
                                    {row._id}
                                    </Button>
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {row.orderStatus==="Order Recieved" ? (
                                            <Button style={{color: "red"}} type="button" color="inherit" value={row._id} onClick={this.handleCancelOrder}>
                                                Cancel Order 
                                            </Button>
                                        ):(
                                            <p>No Action Required</p>
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell style={{color: "green"}} align="right">{row.orderStatus}</StyledTableCell>
                                    <StyledTableCell align="right">{row.totalPrice}</StyledTableCell>
                                </StyledTableRow>
                                ))}
                            </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={this.state.pastorders.length}
                                rowsPerPage={this.state.row}
                                page={this.state.page}
                                onPageChange={this.handleChangePage}
                                onRowsPerPageChange={this.handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </CardContent>
                </Card>
            </div>}
        </div>
        )
        return(
            <div>
                {redirectVar}
                <NavigationBar />
                <Container><br />
                    {order}
                {pastorder}
                </Container>
            </div>
        )
    }
}
export default connect(null, {deleteCart, placeOrder} )(withRouter(Checkout));