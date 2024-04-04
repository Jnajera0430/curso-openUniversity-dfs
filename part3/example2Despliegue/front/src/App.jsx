import { useState, useEffect } from "react";
import Note from "./components/Notes";
import noteServices from "./services/notes";
import "./index.css";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    noteServices.create(noteObject).then((noteCreated) => {
      setNotes(notes.concat(noteCreated));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => () => {
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };
    console.log({ id });
    noteServices
      .update(id, changedNote)
      .then((noteUpdated) => {
        setNotes(notes.map((note) => (note.id !== id ? note : noteUpdated)));
      })
      .catch((error) => {
        console.log({ error });
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  useEffect(() => {
    noteServices.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>

      <Footer />
    </div>
  );
};

export default App;
