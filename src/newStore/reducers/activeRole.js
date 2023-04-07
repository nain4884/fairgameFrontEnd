import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: []
}

const activeRole = createSlice({
    name: "activeRole",
    initialState: initialState,
    reducers: {
        setActiveRole: (state, action) => {
            state.role = action.payload
            localStorage.setItem('allRoles', JSON.stringify(state.role))
        },
        removeActiveRole: () => {
            localStorage.removeItem('allRoles')
        }
    }
})

export const { setActiveRole } = activeRole.actions

export default activeRole.reducer