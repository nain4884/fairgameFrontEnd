import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMatch: [],
  selectedExpertMatch: {},
  sessionAllBet: [],
  sessionBetId: "",
  allEventSession: [],
  activeUsers: 0,
  bookmakerTeamRates: {},
  eConfirmAuth: false,
  wConfirmAuth: false,
  aConfirmAuth: false,
  allBetRates: [],
  currentOdd: [],
  selectedBookmaker: null,
  sessionProfitLoss: null,
  selectedSession: null,
  sessionResultRefresh:false,
  quickBookmaker: {
    teamA: {
      rate: null,
      lock: true,
      suspended: true,
      lay: null,
      back: null,
      layLock: false,
    },
    teamB: {
      rate: null,
      lock: true,
      suspended: true,
      lay: null,
      back: null,
      layLock: false,
    },
    teamC: {
      rate: null,
      lock: true,
      suspended: true,
      lay: null,
      back: null,
      layLock: false,
    },
    teamBall: {
      isABall: false,
      isBBall: false,
      isCBall: false,
    },
    teamSuspended: {
      teamA_suspend: true,
      teamB_suspend: true,
      teamC_suspend: true,
    },
    teamBackUnlock: true,
  },

  sessionExpertOdds:[]
};
export const logoutExpertDetails = createAction("auth/logoutReset");
const expertMatchDetails = createSlice({
  name: "expertMatchDetails",
  initialState,
  reducers: {
    setAllBetRate: (state, action) => {
      state.allBetRates = action.payload;
    },
    setAllMatchs: (state, action) => {
      state.allMatch = action.payload;
    },
    setSelectedExpertMatch: (state, action) => {
      state.selectedExpertMatch = action.payload;
    },
    removeSelectedMatch: (state, action) => {
      state.selectedMatch = {};
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
    setCurrentOdd: (state, action) => {
      state.currentOdd = action.payload;
    },
    setSessionProfitLoss: (state, action) => {
      state.sessionProfitLoss = action.payload;
    },
    setQuickBookmaker: (state, action) => {
      state.quickBookmaker = action.payload;
    },
    setSelectedSession: (state, action) => {
      state.selectedSession = action.payload;
    },
    setSelectedBookmaker: (state, action) => {
      state.selectedBookmaker = action.payload;
    },
    
    setSessionResultRefresh: (state, action) => {
      state.sessionResultRefresh = action.payload;
    },
    setSessionExpertOdds : (state, action) => {
      state.sessionExpertOdds = action.payload;
    },
    extraReducers: (builder) => {
      // This will handle the reset on logout
      builder.addCase(logoutExpertDetails, () => initialState);
    },
  },
});

export const {
  setAllMatchs,
  setAllBetRate,
  setSelectedExpertMatch,
  removeSelectedMatch,
  setSessionAllBet,
  setSessionBetId,
  setAllEventSession,
  setSessionProfitLoss,
  setBookmakerTeamRates,
  setActiveUsers,
  setEConfirmAuth,
  setWConfirmAuth,
  setAConfirmAuth,
  setCurrentOdd,
  setQuickBookmaker,
  setSelectedBookmaker,
  setSelectedSession,
  setSessionResultRefresh,
  setSessionExpertOdds
} = expertMatchDetails.actions;

export default expertMatchDetails.reducer;
