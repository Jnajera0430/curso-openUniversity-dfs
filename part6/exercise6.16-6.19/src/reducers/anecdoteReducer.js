import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdoteService.getAll();
    dispatch(setAnecdotes(notes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdoteCreated = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(anecdoteCreated));
  };
};

export const handleAddVote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteUpdated = await anecdoteService.addVote(
      anecdote.id,
      anecdote
    );
    dispatch(addVote(anecdoteUpdated.id));
  };
};

export default anecdoteSlice.reducer;
