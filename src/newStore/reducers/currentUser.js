import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const currentUser = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
        console.log("setCurrent", action.payload);
      state.currentUser = action.payload;
    },
    removeCurrentUser: (state, action) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, removeCurrentUser } = currentUser.actions;

export default currentUser.reducer;
