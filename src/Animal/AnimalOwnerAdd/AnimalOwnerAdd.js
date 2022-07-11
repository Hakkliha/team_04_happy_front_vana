import React from "react";
import "./AnimalOwnerAdd.css";
import {Redirect, withRouter} from "react-router-dom";
import OwnerService from "../../services/owner.service";
import AnimalService from "../../services/animal.service";
import TokenService from "../../services/token.service";
import axios from "axios";

class AnimalOwnerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animal: {},
            user: '',
            listOfOwners: [],
            response: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        let resData = await OwnerService.getList();
        let animal = await AnimalService.getAnimalDetail(this.props.match.params.topicId);
        resData = resData.data
        animal = animal.data
        this.setState({listOfOwners: resData, animal: animal});
        this.setState({user: this.state.listOfOwners[0].id || ''})
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log(JSON.stringify(this.state.user))
    }

    async handleSubmit(e) {
        e.preventDefault()
        const token = TokenService.getLocalAccessToken();
        // Axios put request did not work with service for some reason'
        let data = this.state.animal;
        data['user'] = {id: this.state.user};
        let response = await axios({
            url: "http://127.0.0.1:8080/api/animals",
            method: "put",
            data: data,
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        //let response = await OwnerService.putOwner(this.state);
        console.log(JSON.stringify(response))
        this.setState(response.data)
        this.props.listReload()
        this.setState({response: response.status})
    }

    render() {
        return (
            <div className="list-view list-view-detail main-content">
                <form method="put" onSubmit={this.handleSubmit}>
                    <h2>{this.state.animal.breed} {this.state.animal.name}</h2>
                    <label htmlFor="user">
                        Owner
                    </label>
                    <select name="user" value={this.state.user || ''} onChange={this.handleChange}>
                        {this.state.listOfOwners.map(element =>
                            <option key={element.id} value={element.id}>{element.firstName} {element.lastName}</option>
                        )}
                    </select>
                    {this.state.response === 200 ? <Redirect to={{
                            pathname: `/animals`,
                            state: {shouldUpdate: true}
                        }}/> :
                        <input type="submit" value="Submit" className="ant-btn-primary submit-btn"/>
                    }
                </form>
            </div>
        );
    }
}

export default withRouter(AnimalOwnerAdd);
