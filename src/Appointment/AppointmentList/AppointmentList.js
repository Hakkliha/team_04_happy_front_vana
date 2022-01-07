import React from "react";
import "./AppointmentList.css";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import AppointmentDetail from "../AppointmentDetail/AppointmentDetail";
import AppointmentCreate from "../AppointmentCreate/AppointmentCreate";
import {EditFilled, RightCircleFilled} from '@ant-design/icons';
import AppointmentEdit from "../AppointmentEdit/AppointmentEdit";
import AppointmentService from "../../services/appointment.service";
import TokenService from "../../services/token.service";

class AppointmentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfAppointments: [],
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.reloadList = this.reloadList.bind(this);
    }

    async reloadList() {
        let resData = TokenService.getUserRole() === "ROLE_ADMIN" ? await AppointmentService.getList() : await AppointmentService.getAppointmentsByUser(JSON.parse(localStorage.getItem('user')).id);
        resData = resData.data
        this.setState({listOfAppointments: resData});
    }

    async componentDidMount() {
        let resData = TokenService.getUserRole() === "ROLE_ADMIN" ? await AppointmentService.getList() : await AppointmentService.getAppointmentsByUser(JSON.parse(localStorage.getItem('user')).id);
        resData = resData.data
        console.log(JSON.stringify(resData))
        this.setState({listOfAppointments: resData});
    }

    reformatDateTime(input) {
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
        let match = this.props.match;
        return (
            <div className="list-view list-view-detail main-content">
                <div className="list-w-header">
                    <div className="title-button">
                        <h2>Appointments</h2>
                        {TokenService.getUserRole() === "ROLE_ADMIN" ?
                            <Link to={`${match.url}/create`} className="create-new-button">Create New
                                Appointment</Link> : <div></div>}

                    </div>
                    <Switch>
                        <Route path={`${match.url}/create`}
                               render={(props) => <AppointmentCreate {...props} listReload={this.reloadList}/>}/>
                        <Route path={`${match.path}/:topicId/edit`}
                               render={(props) => <AppointmentEdit {...props} listReload={this.reloadList}/>}/>
                        <Route path={match.path}>
                            <table className="link-table">
                                <thead>
                                <tr>
                                    <td><b>Animal</b></td>
                                    <td><b>Date</b></td>
                                    {TokenService.getUserRole() === "ROLE_ADMIN" ? <td>Edit</td> :
                                        <div style={{display: "none"}}></div>}
                                    <td>Details</td>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.listOfAppointments.map(element =>
                                    <tr key={element.id || '-'} className="info-box-tr">
                                        <td>{element.species || element.animal.species || '-'} {element.breed || element.animal.breed || '-'} {element.name || element.animal.name || '-'}</td>
                                        <td>{this.reformatDateTime(element.appointmentDate) || '-'}</td>
                                        {TokenService.getUserRole() === "ROLE_ADMIN" ? <td className="button-padding">
                                                <Link to={`${match.url}/${element.id}/edit`}
                                                      className="edit-btn"><EditFilled/></Link>
                                            </td> :
                                            <div style={{display: "none"}}></div>}
                                        <td className="button-padding">
                                            <Link
                                                to={`${match.url}/${element.id}`}
                                                className="go-btn"><RightCircleFilled/>
                                            </Link>
                                        </td>
                                    </tr>
                                ) || 'No Appointments'}
                                </tbody>
                            </table>


                        </Route>
                    </Switch>
                </div>

                {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
                <Switch>
                    <Route path={`${match.path}/create`}>

                    </Route>
                    <Route path={`${match.path}/:topicId`} render={(props) => <AppointmentDetail {...props} />}/>
                    <Route path={match.path}>
                        <h3 className="notice">Please select an Appointment.</h3>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default withRouter(AppointmentList);
