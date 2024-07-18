import { createSlice } from "@reduxjs/toolkit";

const initialState={
    LandlordSession:null
}

const LandlordSlice=createSlice({
    name:'LandlordSlice',
    initialState,
    reducers:{
        landlordLogin:(state,action)=>{
            state.LandlordSession=action.payload;
        },
        landlordLogout:(state)=>{
            state.LandlordSession=null;
        }
    }
})

export const{landlordLogin,landlordLogout}=LandlordSlice.actions;
export default LandlordSlice.reducer;