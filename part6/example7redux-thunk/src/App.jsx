import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeNotes } from "./reducers/noteReducer";
import NewNote from "./components/NewNote ";
import VisibilityFilter from "./components/VisibilityFilter";
import Notes from "./components/Notes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
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
