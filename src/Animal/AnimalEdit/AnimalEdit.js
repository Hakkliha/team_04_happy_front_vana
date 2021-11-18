import React from "react";
import "./AnimalEdit.css";
import axios from "axios";
import {Redirect} from "react-router-dom";


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
            deleted: false
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit() {
        let gender = await this.state.gender.toUpperCase()
        this.setState({gender: gender})
        let reponse = await axios({
            method: 'put',
            url: `/animals/`,
            data: this.state
        })
            .then(function (response) {
                console.log(response)
                return response.status + ": Update Successful";
            })
            .catch(function (response) {
                console.log(response)
                return response.status + ": Update Failed";
            });
        alert(reponse)

    }

    async componentDidMount() {
        if (this.state.id !== this.props.match.params.topicId){
            let resData = await axios({
                method: 'get',
                url: `/animals/${this.props.match.params.topicId}`
            })
                .then(function (response) {
                    return response.data;
                })
                .catch(function (response) {
                    return response.data;
                });
            this.setState({
                id: this.props.match.params.topicId,
                name: resData.name,
                dateOfBirth: resData.dateOfBirth,
                species: resData.species,
                breed: resData.breed,
                chipNr: resData.chipNr,
                gender: resData.gender,
                weight: resData.weight
            })
        }
    }

    async handleDelete() {

        let res = await axios({
            method: 'delete',
            url: `/animals/${this.props.match.params.topicId}`
        })
            .then(function (response) {
                console.log(response)
                return true
            })
            .catch(function (response) {
                console.log(response)
                return false
            });
        if (res) {
            this.props.listReload()
            this.setState({deleted: true})
        }
    }

    render() {
        return (
            <div>
                {this.state.deleted ? <Redirect to='/animals' /> :
                    <div>
                        <form onSubmit={this.handleSubmit} className="input-form">
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        Name
                                    </td>
                                    <td>
                                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Date of Birth
                                    </td>
                                    <td>
                                        <input type="date" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Species
                                    </td>
                                    <td>
                                        <input type="text" name="species" value={this.state.species} onChange={this.handleChange} placeholder="Species"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Breed
                                    </td>
                                    <td>
                                        <input type="text" name="breed" value={this.state.breed} onChange={this.handleChange} placeholder="Breed"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Chip Number
                                    </td>
                                    <td>
                                        <input type="text" name="chipNr" value={this.state.chipNr} onChange={this.handleChange} placeholder="Chip Number"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Gender
                                    </td>
                                    <td>
                                        <input type="text" name="gender" value={this.state.gender} onChange={this.handleChange} placeholder="Gender"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Weight
                                    </td>
                                    <td>
                                        <input type="number" name="weight" value={this.state.weight} onChange={this.handleChange} placeholder="Weight"/>
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
                        <button className="ant-btn-danger" onClick={this.handleDelete}>Delete</button>
                    </div> }
            </div>
        )
    }
}

export default AnimalEdit;