import React from "react";
import "./Login.css";
import {Redirect, Route} from "react-router-dom";
import AuthService from "../../services/auth.service";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            username: '',
            password: '',
            login: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(e) {
        e.preventDefault()
        let response = await AuthService.login(this.state.username, this.state.password);
        if (response.token) {
            this.setState({login: true})
            this.props.navBarChange();
        }
    }


    render() {
        return (
            <div className="login-form">

                <form onSubmit={this.handleSubmit} method="post">
                    <Route path="/" render={() => (
                        this.state.login ? (
                            <Redirect to="/owners"/>
                        ) : (<h1>Login</h1>))}/>
                    <label> <b>Username</b>
                        <input type="text" name="username" value={this.state.username}
                               onChange={this.handleChange} placeholder="Username"/>
                    </label>
                    <label> <b>Password</b>
                        <input type="password" name="password" value={this.state.password}
                               onChange={this.handleChange} placeholder="Password"/>
                    </label>
                    <input type="submit" value="Submit" className="ant-btn-primary submit-btn"/>
                </form>
            </div>
        )
    }
}

export default Login;
