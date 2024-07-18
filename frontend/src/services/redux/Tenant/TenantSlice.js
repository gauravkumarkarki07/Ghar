import { createSlice } from "@reduxjs/toolkit";

const initialState={
    TenantSession:null
}

const TenantSlice=createSlice({
    name:'TenantSlice',
    initialState,
    reducers:{
        tenantLogin:(state,action)=>{
            state.TenantSession=action.payload;
        },
        tenantLogout:(state)=>{
            state.TenantSession=null;
        }
    }
})

export const{tenantLogin,tenantLogout}=TenantSlice.actions;
export default TenantSlice.reducer;