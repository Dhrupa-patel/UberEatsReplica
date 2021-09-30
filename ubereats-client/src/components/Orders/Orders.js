import { Component } from "react";
import NavigationBar from "../../NavigationBar";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
            resData:{Name:"",State:""},
            total:0
        }
    }

    componentDidMount(){
        axios.get(`${backendServer}/cart/Order/${sessionStorage.getItem("cust_user_id")}`).then(response =>{
            console.log("called from orders", response.data)
            this.setState({
                rows:response.data["items"],
                total:response.data["total"]
            })
        }).catch(error =>{
            console.log(error);
        })
        axios.get(`${backendServer}/profile/restaurantprofile/${sessionStorage.getItem("cart_res_id")}`).then(response =>{
            console.log("called from orders res", response.data);
            this.setState({
                resData:response.data
            })
            
        })
    }

    render(){
        let order = (
        <div>
            <Card sx={{ maxWidth: "100%" }}>
                <CardContent>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    {this.state.resData["Name"]} | {this.state.resData["State"]}
                </Typography>
                    <TableContainer component={Paper}>
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
                                {row.Dish_Name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.Dish_Price}</StyledTableCell>
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
                        </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </div>
        
        );
        return(
            <div>
                <NavigationBar />
                <Container>
                    <h3>Confirm Your Order</h3>
                    {order}
                </Container>
            </div>
        )
    }
}
export default Orders;