import React from "react";
import "./Login.css";
import axios from "axios";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(e) {
        e.preventDefault()
        const token = Buffer.from(`${this.state.email}:${this.state.password}`, 'utf8').toString('base64')
        let response = await axios.post('/api/login', {}, {
                headers: {'Authorization': `Basic ${token}`}
            }
        )
            .then(function (response) {
                console.log(response)
                return true;
            })
            .catch(function (response) {

                console.log(response)
                return false;
            });
        console.log(token)
        alert(response)
        if (!response) {
            this.setState({errors: response, email: '', password: ''})
        }
    }

    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.handleSubmit} method="post">
                    <h1>Login</h1>
                    <label> <b>Email</b>
                        <input type="email" name="email" value={this.state.email}
                               onChange={this.handleChange} placeholder="info@email.com"/>
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
