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

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part part={part.name} exercise={part.exercises} key={part.id} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce(
    (totalExercises = 0, part) =>
      (totalExercises = parseInt(totalExercises) + part.exercises),
    [0]
  );
  console.log({ total });
  return <strong>{`Total of ${total} exercises`}</strong>;
};

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;
