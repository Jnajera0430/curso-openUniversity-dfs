import { createSlice } from "@reduxjs/toolkit";
import loginServices from "../services/login";
import blogServices from "../services/blogs";
import userServices from "../services/users";
import { setNotification } from "./notificationReducer";
const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
const user = JSON.parse(loggedUserJSON);

const userLoggedSlice = createSlice({
  name: "userLogged",
  initialState: user ? user : null,
  reducers: {
    setUser(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { setUser } = userLoggedSlice.actions;

export const logginUser = (content) => {
  return async (dispatch) => {
    try {
      const userLogged = await loginServices.login(content);
      blogServices.setToken(userLogged.token);
      userServices.setToken(userLogged.token);
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(userLogged)
      );
      dispatch(setUser(userLogged));
      dispatch(
        setNotification({
          message: "User logged in",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        setNotification({
          message: "Wrong username or password",
          type: "error",
        })
      );
    }
  };
};

export const setUserLogged = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogServices.setToken(user.token);
      userServices.setToken(user.token);
    }
  };
};

export default userLoggedSlice.reducer;
