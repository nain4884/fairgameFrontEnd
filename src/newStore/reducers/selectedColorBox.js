import {createSlice} from '@reduxjs/toolkit'

const selectedColorBoxSlice=createSlice({
    name:"SelectedColor",
    initialState:{value:""},
    reducers:{
        setColorValue:(state,action)=>{
            state.value=action.payload
        }
    }
})

export const {setColorValue} =selectedColorBoxSlice.actions

export default selectedColorBoxSlice.reducer