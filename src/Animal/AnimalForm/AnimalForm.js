import React from "react";
import "./AnimalForm.css";
import axios from "axios";

class AnimalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            dateOfBirth: '',
            species: '',
            breed: '',
            chipNr: '',
            gender: '',
            weight: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit() {
        let gender = await this.state.gender.toUpperCase()
        this.setState({gender: gender})
        let reponse = await axios({
            method: 'post',
            url: '/api/animals',
            data: this.state
        })
            .then(function (response) {
                console.log(response)
                return response.status + ": Animal Created";
            })
            .catch(function (response) {
                console.log(response)
                return response.status + ": Creation Failed";
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
        );
    }
}

export default AnimalForm;