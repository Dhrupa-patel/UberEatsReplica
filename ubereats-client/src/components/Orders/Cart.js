import { Component } from "react";
import { Redirect } from "react-router-dom";
import NavigationBar from "../../NavigationBar";
import axios from "axios";
import backendServer from "../../webConfig";

class Cart extends Component{
    constructor(){
        super()
        this.state={
            items:[]
        }
    }
    componentDidMount(){
        axios.get(`${backendServer}/cart/getItems/${sessionStorage.getItem("cust_user_id")}/`+
        `${sessionStorage.getItem("cart_res_id")}`).then(response =>{
            console.log("called cart")
            this.setState({
                items:response.data
            })
        }).catch(error =>{
            console.log(error);
        })
    }


    render(){
        let redirectVar = null;
        let order = false;
        var response = window.confirm(this.state.items);
        console.log(response);
        if (response){
            order = true;
            this.props.history.push("/orders")
        }
        else{
            order=false;
        }
        if(order){
            console.log("called here");
        }
        else{
            redirectVar = <Redirect to="/home" />
        }

        return(
            <div>
                {redirectVar}
                <NavigationBar />
            </div>
        )
    }
}
export default Cart;