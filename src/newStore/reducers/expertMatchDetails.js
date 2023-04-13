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
    removeSelectedMatch: (state, action)=>{
      state.selectedMatch ={}
    }
  },
});

export const { setAllMatchs, setSelectedMatch ,removeSelectedMatch} = expertMatchDetails.actions;

export default expertMatchDetails.reducer;
