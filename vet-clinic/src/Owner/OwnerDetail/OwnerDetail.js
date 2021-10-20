import React from "react";
import "./OwnerDetail.css";
import {useParams} from "react-router-dom";
import axios from "axios";


async function getUserData(userID) {
    let resData = await axios({
        method: 'get',
        url: `http://localhost:8080/owners/${userID}`
    })
        .then(function (response) {
            return response.data;
        })
        .catch(function (response) {
            return response.data;
        });
    return resData
}

class OwnerDetail extends React.Component  {
        // let { ownerId } = this.props.match.params.topicId;
        // console.log("Owner ID: " + ownerId)
        // let userInfo = getUserData(ownerId);
        // console.log(userInfo)

            render(){
                let ownerId = this.props.match.params.topicId;
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
                                    <td>ID</td>
                                    <td>{ownerId}</td>
                                </tr>
                                <tr>
                                    <td>First Name</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>E-Mail</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Street</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Apartment</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>ZIP Code</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>County</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Country</td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                }
}

export default OwnerDetail;