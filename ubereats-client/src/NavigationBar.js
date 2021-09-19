import { Component } from "react";
import { Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavigationBar extends Component{
    constructor(){
        super();

        this.state = {
            name:localStorage.getItem("name")
        }
    }

    render(){
        let navUser = null;
        let pendingOrders = null;
        let nameMsg = null;

        if(localStorage.getItem("userType") && localStorage.getItem("userType")==="owner"){
            pendingOrders = (<Dropdown.Item><Link to="/orders">Pending Orders</Link></Dropdown.Item>);
        }

        nameMsg = (
            <Dropdown>
                <Dropdown.Toggle>
                    Hi! {this.state.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item><Link to="/profile">Profile</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/orders/history">Past Orders</Link></Dropdown.Item>
                    {pendingOrders}
                    <Dropdown.Item><Link to="/">Logout</Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );

        if("userType" in localStorage){
            if(localStorage.getItem("userType")==="owner"){
                navUser = (
                    <div>
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav.Link>{nameMsg}</Nav.Link>
                        <Nav.Link>
                            <Link to="/menu/view">Menu</Link>
                        </Nav.Link>
                    </div>
                );
            }
            else{
                navUser = (
                    <div>
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav.Link>{nameMsg}</Nav.Link>
                        <Nav.Link>
                            <Link to="/cart">Cart</Link>
                        </Nav.Link>
                    </div>
                );
            }
        }
        else{
            navUser=(
                <div>
                    <Nav className="mr-auto"></Nav>
                    <Nav.Link>
                        <Link to="/login">Login In</Link>
                    </Nav.Link>
                </div>
            );
        }

        return(
            <div>
                <Navbar>
                    <Navbar.Brand>
                        <Link to="/">Home</Link>
                    </Navbar.Brand>
                    {navUser}
                </Navbar>
            </div>
        )

    }


}

export default NavigationBar;