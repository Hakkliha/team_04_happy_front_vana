import React from "react";
import "./AnimalList.css";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import AnimalForm from "../AnimalForm/AnimalForm";
import {Button, Tooltip} from "antd";
import {CloseOutlined, EditTwoTone, RightCircleTwoTone, SearchOutlined} from '@ant-design/icons';
import AnimalEdit from "../AnimalEdit/AnimalEdit";
import AnimalService from "../../services/animal.service";
import AnimalDetail from "../AnimalDetail/AnimalDetail";
import AnimalOwnerAdd from "../AnimalOwnerAdd/AnimalOwnerAdd";
import TokenService from "../../services/token.service";

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
        let resData = TokenService.getUserRole() === "ROLE_ADMIN" ? await AnimalService.getList() : await AnimalService.getAnimalsByUser(JSON.parse(localStorage.getItem('user')).id);
        resData = resData.data
        this.setState({listOfAnimals: resData});
    }

    async componentDidMount() {
        let resData = TokenService.getUserRole() === "ROLE_ADMIN" ? await AnimalService.getList() : await AnimalService.getAnimalsByUser(JSON.parse(localStorage.getItem('user')).id);
        resData = resData.data
        console.log(resData)
        this.setState({listOfAnimals: resData});
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.name)
        let resData = await AnimalService.getListSearch(this.state.name);
        resData = resData.data
        this.setState({listOfAnimals: resData});
    }

    render() {
        let match = this.props.match;
        return (
            <div className="list-view list-view-detail main-content">
                <div className="list-w-header">
                    <div className="title-button">
                        <h2>Animals</h2>
                        {TokenService.getUserRole() === "ROLE_ADMIN" ?
                            <Link to={`${match.url}/create`} className="create-new-button">Create New
                                Animal</Link> : <div></div>}
                    </div>
                    <Switch>
                        <Route path={`${match.path}/create`}
                               render={(props) => <AnimalForm {...props} listReload={this.reloadList}/>}/>
                        <Route path={`${match.path}/:topicId/owner_add`}
                               render={(props) => <AnimalOwnerAdd {...props} listReload={this.reloadList}/>}/>
                        <Route path={`${match.path}/:topicId/edit`}
                               render={(props) => <AnimalEdit {...props} listReload={this.reloadList}/>}/>
                        <Route path={match.path}>
                            <form onSubmit={this.handleSubmit} method="get">
                                {TokenService.getUserRole() === "ROLE_ADMIN" ?
                                    <input type="text" placeholder="Name" name="name" value={this.state.name}
                                           onChange={this.handleChange}/> : <div></div>}
                                <Tooltip title="search">
                                    <Button shape="circle" icon={<SearchOutlined/>} onClick={this.handleSubmit}
                                            type="submit"/>
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

                                            {TokenService.getUserRole() === "ROLE_ADMIN" ?
                                                <Link to={`${match.url}/${element.id}/edit`}
                                                      className="edit-btn"><EditTwoTone/></Link> :
                                                <p></p>}
                                        </td>
                                        <td>
                                            {TokenService.getUserRole() === "ROLE_ADMIN" ?
                                                <Link to={`${match.url}/${element.id}/owner_add`}> Add Owner</Link> :
                                                <p></p>}
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
