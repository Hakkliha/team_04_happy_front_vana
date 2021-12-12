import React from "react";
import "./OwnerList.css";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import OwnerDetail from "../OwnerDetail/OwnerDetail";
import OwnerForm from "../OwnerForm/OwnerForm";
import axios from "axios";
import {Button, Tooltip} from "antd";
import {CloseOutlined, EditFilled, RightCircleFilled, SearchOutlined} from '@ant-design/icons';
import OwnerEdit from "../OwnerEdit/OwnerEdit";

class OwnerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            listOfOwners: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.reloadList = this.reloadList.bind(this);
    }

    async reloadList() {
        this.setState({name: ''})
        let resData = await axios({
            method: 'get',
            url: '/api/owners'
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (response) {
                console.log(response)
                return [];
            });

        this.setState({listOfOwners: resData});
    }

    async componentDidMount() {
        let resData = await axios({
            method: 'get',
            url: '/api/owners'
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (response) {
                console.log(response)
                return [];
            });

        this.setState({listOfOwners: resData});
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        let resData = await axios({
            method: 'get',
            url: `/api/owners?fullName=${this.state.name}`
        })
            .then(function (response) {
                console.log(response)
                return response.data;
            })
            .catch(function (response) {
                console.log(response)
                return [];
            });

        this.setState({listOfOwners: resData});
    }

    render() {
        let match = this.props.match;
        return (
            <div className="list-view list-view-detail main-content">
                <div className="list-w-header">
                    <div className="title-button">
                        <h2>Owners</h2>
                        <Link to={`${match.url}/create`} className="create-new-button">Create New Owner</Link>
                    </div>
                    <Switch>
                        <Route path={`${match.url}/create`}>
                            <OwnerForm/>
                        </Route>
                        <Route path={`${match.path}/:topicId/edit`}
                               render={(props) => <OwnerEdit {...props} listReload={this.reloadList}/>}/>
                        <Route path={match.path}>
                            <form onSubmit={this.handleSubmit} className="search-box">
                                <input type="text" placeholder="Name" name="name" value={this.state.name}
                                       onChange={this.handleChange}/>
                                <Tooltip title="search">
                                    <Button shape="circle" icon={<SearchOutlined/>} onClick={this.handleSubmit} className="search-btn"/>
                                </Tooltip>
                                <Tooltip title="clear">
                                    <Button shape="circle" icon={<CloseOutlined/>} onClick={this.reloadList} className="search-btn"/>
                                </Tooltip>
                            </form>
                            <table className="link-table">
                                <thead>
                                <tr>
                                    <td><b>First Name</b></td>
                                    <td><b>Last Name</b></td>
                                    <td><b>Phone</b></td>
                                    <td>Edit</td>
                                    <td>Details</td>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.listOfOwners.map(element =>
                                    <tr key={element.id} className="info-box-tr">
                                        <td>{element.firstName}</td>
                                        <td>{element.lastName}</td>
                                        <td>{element.phone ? element.phone : "-"}</td>
                                        <td className="button-padding">
                                            <Link to={`${match.url}/${element.id}/edit`}
                                                  className="edit-btn"><EditFilled /></Link>
                                        </td>
                                        <td className="button-padding">
                                            <Link
                                                to={`${match.url}/${element.id}`} className="go-btn"><RightCircleFilled />
                                            </Link>
                                        </td>
                                    </tr>
                                )}
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
                    <Route path={`${match.path}/:topicId`} render={(props) => <OwnerDetail {...props} />}/>
                    <Route path={match.path}>
                        <h3 className="notice">Please select an owner.</h3>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default withRouter(OwnerList);