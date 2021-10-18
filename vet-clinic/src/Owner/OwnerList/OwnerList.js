import React from "react";
import "./OwnerList.css";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import OwnerDetail from "../OwnerDetail/OwnerDetail";
import OwnerForm from "../OwnerForm/OwnerForm";
import {OwnersData} from "./OwnerTestData";

class OwnerList extends React.Component {
    render() {
        let match = this.props.match;
        return (
            <div className="list-view list-view-detail main-content">
                <div className="list-w-header">
                    <div className="title-button">
                        <h2>Owners</h2>
                        <Link to={`${match.url}/create`}>Create New Owner</Link>
                    </div>
                    <Switch>
                        <Route path={`${match.url}/create`}>
                            <OwnerForm/>
                        </Route>
                        <Route path={match.path}>
                            <table>
                                <thead>
                                <th>
                                    <td>Name</td>
                                </th>
                                </thead>
                                <tbody>
                                {OwnersData.map(element =>
                                    <tr key={element.id}>
                                        <td>
                                            <Link to={`${match.url}/${element.id}`}>{element.firstName} {element.lastName}</Link>
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
                    <Route path={`${match.path}/:topicId`} children={<OwnerDetail/>}/>
                    <Route path={match.path}>
                        <h3 className="notice">Please select an Owner.</h3>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default withRouter(OwnerList);