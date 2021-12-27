import React from "react";
import "./Home.css";
import Andmeloom from "../resources/ANDMELOOM.png";
import Link from "react-router-dom/es/Link";

class Home extends React.Component {
    render() {
        return (
            <div className="main-content-home">
                <div className="home-content-box">
                    <img src={Andmeloom} id="homepage-title" alt="AndmeLoom"/>
                    <Link id="homepage-login" to="/login">Login</Link>
                </div>
            </div>
        )
    }
}

export default Home;