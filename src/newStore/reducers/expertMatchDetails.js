import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMatch: [],
  selectedMatch: {},
  sessionAllBet: [],
  sessionBetId: "",
  allEventSession: [],
  activeUsers: 0,
  bookmakerTeamRates: {},
  eConfirmAuth: false,
  wConfirmAuth: false,
  aConfirmAuth: false,
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
    setBookmakerTeamRates: (state, action) => {
      // alert(action.payload)
      state.bookmakerTeamRates = action.payload;
    },
    setEConfirmAuth: (state, action) => {
      state.eConfirmAuth = action.payload;
    },
    setWConfirmAuth: (state, action) => {
      state.wConfirmAuth = action.payload;
    },
    setAConfirmAuth: (state, action) => {
      state.aConfirmAuth = action.payload;
    },
  }
});

export const { setAllMatchs, setSelectedMatch, removeSelectedMatch, setSessionAllBet, setSessionBetId, setAllEventSession, setBookmakerTeamRates, setActiveUsers, setEConfirmAuth, setWConfirmAuth, setAConfirmAuth } = expertMatchDetails.actions;

export default expertMatchDetails.reducer;
