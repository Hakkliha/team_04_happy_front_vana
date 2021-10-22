import React from "react";
import "./App.css";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Home from "../Home/Home";
import About from "../About/About";
import OwnerList from "../Owner/OwnerList/OwnerList";
import {ReactComponent as Logo} from "../resources/Panda logo.svg";
import AnimalList from "../Animal/AnimalList/AnimalList";
import 'antd/dist/antd.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    render() {
        return (
            <Router>
                <div id="main-container">
                    <div id="navbar">
                        <ul className="navbar-list">
                            <li>
                                <Link to="/" id="nav-logo-link"><Logo id="nav-logo" /></Link>
                            </li>
                            <li>
                                <Link to="/owners">Owners</Link>
                            </li>
                            <li>
                                <Link to="/animals">Animals</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                        </ul>
                    </div>

                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/owners">
                            <OwnerList />
                        </Route>
                        <Route path="/animals">
                            <AnimalList />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

// ========================================

export default App;
