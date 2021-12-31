import React from "react";
import "./AppointmentCreate.css";
import AnimalService from "../../services/animal.service";
import tokenService from "../../services/token.service";
import TokenService from "../../services/token.service";
import axios from "axios";
import {Redirect} from "react-router-dom";

class AppointmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animal: {},
            user: {},
            appointmentDate: '',
            listOfAnimals: [],
            redirect: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async componentDidMount() {
        let role = tokenService.getUserRole();
        let animals;
        if (role === "ROLE_ADMIN") {
            animals = await AnimalService.getList();
        } else {
            animals = await AnimalService.getAnimalsByUser(JSON.parse(localStorage.getItem('user')).id);
        }
        animals = animals.data
        this.setState({
            listOfAnimals: animals
        })
        console.log(this.state)
    }

    handleChange(event) {
        if (event.target.name === 'animal') {
            this.setState({[event.target.name]: {id: event.target.value}});
        } else {
            this.setState({[event.target.name]: event.target.value + ":00"});
        }
    }

    async handleSubmit(e) {
        e.preventDefault()
        const token = TokenService.getLocalAccessToken();
        const user = (await AnimalService.getAnimalDetail(this.state.animal.id)).data.user;
        alert(this.state.appointmentDate)
        let reponse = await axios({
            url: `http://13.48.57.71:8080/api/appointments`,
            method: "post",
            data: {
                animal: this.state.animal,
                user: user,
                appointmentDate: this.state.appointmentDate
            },
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        console.log(JSON.stringify(reponse))
        if (reponse.status === 201) {
            this.props.listReload()
            this.setState({redirect: true})
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="input-form" method="post">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            Animal
                        </td>
                        <td>
                            <select name="animal" value={this.state.animal.id || ''}
                                    onChange={this.handleChange} placeholder="Animal">
                                {this.state.listOfAnimals.map(element => {
                                    return <option key={element.id}
                                                   value={element.id}>{element.species} {element.breed} {element.name}</option>
                                })}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Date
                        </td>
                        <td>
                            <input type="datetime-local" name="appointmentDate" value={this.state.appointmentDate || ''}
                                   onChange={this.handleChange}
                                   placeholder="2021-10-08T20:00"/>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>

                        </td>
                        <td>
                            {this.state.redirect ? <Redirect to="/appointments"/> :
                                <input type="submit" value="Submit" className="ant-btn-primary submit-btn"/>}
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </form>
        );
    }
}

export default AppointmentForm;
