import React from "react";
import "./OwnerForm.css";
import AuthService from "../../services/auth.service";

class OwnerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            password1: '',
            passError: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.name === 'password1' || event.target.name === 'password') {
            if (this.state.password !== event.target.value) {
                this.setState({[event.target.name]: event.target.value, passError: true})
            } else {
                this.setState({[event.target.name]: event.target.value, passError: false})
            }
        } else {
            this.setState({[event.target.name]: event.target.value});
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        console.log(1)
        if (this.state.passError === false && this.state.email !== '' && this.state.username !== '' && this.state.password !== '' && this.state.password1 !== '') {
            let response = await AuthService.register(this.state.username, this.state.email, this.state.password);
            alert(response.status)
        } else {
            alert("Passwords must match.")
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="input-form" method="post">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            E-Mail
                        </td>
                        <td>
                            <input type="email" name="email" value={this.state.email} onChange={this.handleChange}
                                   placeholder="andero@raava.ee"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Username
                        </td>
                        <td>
                            <input type="text" name="username" value={this.state.username}
                                   onChange={this.handleChange} placeholder="Username"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Password
                        </td>
                        <td>
                            <input type="password" name="password" value={this.state.password}
                                   onChange={this.handleChange}
                                   placeholder="Password"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Repeat Password {this.state.passError ?
                            <p><b>Passwords must match!</b></p> : <p>&nbsp;</p>}
                        </td>
                        <td>
                            <input type="password" name="password1" value={this.state.password1}
                                   onChange={this.handleChange}
                                   placeholder="Repeat Password"/>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>

                        </td>
                        <td>
                            <input type="submit" value="Submit" className="ant-btn-primary submit-btn"/>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </form>
        );
    }
}

export default OwnerForm;
