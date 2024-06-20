/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../request";
import { useNotificationDispatch } from "../helpNotification";
import { useEffect } from "react";

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
  });
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };
  useEffect(() => {
    if (newAnecdoteMutation.isSuccess) {
      dispatch({
        type: "ADD",
        payload: `Added '${newAnecdoteMutation.variables.content}'`,
      });
    } else if (newAnecdoteMutation.isError) {
      const error = newAnecdoteMutation.error;
      dispatch({ type: "ADD", payload: error.response.data.error });
    }
  }, [
    newAnecdoteMutation.isSuccess,
    newAnecdoteMutation.isError,
    newAnecdoteMutation.error,
    dispatch,
  ]);

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
