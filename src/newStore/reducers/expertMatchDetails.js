import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMatch: [],
  selectedMatch: {},
  sessionAllBet: [],
  sessionBetId: "",
  allEventSession: [],
  bookmakerTeamRates: {}
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
    setBookmakerTeamRates: (state, action) => {
      // alert(action.payload)
      state.bookmakerTeamRates = action.payload;
    },
  },
});

export const { setAllMatchs, setSelectedMatch, removeSelectedMatch, setSessionAllBet, setSessionBetId, setAllEventSession, setBookmakerTeamRates } = expertMatchDetails.actions;

export default expertMatchDetails.reducer;
