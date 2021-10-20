import React from "react";
import "./AnimalList.css";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import AnimalForm from "../AnimalForm/AnimalForm";
import AnimalDetail from "../AnimalDetail/AnimalDetail";
import {AnimalData} from "./AnimalTestData";
import axios from "axios";

class AnimalList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        axios({
            method: 'get',
            url: 'http://localhost:8080/test/clients'
        })
            .then(function (response) {
                console.log(JSON.stringify(response.data))
            });
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
                        <Route path={match.path}>
                            <form onSubmit={this.handleSubmit} >
                                <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange}/>
                                <input type="submit" value="Search"/>
                            </form>
                            <table>
                                <thead>
                                <tr>
                                    <td><b>Name</b></td>
                                </tr>
                                </thead>
                                <tbody>
                                {AnimalData.map(element =>
                                    <tr key={element.id}>
                                        <td>
                                            <Link to={`${match.url}/${element.id}`}>{element.name}</Link>
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
                    <Route path={`${match.path}/:topicId`} children={<AnimalDetail/>}/>
                    <Route path={match.path}>
                        <h3 className="notice">Please select an Animal.</h3>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default withRouter(AnimalList);