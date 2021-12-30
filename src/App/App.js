import React from "react";
import "./App.css";
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
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
import TokenService from "../services/token.service";
import AuthService from "../services/auth.service";
import OwnerForm from "../Owner/OwnerForm/OwnerForm";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            check: true
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogout() {
        AuthService.logout();
        this.setState({redirect: true})
    }

    handleLogin() {
        this.setState({redirect: false})
    }

    render() {
        return (
            <Router>
                <div id="main-container">
                    <div id="navbar">
                        <ul className="navbar-list">
                            <li>
                                <Link to="/" id="nav-logo-link"><Logo id="nav-logo"/></Link>
                            </li>
                            {
                                TokenService.getLocalAccessToken() ?
                                    (
                                        <div>
                                            {TokenService.getUserRole() === 'ROLE_ADMIN' ?
                                                <div>
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
                                                        <p onClick={this.handleLogout}><LogoutOutlined/> <b>Logout</b>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <Link to="/profile"><User id="usr-logo"/></Link>
                                                    </li>
                                                </div>
                                                : <div>
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
                                                        <p onClick={this.handleLogout}><LogoutOutlined/> <b>Logout</b>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <Link to="/profile"><User id="usr-logo"/></Link>
                                                    </li>
                                                </div>}
                                        </div>
                                    ) :
                                    (
                                        <div>
                                            <li>
                                                <Link to="/about"><b>About</b></Link>
                                            </li>
                                            <li>
                                                <Link to="/login"><LoginOutlined/> <b>Login</b></Link>
                                            </li>
                                            <li>
                                                <Link to={`/user/signup`}><b>Sign Up</b></Link>
                                            </li>
                                        </div>
                                    )
                            }
                        </ul>
                    </div>

                    {TokenService.getLocalAccessToken() ? (
                        <Switch>
                            {TokenService.getUserRole() === 'ROLE_ADMIN' ? <Route path="/owners">
                                <OwnerList/>
                            </Route> : <Route path="/about">
                                <About/>
                            </Route>}

                            <Route path="/animals">
                                <AnimalList/>
                            </Route>
                            <Route path="/appointments">
                                <AppointmentList/>
                            </Route>
                            <Route path="/profile">
                                Profile
                            </Route>
                            <Route path="/">
                                <Redirect to="/animals"/>
                            </Route>
                        </Switch>) : (
                        <Switch>
                            <Route path="/about">
                                <About/>
                            </Route>
                            <Route path="/login">
                                <Login navBarChange={this.handleLogin}/>
                            </Route>
                            <Route path={`/user/signup`}>
                                <OwnerForm/>
                            </Route>
                            <Route path="/">
                                <Home/>
                            </Route>
                        </Switch>)}
                    <Route path="/" render={() => (
                        this.state.redirect ? (
                            <Redirect to="/about"/>
                        ) : (<p>&nbsp;</p>))}/>
                </div>
            </Router>
        );
    }
}

// ========================================

export default App;
