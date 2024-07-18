import { createSlice } from "@reduxjs/toolkit";

const initialState={
    searchedLocation:null
}

const PropertySlice=createSlice({
    name:'PropertySlice',
    initialState,
    reducers:{
        searchLocation:(state,action)=>{
            state.searchedLocation=action.payload;
        },
        clearSearchLocation:(state)=>{
            state.searchedLocation=null;
        }
    }
})

export const{searchLocation,clearSearchLocation}=PropertySlice.actions;
export default PropertySlice.reducer;