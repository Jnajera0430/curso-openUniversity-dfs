import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationReducer";
import blogReducer from "./blogReducer";
import userLoggedReducer from "./userLoggedReducer";
import userReducer from "./userReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    userLogged: userLoggedReducer,
    users: userReducer,
  },
});

export default store;
