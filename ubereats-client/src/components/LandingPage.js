import { Component } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function LandingPage() {
    return(
        <div style={{ margin:"20%" }}>
            <center>
                <div class='row'>
                    <div class="col-sm-6">
                        <div class="card">
                        <div class="card-body">
                            <Link to="/login" value="Customer">Login</Link>
                        </div>
                        </div>
                    </div>
                </div>
            </center><br /><br /><br />
        </div>
    );
}

export default LandingPage;