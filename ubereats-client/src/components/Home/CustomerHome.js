import { Component } from "react";
import { Button, Dropdown, DropdownButton, FormControl, InputGroup, Row } from "react-bootstrap";

class CustomerHome extends Component{

    render(){
        return(
            <div>
                <center><br /><br />
                <h3> Search for Restaurants</h3>
                <br />
                <form>
                    <InputGroup>
                        <FormControl/>
                        <InputGroup.Append>
                            <Button>Search</Button>
                        </InputGroup.Append>
                        <DropdownButton>Cuisine dropdown</DropdownButton>
                    </InputGroup>
                </form>
                <Row>Restaurant Cards</Row>
                </center>
            </div>
        );
    }

}
export default CustomerHome;