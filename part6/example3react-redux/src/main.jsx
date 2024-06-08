import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { noteReducer } from "./reducers/noteReducer.js";
import { createStore } from "redux";
import "./index.css";
const store = createStore(noteReducer);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
