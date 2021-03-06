import React from "react";
import "./OwnerDetail.css";
import OwnerService from "../../services/owner.service";
import AnimalService from "../../services/animal.service";
import {Link} from "react-router-dom";

class OwnerDetail extends React.Component {
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
            animals: []
        };
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        let resData = await OwnerService.getOwnerDetail(this.props.match.params.topicId);
        let animals = await AnimalService.getAnimalsByUser(this.props.match.params.topicId);
        animals = animals.data
        resData = resData.data
        this.setState({
            id: this.props.match.params.topicId,
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
            animals: animals
        })
    }


    async componentDidUpdate() {
        if (this.state.id !== this.props.match.params.topicId || this.props.location.state?.shouldUpdate) {
            let resData = await OwnerService.getOwnerDetail(this.props.match.params.topicId);
            let animals = await AnimalService.getAnimalsByUser(this.props.match.params.topicId);
            animals = animals.data
            resData = resData.data;
            this.setState({
                id: this.props.match.params.topicId,
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
                animals: animals
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
                        <td>Username</td>
                        <td>{this.state.username}</td>
                    </tr>
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
                    <tr>
                        <td colSpan={2}>Pets</td>
                    </tr>
                    {this.state.animals.map((element, index) => {
                        return (<tr key={element.id}>
                            <td>{index}</td>
                            <td><Link to={`/animals/${element.id}`}>{element.name}</Link></td>
                        </tr>)
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default OwnerDetail;
