import { createSlice } from "@reduxjs/toolkit";

const betplaceSlice = createSlice({
    name: "betplace",
    initialState: {
        anchor: null,
        activeTab: "CRICKET"
    },
    reducers: {
        setAnchor: (state, action) => {
            state.anchor = action.payload
        },
        setActive: (state, action) => {
            state.activeTab = action.payload
        }
    }
})

export const { setAnchor, setActive } = betplaceSlice.actions

export default betplaceSlice.reducer