import { useDispatch } from "react-redux";
import NewNote from "./components/NewNote ";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { setNotes } from "./reducers/noteReducer";
import noteService from "./services/notes";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(setNotes(notes)));
  }, []);

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
