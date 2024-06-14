/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { handleAddVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  );
};
export const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    if (state.filter) {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.includes(state.filter)
      );
    }
    return state.anecdotes;
  });
  const vote = async (anecdote) => {
    dispatch(handleAddVote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3));
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
