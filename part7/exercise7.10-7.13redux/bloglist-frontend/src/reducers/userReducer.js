import { createSlice } from "@reduxjs/toolkit";
import userServices from "../services/users";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return (state = action.payload);
    },
    append(state, action) {
      return state.concat(action.payload);
    },
  },
});

const { setUsers } = userSlice.actions;

export const initialUsers = () => {
  return async (dispatch) => {
    const users = await userServices.getAll();
    dispatch(setUsers(users));
  };
};
export default userSlice.reducer;
