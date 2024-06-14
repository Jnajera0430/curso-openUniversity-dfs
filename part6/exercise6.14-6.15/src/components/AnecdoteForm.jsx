import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { addNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdote";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const anecdoteCreated = await anecdoteService.createNew(content);
    dispatch(createAnecdote(anecdoteCreated));
    dispatch(addNotification(`Add anecdote '${content}'`));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};
