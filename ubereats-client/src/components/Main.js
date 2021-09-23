import { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login";
import LandingPage from "./LandingPage";
import OwnerSignup from "./OwnerSignup";
import CustomerSignup from "./CustomerSignup";
import Home from "./Home/Home";
import Cart from "./Cart/Cart";
import Profile from "./Profile/Profile";


class Main extends Component{
    render(){
        return (
            <div>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/login" component= {Login} />
                <Route exact path="/ownersignup" component={OwnerSignup} />
                <Route exact path="/customersignup" component={CustomerSignup}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/profile" component={Profile} />
            </div>
        )
    }
    
}

export default Main;