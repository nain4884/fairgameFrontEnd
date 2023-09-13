import { createSlice, createAction } from "@reduxjs/toolkit";

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
  selectedSessionBettings: {},
  sessionAllBetRates: [],
  bookMakerBetRates: [],
  sessionResults: [],
  confirmAuth: false,
  betData: {},
  updateDetData: "",
  buttonData: [],
  matchButtonData: [],
  sessionButtonData: [],
  sessionExposure: 0,
  manualBookmaker: [],
  sessionOffline: [],
  userAllMatches: [],
  multiSelectedMatches: [],
  quickSession: [],
  quickBookmaker: [],
  liveSessionStatus: [],
  updateAdminPlayList: false,
};

export const logoutMatchDetails = createAction("auth/logoutReset");

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
      state.manualBookMarkerRates = [];
    },
    setMatchOdds: (state, action) => {
      state.matchOdds = action.payload;
    },
    setMatchOddsLive: (state, action) => {
      console.log(action.payload, "action.payload");
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
    setButtonData: (state, action) => {
      state.buttonData = action.payload;
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
    setQuickBookmaker: (state, action) => {
      state.quickBookmaker = action.payload;
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
      state.selectedMatch = {};
    },
    setSelectedSessionBettings: (state, action) => {
      state.selectedSessionBettings = action.payload;
    },
    setQuickSession: (state, action) => {
      state.quickSession = action.payload;
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
    setMatchButtonData: (state, action) => {
      state.matchButtonData = action.payload;
    },
    setSessionButtonData: (state, action) => {
      state.sessionButtonData = action.payload;
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
    setUserAllMatches: (state, action) => {
      state.userAllMatches = action.payload;
    },
    setMultiSelectedMatch: (state, action) => {
      state.multiSelectedMatches = action.payload;
    },
    setLiveSessionStatus: (state, action) => {
      state.liveSessionStatus = action.payload;
    },
    setUpdateAdminPlayList: (state) => {
      state.updateAdminPlayList = !state.updateAdminPlayList;
    },
  },
  extraReducers: (builder) => {
    // This will handle the reset on logout
    builder.addCase(logoutMatchDetails, () => initialState);
  },
});

export const {
  setManualBookMarkerRates,
  setSelectedMatch,
  removeSelectedMatch,
  setSelectedSessionBettings,
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
  setMatchButtonData,
  setSessionButtonData,
  setSessionExposure,
  setManualBookmaker,
  setSessionOffline,
  setUserAllMatches,
  setMultiSelectedMatch,
  setQuickSession,
  setLiveSessionStatus,
  setQuickBookmaker,
  setUpdateAdminPlayList,
  setButtonData,
} = matchDetails.actions;

export default matchDetails.reducer;
