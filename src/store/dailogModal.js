import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false,
    showRight: false,
    bodyText: ""
}
const dailogModalSlice = createSlice({
    name: "dailog",
    initialState: {
        isModalOpen: false,
        showRight: false,
        bodyText: "Add Deposit Amount To Continue"
    },
    reducers: {
        setDailogData: (state, action) => {
            state.isModalOpen = action.payload.isModalOpen
            state.showRight = action.payload.showRight ?? false
            state.bodyText = action.payload.bodyText ?? ""
        },
    }
})


export const { setDailogData } = dailogModalSlice.actions
export default dailogModalSlice.reducer