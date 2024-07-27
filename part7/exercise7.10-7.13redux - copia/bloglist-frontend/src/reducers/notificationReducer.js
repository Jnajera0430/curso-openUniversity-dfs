import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: null,
    type: null,
  },
  reducers: {
    addNotification(state, action) {
      state = { ...action.payload };
      return state;
    },
  },
});

export const { addNotification } = notificationSlice.actions;

export const setNotification = (content, time = 3) => {
  return (dispatch) => {
    dispatch(addNotification(content));
    setTimeout(() => {
      dispatch(
        addNotification({
          message: null,
          type: null,
        })
      );
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
