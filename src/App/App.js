import React from "react";
import "./App.css";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Home from "../Home/Home";
import About from "../About/About";
import Login from "../User/Login/Login";
import OwnerList from "../Owner/OwnerList/OwnerList";
import {ReactComponent as Logo} from "../resources/logo.svg";
import {ReactComponent as User} from "../resources/abstract-user-flat-1.svg";
import AnimalList from "../Animal/AnimalList/AnimalList";
import 'antd/dist/antd.css';
import {LoginOutlined, LogoutOutlined} from '@ant-design/icons';
import AppointmentList from "../Appointment/AppointmentList/AppointmentList";

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
                                <Link to="/owners"><b>Owners</b></Link>
                            </li>
                            <li>
                                <Link to="/animals"><b>Animals</b></Link>
                            </li>
                            <li>
                                <Link to="/appointments"><b>Appointments</b></Link>
                            </li>
                            <li>
                                <Link to="/about"><b>About</b></Link>
                            </li>
                            <li>
                                <Link to="/login"><LoginOutlined /> <b>Login</b></Link>
                            </li>
                            <li>
                                <Link to="/logout"><LogoutOutlined /> <b>Logout</b></Link>
                            </li>
                            <li>
                                <Link to="/profile"><User id="usr-logo"/></Link>
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
                        <Route path="/appointments">
                            <AppointmentList />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/logout">
                            Logout
                        </Route>
                        <Route path="/profile">
                            Profile
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
