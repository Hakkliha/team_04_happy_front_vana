import React from "react";
import "./AnimalList.css";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import AnimalDetail from "../AnimalDetail/AnimalDetail";
import AnimalForm from "../AnimalForm/AnimalForm";
import axios from "axios";
import {Button, Tooltip} from "antd";
import {CloseOutlined, EditTwoTone, RightCircleTwoTone, SearchOutlined} from '@ant-design/icons';
import AnimalEdit from "../AnimalEdit/AnimalEdit";

class AnimalList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            listOfAnimals: [],
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
            url: '/animals'
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (response) {
                console.log(response)
                return [];
            });

        this.setState({listOfAnimals: resData});
    }

    async componentDidMount() {
        let resData = await axios({
            method: 'get',
            url: '/animals'
        })
            .then(function (response) {
                return response.data;
            })
            .catch(function (response) {
                console.log(response)
                return [];
            });
        console.log(resData)
        this.setState({listOfAnimals: resData});
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        let resData = await axios({
            method: 'get',
            url: `/animals?name=${this.state.name}`
        })
            .then(function (response) {
                console.log(response)
                return response.data;
            })
            .catch(function (response) {
                console.log(response)
                return [];
            });

        this.setState({listOfAnimals: resData});
    }

    render() {
        let match = this.props.match;
        return (
            <div className="list-view list-view-detail main-content">
                <div className="list-w-header">
                    <div className="title-button">
                        <h2>Animals</h2>
                        <Link to={`${match.url}/create`} className="create-new-button">Create New Animal</Link>
                    </div>
                    <Switch>
                        <Route path={`${match.url}/create`}>
                            <AnimalForm/>
                        </Route>
                        <Route path={`${match.path}/:topicId/edit`}
                               render={(props) => <AnimalEdit {...props} listReload={this.reloadList}/>}/>
                        <Route path={match.path}>
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" placeholder="Name" name="name" value={this.state.name}
                                       onChange={this.handleChange}/>
                                <Tooltip title="search">
                                    <Button shape="circle" icon={<SearchOutlined/>} onClick={this.handleSubmit}/>
                                </Tooltip>
                                <Tooltip title="clear">
                                    <Button shape="circle" icon={<CloseOutlined/>} onClick={this.reloadList}/>
                                </Tooltip>
                            </form>
                            <table className="link-table">
                                <thead>
                                <tr>
                                    <td><b>Name</b></td>
                                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.listOfAnimals.map(element =>
                                    <tr key={element.id}>
                                        <td>
                                            <Link
                                                to={`${match.url}/${element.id}`}><RightCircleTwoTone/> {element.species} {element.name}
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`${match.url}/${element.id}/edit`}
                                                  className="edit-btn"><EditTwoTone/></Link>
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
                    <Route path={`${match.path}/:topicId`} render={(props) => <AnimalDetail {...props} />}/>
                    <Route path={match.path}>
                        <h3 className="notice">Please select an Animal.</h3>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default withRouter(AnimalList);