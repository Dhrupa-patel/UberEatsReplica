import { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./Login";
import LandingPage from "./LandingPage";
import OwnerSignup from "./OwnerSignup";
import CustomerSignup from "./CustomerSignup";
import Home from "./Home/Home";
// import Cart from "./Orders/Cart";
import Profile from "./Profile/Profile";
import Menu from "./Menu/Menu";
import Favorites from "./Favorites/Favorites";
import OwnerHome from "./Home/OwnerHome";
import Orders from "./Orders/Orders";
import Checkout from "./Orders/Checkout";
import AddItem from "./Menu/AddItem";
import Receipt from "./Receipt/Receipt";
import OrderCustProfile from "./Profile/OrderCustProfile";

class Main extends Component{
    render(){
        return (
            <div>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/login" component= {Login} />
                <Route exact path="/ownersignup" component={OwnerSignup} />
                <Route exact path="/customersignup" component={CustomerSignup}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/menu" component={Menu} />
                <Route exact path="/favorites" component={Favorites} />
                <Route exact path="/ownerhome" component={OwnerHome} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/orders" component={Orders} />
                <Route exact path="/orderCustProfile" component={OrderCustProfile} />
                <Route exact path="/addDishes" component={AddItem} />
                <Route exact path="/receipt" component={Receipt} />
            </div>
        )
    }
    
}

export default Main;