import React from "react";
import "./AnimalDetail.css";
import AnimalService from "../../services/animal.service";
import {Link} from "react-router-dom";

class AnimalDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            dateOfBirth: '',
            species: '',
            breed: '',
            chipNr: '',
            gender: '',
            weight: '',
            user: {}
        };
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.cleanDate = this.cleanDate.bind(this)
    }

    cleanDate(date) {
        if (date) {
            let dateArr = date.toString().split('T')[0].split('-');
            return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`
        }
        return "-"
    }

    async componentDidMount() {
        let resData = await AnimalService.getAnimalDetail(this.props.match.params.topicId);
        resData = resData.data
        this.setState({
            id: this.props.match.params.topicId,
            name: resData.name,
            dateOfBirth: resData.dateOfBirth,
            species: resData.species,
            breed: resData.breed,
            chipNr: resData.chipNr,
            gender: resData.gender,
            weight: resData.weight,
            user: resData.user
        })
    }


    async componentDidUpdate() {
        if (this.state.id !== this.props.match.params.topicId || this.props.location.state?.shouldUpdate) {
            let resData = await AnimalService.getAnimalDetail(this.props.match.params.topicId);
            resData = resData.data
            this.setState({
                id: this.props.match.params.topicId,
                name: resData.name,
                dateOfBirth: resData.dateOfBirth,
                species: resData.species,
                breed: resData.breed,
                chipNr: resData.chipNr,
                gender: resData.gender,
                weight: resData.weight,
                user: resData.user
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
                        <td>Name</td>
                        <td>{this.state.name}</td>
                    </tr>
                    <tr>
                        <td>Date of Birth</td>
                        <td>{this.cleanDate(this.state.dateOfBirth)}</td>
                    </tr>
                    <tr>
                        <td>Species</td>
                        <td>{this.state.species}</td>
                    </tr>
                    <tr>
                        <td>Breed</td>
                        <td>{this.state.breed}</td>
                    </tr>
                    <tr>
                        <td>Chip Number</td>
                        <td>{this.state.chipNr}</td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>{this.state.gender}</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>{this.state.weight} g</td>
                    </tr>
                    <tr>
                        <td>User</td>
                        <td>{this.state.user ? <Link
                            to={`/owners/${this.state.user.id}`}>{this.state.user.firstName} {this.state.user.lastName}</Link> : "-"}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AnimalDetail;
