import React from "react";
import "./AppointmentEdit.css";
import {Redirect} from "react-router-dom";
import AppointmentService from "../../services/appointment.service";

class AppointmentEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
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
            deleted: false
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    async handleDelete() {
        let res = await AppointmentService.deleteAppointments(this.props.match.params.topicId)
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
