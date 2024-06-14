import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, important: false };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const toggleImportant = async (id, note) => {
  const noteToUpdate = { ...note, important: !note.important };

  console.log({ note, noteToUpdate });
  const response = await axios.put(`${baseUrl}/${id}`, noteToUpdate);
  return response.data;
};

const noteService = { getAll, createNew, toggleImportant };
export default noteService;
