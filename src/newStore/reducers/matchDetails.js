import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  manualBookMarkerRates: {
    teamA: "1000000",
    teamB: "-1000000",
  },
  sessionRates: null,
  matchOdds: {},
  sessionOdds: {},
  allBetRates: [],
  allSessionBets: [],
  matchOddsLive: null,
  bookmakerLive: null,
  sessionOddsLive: [],
  selectedMatch: {},
};

const matchDetails = createSlice({
  name: "matchDetails",
  initialState,
  reducers: {
    setManualBookMarkerRates: (state, action) => {
      state.manualBookMarkerRates = action.payload;
    },
    removeManualBookMarkerRates: (state, action) => {
      state.manualBookMarkerRates = {};
    },
    setMatchOdds: (state, action) => {
      state.matchOdds = action.payload;
    },
    setMatchOddsLive: (state, action) => {
      console.log(action.payload,"action.payload")
      state.matchOddsLive = action.payload;
    },
    removeMatchOddsLive: (state, action) => {
      state.matchOddsLive = null;
    },
    setBookMakerLive: (state, action) => {
      state.bookmakerLive = action.payload;
    },

    removeBookMakerLive: (state, action) => {
      state.bookmakerLive = null;
    },
    removeMatchOdds: (state, action) => {
      state.matchOdds = [];
    },
    setSessionOdds: (state, action) => {
      state.sessionOdds = action.payload;
    },
    setSessionOddsLive: (state, action) => {
      state.sessionOddsLive = action.payload;
    },
    removeSessionOddsLive: (state, action) => {
      state.sessionOddsLive = [];
    },
    removeSessionOdds: (state, action) => {
      state.sessionOdds = [];
    },
    setAllBetRate: (state, action) => {
      state.allBetRates = action.payload;
    },
    setAddBetRates: (state, action) => {
      // const body= [...state.items,action.payload];
      // console.log(body,"BODY")
      // state.allBetRates =body
      return {
        ...state,
        data: [...state.allBetRates, action.payload],
      };
    },
    removeAllBetRates: (state, action) => {
      state.allBetRates = [];
    },
    setAllSessionBets: (state, action) => {
      state.allSessionBets = action.payload;
    },
    removeAllSessionBets: (state, action) => {
      state.allSessionBets = [];
    },

    setSessionRates: (state, action) => {
      state.sessionRates = action.payload;
    },
    setSelectedMatch: (state, action) => {
      state.selectedMatch = action.payload;
    },
    removeSelectedMatch: (state, action)=>{
      state.selectedMatch ={}
    }
  },
});

export const {
  setManualBookMarkerRates,
  setSelectedMatch,
  removeSelectedMatch,
  removeManualBookMarkerRates,
  setMatchOdds,
  removeMatchOdds,
  setSessionOdds,
  removeSessionOdds,
  setAllBetRate,
  removeAllBetRates,
  setAddBetRates,
  removeSessionOddsLive,
  setAllSessionBets,
  removeAllSessionBets,
  setSessionRates,
  setMatchOddsLive,
  setBookMakerLive,
  setSessionOddsLive,
} = matchDetails.actions;

export default matchDetails.reducer;
