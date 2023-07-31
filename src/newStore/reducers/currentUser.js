import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  currentUserAccountStatementPage:0
}

export const logoutCurrentUser = createAction('auth/logoutReset');
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
  extraReducers: (builder) => {
    // This will handle the reset on logout
    builder.addCase(logoutCurrentUser, () => initialState);
  },
});

export const { setCurrentUser, removeCurrentUser,setCurrentUserAccountStatementPage } = currentUser.actions;

export default currentUser.reducer;
