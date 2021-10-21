import React from "react";
import "./Home.css";
import dog_paper from "../resources/dog_paper.png";

class Home extends React.Component {
    render() {
        return (
            <div className="main-content-home">
                <h1>HOME</h1>
                <h3>Welcome to the VetData page!</h3>
                <img src={dog_paper} className="home-wallpaper" alt="Dog"/>
            </div>
        )
    }
}

export default Home;