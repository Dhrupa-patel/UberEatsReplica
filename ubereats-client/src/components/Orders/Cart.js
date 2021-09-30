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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#008b8b",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
class Cart extends Component{
    constructor(){
        super()
        this.state={
            rows:[]
        }
    }
    componentDidMount(){
        axios.get(`${backendServer}/cart/getItems/${sessionStorage.getItem("cust_user_id")}`).then(response =>{
            console.log("called cart", response.data)
            this.setState({
                rows:response.data
            })
        }).catch(error =>{
            console.log(error);
        });
    }


    render(){
        let redirectVar=null;
        let items = (<Grid item xs={12}>
            <TableContainer component={Paper} sx={{ width: 550 }} style={{margin:"2% auto"}}>
            <Table sx={{ width: 550 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Items In Cart</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {this.state.rows.map((row) => (
                    <TableRow
                    key={row.Dish_Name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.Dish_Name}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Button
            size="small">
            <Link to="/orders">
            Proceed to Checkout
            </Link> 
        </Button>
        </Grid>)

        return(
            <div>
                {redirectVar}
                <NavigationBar />
                {items}
            </div>
        )
    }
}
export default Cart;