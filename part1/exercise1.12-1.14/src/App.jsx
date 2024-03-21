import { useState } from "react";
const points = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [countVote, setCountVote] = useState({ ...points });
  const [anecdoteMostVote, setAnecdoteMostVote] = useState(anecdotes[0]);
  const handleAnecdotesclick = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };
  const handleAnecdoteMostVote = (listVotes) => {
    let mostVotedAnecdote = "";
    let maxVotes = 0;
    for (let anecdoteIndex in listVotes) {
      const votes = listVotes[anecdoteIndex];
      if (votes > maxVotes) {
        maxVotes = votes;
        mostVotedAnecdote = anecdoteIndex;
      }
    }
    console.log({ mostVotedAnecdote, listVotes });
    console.log(anecdotes[mostVotedAnecdote]);
    setAnecdoteMostVote(anecdotes[mostVotedAnecdote]);
  };

  const handleVoteClick = () => {
    const newVote = countVote[selected] + 1;
    const updateCountVote = { ...countVote, [selected]: newVote };
    setCountVote(updateCountVote);
    handleAnecdoteMostVote(updateCountVote);
  };

  return (
    <div>
      <div>
        <h1>Anecdote od day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {countVote[selected]} votes</p>
        <button onClick={handleVoteClick}>vote</button>
        <button onClick={handleAnecdotesclick}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdoteMostVote}</p>
      </div>
    </div>
  );
};

export default App;
