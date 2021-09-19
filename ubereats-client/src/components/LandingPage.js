import { Component } from "react";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

class LandingPage extends Component{
    constructor(){
        super();
        this.state={};
    }

    addUser = (e)=>{
        console.log("usertype:", e.target.value);
        localStorage.setItem("userType", e.target.value);
        this.setState({
            selected:1
        })
    }
    render(){
        let redirectVar = null;
        if(this.state.selected){
            redirectVar = <Redirect to="/login" />
        }
        return(
            <div style={{ margin:"20%" }}>
                {redirectVar}
                <center>
                    <div class='row'>
                        <div class="col-sm-6">
                            <div class="card">
                            <div class="card-body">
                                <button type="button" onClick={this.addUser} value="customer">Customer Login</button>
                                <button type="button" onClick={this.addUser} value="owner">Restaurant Owner Login</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </center><br /><br /><br />
            </div>
        );
    }
}

export default LandingPage;