import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loader: true,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExist: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExist: (state, action) => {
      state.user = null;
      state.loader = false;
    },
  },
});

export default authSlice;

export const { userExist, userNotExist } = authSlice.actions;
