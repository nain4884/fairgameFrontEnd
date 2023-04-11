import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMatch: [],
  selectedMatch: {},
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
  },
});

export const { setAllMatchs, setSelectedMatch } = expertMatchDetails.actions;

export default expertMatchDetails.reducer;
