import { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class LandingPage extends Component{
    constructor(){
        super();
    }

    addUser = (e)=>{
        console.log("usertype:", e.target.value);
        localStorage.setItem("userType", e.target.value);
    }
    render(){
        return(
            <div style={{ margin:"20%" }}>
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