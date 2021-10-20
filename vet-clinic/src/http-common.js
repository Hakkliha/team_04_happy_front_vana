// This class is a base for you Lorenz to use axios
// Communicating with back-end and such
// baseURL can be changed depending on what urls do we want to use

import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
});