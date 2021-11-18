import React from "react";
import "./OwnerDetail.css";
import axios from "axios";

class OwnerDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
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
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        let resData = await axios({
            method: 'get',
            url: `http://localhost:8080/owners/${this.props.match.params.topicId}`
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (response) {
                return response.data;
            });
        console.log(resData)
        this.setState({
            id: this.props.match.params.topicId,
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
            country: resData.country
        })
    }


    async componentDidUpdate() {
        if (this.state.id !== this.props.match.params.topicId) {
            let resData = await axios({
                method: 'get',
                url: `http://localhost:8080/owners/${this.props.match.params.topicId}`
            })
                .then(function (response) {
                    return response.data;
                })
                .catch(function (response) {
                    return response.data;
                });
            this.setState({
                id: this.props.match.params.topicId,
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
                country: resData.country
            })
        }
    }

    render() {
        return (
            <div className="data-section">
                <table className="table">
                    <thead>
                    <tr>
                        <th colSpan={2}>Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>First Name</td>
                        <td>{this.state.firstName}</td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td>{this.state.lastName}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>{this.state.phone}</td>
                    </tr>
                    <tr>
                        <td>E-Mail</td>
                        <td>{this.state.email}</td>
                    </tr>
                    <tr>
                        <td>Street</td>
                        <td>{this.state.street}</td>
                    </tr>
                    <tr>
                        <td>House</td>
                        <td>{this.state.house}</td>
                    </tr>
                    <tr>
                        <td>Apartment</td>
                        <td>{this.state.apartment}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>{this.state.city}</td>
                    </tr>
                    <tr>
                        <td>ZIP Code</td>
                        <td>{this.state.postalIndex}</td>
                    </tr>
                    <tr>
                        <td>County</td>
                        <td>{this.state.county}</td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td>{this.state.country}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default OwnerDetail;