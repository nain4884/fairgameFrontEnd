import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMatch: [],
  selectedMatch: {},
  sessionAllBet: [],
  sessionBetId: "",
  allEventSession: [],
  activeUsers:0
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
    setSessionBetId: (state, action) => {
      state.sessionBetId = action.payload;
    },
    setAllEventSession: (state, action) => {
      state.allEventSession = action.payload;
    },
    setActiveUsers: (state, action) => {
      state.activeUsers = action.payload;
    },
  },
});

export const { setAllMatchs, setSelectedMatch, removeSelectedMatch, setSessionAllBet, setSessionBetId, setAllEventSession,setActiveUsers } = expertMatchDetails.actions;

export default expertMatchDetails.reducer;
