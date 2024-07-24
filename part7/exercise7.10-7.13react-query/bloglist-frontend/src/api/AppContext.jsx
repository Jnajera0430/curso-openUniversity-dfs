/* eslint-disable indent */
/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { createContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return (state = action.payload);
    case "CLEAR":
      return { message: null, type: null };
    default:
      return state;
  }
};

const userLoggedReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return (state = action.payload);
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};
const AppContext = createContext();
export const AppContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: null,
    type: null,
  });

  const [userLogged, userLoggedDispatch] = useReducer(userLoggedReducer, null);
  return (
    <AppContext.Provider
      value={[
        notification,
        notificationDispatch,
        userLogged,
        userLoggedDispatch,
      ]}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
