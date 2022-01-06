import React from "react";
import "./AppointmentDetail.css";
import AppointmentService from "../../services/appointment.service";

class AppointmentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            animal: {},
            user: {},
            appointmentDate: ''
        };
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        let resData = await AppointmentService.getAppointmentsDetail(this.props.match.params.topicId)
        resData = resData.data
        console.log(resData)
        this.setState({
            id: this.props.match.params.topicId,
            animal: resData.animal,
            user: resData.user,
            appointmentDate: resData.appointmentDate
        })
    }


    async componentDidUpdate() {
        if (this.state.id !== this.props.match.params.topicId) {
            let resData = await AppointmentService.getAppointmentsDetail(this.props.match.params.topicId)
            resData = resData.data
            this.setState({
                id: this.props.match.params.topicId,
                animal: resData.animal,
                user: resData.user,
                appointmentDate: resData.appointmentDate
            })
        }
    }

    reformatDateTime(input) {
        console.log(input)
        if (input) {
            const dateTime = input.split('T')
            const date = dateTime[0].split('-')
            const time = dateTime[1].split(':')
            const outTime = `${time[0]}:${time[1]}`
            const outDate = `${date[2]}.${date[1]}.${date[0]}`
            return `${outDate} ${outTime}`
        }
        return ''
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
                        <td>Animal Name</td>
                        <td>{this.state.animal.name || ''}</td>
                    </tr>
                    <tr>
                        <td>Animal Breed</td>
                        <td>{this.state.animal.breed || ''}</td>
                    </tr>
                    <tr>
                        <td>Animal Species</td>
                        <td>{this.state.animal.species || ''}</td>
                    </tr>
                    <tr>
                        <td>Owner Name</td>
                        <td>{this.state.user?.firstName || ''} {this.state.user?.lastName || ''}</td>
                    </tr>
                    <tr>
                        <td>Owner E-Mail</td>
                        <td>{this.state.user?.email}</td>
                    </tr>
                    <tr>
                        <td>Date</td>
                        <td>{this.reformatDateTime(this.state.appointmentDate) || "xd"}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AppointmentDetail;
