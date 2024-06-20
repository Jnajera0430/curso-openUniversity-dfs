/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { createContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return (state = action.payload);
    case "CLEAR":
      return null;
    default:
      return state;
  }
};
const NotificationContext = createContext();
export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
