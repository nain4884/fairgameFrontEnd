import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  manualBookMarkerRates: [],
  sessionRates: null,
  matchOdds: {},
  sessionOdds: {},
  allBetRates: [],
  allSessionBets: [],
  matchOddsLive: null,
  bookmakerLive: null,
  sessionOddsLive: [],
  selectedMatch: {},
  sessionAllBetRates: [],
  bookMakerBetRates: [],
  sessionResults: [],
  confirmAuth: false,
  betData: {},
  updateDetData: "",
  buttonData: [],
  sessionExposure:0,
  manualBookmaker:[],
  sessionOffline:[]
};

const matchDetails = createSlice({
  name: "matchDetails",
  initialState,
  reducers: {
    setManualBookMarkerRates: (state, action) => {
      const existingObject = state.manualBookMarkerRates.find(
        (v) => v.matchId === action.payload.matchId
      );

      if (existingObject) {
        // Update an existing object with a matching matchId
        const updatedObject = {
          ...existingObject,
          teamA: action.payload.teamA,
          teamB: action.payload.teamB,
          teamC: action.payload.teamC,
        };

        const updatedArray = state.manualBookMarkerRates.map((v) =>
          v.matchId === action.payload.matchId ? updatedObject : v
        );

        return {
          ...state,
          manualBookMarkerRates: updatedArray,
        };
      } else {
        // Add a new object to the array
        const newArray = [
          ...state.manualBookMarkerRates,
          {
            matchId: action.payload.matchId,
            teamA: action.payload.teamA,
            teamB: action.payload.teamB,
            teamC: action.payload.teamC,
          },
        ];

        return {
          ...state,
          manualBookMarkerRates: newArray,
        };
      }
    },
    removeManualBookMarkerRates: (state, action) => {
      state.manualBookMarkerRates = []
    },
    setMatchOdds: (state, action) => {
      state.matchOdds = action.payload;
    },
    setMatchOddsLive: (state, action) => {
      console.log(action.payload, "action.payload")
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
    setSessionAllBetRate: (state, action) => {
      state.sessionAllBetRates = action.payload;
    },
    setBookMakerBetRate: (state, action) => {
      state.bookMakerBetRates = action.payload;
    },
    setSessionResults: (state, action) => {
      state.sessionResults = action.payload;
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
    removeSelectedMatch: (state, action) => {
      state.selectedMatch = {}
    },
    setConfirmAuth: (state, action) => {
      state.confirmAuth = action.payload;
    },
    setBetData: (state, action) => {
      state.betData = action.payload;
    },
    setUpdateBetData: (state, action) => {
      state.updateDetData = action.payload;
    },
    setButtonData: (state, action) => {
      state.buttonData = action.payload;
    },
    setSessionExposure: (state, action) => {
      state.sessionExposure = action.payload;
    },
    setManualBookmaker: (state, action) => {
      state.manualBookmaker = action.payload;
    },
    setSessionOffline: (state, action) => {
      state.sessionOffline = action.payload;
    },
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
  setSessionAllBetRate,
  setBookMakerBetRate,
  setSessionResults,
  removeAllBetRates,
  setAddBetRates,
  removeSessionOddsLive,
  setAllSessionBets,
  removeAllSessionBets,
  setSessionRates,
  setMatchOddsLive,
  setBookMakerLive,
  setSessionOddsLive,
  setConfirmAuth,
  setBetData,
  setUpdateBetData,
  setButtonData,
  setSessionExposure,
  setManualBookmaker,
  setSessionOffline
} = matchDetails.actions;

export default matchDetails.reducer;
