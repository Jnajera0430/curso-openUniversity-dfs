import { store } from "./reducers/noteReducer";
import { createNote, toggleImportanceOf } from "./services/notes";

const App = () => {
  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    console.log({ content });
    event.target.note.value = "";
    store.dispatch(createNote(content));
  };

  const toggleImportance = (id) => {
    store.dispatch(toggleImportanceOf(id));
  };
  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? "important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
