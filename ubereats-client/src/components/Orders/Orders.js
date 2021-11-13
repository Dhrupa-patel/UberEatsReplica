import { Component } from "react";
import NavigationBar from "../../NavigationBar";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody'
import {withRouter } from "react-router";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import TablePagination from '@mui/material/TablePagination';
import { updateStatus } from "../../actions/orderActions";
import { connect } from "react-redux";
import IconButton from '@mui/material/IconButton';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import backendServer from "../../webConfig";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#008b8b",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));
const theme = createTheme({
    palette:{
        primary:{
            main:'#004d40',
        },

        secondary:{
            main:'#f5f5f5',
        },
    },
})

class Orders extends Component{
    constructor(){
        super()
        this.state={
            rows:[],
            update:false,
            rowsPerPage:5,
            page:0
        }
    }

    getOrders = async()=>{
        axios.defaults.headers.common.authorization = localStorage.getItem("token");
        axios.get(`${backendServer}/orders/ResOrders/${sessionStorage.getItem("res_user_id")}`).then(response =>{
            console.log("called from orders table", response.data)
            this.setState({
                rows:response.data,
                old_data:response.data
            })
        }).catch(error =>{
            console.log(error);
        });
        await this.setState({
            update:false
        })
    }

    componentDidMount(){
        this.getOrders();
    }

    onChange = async (e)=>{
        await this.setState({
            orderStatus:e.target.value
        })
    }

    profile = async(id)=>{
        sessionStorage.setItem("profile_id",id);
        this.props.history.push("/orderCustProfile");
    }

    enableEdit = async(row)=>{
        await this.setState({
            update:true,
            id:row._id
        })
    }

    handleChangePage = async(e,newPage)=>{
        await this.setState({
            page:newPage
        })
    }

    handleChangeRowsPerPage = async(e)=>{
        await this.setState({
            rowsPerPage: e.target.value
        })
    }


    update = async(row)=>{
        console.log(row,this.state)
        var data = {
            "Order_ID":row._id,
            "Order_Status": this.state.orderStatus
        }

        await this.props.updateStatus(data);
        // axios.defaults.headers.common.authorization = localStorage.getItem("token");
        // var res = await axios.post(`${backendServer}/orders/updateStatus`,data);
        await this.getOrders();
        console.log(this.state);
    }

    handleClickOpen = async (e)=>{
        await sessionStorage.setItem("order_id",Number(e.target.value))
        this.props.history.push("/receipt");
    }

    handlefilter = async(e)=>{
        var new_data = this.state.old_data;
        new_data = await new_data.filter(row => row["orderStatus"]===e.target.value);
        await this.setState({
            rows:new_data
        })
    }

    render(){
        let orders = (
        <div><br />
        <Grid item xs={12}>
            <div>
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
                {/* <Button onClick={this.updateDelivertype} theme={theme} value="Pickup" variant="contained">Pickup</Button> */}
            </div>
        </Grid><br />
        <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
                <TableRow>
                <StyledTableCell>Order ID</StyledTableCell>
                <StyledTableCell align="right">Customer Name</StyledTableCell>
                <StyledTableCell align="right">Delivery Type</StyledTableCell>
                <StyledTableCell align="right">Order Status</StyledTableCell>
                <StyledTableCell align="right">Order Mode</StyledTableCell>
                <StyledTableCell align="right">Order Date</StyledTableCell>
                <StyledTableCell align="right">Order Time</StyledTableCell>
                <StyledTableCell align="right">Update</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.state.rows.slice(this.state.page*this.state.rowsPerPage,this.state.page*this.state.rowsPerPage+this.state.rowsPerPage).map((row) => (
                <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                    <Button style={{color: "blue"}} type="button" color="inherit" value={row._id} onClick={this.handleClickOpen}>
                    {row._id}
                    </Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <Button onClick={()=> this.profile(row.custId)}>{row.customerName}</Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.deliveryType}</StyledTableCell>
                    {this.state.update && this.state.id===row._id ? ( 
                        <FormControl>
                        <InputLabel id="update">Order Status</InputLabel>
                        <Select
                        labelId="update"
                        id="update"
                        defaultValue={"Null"}
                        label="Order Status"
                        name="update"
                        onChange={this.onChange}
                        >
                        <MenuItem value={"Order Recieved"}>Order Recieved</MenuItem>
                        <MenuItem value={"Preparing"}>Preparing</MenuItem>
                        <MenuItem value={"On the Way"}>On the Way</MenuItem>
                        <MenuItem value={"Delivered"}>Delivered</MenuItem>
                        <MenuItem value={"Pickup Ready"}>Pickup Ready</MenuItem>
                        <MenuItem value={"Cancelled Order"}>Cancel Order</MenuItem>
                        <MenuItem value={"Picked Up"}>Picked Up</MenuItem>
                        </Select>
                        </FormControl>
                        // <TextField
                        // autoComplete="update"
                        // name="update"
                        // required
                        // id="update"
                        // label="Status Update"
                        // onChange={this.onChange}
                        // autoFocus
                        // />
                    ):(
                        <StyledTableCell style={{color: "green"}} align="right">{row.orderStatus}</StyledTableCell>
                    )}
                    <StyledTableCell align="right">{row.Order_Mode}</StyledTableCell>
                    <StyledTableCell align="right">{row.date}</StyledTableCell>
                    <StyledTableCell align="right">{row.time}</StyledTableCell>
                    {this.state.update & this.state.id===row._id? ( 
                        <Button 
                            onClick={() => this.update(row)}  
                            value={[row]} 
                            size="small">
                                Submit
                        </Button>
                    ):(
                        <Button 
                            onClick={() => this.enableEdit(row)}  
                            value={[row]} 
                            size="small">
                                Update Status
                        </Button>
                    )}
                </StyledTableRow>

                ))}
            </TableBody>

        </Table>
        <TablePagination
                rowsPerPageOptions={[2, 5, 10]}
                component="div"
                count={this.state.rows.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onPageChange={this.handleChangePage}
                onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
        </TableContainer>
        </div>     
        )

        return(
            <div>
                <NavigationBar />
                <Container>
                    <h3>Current/Past Orders</h3>
                    <Card sx={{ maxWidth: "100%" }}>
                        <CardContent>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {sessionStorage.getItem("username")} | {sessionStorage.getItem("location")}
                            </Typography>
                                <TableContainer component={Paper}>
                                    {orders}
                                </TableContainer>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default connect(null, { updateStatus } )(withRouter(Orders));