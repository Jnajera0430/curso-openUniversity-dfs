import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, total }) => (
  <>
    <tr>
      <td>{text}</td>
      <td>{total}</td>
    </tr>
  </>
);

const Statistics = ({
  good,
  neutral,
  bad,
  total,
  average,
  percentagePositive,
}) => {
  if (good == 0 && neutral == 0 && bad == 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} total={good} />
        <StatisticLine text={"neutral"} total={neutral} />
        <StatisticLine text={"bad"} total={bad} />
        <StatisticLine text={"all"} total={total} />
        <StatisticLine text={"average"} total={average} />
        <StatisticLine text={"posetive"} total={`${percentagePositive}%`} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalpro, setTotalpro] = useState(0);
  const [percentagePositive, setPercentagePositive] = useState(0);

  const handleGoodClick = () => {
    const updateTotal = total + 1;
    const updateTotalPro = totalpro + 1;
    const updateGood = good + 1;
    setGood(updateGood);
    setTotal(updateTotal);
    setTotalpro(updateTotalPro);
    setAverage(updateTotalPro / updateTotal);
    setPercentagePositive((updateGood / updateTotal) * 100);
  };

  const handleNeutralClick = () => {
    setNeutral(1 + neutral);
    const updateTotal = total + 1;
    setTotal(updateTotal);
    setPercentagePositive((good / updateTotal) * 100);
  };

  const handleBadClick = () => {
    const updateTotal = total + 1;
    const updateTotalPro = totalpro - 1;
    setBad(bad + 1);
    setTotal(updateTotal);
    setTotalpro(updateTotalPro);
    setAverage(updateTotalPro / updateTotal);
    setPercentagePositive((good / updateTotal) * 100);
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
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        percentagePositive={percentagePositive}
      />
    </div>
  );
};

export default App;
