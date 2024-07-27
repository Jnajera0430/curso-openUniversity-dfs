import axios from "axios";
const baseUrl = "/api/users";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.get(baseUrl, config).then((response) => response.data);
};

const userServices = { setToken, getAll };

export default userServices;
