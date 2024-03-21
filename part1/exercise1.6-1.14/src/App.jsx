import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Content = ({ text, total }) => (
  <p>
    {text} {total}
  </p>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(1 + good);
  };
  const handleNeutralClick = () => {
    setNeutral(1 + neutral);
  };
  const handleBadClick = () => {
    setBad(1 + bad);
  };
  return (
    <div>
      <h1>give feedback </h1>
      <div>
        <Button handleClick={handleGoodClick} text={"good"} />
        <Button handleClick={handleNeutralClick} text={"neutral"} />
        <Button handleClick={handleBadClick} text={"bad"} />
      </div>
      <h1>statistics</h1>
      <div>
        <Content text={"good"} total={good} />
        <Content text={"neutral"} total={neutral} />
        <Content text={"bad"} total={bad} />
      </div>
    </div>
  );
};

export default App;
