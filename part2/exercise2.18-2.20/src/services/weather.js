import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5";
const api_key = import.meta.env.VITE_SOME_KEY

const getInformationCapital = (complement) => {
    return axios.get(`${baseUrl}/${complement}&appid=${api_key}`).then(response => response.data);
}

export default {
    getInformationCapital
}