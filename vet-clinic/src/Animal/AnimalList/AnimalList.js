import React from "react";
import "./AnimalList.css";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import AnimalForm from "../AnimalForm/AnimalForm";
import AnimalDetail from "../AnimalDetail/AnimalDetail";
import {AnimalData} from "./AnimalTestData";

class AnimalList extends React.Component {
    render() {
        let match = this.props.match;
        return (
            <div className="list-view list-view-detail main-content">
                <div className="list-w-header">
                    <div className="title-button">
                        <h2>Animals</h2>
                        <Link to={`${match.url}/create`}>Create New Animal</Link>
                    </div>
                    <Switch>
                        <Route path={`${match.url}/create`}>
                            <AnimalForm/>
                        </Route>
                        <Route path={match.path}>
                            <table>
                                <thead>
                                <th>
                                    <td>Name</td>
                                </th>
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