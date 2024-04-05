import axios from "axios";

const baseUrl = "/api/persons";

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const update = (id, personUpdate) => {
  const request = axios.put(`${baseUrl}/${id}`, personUpdate);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default {
  create,
  update,
  getAll,
  deletePerson,
};
