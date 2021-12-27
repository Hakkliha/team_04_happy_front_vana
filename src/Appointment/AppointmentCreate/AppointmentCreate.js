import React from "react";
import "./AppointmentCreate.css";
import axios from "axios";

class AppointmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animal: '',
            date: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(e) {
        e.preventDefault()
        let reponse = await axios({
            method: 'post',
            url: '/api/appointments',
            data: this.state
        })
            .then(function (response) {
                console.log(response)
                return response.status + ": Appointment Created";
            })
            .catch(function (response) {
                console.log(response)
                return response.status + ": Creation failed";
            });
        console.log(JSON.stringify(this.state))
        alert(reponse)

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="input-form" method="post">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            Animal
                        </td>
                        <td>
                            <select name="animal" value={this.state.animal}
                                    onChange={this.handleChange} placeholder="Animal">
                                <option>xd</option>
                                <option>xdbong</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Date
                        </td>
                        <td>
                            <input type="datetime-local" name="date" value={this.state.date} onChange={this.handleChange}
                                   placeholder="12/12/2021"/>
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

export default AppointmentForm;