import React from "react";
import "./OwnerList.css";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import OwnerDetail from "../OwnerDetail/OwnerDetail";
import {Button, Tooltip} from "antd";
import {CloseOutlined, EditFilled, RightCircleFilled, SearchOutlined} from '@ant-design/icons';
import OwnerEdit from "../OwnerEdit/OwnerEdit";
import OwnerService from "../../services/owner.service";

class OwnerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            listOfOwners: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.reloadList = this.reloadList.bind(this);
    }

    async reloadList() {
        this.setState({firstName: '', lastName: ''})
        let resData = await OwnerService.getList()
        this.setState({listOfOwners: resData.data});
    }

    async componentDidMount() {
        let resData = await OwnerService.getList();
        this.setState({listOfOwners: resData.data});
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        let resData = await OwnerService.getListSearch({first: this.state.firstName, last: this.state.lastName});
        this.setState({listOfOwners: resData.data});
    }

    render() {
        let match = this.props.match;
        return (
            <div className="list-view list-view-detail main-content">
                <div className="list-w-header">
                    <div className="title-button">
                        <h2>Owners</h2>
                        {/* <Link to={`${match.url}/create`} className="create-new-button">Create New Owner</Link>*/}
                    </div>
                    <Switch>
                        {/*<Route path={`${match.url}/create`}>
                            <OwnerForm/>
                        </Route>*/}
                        <Route path={`${match.path}/:topicId/edit`}
                               render={(props) => <OwnerEdit {...props} listReload={this.reloadList}/>}/>
                        <Route path={match.path}>
                            <form onSubmit={this.handleSubmit} className="search-box">
                                <input type="text" placeholder="First name" name="firstName"
                                       value={this.state.firstName}
                                       onChange={this.handleChange}/>
                                <input type="text" placeholder="Last name" name="lastName" value={this.state.lastName}
                                       onChange={this.handleChange}/>
                                <Tooltip title="search">
                                    <Button shape="circle" icon={<SearchOutlined/>} onClick={this.handleSubmit}
                                            className="search-btn"/>
                                </Tooltip>
                                <Tooltip title="clear">
                                    <Button shape="circle" icon={<CloseOutlined/>} onClick={this.reloadList}
                                            className="search-btn"/>
                                </Tooltip>
                            </form>
                            <div className="about-content list-content">
                                <table className="link-table">
                                    <thead>
                                    <tr>
                                        <td><b>Username</b></td>
                                        <td><b>E-mail</b></td>
                                        <td>Edit</td>
                                        <td>Details</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.listOfOwners.map(element =>
                                        <tr key={element.id} className="info-box-tr">
                                            <td>{element.username}</td>
                                            <td>{element.email}</td>
                                            <td className="button-padding">
                                                <Link to={`${match.url}/${element.id}/edit`}
                                                      className="edit-btn"><EditFilled/></Link>
                                            </td>
                                            <td className="button-padding">
                                                <Link
                                                    to={`${match.url}/${element.id}`}
                                                    className="go-btn"><RightCircleFilled/>
                                                </Link>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>

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
