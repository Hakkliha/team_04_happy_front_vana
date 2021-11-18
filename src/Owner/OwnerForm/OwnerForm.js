import React from "react";
import "./OwnerForm.css";
import axios from "axios";

class OwnerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            street: '',
            house: '',
            apartment: '',
            city: '',
            postalIndex: '',
            county: '',
            country: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit() {
        this.setState({fullName: this.state.firstName + " " + this.state.lastName})
        let reponse = await axios({
            method: 'post',
            url: '/api/owners',
            data: this.state
        })
            .then(function (response) {
                console.log(response)
                return response.status + ": User Created";
            })
            .catch(function (response) {
                console.log(response)
                return response.status + ": Creation failed";
            });
        alert(reponse)

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="input-form">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            First Name
                        </td>
                        <td>
                            <input type="text" name="firstName" value={this.state.firstName}
                                   onChange={this.handleChange} placeholder="First Name"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Last Name
                        </td>
                        <td>
                            <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}
                                   placeholder="Last Name"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Phone
                        </td>
                        <td>
                            <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange}
                                   placeholder="+372 5698 4201"/>
                        </td>
                    </tr>
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
                            Street
                        </td>
                        <td>
                            <input type="text" name="street" value={this.state.street} onChange={this.handleChange}
                                   placeholder="Kuldnoka street"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            House
                        </td>
                        <td>
                            <input type="text" name="house" value={this.state.house} onChange={this.handleChange}
                                   placeholder="4B"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Apartment
                        </td>
                        <td>
                            <input type="text" name="apartment" value={this.state.apartment}
                                   onChange={this.handleChange} placeholder="103"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            City
                        </td>
                        <td>
                            <input type="text" name="city" value={this.state.city} onChange={this.handleChange}
                                   placeholder="Tallinn"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            ZIP Code
                        </td>
                        <td>
                            <input type="text" name="postalIndex" value={this.state.postalIndex}
                                   onChange={this.handleChange} placeholder="19113"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            County
                        </td>
                        <td>
                            <input type="text" name="county" value={this.state.county} onChange={this.handleChange}
                                   placeholder="Harjumaa"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Country
                        </td>
                        <td>
                            <input type="text" name="country" value={this.state.country} onChange={this.handleChange}
                                   placeholder="Estonia"/>
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