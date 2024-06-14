/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { addNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdote";

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
      </div>
    </div>
  );
};
export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter) {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.includes(state.filter)
      );
    }
    return state.anecdotes;
  });
  const dispatch = useDispatch();
  const vote = async (id, anecdote) => {
    await anecdoteService.addVote(id, anecdote);
    dispatch(addVote(id));
    dispatch(addNotification(`you voted '${anecdote.content}'`));
  };

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote anecdote={anecdote} vote={vote} key={anecdote.id} />
        ))}
    </div>
  );
};
