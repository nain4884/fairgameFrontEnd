import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMatch: [],
  selectedMatch: {},
  sessionAllBet: [],
};

const expertMatchDetails = createSlice({
  name: "expertMatchDetails",
  initialState,
  reducers: {
    setAllMatchs: (state, action) => {
      state.allMatch = action.payload;
    },
    setSelectedMatch: (state, action) => {
      state.selectedMatch = action.payload;
    },
    removeSelectedMatch: (state, action) => {
      state.selectedMatch = {}
    },
    setSessionAllBet: (state, action) => {
      state.sessionAllBet = action.payload;
    },
  },
});

export const { setAllMatchs, setSelectedMatch, removeSelectedMatch, setSessionAllBet } = expertMatchDetails.actions;

export default expertMatchDetails.reducer;
