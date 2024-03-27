const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const Persons = ({ persons = [] }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person person={person} key={person.id} />
      ))}
    </div>
  );
};

export default Persons;
