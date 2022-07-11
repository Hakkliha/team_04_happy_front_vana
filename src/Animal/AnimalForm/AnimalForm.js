import React from "react";
import "./AnimalForm.css";
import {Redirect} from "react-router-dom";
import axios from "axios";
import TokenService from "../../services/token.service";

class AnimalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            dateOfBirth: '',
            species: '',
            breed: '',
            chipNr: '',
            gender: 'MALE',
            weight: '',
            response: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.name === "gender") {
            let upper = event.target.value.toUpperCase()
            this.setState({[event.target.name]: upper});
        } else {
            this.setState({[event.target.name]: event.target.value});
        }
        console.log(JSON.parse(this.state))
    }

    async handleSubmit(e) {
        e.preventDefault()
        const token = TokenService.getLocalAccessToken();
        // Axios is broken again
        console.log(JSON.stringify(this.state))
        let reponse = await axios({
            url: "http://127.0.0.1:8080/api/animals",
            method: "post",
            data: {
                name: this.state.name,
                dateOfBirth: this.state.dateOfBirth,
                species: this.state.species,
                breed: this.state.breed,
                chipNr: this.state.chipNr,
                gender: this.state.gender,
                weight: this.state.weight
            },
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        this.props.listReload()
        this.setState({response: reponse.status})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="input-form" method="post">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            Name
                        </td>
                        <td>
                            <input type="text" name="name" value={this.state.name || ''} onChange={this.handleChange}
                                   placeholder="Name"/>
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
                                   onChange={this.handleChange}
                                   placeholder="Species"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Breed
                        </td>
                        <td>
                            <input type="text" name="breed" value={this.state.breed || ''} onChange={this.handleChange}
                                   placeholder="Breed"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Chip Number
                        </td>
                        <td>
                            <input type="text" name="chipNr" value={this.state.chipNr || ''}
                                   onChange={this.handleChange}
                                   placeholder="Chip Number"/>
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
                                   onChange={this.handleChange}
                                   placeholder="Weight"/>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>

                        </td>
                        <td>
                            {this.state.response === 201 ? <Redirect to={{
                                    pathname: `/animals`,
                                    state: {shouldUpdate: true}
                                }}/> :
                                <input type="submit" value="Submit" className="ant-btn-primary submit-btn"/>
                            }
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </form>
        );
    }
}

export default AnimalForm;
