import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumberPhone, setNewNumberPhone] = useState("");
  const [valueFilter, setValueFilter] = useState("");

  const handleAddPerson = (event) => {
    event.preventDefault();
    const personFound = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (personFound) {
      alert(`${newName} is already added to phonebook.`);
      setNewName("");
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumberPhone }));
    setNewName("");
    setNewNumberPhone("");
  };
  const handlePersonOnChange = (event) => {
    setNewName(event.target.value);
  };
  const handlePersonNumberOnChange = (event) => {
    setNewNumberPhone(event.target.value);
  };

  const handleFilterOnChange = (event) => {
    setValueFilter(event.target.value);
  };

  const personsToShow = valueFilter.length
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(valueFilter)
      )
    : persons;
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        valueFilter={valueFilter}
        handleFilterOnChange={handleFilterOnChange}
      />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumberPhone={newNumberPhone}
        handleAddPerson={handleAddPerson}
        handlePersonNumberOnChange={handlePersonNumberOnChange}
        handlePersonOnChange={handlePersonOnChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
