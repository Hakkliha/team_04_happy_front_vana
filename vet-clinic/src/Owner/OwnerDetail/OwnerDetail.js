import React from "react";
import "./OwnerDetail.css";
import {useParams} from "react-router-dom";
import {OwnersData} from "../OwnerList/OwnerList";


const OwnerDetail = () =>  {

        let { topicId } = useParams();
        return (
            <table className="table">
                <tr>
                    <th colSpan={6} >Details</th>
                </tr>
                <tr>
                    <td>ID</td>
                    <td>{OwnersData[topicId].id}</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>{OwnersData[topicId].name}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>{OwnersData[topicId].address}</td>
                </tr>
            </table>
        )
}

export default OwnerDetail;