import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  currentUserAccountStatementPage:0
}
const currentUser = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    removeCurrentUser: (state, action) => {
      state.currentUser = null;
    },
    setCurrentUserAccountStatementPage: (state, action) => {
      state.currentUserAccountStatementPage = action.payload
    }
  },
});

export const { setCurrentUser, removeCurrentUser,setCurrentUserAccountStatementPage } = currentUser.actions;

export default currentUser.reducer;
