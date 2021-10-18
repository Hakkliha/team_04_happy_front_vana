import React from "react";
import "./OwnerDetail.css";
import {useParams} from "react-router-dom";
import {OwnersData} from "../OwnerList/OwnerTestData";


const OwnerDetail = () =>  {

        let { topicId } = useParams();
        return (
            <div className="data-section">
                <table className="table">
                    <tr>
                        <th colSpan={2} >Details</th>
                    </tr>
                    <tr>
                        <td>ID</td>
                        <td>{OwnersData[topicId].id}</td>
                    </tr>
                    <tr>
                        <td>First Name</td>
                        <td>{OwnersData[topicId].firstName}</td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td>{OwnersData[topicId].lastName}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>{OwnersData[topicId].phone}</td>
                    </tr>
                    <tr>
                        <td>E-Mail</td>
                        <td>{OwnersData[topicId].email}</td>
                    </tr>
                    <tr>
                        <td>Street</td>
                        <td>{OwnersData[topicId].street}</td>
                    </tr>
                    <tr>
                        <td>Apartment</td>
                        <td>{OwnersData[topicId].apartment}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>{OwnersData[topicId].city}</td>
                    </tr>
                    <tr>
                        <td>ZIP Code</td>
                        <td>{OwnersData[topicId].postalIndex}</td>
                    </tr>
                    <tr>
                        <td>County</td>
                        <td>{OwnersData[topicId].county}</td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td>{OwnersData[topicId].country}</td>
                    </tr>
                </table>
            </div>
        )
}

export default OwnerDetail;