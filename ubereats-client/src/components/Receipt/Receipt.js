import { Component } from "react";
import { Redirect } from "react-router-dom";
import NavigationBar from "../../NavigationBar";
import { Link } from "react-router-dom";
import axios from "axios";
import backendServer from "../../webConfig";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { getOrders } from "../../graphql/queries";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    //   backgroundColor: "#008b8b",
    //   color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

class Receipt extends Component{
    constructor(){
        super()
        this.state={
            rows:[]
        }
    }
    async componentDidMount(){
        axios.defaults.headers.common.authorization = localStorage.getItem("token");
        var orders = await axios.post(`${backendServer}/graphql`,
            {query: getOrders,
                variables: {
                    order_id:sessionStorage.getItem("order_id"),
                }
            }
        );
        console.log("order from graphql ",orders.data);
        await this.setState({
            rows: orders.data.data.getreceipt.orders,
            total: orders.data.data.getreceipt.totalPrice,
            special_instructions: orders.data.data.getreceipt.special_instructions
        })

        // var response = await axios.get(`${backendServer}/orders/getdetails/${sessionStorage.getItem("order_id")}`);
        // await this.setState({
        //     rows:response.data["items"],
        //     total:response.data["total"],
        //     special_instructions: response.data["special_instructions"]
        // })
        console.log(this.state)
    }

    render(){
        return(
            <div>
                <NavigationBar />
                <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ width: 550 }} style={{margin:"2% auto"}}>
                <Table sx={{ width: 550 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Dish Name</StyledTableCell>
                        <StyledTableCell align="right">Quantity</StyledTableCell>
                        <StyledTableCell align="right">Dish Price</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.rows.map((row) => (
                            <TableRow>
                                <StyledTableCell>{row.dishName}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                                <StyledTableCell align="right">{row.dishPrice}</StyledTableCell>
                            </TableRow>
                    ))}
                    <TableRow>
                    <StyledTableCell>Total</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell  align="right">
                            {this.state.total}
                        </StyledTableCell>
                    </TableRow>
                    <TableRow>
                    <StyledTableCell>Special Instructions</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell  align="right">
                            {this.state.special_instructions}
                        </StyledTableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </TableContainer>
                </Grid>
            </div>
        )
    }
}


export default Receipt;