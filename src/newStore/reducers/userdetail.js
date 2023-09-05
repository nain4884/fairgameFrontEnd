import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: null,
  isModalOpen: false,
  walletAccountDetails: null,
};

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: initialState,
  reducers: {
    setUserDet: (state, action) => {
      state.details = action.payload;
    },
    setModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setWalletAccountDetails: (state, action) => {
      state.walletAccountDetails = action.payload;
    },
  },
});

export const { setUserDet, setModalOpen, setWalletAccountDetails } =
  userDetailSlice.actions;

export default userDetailSlice.reducer;
