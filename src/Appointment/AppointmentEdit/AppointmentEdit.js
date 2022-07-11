import React from "react";
import "./AppointmentEdit.css";
import {Redirect} from "react-router-dom";
import TokenService from "../../services/token.service";
import axios from "axios";

class AppointmentEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleted: false
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    async handleDelete() {
        const token = TokenService.getLocalAccessToken();
        console.log(token)
        let res = await axios({
            url: `http://127.0.0.1:8080/api/appointments/${this.props.match.params.topicId}`,
            method: "delete",
            headers: {
                'Authorization': "Bearer " + token
            }
        })

        if (res) {
            this.props.listReload()
            this.setState({deleted: true})
        }
    }

    render() {
        return (
            <div>
                {this.state.deleted ? <Redirect to='/Appointments'/> :
                    <div>
                        <h2>Delete this appointment?</h2>
                        <button className="ant-btn-danger" onClick={this.handleDelete}>Delete</button>
                    </div>}
            </div>
        )
    }
}

export default AppointmentEdit;
