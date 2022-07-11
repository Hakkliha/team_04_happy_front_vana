import React from "react";
import "./OwnerEdit.css";
import {Redirect} from "react-router-dom";
import OwnerService from "../../services/owner.service";
import axios from "axios";
import TokenService from "../../services/token.service";


class OwnerEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
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
            country: '',
            roles: [],
            password: '',
            deleted: false,
            updated: false
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state)
    }

    async handleSubmit(e) {
        e.preventDefault()
        const token = TokenService.getLocalAccessToken();
        // Axios put request did not work with service for some reason
        let response = await axios({
            url: "http://127.0.0.1:8080/api/users",
            method: "put",
            data: this.state,
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        //let response = await OwnerService.putOwner(this.state);
        this.setState(response.data)
        this.setState({updated: true})
    }

    async componentDidMount() {
        if (this.state.id !== this.props.match.params.topicId) {
            let resData = await OwnerService.getOwnerDetail(this.props.match.params.topicId);
            resData = resData.data;
            console.log(resData)
            this.setState({
                id: resData.id,
                username: resData.username,
                firstName: resData.firstName,
                lastName: resData.lastName,
                phone: resData.phone,
                email: resData.email,
                street: resData.street,
                house: resData.house,
                apartment: resData.apartment,
                city: resData.city,
                postalIndex: resData.postalIndex,
                county: resData.county,
                country: resData.country,
                roles: resData.roles,
                password: resData.password
            })
        }
    }

    async handleDelete() {
        let res = await OwnerService.deleteOwner(this.props.match.params.topicId);
        if (res.status === 200 || res.status === 204) {
            this.props.listReload()
            this.setState({deleted: true})
        }
    }

    render() {
        return (
            <div>
                {this.state.deleted ? <Redirect to='/owners'/> :
                    <div>
                        <form onSubmit={this.handleSubmit} className="input-form" method="put">
                            <h2>Edit</h2>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        First Name
                                    </td>
                                    <td>
                                        <input type="text" name="firstName" value={this.state.firstName || ''}
                                               onChange={this.handleChange} placeholder="First Name"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Last Name
                                    </td>
                                    <td>
                                        <input type="text" name="lastName" value={this.state.lastName || ''}
                                               onChange={this.handleChange} placeholder="Last Name"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Phone
                                    </td>
                                    <td>
                                        <input type="text" name="phone" value={this.state.phone || ''}
                                               onChange={this.handleChange} placeholder="+372 5698 4201"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        E-Mail
                                    </td>
                                    <td>
                                        <input type="email" name="email" value={this.state.email || ''}
                                               onChange={this.handleChange} placeholder="andero@raava.ee"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Street
                                    </td>
                                    <td>
                                        <input type="text" name="street" value={this.state.street || ''}
                                               onChange={this.handleChange} placeholder="Kuldnoka street"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        House
                                    </td>
                                    <td>
                                        <input type="text" name="house" value={this.state.house || ''}
                                               onChange={this.handleChange} placeholder="4B"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Apartment
                                    </td>
                                    <td>
                                        <input type="text" name="apartment" value={this.state.apartment || ''}
                                               onChange={this.handleChange} placeholder="103"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        City
                                    </td>
                                    <td>
                                        <input type="text" name="city" value={this.state.city || ''}
                                               onChange={this.handleChange} placeholder="Tallinn"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        ZIP Code
                                    </td>
                                    <td>
                                        <input type="text" name="postalIndex" value={this.state.postalIndex || ''}
                                               onChange={this.handleChange} placeholder="19113"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        County
                                    </td>
                                    <td>
                                        <input type="text" name="county" value={this.state.county || ''}
                                               onChange={this.handleChange} placeholder="Harjumaa"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Country
                                    </td>
                                    <td>
                                        <input type="text" name="country" value={this.state.country || ''}
                                               onChange={this.handleChange} placeholder="Estonia"/>
                                    </td>
                                </tr>
                                </tbody>
                                <tfoot>
                                <tr>
                                    <td>
                                    </td>
                                    <td>
                                        {this.state.updated ?
                                            <Redirect to={{
                                                pathname: `/owners/${this.state.id}`,
                                                state: {shouldUpdate: true}
                                            }}/> :
                                            <input type="submit" value="Submit"
                                                   className="ant-btn-primary submit-btn"/>}
                                    </td>
                                </tr>
                                </tfoot>
                            </table>
                        </form>
                        <button className="ant-btn-danger" onClick={this.handleDelete}>Delete</button>
                    </div>}
            </div>
        )
    }
}

export default OwnerEdit;
