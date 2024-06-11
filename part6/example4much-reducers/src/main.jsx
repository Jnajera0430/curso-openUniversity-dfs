import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { createNote, noteReducer } from "./reducers/noteReducer.js";
import filterReducer, { filterChange } from "./reducers/filterReducer.js";
import { combineReducers, createStore } from "redux";
import "./index.css";

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});
const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));
store.dispatch(filterChange("IMPORTANT"));
store.dispatch(
  createNote("combineReducers forms one reducer from many simple reducers")
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
