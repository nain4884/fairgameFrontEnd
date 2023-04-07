import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  manualBookMarker: {},
  matchOdds: {},
  sessionOdds: {},
  allBetRates: [],
};

const matchDetails = createSlice({
  name: "matchDetails",
  initialState,
  reducers: {
    setManualBookMarker: (state, action) => {
        state.manualBookMarker = action.payload;
    },
    removeManualBookMarker: (state, action) => {
      state.manualBookMarker = {};
    },
    setMatchOdds: (state, action) => {
        state.matchOdds = action.payload;
    },
    removeMatchOdds: (state, action) => {
      state.matchOdds = {};
    },
    setSessionOdds: (state, action) => {
        state.sessionOdds = action.payload;
    },
    removeSessionOdds: (state, action) => {
      state.sessionOdds = {};
    },
    setAllBetRates: (state, action) => {
        state.allBetRates = action.payload;
    },
    removeAllBetRates: (state, action) => {
      state.allBetRates = {};
    },
  },
});

export const { setManualBookMarker,
    removeManualBookMarker,
    setMatchOdds,
    removeMatchOdds,
    setSessionOdds,
    removeSessionOdds,
    setAllBetRates,
    removeAllBetRates} = matchDetails.actions;

export default matchDetails.reducer;
