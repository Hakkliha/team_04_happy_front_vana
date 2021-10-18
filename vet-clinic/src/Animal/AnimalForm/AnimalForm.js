import React from "react";
import "./AnimalForm.css";

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

    handleSubmit(event) {
        alert(JSON.stringify(this.state))
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="input-form">
                <table>
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
                            <input type="text" name="species" value={this.state.species} onChange={this.handleChange} placeholder="Bird"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Breed
                        </td>
                        <td>
                            <input type="text" name="breed" value={this.state.breed} onChange={this.handleChange} placeholder="Kingfisher"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Chip Number
                        </td>
                        <td>
                            <input type="text" name="chipNr" value={this.state.chipNr} onChange={this.handleChange} placeholder="4h64nk72nkn457vycf3"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Gender
                        </td>
                        <td>
                            <input type="text" name="gender" value={this.state.gender} onChange={this.handleChange} placeholder="Male"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Weight
                        </td>
                        <td>
                            <input type="number" name="weight" value={this.state.weight} onChange={this.handleChange} placeholder="400"/>g
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="reset"/>
                        </td>
                        <td>
                            <input type="submit" value="Submit" />
                        </td>
                    </tr>
                </table>
            </form>
        );
    }
}

export default AnimalForm;