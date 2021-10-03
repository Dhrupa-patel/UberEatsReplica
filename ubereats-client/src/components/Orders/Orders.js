import { Component } from "react";
import NavigationBar from "../../NavigationBar";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Link } from "react-router-dom";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
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

class Orders extends Component{
    constructor(){
        super()
        this.state={
            rows:[],
            update:false
        }
    }

    getOrders = ()=>{
        axios.get(`${backendServer}/orders/ResOrders/${sessionStorage.getItem("res_user_id")}`).then(response =>{
            console.log("called from orders table", response.data)
            this.setState({
                rows:response.data,
                update:false
            })
        }).catch(error =>{
            console.log(error);
        });
    }

    componentDidMount(){
        this.getOrders();
    }

    onChange = (e)=>{
        this.setState({
            Delivery_Status:e.target.value
        })
    }

    enableEdit = (row)=>{
        this.setState({
            update:true,
            id:row.Order_ID
        })
    }

    update = (row)=>{
        console.log(row,this.state)
        var data = {
            "Order_ID":row.Order_ID,
            "Order_Status": this.state.Delivery_Status
        }
        axios.post(`${backendServer}/orders/updateStatus`,data).then(response =>{
            console.log("called from orders table", response.data)
        }).catch(error =>{
            console.log(error);
        });
        this.getOrders();
        console.log(this.state);
    }

    render(){
        let orders = (
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
                <TableRow>
                <StyledTableCell>Dish Name</StyledTableCell>
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
                {this.state.rows.map((row) => (
                <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                    {row.Dish_Name}
                    </StyledTableCell>
                    <StyledTableCell align="right"><Link to="/profile">{row.Cust_Name}</Link></StyledTableCell>
                    <StyledTableCell align="right">{row.Delivery_type}</StyledTableCell>
                    {this.state.update & this.state.id===row.Order_ID ? ( 
                        <FormControl>
                        <InputLabel id="update">Order Status</InputLabel>
                        <Select
                        labelId="update"
                        id="update"
                        value={"Order Recieved"}
                        label="Order Status"
                        name="update"
                        onChange={this.onChange}
                        >
                        <MenuItem value={"Order Recieved"}>Order Recieved</MenuItem>
                        <MenuItem value={"Preparing"}>Preparing</MenuItem>
                        <MenuItem value={"On the Way"}>On the Way</MenuItem>
                        <MenuItem value={"Delivered"}>Delivered</MenuItem>
                        <MenuItem value={"Pickup Ready"}>Pickup Ready</MenuItem>
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
                        <StyledTableCell align="right">{row.Order_Status}</StyledTableCell>
                    )}
                    <StyledTableCell align="right">{row.Order_Mode}</StyledTableCell>
                    <StyledTableCell align="right">{row.Order_Date}</StyledTableCell>
                    <StyledTableCell align="right">{row.Order_Time}</StyledTableCell>
                    {this.state.update & this.state.id===row.Order_ID? ( 
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
                {/* <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                        TOTAL
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        {this.state.total}
                    </StyledTableCell>
                </StyledTableRow> */}
            </TableBody>
        </Table>
                    
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

export default Orders;