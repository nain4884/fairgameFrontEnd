import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        activeTabAdmin: 0
    },
    reducers: {
        setActiveAdmin: (state, action) => {
            state.activeTabAdmin = action.payload
        }
    }
})

export const { setActiveAdmin } = adminSlice.actions

export default adminSlice.reducer