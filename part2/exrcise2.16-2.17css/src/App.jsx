import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personServices from "./services/person";
import "./index.css";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumberPhone, setNewNumberPhone] = useState("");
  const [valueFilter, setValueFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [type, setType] = useState("");

  const handleAddPerson = (event) => {
    event.preventDefault();
    const personFound = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (personFound) {
      const validReplaceData = confirm(
        `${newName} is already added to phonebook, replace the old number with new one ?`
      );
      if (validReplaceData) {
        const personUpdate = { ...personFound, number: newNumberPhone };
        const personUpdated = personServices.update(
          personFound.id,
          personUpdate
        );

        personUpdated.then((personUpdated) => {
          setPersons(
            persons.map((person) =>
              person.id !== personUpdated.id ? person : personUpdated
            )
          );
        });
      }
    } else {
      const newPerson = { name: newName, number: newNumberPhone };
      personServices.create(newPerson).then((personCreated) => {
        setPersons(persons.concat(personCreated));
      });
    }
    setType("success");
    setErrorMessage(`Added ${newName}`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
    setNewName("");
    setNewNumberPhone("");
  };

  const onHandleDelete = (id) => (event) => {
    event.preventDefault();
    const personFound = persons.find((person) => person.id === id);
    const validDelete = confirm(`Delete ${personFound.name} ?`);
    if (validDelete) {
      const personDeleted = personServices.deletePerson(id);
      personDeleted
        .then((personDeleted) => {
          setPersons(
            persons.filter((person) => person.id !== personDeleted.id)
          );
        })
        .catch(() => {
          setType("error");
          setErrorMessage(
            `Information of ${personFound.name} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(
            persons.filter((person) => person.id !== id)
          );
        });
    }
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

  useEffect(() => {
    personServices.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const personsToShow = valueFilter.length
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(valueFilter)
      )
    : persons;
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={type} />
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
      <Persons persons={personsToShow} onHandleDelete={onHandleDelete} />
    </div>
  );
};

export default App;
