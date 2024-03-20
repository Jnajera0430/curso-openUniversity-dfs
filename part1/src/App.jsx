const Header = (props) => {
  console.log(props);
  return <h1>{props.course}</h1>;
};

const Part = (props) => (
  <div>
    <p>
      {props.part} {props.exercise}
    </p>
  </div>
);

const Content = (props) => (
  <div>
    <Part part={props.part1.name} exercise={props.part1.exercise} />
    <Part part={props.part2.name} exercise={props.part2.exercise} />
    <Part part={props.part3.name} exercise={props.part3.exercise} />
  </div>
);

const Total = (props) => <p>Number of exercises {props.total}</p>;

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

export default App;
