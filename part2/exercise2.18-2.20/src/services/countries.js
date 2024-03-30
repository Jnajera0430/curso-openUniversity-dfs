import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAllCountries = (complement) => {
    return axios.get(baseUrl).then(response => response.data);
}

export default {
    getAllCountries
}