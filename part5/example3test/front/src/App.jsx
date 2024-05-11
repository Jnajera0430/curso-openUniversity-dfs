import { useState, useEffect, useRef } from "react";
import Note from "./components/Notes";
import noteServices from "./services/notes";
import loginService from "./services/login";
import "./index.css";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import { NoteForm } from "./components/NoteForm";
import { LoginForm } from "./components/LoginForm";
import Togglable from "./components/Togglable";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState("error");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteServices.create(noteObject).then((noteCreated) => {
      setNotes(notes.concat(noteCreated));
      setTypeMessage("success");
      setErrorMessage(`a note created by ${noteCreated.author}`);
      setTimeout(() => {
        setErrorMessage(null);
        setTypeMessage("error");
      }, 5000);
    });
  };

  const toggleImportanceOf = (id) => () => {
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };
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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteServices.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    noteServices.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteServices.setToken(user.token);
    }
  }, []);

  const notesToShow = showAll ? notes : notes?.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} type={typeMessage} />
      {user === null ? (
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={setUsername}
            handlePasswordChange={setPassword}
            handleSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {
            <Togglable buttonLabel="new note" ref={noteFormRef}>
              <NoteForm createNote={addNote} />
            </Togglable>
          }
        </div>
      )}
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
      <Footer />
    </div>
  );
};

export default App;
