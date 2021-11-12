import { Component } from "react";
import { Redirect } from "react-router-dom";
import NavigationBar from "../../NavigationBar";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from '@mui/material/TextField';
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
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Grid from '@mui/material/Grid';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#2f4f4f",
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
            rows:[],
            update:false
        }
    }
    componentDidMount(){
        axios.defaults.headers.common.authorization = localStorage.getItem("token");
        axios.get(`${backendServer}/cart/getItems/${sessionStorage.getItem("cust_user_id")}`).then(response =>{
            console.log("called cart", response.data)
            this.setState({
                rows:response.data
            })
        }).catch(error =>{
            console.log(error);
        });
    }

    update = async(e)=>{
        await this.setState({
            update: true
        })
    }

    onChange = async(e)=>{
        await this.setState({
            [e.target.name]:e.target.value
        })
    }

    submit = async(e)=>{
        var id = {
            "id":Number(e[0]), 
            "Cust_ID":sessionStorage.getItem("cust_user_id"), 
            "quantity": this.state.quantity || e[1]}
        axios.defaults.headers.common.authorization = localStorage.getItem("token");
        var result = await axios.post(`${backendServer}/cart/updateQuantity`,id);
        await this.setState({
            rows:result.data,
            update:false
        })
    }


    remove = async(e)=>{
        console.log("here",e)
        var id = {"dishid":Number(e[0]), "Cust_ID":sessionStorage.getItem("cust_user_id")};
        axios.defaults.headers.common.authorization = localStorage.getItem("token");
        var result = await axios.post(`${backendServer}/cart/removeItem`,id);
        let items = [...this.state.rows];
        items.splice(Number(e[1]),1);
        await this.setState({
            rows: items
        })
    }

    render(){
        return(
            <div>
            <div>
                <Grid item xs={12}>
                <TableContainer 
                    component={Paper} 
                    sx={{ width: 550 }} 
                    style={{margin:"2% auto"}}>
                <Table 
                    sx={{ width: 550 }} 
                    aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Items In Cart</StyledTableCell>
                        <StyledTableCell>Quantity</StyledTableCell>
                        <StyledTableCell>Remove ?</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.rows.map((row, index) => (
                        <TableRow
                        key={row.dishName}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.dishName}
                            </TableCell>
                            <TableCell>
                                {this.state.update===false ? (
                                    <Button 
                                        onClick={this.update} >{row.quantity}
                                    </Button>
                                ):(
                                <div>
                                    <TextField
                                        required
                                        fullWidth
                                        name="quantity"
                                        label="Quantity"
                                        id="quantity"
                                        defaultValue={row.quantity}
                                        onChange={this.onChange}
                                    />
                                    <Button 
                                        onClick={()=>this.submit([row.dishId, row.quantity])} >Update
                                    </Button>
                                </div>
                                )}
                            </TableCell>
                            <TableCell>
                            <IconButton 
                            onClick={()=>this.remove([row.dishId, index])} 
                            size="small">
                                <DeleteForeverIcon />
                            </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                </Grid>
            </div>
            </div>
        )
    }
}
export default Cart;