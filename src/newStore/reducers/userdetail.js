import { createSlice } from "@reduxjs/toolkit";

const initialState={
    details:null,
    isModalOpen:false
}

const userDetailSlice=createSlice({
    name:"userDetail",
    initialState:initialState,
    reducers:{
        setUserDet:(state,action)=>{
            state.details=action.payload
        },
        setModalOpen:(state,action)=>{
            state.isModalOpen=action.payload
        }
    }
})

export const {setUserDet,setModalOpen}=userDetailSlice.actions

export default userDetailSlice.reducer