import axios from "axios";
const baseUrl = "/api/blogs";

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

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.post(baseUrl, newBlog, config);
  return request.data;
};

const update = async (blogToEdit, idBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.put(`${baseUrl}/${idBlog}`, blogToEdit, config);
  return request.data;
};

const deleteOne = async (idBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.delete(`${baseUrl}/${idBlog}`, config);
  return request.data;
};

const blogServices = { getAll, create, setToken, update, deleteOne };

export default blogServices;
