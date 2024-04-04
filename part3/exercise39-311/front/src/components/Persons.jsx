const Person = ({ person, onHandleDelete }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={onHandleDelete}>delete</button>
    </div>
  );
};

const Persons = ({ persons = [], onHandleDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person
          person={person}
          key={person.id}
          onHandleDelete={onHandleDelete(person.id)}
        />
      ))}
    </div>
  );
};

export default Persons;
