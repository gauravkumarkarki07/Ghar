import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tenantLogout } from "../Tenant/TenantSlice";
import { landlordLogout } from "../Landlord/LandlordSlice";

export const logout = createAsyncThunk(
  'global/logout',
  async (_, { dispatch }) => {
    dispatch(tenantLogout());
    dispatch(landlordLogout());
  }
);

const GlobalSlice = createSlice({
  name: "GlobalSlice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled);
  },
});

export default GlobalSlice.reducer;
