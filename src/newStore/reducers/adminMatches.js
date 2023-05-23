import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMatchIds: [],
};

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
  },
});

export const { setSelectedMatchIds, removeSelectedMatchIds } =
  adminMatches.actions;

export default adminMatches.reducer;
