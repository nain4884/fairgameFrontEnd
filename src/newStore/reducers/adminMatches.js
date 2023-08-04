import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminAllMatches: [],
  selectedMatchIds: [],
  profitLossReportPage: 1,
  selectedMatch: null,
  sessionOffline:[],
  manualBookmaker: [],
};

export const logoutAdminDetails = createAction("auth/logoutReset");

const adminMatches = createSlice({
  name: "adminMatches",
  initialState,
  reducers: {
    setSelectedMatchIds: (state, action) => {
      const existingObject = state.selectedMatchIds.find(
        (v) => v === action.payload
      );

      if (!existingObject) {
        const newArray = [...state.selectedMatchIds, action.payload];

        return {
          ...state,
          selectedMatchIds: newArray,
        };
      }
    },

    removeSelectedMatchIds: (state, action) => {
      state.selectedMatchIds = [];
    },

    setProfitLossReportPage: (state, action) => {
      state.profitLossReportPage = action.payload;
    },
    setAdminAllMatches: (state, action) => {
      state.adminAllMatches = action.payload;
    },
    setSelectedMatch: (state, action) => {
      state.selectedMatch = action.payload;
    },
    setSessionOffline: (state, action) => {
      state.sessionOffline = action.payload;
    },
    setManualBookmaker: (state, action) => {
      state.manualBookmaker = action.payload;
    },
  },
  extraReducers: (builder) => {
    // This will handle the reset on logout
    builder.addCase(logoutAdminDetails, () => initialState);
  },
});

export const {
  setSelectedMatchIds,
  setProfitLossReportPage,
  removeSelectedMatchIds,
  setAdminAllMatches,
  setSelectedMatch,
  setSessionOffline,
  setManualBookmaker
} = adminMatches.actions;

export default adminMatches.reducer;
