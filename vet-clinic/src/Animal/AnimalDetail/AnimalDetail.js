import React from "react";
import "./AnimalDetail.css";
import {useParams} from "react-router-dom";
import {AnimalData} from "../AnimalList/AnimalTestData";


const AnimalDetail = () =>  {

    let { topicId } = useParams();
    return (
        <div className="data-section">
            <table className="table">
                <tr>
                    <th colSpan={2} >Details</th>
                </tr>
                <tr>
                    <td>ID</td>
                    <td>{AnimalData[topicId].id}</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>{AnimalData[topicId].name}</td>
                </tr>
                <tr>
                    <td>Date of Birth</td>
                    <td>{AnimalData[topicId].dateOfBirth}</td>
                </tr>
                <tr>
                    <td>Species</td>
                    <td>{AnimalData[topicId].species}</td>
                </tr>
                <tr>
                    <td>Breed</td>
                    <td>{AnimalData[topicId].breed}</td>
                </tr>
                <tr>
                    <td>Chip Number</td>
                    <td>{AnimalData[topicId].chipNr}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>{AnimalData[topicId].gender}</td>
                </tr>
                <tr>
                    <td>Weight</td>
                    <td>{AnimalData[topicId].weight} g</td>
                </tr>
            </table>
        </div>
    )
}

export default AnimalDetail;