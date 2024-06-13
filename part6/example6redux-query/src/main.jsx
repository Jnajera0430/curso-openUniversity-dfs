import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import noteReducer, { createNote } from "./reducers/noteReducer.js";
import filterReducer from "./reducers/filterReducer.js";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

store.subscribe(() => console.log(store.getState()));
store.dispatch(
  createNote("combineReducers forms one reducer from many simple reducers")
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
