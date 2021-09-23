import { Component } from "react";
import { Container } from "react-bootstrap";
import NavigationBar from "../../NavigationBar";
import Profile from "../Profile/Profile";
import Menu from "../Menu/Menu"

class OwnerHome extends Component{

    render(){
        return(
            <div>
                <Menu />
            </div>
        );
    }

}
export default OwnerHome;