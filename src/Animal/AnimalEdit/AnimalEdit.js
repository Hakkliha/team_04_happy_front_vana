import React from "react";
import "./AnimalEdit.css";
import axios from "axios";
import {Redirect} from "react-router-dom";
import TokenService from "../../services/token.service";
import AnimalService from "../../services/animal.service";


class AnimalEdit extends React.Component {
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
            user: {},
            deleted: false,
            updated: false
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(event) {
        if (event.target.name === "gender") {
            let upper = event.target.value.toUpperCase()
            this.setState({[event.target.name]: upper});
        } else {
            this.setState({[event.target.name]: event.target.value});
        }
    }

    async handleSubmit(e) {
        e.preventDefault()
        const token = TokenService.getLocalAccessToken();
        // Axios put request did not work with service for some reason
        let response = await axios({
            url: "http://127.0.0.1:8080/api/animals",
            method: "put",
            data: this.state,
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        //let response = await OwnerService.putOwner(this.state);
        this.setState(response.data)
        this.props.listReload()
        this.setState({updated: true})
    }

    async componentDidMount() {
        if (this.state.id !== this.props.match.params.topicId) {
            let resData = await AnimalService.getAnimalDetail(this.props.match.params.topicId);
            resData = resData.data
            let date = undefined;
            if (resData.dateOfBirth) {
                date = resData.dateOfBirth.toString().split("T")[0];
            }
            this.setState({
                id: this.props.match.params.topicId,
                name: resData.name,
                dateOfBirth: date ? date : "",
                species: resData.species,
                breed: resData.breed,
                chipNr: resData.chipNr,
                gender: resData.gender,
                weight: resData.weight,
                user: resData.user
            })
        }
    }

    async handleDelete() {

        let res = await AnimalService.deleteAnimal(this.props.match.params.topicId);
        if (res) {
            this.props.listReload()
            this.setState({deleted: true})
        }
    }

    render() {
        return (
            <div>
                {this.state.deleted ? <Redirect to='/animals'/> :
                    <div>
                        <form onSubmit={this.handleSubmit} className="input-form">
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        Name
                                    </td>
                                    <td>
                                        <input type="text" name="name" value={this.state.name || ''}
                                               onChange={this.handleChange} placeholder="Name"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Date of Birth
                                    </td>
                                    <td>
                                        <input type="date" name="dateOfBirth" value={this.state.dateOfBirth || ''}
                                               onChange={this.handleChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Species
                                    </td>
                                    <td>
                                        <input type="text" name="species" value={this.state.species || ''}
                                               onChange={this.handleChange} placeholder="Species"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Breed
                                    </td>
                                    <td>
                                        <input type="text" name="breed" value={this.state.breed || ''}
                                               onChange={this.handleChange} placeholder="Breed"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Chip Number
                                    </td>
                                    <td>
                                        <input type="text" name="chipNr" value={this.state.chipNr || ''}
                                               onChange={this.handleChange} placeholder="Chip Number"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Gender
                                    </td>
                                    <td>
                                        <select name="gender" placeholder="Gender" onChange={this.handleChange}
                                                value={this.state.gender || ''}>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Weight
                                    </td>
                                    <td>
                                        <input type="number" name="weight" value={this.state.weight || ''}
                                               onChange={this.handleChange} placeholder="Weight"/>
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
                                                pathname: `/animals/${this.state.id}`,
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

export default AnimalEdit;
