import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeUser: '1',
    selected:0
}

const activeUser = createSlice({
    name: "activeUser",
    initialState: initialState,
    reducers: {
        setActiveUser: (state, action) => {
            state.activeUser = action.payload
        },
        setSelected:(state,action)=>{
            state.selected=action.payload
        }

    }
})

export const { setActiveUser ,setSelected} = activeUser.actions

export default activeUser.reducer