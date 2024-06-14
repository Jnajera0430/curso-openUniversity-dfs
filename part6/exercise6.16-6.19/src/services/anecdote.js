import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { votes: 0, content };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const addVote = async (id, anecdote) => {
  const anecdoteToUpdate = { ...anecdote, votes: anecdote.votes + 1 };
  const response = await axios.put(`${baseUrl}/${id}`, anecdoteToUpdate);
  return response.data;
};

const anecdoteService = { getAll, createNew, addVote };

export default anecdoteService;
